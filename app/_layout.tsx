import { Stack } from "expo-router";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

import { useTheme } from "@/hooks/use-theme";

const queryClient = new QueryClient();

export default function RootLayout() {
  const theme = useTheme((state) => state.theme);
  return (
    <QueryClientProvider client={queryClient}>
      <Stack
        screenOptions={{
          headerShown: false,
          statusBarStyle: theme === "light" ? "dark" : "light",
          statusBarBackgroundColor: theme === "light" ? "#fff" : "#000",
        }}
      />
    </QueryClientProvider>
  );
}
