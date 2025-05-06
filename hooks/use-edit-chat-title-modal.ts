import { create } from "zustand";

import type { ChatType } from "@/types";

type UseEditChatTitleModalType = {
  isVisible: boolean;
  setIsVisible: (isVisible: boolean) => void;
  chat: ChatType | null;
  setChat: (chat: ChatType | null) => void;
};

export const useEditChatTitleModal = create<UseEditChatTitleModalType>(
  (set) => ({
    isVisible: false,
    chat: null,
    setIsVisible: (isVisible) => set({ isVisible }),
    setChat: (chat) => set({ chat }),
  })
);
