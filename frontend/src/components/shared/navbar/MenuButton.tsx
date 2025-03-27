"use client";

import useDrawerStore from "@/hooks/useDrawerStore";
import { MenuIcon } from "lucide-react";

const MenuButton = () => {
  const { open } = useDrawerStore();
  return (
    <button
      className="flex md:hidden cursor-pointer"
      onClick={() => open("sidebarDrawer")}
    >
      <MenuIcon />
    </button>
  );
};

export default MenuButton;
