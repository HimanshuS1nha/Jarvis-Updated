import { View, Text, Image, Alert } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import tw from "twrnc";
import { FlashList } from "@shopify/flash-list";
import LoadingDots from "react-native-loading-dots";
import { useLiveQuery } from "drizzle-orm/expo-sqlite";
import { eq } from "drizzle-orm";

import ThemedView from "@/components/themed-view";
import Input from "@/components/input";
import Message from "@/components/message";

import { useTheme } from "@/hooks/use-theme";
import { useSelectedChat } from "@/hooks/use-selected-chat";

import { db } from "@/libs/db";

import { messagesTable } from "@/db/schema";

import type { MessageType } from "@/types";

const Home = () => {
  const theme = useTheme((state) => state.theme);

  const selectedChat = useSelectedChat((state) => state.selectedChat);

  const [messages, setMessages] = useState<MessageType[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { data, error } = useLiveQuery(
    db
      .select({
        id: messagesTable.id,
        by: messagesTable.by,
        content: messagesTable.content,
      })
      .from(messagesTable)
      .where(eq(messagesTable.chatId, selectedChat!.id))
  );
  if (error) {
    Alert.alert("Error", "Error occured while fetching messages");
  }

  const handleChangeInput = useCallback((value: string) => setInput(value), []);

  useEffect(() => {
    if (data) {
      setMessages(data);
    }
  }, [data]);
  return (
    <ThemedView>
      <View style={tw`flex-1 pt-3 gap-y-3`}>
        {messages.length > 0 ? (
          <FlashList
            data={messages}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => {
              return <Message message={item} />;
            }}
            estimatedItemSize={100}
            showsVerticalScrollIndicator={false}
            ListFooterComponent={() => {
              return (
                <View style={tw`w-[35%] px-5 pb-4 pt-2`}>
                  {isLoading && <LoadingDots bounceHeight={8} />}
                </View>
              );
            }}
          />
        ) : (
          <View style={tw`flex-1 justify-center items-center gap-y-6`}>
            <Image
              source={require("../../assets/images/logo.png")}
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
          </View>
        )}

        <Input
          value={input}
          onChangeText={handleChangeInput}
          onSend={() => {}}
        />
      </View>
    </ThemedView>
  );
};

export default Home;
