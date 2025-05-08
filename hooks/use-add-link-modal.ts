import { create } from "zustand";

type UseAddLinkModalType = {
  isVisible: boolean;
  setIsVisible: (isVisible: boolean) => void;
};

export const useAddLinkModal = create<UseAddLinkModalType>((set) => ({
  isVisible: false,
  setIsVisible: (isVisible) => set({ isVisible }),
}));
