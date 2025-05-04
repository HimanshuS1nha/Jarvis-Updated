import { View, TextInput, Pressable } from "react-native";
import React from "react";
import tw from "twrnc";
import { Ionicons, FontAwesome } from "@expo/vector-icons";

import { useTheme } from "@/hooks/use-theme";

const Input = ({
  value,
  onChangeText,
  disabled,
  onSend,
}: {
  value: string;
  onChangeText: (text: string) => void;
  disabled?: boolean;
  onSend: () => void;
}) => {
  const theme = useTheme((state) => state.theme);
  return (
    <View
      style={tw`p-2 px-3 rounded-t-3xl gap-y-4 ${
        theme === "light" ? "bg-gray-200" : "bg-gray-800"
      }`}
    >
      <TextInput
        placeholder="Type your message"
        multiline
        placeholderTextColor={theme === "light" ? "#6b7280" : "#9ca3af"}
        style={tw`${theme === "light" ? "text-black" : "text-white"}`}
        value={value}
        onChangeText={onChangeText}
        editable={!disabled}
      />

      <View style={tw`flex-row justify-between items-center`}>
        <View style={tw`flex-row gap-x-4 items-center`}>
          <Pressable>
            <Ionicons
              name="attach-sharp"
              color={theme === "light" ? "black" : "white"}
              size={26}
            />
          </Pressable>
          <Pressable>
            <Ionicons
              name="image-outline"
              color={theme === "light" ? "black" : "white"}
              size={26}
            />
          </Pressable>
        </View>
        <Pressable
          style={tw`${
            value.trim().length === 0 || disabled
              ? "bg-indigo-400"
              : "bg-indigo-600"
          } p-1.5 rounded-full`}
          onPress={onSend}
          disabled={disabled}
        >
          <FontAwesome name="send" color={"white"} size={24} />
        </Pressable>
      </View>
    </View>
  );
};

export default Input;
