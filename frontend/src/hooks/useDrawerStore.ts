import { create } from "zustand";

type DrawerStore = {
  notifDrawer: boolean;
  cartDrawer: boolean;
  sidebarDrawer: boolean;
  filterbarDrawer: boolean;
  open: (type: keyof Omit<DrawerStore, "open" | "close">) => void;
  close: (type: keyof Omit<DrawerStore, "open" | "close">) => void;
};

const useDrawerStore = create<DrawerStore>((set) => ({
  notifDrawer: false,
  cartDrawer: false,
  sidebarDrawer: false,
  filterbarDrawer: false,
  open: (type) => set({ [type]: true }),
  close: (type) => set({ [type]: false }),
}));

export default useDrawerStore;
