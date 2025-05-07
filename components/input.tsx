import { View, TextInput, Pressable, Image, Text } from "react-native";
import React, { useCallback } from "react";
import tw from "twrnc";
import { Ionicons, FontAwesome, AntDesign } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";

import { useTheme } from "@/hooks/use-theme";

import type { ImageType } from "@/types";

const Input = ({
  value,
  onChangeText,
  disabled,
  onSend,
  selectedImage,
  setSelectedImage,
}: {
  value: string;
  onChangeText: (text: string) => void;
  disabled?: boolean;
  onSend: () => void;
  selectedImage: ImageType | null;
  setSelectedImage: React.Dispatch<React.SetStateAction<ImageType | null>>;
}) => {
  const theme = useTheme((state) => state.theme);

  const handlePickImage = useCallback(async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      mediaTypes: "images",
      base64: true,
    });
    if (result.canceled) {
      return;
    }

    setSelectedImage({
      base64: result.assets[0].base64 ?? "",
      filename: result.assets[0].fileName ?? "",
      uri: result.assets[0].uri,
    });
  }, []);
  return (
    <View
      style={tw`p-2.5 rounded-t-3xl gap-y-4 ${
        theme === "light" ? "bg-gray-200" : "bg-gray-800"
      }`}
    >
      {selectedImage && (
        <View style={tw`flex-row gap-x-3 items-center`}>
          <Image
            source={{ uri: `data:image/png;base64,${selectedImage.base64}` }}
            style={tw`size-8.5 rounded-lg`}
          />
          <Text
            style={tw`${
              theme === "light" ? "text-black" : "text-white"
            } flex-1`}
          >
            {selectedImage.filename
              ? selectedImage.filename.length > 40
                ? selectedImage.filename.substring(0, 40) + "..."
                : selectedImage.filename
              : "No filename"}
          </Text>
          <Pressable onPress={() => setSelectedImage(null)}>
            <AntDesign
              name="close"
              size={18}
              color={theme === "light" ? "black" : "white"}
            />
          </Pressable>
        </View>
      )}

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
          <Pressable onPress={handlePickImage} disabled={!!selectedImage}>
            <Ionicons
              name="image-outline"
              color={
                !selectedImage
                  ? theme === "light"
                    ? "black"
                    : "white"
                  : "gray"
              }
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
