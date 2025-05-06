import { View, Text, Modal, Pressable, Image, Alert } from "react-native";
import React, { useCallback } from "react";
import tw from "twrnc";
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign, MaterialIcons, FontAwesome } from "@expo/vector-icons";
import { FlashList } from "@shopify/flash-list";
import { useLiveQuery } from "drizzle-orm/expo-sqlite";
import { eq } from "drizzle-orm";
import { router } from "expo-router";

import { useChatsModal } from "@/hooks/use-chats-modal";
import { useTheme } from "@/hooks/use-theme";
import { useSelectedChat } from "@/hooks/use-selected-chat";

import { db } from "@/libs/db";

import { chatsTable } from "@/db/schema";

const ChatsModal = () => {
  const { isVisible, setIsVisible } = useChatsModal();

  const theme = useTheme((state) => state.theme);

  const selectedChat = useSelectedChat((state) => state.selectedChat);
  const setSelectedChat = useSelectedChat((state) => state.setSelectedChat);

  const { data: chats, error } = useLiveQuery(db.select().from(chatsTable));
  if (error) {
    Alert.alert("Error", "Error occured while fetching chats");
  }

  const handleDeleteChat = useCallback(async (id: number) => {
    await db.delete(chatsTable).where(eq(chatsTable.id, id));

    const chats = await db.select().from(chatsTable);
    if (chats.length === 0) {
      const [createdChat] = await db.insert(chatsTable).values({}).returning({
        id: chatsTable.id,
        title: chatsTable.title,
      });

      setSelectedChat(createdChat);

      router.replace("/home");
    } else {
      setSelectedChat(chats[0]);

      router.replace("/home");
    }
  }, []);
  return (
    <Modal
      transparent
      visible={isVisible}
      onRequestClose={() => setIsVisible(false)}
      animationType="fade"
      statusBarTranslucent
    >
      <SafeAreaView style={tw`flex-1`}>
        <View
          style={tw`flex-1 ${
            theme === "light" ? "bg-gray-100/80" : "bg-gray-900/80"
          }`}
        >
          <View
            style={tw`w-[300px] h-full gap-y-6 p-3 shadow ${
              theme === "light"
                ? "bg-white shadow-black"
                : "bg-black shadow-white"
            }`}
          >
            <View style={tw`flex-row justify-between items-center`}>
              <Pressable onPress={() => setIsVisible(false)}>
                <AntDesign
                  name="close"
                  size={26}
                  color={theme === "light" ? "black" : "white"}
                />
              </Pressable>

              <View style={tw`flex-row items-center gap-x-2.5`}>
                <Image
                  source={require("../assets/images/logo.png")}
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

              <View />
            </View>

            <FlashList
              data={chats}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => {
                return (
                  <Pressable
                    style={tw`flex-row justify-between mb-6 ${
                      selectedChat!.id === item.id
                        ? "bg-indigo-600"
                        : theme === "light"
                        ? "bg-gray-200"
                        : "bg-gray-800"
                    } p-3 rounded-lg`}
                  >
                    <Text
                      style={tw`font-medium ${
                        selectedChat!.id === item.id
                          ? "text-white"
                          : theme === "light"
                          ? "text-black"
                          : "text-white"
                      }`}
                    >
                      {item.title.length > 25
                        ? item.title.substring(0, 25) + "..."
                        : item.title}
                    </Text>

                    <View style={tw`flex-row gap-x-3 items-center`}>
                      <Pressable>
                        <MaterialIcons
                          name="edit"
                          size={20}
                          color={
                            selectedChat!.id === item.id
                              ? "white"
                              : theme === "light"
                              ? "black"
                              : "white"
                          }
                        />
                      </Pressable>
                      <Pressable onPress={() => handleDeleteChat(item.id)}>
                        <FontAwesome
                          name="trash"
                          size={20}
                          color={
                            selectedChat!.id === item.id
                              ? "white"
                              : theme === "light"
                              ? "black"
                              : "white"
                          }
                        />
                      </Pressable>
                    </View>
                  </Pressable>
                );
              }}
              estimatedItemSize={50}
              showsVerticalScrollIndicator={false}
            />
          </View>
        </View>
      </SafeAreaView>
    </Modal>
  );
};

export default ChatsModal;
