import Constants from "expo-constants";

const extra = Constants?.expoConfig?.extra ?? {};

export const ENV = {
  API_BASE_URL:
    process.env.EXPO_PUBLIC_API_BASE_URL ||
    extra.apiBaseUrl ||
    "https://jsonplaceholder.typicode.com",
  REQUEST_TIMEOUT_MS: 10000,
};
