import {
  Text,
  View,
  Image,
  ActivityIndicator,
  useColorScheme,
} from "react-native";
import React, { useEffect } from "react";
import tw from "twrnc";
import * as SplashScreen from "expo-splash-screen";
import { router } from "expo-router";

import ThemedView from "@/components/themed-view";

import { useTheme } from "@/hooks/use-theme";

SplashScreen.hideAsync();

export default function Index() {
  const colorScheme = useColorScheme();

  const theme = useTheme((state) => state.theme);
  const setTheme = useTheme((state) => state.setTheme);

  useEffect(() => {
    if (!theme) {
      setTheme(colorScheme as "light" | "dark");
    }

    const timeout = setTimeout(() => {
      router.replace("/home");
    }, 400);

    return () => {
      clearTimeout(timeout);
    };
  }, []);
  return (
    <ThemedView>
      <View style={tw`flex-1 items-center justify-center gap-y-6`}>
        <Image
          source={require("../assets/images/logo.png")}
          style={tw`size-32 rounded-full`}
        />

        <View style={tw`gap-y-1 items-center`}>
          <Text
            style={tw`text-5xl font-bold ${
              theme === "light" ? "text-black" : "text-white"
            }`}
          >
            Jarvis
          </Text>
          <Text
            style={tw`${
              theme === "light" ? "text-gray-700" : "text-gray-300"
            } font-medium`}
          >
            Your personal AI assistant
          </Text>
        </View>

        <ActivityIndicator color={"blue"} size={40} />
      </View>
    </ThemedView>
  );
}
