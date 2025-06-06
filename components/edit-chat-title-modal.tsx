import { View, Text, Modal, Pressable, TextInput, Alert } from "react-native";
import React, { useState, useCallback, useEffect } from "react";
import tw from "twrnc";
import { AntDesign } from "@expo/vector-icons";
import { useMutation } from "@tanstack/react-query";
import { eq } from "drizzle-orm";

import { useEditChatTitleModal } from "@/hooks/use-edit-chat-title-modal";
import { useTheme } from "@/hooks/use-theme";

import { db } from "@/libs/db";

import { chatsTable } from "@/db/schema";

const EditChatTitleModal = () => {
  const { chat, isVisible, setChat, setIsVisible } = useEditChatTitleModal();

  const theme = useTheme((state) => state.theme);

  const [title, setTitle] = useState("");

  const handleChangeTitle = useCallback((value: string) => setTitle(value), []);

  const handleClose = useCallback(() => {
    setIsVisible(false);
    setChat(null);
  }, []);

  const { mutate: handleEditChatTitle, isPending } = useMutation({
    mutationKey: ["edit-chat-title"],
    mutationFn: async () => {
      if (title.trim().length === 0) {
        throw new Error("Please enter a title");
      }

      await db
        .update(chatsTable)
        .set({ title, isTitleGenerated: 1 })
        .where(eq(chatsTable.id, chat!.id));
    },
    onSuccess: () => {
      handleClose();
    },
    onError: (error) => {
      Alert.alert("Error", error.message);
    },
  });

  useEffect(() => {
    if (chat) {
      setTitle(chat.title);
    }
  }, [chat?.title]);
  return (
    <Modal
      transparent
      visible={isVisible}
      onRequestClose={handleClose}
      animationType="fade"
    >
      <View
        style={tw`flex-1 justify-center items-center ${
          theme === "light" ? "bg-gray-100/80" : "bg-gray-900/80"
        }`}
      >
        <View
          style={tw`${
            theme === "light" ? "bg-white" : "bg-black"
          } w-[80%] p-4 items-center gap-y-6 rounded-lg`}
        >
          <Pressable style={tw`absolute top-2 right-2`} onPress={handleClose}>
            <AntDesign
              name="close"
              size={24}
              color={theme === "light" ? "black" : "white"}
            />
          </Pressable>

          <Text
            style={tw`text-xl font-bold mt-4 ${
              theme === "light" ? "text-black" : "text-white"
            }`}
          >
            Edit Chat Title
          </Text>

          <TextInput
            style={tw`w-full ${
              theme === "light"
                ? "bg-gray-200 text-black"
                : "bg-gray-800 text-white"
            } py-4 px-3 rounded-lg`}
            placeholder="Enter new title"
            placeholderTextColor={theme === "light" ? "#6b7280" : "#9ca3af"}
            value={title}
            onChangeText={handleChangeTitle}
            autoFocus
          />

          <Pressable
            style={tw`${
              isPending || title.trim().length === 0
                ? "bg-indigo-400"
                : "bg-indigo-600"
            } p-3 items-center justify-center w-full rounded-lg`}
            onPress={() => handleEditChatTitle()}
            disabled={isPending || title.trim().length === 0}
          >
            <Text style={tw`text-white text-base font-medium`}>
              {isPending ? "Please wait..." : "Edit"}
            </Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

export default EditChatTitleModal;
