import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { STORAGE_KEYS } from "../constants/storageKeys";

export const useSettingsStore = create(
  persist(
    (set) => ({
      notificationsEnabled: true,
      locationPermissionEnabled: false,
      /** @type {'system' | 'light' | 'dark'} */
      themeMode: "system",
      setNotificationsEnabled: (value) =>
        set({ notificationsEnabled: Boolean(value) }),
      setLocationPermissionEnabled: (value) =>
        set({ locationPermissionEnabled: Boolean(value) }),
      setThemeMode: (mode) =>
        set({
          themeMode: ["system", "light", "dark"].includes(mode) ? mode : "system",
        }),
    }),
    {
      name: STORAGE_KEYS.SETTINGS,
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
