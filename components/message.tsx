import { View, Image } from "react-native";
import React from "react";
import tw from "twrnc";
import Markdown from "react-native-markdown-display";

import { useTheme } from "@/hooks/use-theme";

import type { MessageType } from "@/types";

const Message = ({ message }: { message: MessageType }) => {
  const theme = useTheme((state) => state.theme);
  return (
    <View
      style={tw`flex-row w-full px-2 ${
        message.by === "user" ? "justify-end" : "justify-start"
      } mb-3`}
    >
      <View
        style={tw`px-3 py-1.5 max-w-[80%] min-w-[45%] rounded-xl rounded-br-none ${
          message.by === "user"
            ? theme === "light"
              ? "bg-gray-200"
              : "bg-gray-800"
            : "flex-row gap-x-3"
        } gap-y-2.5`}
      >
        {message.by === "model" ? (
          <Image
            source={require("../assets/images/logo.png")}
            style={tw`size-5.5 rounded-full mt-2.5`}
          />
        ) : (
          message.image && (
            <Image
              source={{ uri: message.image }}
              style={tw`w-64 h-48 rounded-lg`}
              resizeMode="stretch"
            />
          )
        )}
        <Markdown
          style={
            theme === "light"
              ? {}
              : {
                  paragraph: { color: "#fff" },
                  heading1: { color: "#fff" },
                  heading2: { color: "#fff" },
                  heading3: { color: "#fff" },
                  heading4: { color: "#fff" },
                  heading5: { color: "#fff" },
                  heading6: { color: "#fff" },
                  list_item: { color: "#fff" },
                  blockquote: {
                    backgroundColor: "#000",
                    color: "#fff",
                    borderRadius: 10,
                  },
                  code_inline: {
                    backgroundColor: "#000",
                    color: "#fff",
                    borderRadius: 10,
                  },
                  code_block: {
                    backgroundColor: "#000",
                    color: "#fff",
                    borderRadius: 10,
                  },
                  fence: {
                    backgroundColor: "#000",
                    color: "#fff",
                    borderRadius: 10,
                  },
                  table: {
                    borderColor: "#fff",
                    color: "#fff",
                  },
                  tr: {
                    borderColor: "#fff",
                  },
                }
          }
        >
          {message.content}
        </Markdown>
      </View>
    </View>
  );
};

export default Message;
