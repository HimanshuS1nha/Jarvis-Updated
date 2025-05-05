import {
  Text,
  View,
  Image,
  ActivityIndicator,
  useColorScheme,
  Alert,
} from "react-native";
import React, { useEffect } from "react";
import tw from "twrnc";
import * as SplashScreen from "expo-splash-screen";
import { router } from "expo-router";
import { useMigrations } from "drizzle-orm/expo-sqlite/migrator";

import ThemedView from "@/components/themed-view";

import { useTheme } from "@/hooks/use-theme";
import { useSelectedChat } from "@/hooks/use-selected-chat";

import { db } from "@/libs/db";

import { chatsTable } from "@/db/schema";

import migrations from "../drizzle/migrations";

SplashScreen.hideAsync();

export default function Index() {
  const colorScheme = useColorScheme();

  const theme = useTheme((state) => state.theme);
  const setTheme = useTheme((state) => state.setTheme);

  const selectedChat = useSelectedChat((state) => state.selectedChat);
  const setSelectedChat = useSelectedChat((state) => state.setSelectedChat);

  const { success, error } = useMigrations(db, migrations);

  useEffect(() => {
    let timeout: number;

    if (success) {
      if (!theme) {
        setTheme(colorScheme as "light" | "dark");
      }

      db.select()
        .from(chatsTable)
        .then((chats) => {
          if (chats.length === 0) {
            db.insert(chatsTable)
              .values({})
              .returning({ id: chatsTable.id, title: chatsTable.title })
              .then(([createdChat]) => {
                setSelectedChat(createdChat);
                timeout = setTimeout(() => router.replace("/home"), 400);
              })
              .catch(() =>
                Alert.alert(
                  "Error",
                  "Some error occured. Please try again later!"
                )
              );
          } else {
            if (!selectedChat) {
              setSelectedChat(chats[0]);
            }
            timeout = setTimeout(() => router.replace("/home"), 400);
          }
        })
        .catch(() =>
          Alert.alert("Error", "Some error occured. Please try again later!")
        );
    }

    return () => {
      clearTimeout(timeout);
    };
  }, [success, error]);

  if (error) {
    return (
      <ThemedView>
        <View style={tw`flex-1 justify-center items-center`}>
          <Text style={tw`font-medium text-red-500`}>
            Error in migrating database
          </Text>
        </View>
      </ThemedView>
    );
  }
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
