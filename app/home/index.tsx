import { View, Text } from "react-native";
import React, { useCallback, useState } from "react";
import tw from "twrnc";
import { FlashList } from "@shopify/flash-list";
import LoadingDots from "react-native-loading-dots";

import ThemedView from "@/components/themed-view";
import Input from "@/components/input";
import Message from "@/components/message";

import type { MessageType } from "@/types";

const Home = () => {
  const [messages, setMessages] = useState<MessageType[]>([
    {
      id: 1,
      by: "user",
      content: "Hi",
    },
    {
      id: 2,
      by: "model",
      content: "Hello",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setisLoading] = useState(false);

  const handleChangeInput = useCallback((value: string) => setInput(value), []);
  return (
    <ThemedView>
      <View style={tw`flex-1 pt-3 gap-y-3`}>
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
