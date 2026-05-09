import React from "react";
import { Pressable, StyleSheet, Switch, Text, View } from "react-native";
import { useAppTheme } from "../hooks/useAppTheme";
import { useAuthStore } from "../store/authStore";
import { useSettingsStore } from "../store/settingsStore";

const THEME_OPTIONS = [
  { id: "system", label: "System" },
  { id: "light", label: "Light" },
  { id: "dark", label: "Dark" },
];

export default function SettingsScreen() {
  const { colors } = useAppTheme();
  const logout = useAuthStore((state) => state.logout);
  const notificationsEnabled = useSettingsStore((state) => state.notificationsEnabled);
  const locationPermissionEnabled = useSettingsStore(
    (state) => state.locationPermissionEnabled
  );
  const themeMode = useSettingsStore((state) => state.themeMode ?? "system");
  const setNotificationsEnabled = useSettingsStore(
    (state) => state.setNotificationsEnabled
  );
  const setLocationPermissionEnabled = useSettingsStore(
    (state) => state.setLocationPermissionEnabled
  );
  const setThemeMode = useSettingsStore((state) => state.setThemeMode);

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.sectionTitle, { color: colors.text }]}>Appearance</Text>
      {THEME_OPTIONS.map((opt) => {
        const selected = themeMode === opt.id;
        return (
          <Pressable
            key={opt.id}
            onPress={() => setThemeMode(opt.id)}
            style={[
              styles.themeRow,
              { backgroundColor: colors.surface, borderColor: colors.borderLight },
              selected && { borderColor: colors.primary, borderWidth: 2 },
            ]}
          >
            <Text style={[styles.themeLabel, { color: colors.text }]}>{opt.label}</Text>
            {selected ? (
              <Text style={{ color: colors.primary, fontWeight: "700" }}>✓</Text>
            ) : null}
          </Pressable>
        );
      })}

      <Text style={[styles.sectionTitle, { color: colors.text, marginTop: 20 }]}>
        Basic Settings
      </Text>
      <View
        style={[
          styles.row,
          { backgroundColor: colors.surface, borderColor: colors.borderLight },
        ]}
      >
        <Text style={{ color: colors.text }}>Notifications</Text>
        <Switch value={notificationsEnabled} onValueChange={setNotificationsEnabled} />
      </View>
      <View
        style={[
          styles.row,
          { backgroundColor: colors.surface, borderColor: colors.borderLight },
        ]}
      >
        <Text style={{ color: colors.text }}>Location Permission</Text>
        <Switch value={locationPermissionEnabled} onValueChange={setLocationPermissionEnabled} />
      </View>
      <Pressable style={styles.logoutBtn} onPress={logout}>
        <Text style={styles.logoutText}>Logout</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 14,
  },
  themeRow: {
    borderRadius: 10,
    paddingVertical: 14,
    paddingHorizontal: 14,
    marginBottom: 10,
    borderWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  themeLabel: {
    fontSize: 16,
  },
  row: {
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 12,
    marginBottom: 12,
    borderWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  logoutBtn: {
    marginTop: 20,
    backgroundColor: "#ef4444",
    borderRadius: 10,
    alignItems: "center",
    paddingVertical: 12,
  },
  logoutText: {
    color: "#fff",
    fontWeight: "700",
  },
});
