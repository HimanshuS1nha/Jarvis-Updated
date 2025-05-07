import { View, Text, Image, Pressable } from "react-native";
import React, { useCallback } from "react";
import tw from "twrnc";
import { Stack } from "expo-router";
import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";

import ChatsModal from "@/components/chats-modal";
import EditChatTitleModal from "@/components/edit-chat-title-modal";

import { useTheme } from "@/hooks/use-theme";
import { useChatsModal } from "@/hooks/use-chats-modal";
import { useSelectedChat } from "@/hooks/use-selected-chat";

import { db } from "@/libs/db";

import { chatsTable } from "@/db/schema";

const HomeLayout = () => {
  const theme = useTheme((state) => state.theme);
  const toggleTheme = useTheme((state) => state.toggleTheme);

  const setIsChatsModalVisible = useChatsModal((state) => state.setIsVisible);

  const setSelectedChat = useSelectedChat((state) => state.setSelectedChat);

  const handleCreateChat = useCallback(async () => {
    const [createdChat] = await db.insert(chatsTable).values({}).returning({
      id: chatsTable.id,
      title: chatsTable.title,
      isTitleGenerated: chatsTable.isTitleGenerated,
    });

    setSelectedChat(createdChat);

    router.push("/home");
  }, []);
  return (
    <>
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
              <Pressable onPress={() => setIsChatsModalVisible(true)}>
                <Feather
                  name="menu"
                  size={22}
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
                    size={22}
                    color={theme === "light" ? "black" : "white"}
                  />
                </Pressable>
                <Pressable onPress={handleCreateChat}>
                  <Feather
                    name="plus-circle"
                    size={22}
                    color={theme === "light" ? "black" : "white"}
                  />
                </Pressable>
              </View>
            );
          },
        }}
      />

      <ChatsModal />

      <EditChatTitleModal />
    </>
  );
};

export default HomeLayout;
