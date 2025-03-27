"use client";

import useDrawerStore from "@/hooks/useDrawerStore";
import { Bell } from "lucide-react";
import React from "react";

const NotifButton = () => {
  const { open } = useDrawerStore();
  return (
    <button
      data-has={true}
      className="size-12 grid place-items-center border border-slate-100 rounded-full relative transition cursor-pointer
      after:content-[''] after:size-3 after:absolute after:bg-red-500 after:rounded-full after:top-0 after:right-0
      data-[has=false]:after:opacity-0"
      onClick={() => open("notifDrawer")}
    >
      <Bell className="w-6 h-6 text-slate-500" />
    </button>
  );
};

export default NotifButton;
