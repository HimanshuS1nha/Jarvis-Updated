import { create } from "zustand";

type UseChatsModalType = {
  isVisible: boolean;
  setIsVisible: (isVisible: boolean) => void;
};

export const useChatsModal = create<UseChatsModalType>((set) => ({
  isVisible: false,
  setIsVisible: (isVisible) => set({ isVisible }),
}));
