import "react-native-gesture-handler";
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import AppNavigation from "./src/navigation/AppNavigation";
import { ErrorBoundary } from "./src/providers/ErrorBoundary";

export default function App() {
  return (
    <ErrorBoundary>
      <SafeAreaProvider>
        <AppNavigation />
      </SafeAreaProvider>
    </ErrorBoundary>
  );
}
