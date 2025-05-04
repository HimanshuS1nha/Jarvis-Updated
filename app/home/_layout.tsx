import { View, Text, Image, Pressable } from "react-native";
import React from "react";
import tw from "twrnc";
import { Stack } from "expo-router";
import { Feather } from "@expo/vector-icons";

import { useTheme } from "@/hooks/use-theme";

const HomeLayout = () => {
  const theme = useTheme((state) => state.theme);
  const toggleTheme = useTheme((state) => state.toggleTheme);
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: theme === "light" ? "#fff" : "#000" },
        headerTitle: () => {
          return (
            <View style={tw`flex-row justify-center items-center gap-x-2.5`}>
              <Image
                source={require("../../assets/images/logo.png")}
                style={tw`rounded-full size-9`}
              />
              <Text
                style={tw`text-lg font-bold ${
                  theme === "light" ? "text-black" : "text-white"
                }`}
              >
                Jarvis
              </Text>
            </View>
          );
        },
        headerLeft: () => {
          return (
            <Pressable>
              <Feather
                name="menu"
                size={24}
                color={theme === "light" ? "black" : "white"}
              />
            </Pressable>
          );
        },
        headerRight: () => {
          return (
            <View style={tw`flex-row items-center gap-x-3`}>
              <Pressable onPress={toggleTheme}>
                <Feather
                  name={theme === "light" ? "sun" : "moon"}
                  size={24}
                  color={theme === "light" ? "black" : "white"}
                />
              </Pressable>
              <Pressable>
                <Feather
                  name="plus-circle"
                  size={24}
                  color={theme === "light" ? "black" : "white"}
                />
              </Pressable>
            </View>
          );
        },
      }}
    />
  );
};

export default HomeLayout;
