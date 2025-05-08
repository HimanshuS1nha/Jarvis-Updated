import { View, Text, Modal, Pressable, TextInput } from "react-native";
import React, { useCallback, useState } from "react";
import tw from "twrnc";
import { AntDesign } from "@expo/vector-icons";
import { useMutation } from "@tanstack/react-query";

import { useAddLinkModal } from "@/hooks/use-add-link-modal";
import { useTheme } from "@/hooks/use-theme";
import { useLinks } from "@/hooks/use-links";

const AddLinkModal = () => {
  const { isVisible, setIsVisible } = useAddLinkModal();

  const theme = useTheme((state) => state.theme);

  const links = useLinks((state) => state.links);
  const addToLinks = useLinks((state) => state.addToLinks);

  const [link, setLink] = useState("");

  const handleChangeLink = useCallback((value: string) => setLink(value), []);

  const { mutate: handleAddLink, isPending } = useMutation({
    mutationKey: ["add-link"],
    mutationFn: async () => {
      if (link.trim().length === 0 || links.length >= 3) {
        return;
      }

      addToLinks(link);
    },
    onSuccess: () => {
      setLink("");
      setIsVisible(false);
    },
  });
  return (
    <Modal
      transparent
      visible={isVisible}
      onRequestClose={() => setIsVisible(false)}
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
          <Pressable
            style={tw`absolute top-2 right-2`}
            onPress={() => setIsVisible(false)}
          >
            <AntDesign
              name="close"
              size={24}
              color={theme === "light" ? "black" : "white"}
            />
          </Pressable>

          <View style={tw`flex-row items-center mt-4`}>
            <Text
              style={tw`text-xl font-bold ${
                theme === "light" ? "text-black" : "text-white"
              }`}
            >
              Add Link
            </Text>
            <Text style={tw`text-red-500 text-xs font-medium`}>
              {"   "}(3 max)
            </Text>
          </View>

          <TextInput
            style={tw`w-full ${
              theme === "light"
                ? "bg-gray-200 text-black"
                : "bg-gray-800 text-white"
            } py-4 px-3 rounded-lg`}
            placeholder="Enter new title"
            placeholderTextColor={theme === "light" ? "#6b7280" : "#9ca3af"}
            value={link}
            onChangeText={handleChangeLink}
            autoFocus
          />

          <Pressable
            style={tw`${
              link.trim().length === 0 || isPending
                ? "bg-indigo-400"
                : "bg-indigo-600"
            } p-3 items-center justify-center w-full rounded-lg`}
            onPress={() => handleAddLink()}
            disabled={
              links.length >= 3 || link.trim().length === 0 || isPending
            }
          >
            <Text style={tw`text-white text-base font-medium`}>
              {isPending ? "Please wait..." : "Add"}
            </Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

export default AddLinkModal;
