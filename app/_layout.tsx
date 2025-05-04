import { Stack } from "expo-router";

import { useTheme } from "@/hooks/use-theme";

export default function RootLayout() {
  const theme = useTheme((state) => state.theme);
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        statusBarStyle: theme === "light" ? "dark" : "light",
        statusBarBackgroundColor: theme === "light" ? "#fff" : "#000",
      }}
    />
  );
}
