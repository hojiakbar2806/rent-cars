"use client";

import React from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import useDrawerStore from "@/hooks/useDrawerStore";
import { Bell, Heart, Settings } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const SidebarDrawer = () => {
  const { sidebar, close } = useDrawerStore();

  return (
    <Sheet
      open={sidebar}
      onOpenChange={(open) => (open ? open : close("sidebar"))}
    >
      <SheetContent side="left">
        <SheetHeader>
          <SheetTitle asChild className="flex items-center gap-2 py-2">
            <Link href="/">
              <Image
                src="/icons/logo.svg"
                alt="logo"
                width={50}
                height={51.5}
                className="size-12"
              />
              <span className="text-2xl font-semibold">Mashinalar</span>
            </Link>
          </SheetTitle>
        </SheetHeader>
        <div className=" space-y-3">
          <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-100 cursor-pointer">
            <Heart className="w-6 h-6 text-slate-500" />
            <span className="text-lg font-medium">Sevimlilar</span>
          </div>

          <div className="flex items-center justify-between space-x-3 p-3 rounded-lg hover:bg-gray-100 cursor-pointer relative">
            <div className="flex gap-3">
              <Bell className="w-6 h-6 text-slate-500" />
              <span className="text-lg font-medium">Bildirishnomalar</span>
            </div>
            <span className=" w-3 h-3 bg-red-500 rounded-full"></span>
          </div>

          <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-100 cursor-pointer">
            <Settings className="w-6 h-6 text-slate-500" />
            <span className="text-lg font-medium">Sozlamalar</span>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default SidebarDrawer;
