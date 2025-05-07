import { create } from "zustand";

type UseLinksType = {
  links: string[];
  addToLinks: (link: string) => void;
  removeFromLinks: (link: string) => void;
};

export const useLinks = create<UseLinksType>((set) => ({
  links: [],
  addToLinks: (link) => {
    set((prev) => {
      const newLinks = [...prev.links.filter((item) => item !== link), link];
      return { links: newLinks };
    });
  },
  removeFromLinks: (link) => {
    set((prev) => {
      const newLinks = prev.links.filter((item) => item !== link);
      return { links: newLinks };
    });
  },
}));
