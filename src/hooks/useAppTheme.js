import { useMemo } from "react";
import { useColorScheme } from "react-native";
import { useSettingsStore } from "../store/settingsStore";
import { darkColors, lightColors } from "../theme/palettes";

const resolveDark = (themeMode, systemScheme) => {
  if (themeMode === "dark") return true;
  if (themeMode === "light") return false;
  return systemScheme === "dark";
};

export function useAppTheme() {
  const themeMode = useSettingsStore((s) => s.themeMode ?? "system");
  const systemScheme = useColorScheme();

  const isDark = useMemo(
    () => resolveDark(themeMode, systemScheme),
    [themeMode, systemScheme]
  );

  const colors = useMemo(() => (isDark ? darkColors : lightColors), [isDark]);

  return { isDark, colors, themeMode };
}
