import { CarItem } from "@/types/cars";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface WishlistStore {
  wishlist: CarItem[] | null;
  add: (car: CarItem) => void;
  remove: (id: number) => void;
}

export const useWishlistStore = create<WishlistStore>()(
  persist(
    (set, get) => ({
      wishlist: null,
      add: () => set({}),
      remove: (id) =>
        set(() => {
          const wishlist = get().wishlist;
          const existing = wishlist?.some((item) => item.id === id);
          if (existing) {
            const updated = wishlist?.filter((item) => item.id !== id);
            return { wishlist: updated };
          }
          return { wishlist };
        }),
    }),
    { name: "wishlist" }
  )
);
