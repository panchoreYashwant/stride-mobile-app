import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useAppTheme } from "../hooks/useAppTheme";
import { useAuthStore } from "../store/authStore";

export default function ProfileScreen() {
  const { colors } = useAppTheme();
  const user = useAuthStore((state) => state.user);
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.text }]}>Profile</Text>
      <View
        style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.borderLight }]}
      >
        <Text style={[styles.label, { color: colors.textMuted }]}>Name</Text>
        <Text style={[styles.value, { color: colors.text }]}>{user?.name || "-"}</Text>
        <Text style={[styles.label, { color: colors.textMuted }]}>Email</Text>
        <Text style={[styles.value, { color: colors.text }]}>{user?.email || "-"}</Text>
        <Text style={[styles.label, { color: colors.textMuted }]}>Status</Text>
        <Text style={[styles.value, { color: colors.text }]}>
          {isLoggedIn ? "Logged In" : "Logged Out"}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 14,
  },
  card: {
    borderRadius: 12,
    borderWidth: 1,
    padding: 14,
  },
  label: {
    marginTop: 8,
  },
  value: {
    fontWeight: "600",
  },
});
