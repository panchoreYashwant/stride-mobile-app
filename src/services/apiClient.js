import axios from "axios";
import { ENV } from "../config/env";
import { useAuthStore } from "../store/authStore";
import { logger } from "../utils/logger";

const buildError = (error) => {
  const status = error?.response?.status;
  const message =
    error?.response?.data?.message ||
    error?.message ||
    "Unexpected network error.";
  return { status, message, isNetworkError: !status };
};

export const apiClient = axios.create({
  baseURL: ENV.API_BASE_URL,
  timeout: ENV.REQUEST_TIMEOUT_MS,
  headers: { "Content-Type": "application/json" },
});

apiClient.interceptors.request.use(
  (config) => {
    const requestId = `${Date.now()}-${Math.random().toString(16).slice(2, 8)}`;
    const token = useAuthStore.getState().token;
    config.headers["x-request-id"] = requestId;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    config.metadata = { requestId, startedAt: Date.now() };
    return config;
  },
  (error) => Promise.reject(buildError(error))
);

apiClient.interceptors.response.use(
  (response) => {
    const duration = Date.now() - (response.config.metadata?.startedAt ?? Date.now());
    logger.info("[API]", response.config.url, response.status, `${duration}ms`);
    return response;
  },
  async (error) => {
    const config = error.config || {};
    config.__retryCount = config.__retryCount || 0;
    const isTransient = !error.response || error.response.status >= 500;
    if (isTransient && config.__retryCount < 1) {
      config.__retryCount += 1;
      return apiClient(config);
    }
    return Promise.reject(buildError(error));
  }
);
