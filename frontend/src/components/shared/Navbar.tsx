"use client"

import { FC, Suspense } from "react";
import Link from "next/link";
import { Bell, HeartIcon, Settings } from "lucide-react";
import { UserDropdown } from "./UserDropDown";
import Image from "next/image";
import SearchInput from "./SearchInput";


const Navbar: FC = () => {
  return (
    <header className="w-full sticky top-0 flex flex-col gap-4 z-50 bg-white px-4 py-2 md:py-4 shadow">
      <div className="flex items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/icons/logo.svg"
            alt="logo"
            width={50}
            height={51.5}
            className="size-10 md:size-12"
          />
          <span className="text-xl md:text-2xl font-semibold">Mashinalar</span>
        </Link>
        <div className="max-w-2xl flex-1 hidden md:flex">
          <Suspense>
            <SearchInput />
          </Suspense>
        </div>
        <div className="flex items-center gap-10">
          <div className="hidden md:flex gap-6">
            <Link
              href="/profile/wishlists"
              className="size-12 grid place-items-center border border-slate-100 rounded-full"
            >
              <HeartIcon className="w-6 h-6 text-slate-500" />
            </Link>
            <Link
              href="/profile/notifications"
              data-has={true}
              className="size-12 grid place-items-center border border-slate-100 rounded-full relative transition cursor-pointer
              after:content-[''] after:size-3 after:absolute after:bg-red-500 after:rounded-full after:top-0 after:right-0
              data-[has=false]:after:opacity-0 data-[has=true]:after:animate-ping"
            >
              <Bell className="w-6 h-6 text-slate-500" />
            </Link>
            <Link
              href="/profile/settings"
              className="size-12 grid place-items-center border border-slate-100 rounded-full"
            >
              <Settings className="w-6 h-6 text-slate-500" />
            </Link>
          </div>
          <UserDropdown />
        </div>
      </div>
      <div className="md:hidden flex items-center justify-between">
        <Suspense>
          <SearchInput />
        </Suspense>      
        </div>
    </header>
  );
};

export default Navbar;
