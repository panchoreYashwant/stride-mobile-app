import React, { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { useAppTheme } from "../hooks/useAppTheme";
import { useAuthStore } from "../store/authStore";
import { validateLoginFields } from "../utils/validators";

export default function LoginScreen() {
  const { colors } = useAppTheme();
  const login = useAuthStore((state) => state.login);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [fieldErrors, setFieldErrors] = useState({});

  const updateField = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setFieldErrors((prev) => {
      if (!prev[key]) return prev;
      const next = { ...prev };
      delete next[key];
      return next;
    });
  };

  const onLogin = () => {
    const errors = validateLoginFields(form);
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }
    setFieldErrors({});
    login({ name: form.name, email: form.email, token: "local-demo-token" });
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.text }]}>Welcome to Stride</Text>
      <View style={styles.field}>
        <TextInput
          style={[
            styles.input,
            {
              backgroundColor: colors.surface,
              borderColor: fieldErrors.name ? colors.error : colors.border,
              color: colors.text,
            },
          ]}
          placeholder="Name"
          placeholderTextColor={colors.textMuted}
          value={form.name}
          onChangeText={(v) => updateField("name", v)}
          accessibilityLabel="Name"
        />
        {fieldErrors.name ? (
          <Text style={[styles.errorText, { color: colors.error }]}>{fieldErrors.name}</Text>
        ) : null}
      </View>
      <View style={styles.field}>
        <TextInput
          style={[
            styles.input,
            {
              backgroundColor: colors.surface,
              borderColor: fieldErrors.email ? colors.error : colors.border,
              color: colors.text,
            },
          ]}
          placeholder="Email"
          placeholderTextColor={colors.textMuted}
          keyboardType="email-address"
          autoCapitalize="none"
          value={form.email}
          onChangeText={(v) => updateField("email", v)}
          accessibilityLabel="Email"
        />
        {fieldErrors.email ? (
          <Text style={[styles.errorText, { color: colors.error }]}>{fieldErrors.email}</Text>
        ) : null}
      </View>
      <View style={styles.field}>
        <TextInput
          style={[
            styles.input,
            {
              backgroundColor: colors.surface,
              borderColor: fieldErrors.password ? colors.error : colors.border,
              color: colors.text,
            },
          ]}
          placeholder="Password"
          placeholderTextColor={colors.textMuted}
          secureTextEntry
          value={form.password}
          onChangeText={(v) => updateField("password", v)}
          accessibilityLabel="Password"
        />
        {fieldErrors.password ? (
          <Text style={[styles.errorText, { color: colors.error }]}>{fieldErrors.password}</Text>
        ) : null}
      </View>
      <Pressable
        style={[styles.button, { backgroundColor: colors.primary }]}
        onPress={onLogin}
      >
        <Text style={[styles.buttonText, { color: colors.onPrimary }]}>Login</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#f8fafc",
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 16,
  },
  field: {
    marginBottom: 4,
  },
  input: {
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 4,
  },
  errorText: {
    fontSize: 13,
    marginBottom: 8,
    marginLeft: 2,
  },
  button: {
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: "center",
    marginTop: 8,
  },
  buttonText: {
    fontWeight: "700",
  },
});
