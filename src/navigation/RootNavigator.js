import React, { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { useAppTheme } from "../hooks/useAppTheme";
import AuthStack from "./AuthStack";
import MainTabs from "./MainTabs";
import { useAuthStore } from "../store/authStore";

export default function RootNavigator() {
  const { colors } = useAppTheme();
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const [hasHydrated, setHasHydrated] = useState(
    useAuthStore.persist?.hasHydrated?.() ?? true
  );

  useEffect(() => {
    const unsubscribe = useAuthStore.persist?.onFinishHydration?.(() =>
      setHasHydrated(true)
    );
    return unsubscribe;
  }, []);

  if (!hasHydrated) {
    return (
      <View style={[styles.loaderContainer, { backgroundColor: colors.background }]}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return isLoggedIn ? <MainTabs /> : <AuthStack />;
}

const styles = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
