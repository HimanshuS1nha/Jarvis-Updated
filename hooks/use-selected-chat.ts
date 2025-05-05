import { create } from "zustand";
import * as SecureStore from "expo-secure-store";

import type { ChatType } from "@/types";

type UseSelectedChatType = {
  selectedChat: ChatType | null;
  setSelectedChat: (selectedChat: ChatType | null) => void;
};

export const useSelectedChat = create<UseSelectedChatType>((set) => ({
  selectedChat: SecureStore.getItem("selected-chat")
    ? JSON.parse(SecureStore.getItem("selected-chat")!)
    : null,
  setSelectedChat: (selectedChat) => {
    SecureStore.setItem("selected-chat", JSON.stringify(selectedChat));
    set({ selectedChat });
  },
}));
