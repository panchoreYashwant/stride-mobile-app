import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { STORAGE_KEYS } from "../constants/storageKeys";

const initialState = {
  isLoggedIn: false,
  user: null,
  token: null,
};

export const useAuthStore = create(
  persist(
    (set) => ({
      ...initialState,
      login: ({ name, email, token = null }) =>
        set({
          isLoggedIn: true,
          user: { name: String(name).trim(), email: String(email).trim() },
          token,
        }),
      logout: () => set(initialState),
    }),
    {
      name: STORAGE_KEYS.AUTH,
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        isLoggedIn: state.isLoggedIn,
        user: state.user,
        token: state.token,
      }),
    }
  )
);
