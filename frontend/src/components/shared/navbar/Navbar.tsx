import Image from "next/image";
import Link from "next/link";
import React, { FC } from "react";

const Navbar: FC = () => {
  return (
    <div className="sticky top-0 z-50 bg-white flex flex-1 justify-between px-10 py-4 border-b border-gray-200">
      <div className="flex items-center gap-16">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/icons/logo.svg"
            width={40}
            height={40}
            alt="logo"
            className="size-10"
          />
          <span className="text-2xl font-bold">Mashinalar</span>
        </Link>

        <label
          htmlFor="search"
          className="h-11 flex items-center justify-between gap-4 rounded-full border border-gray-200 px-4 py-2"
        >
          <Image
            src="/icons/search.svg"
            width={20}
            height={20}
            alt="search"
            className="size-5"
          />
          <input
            type="search"
            className="flex-1 outline-none bg-none"
            placeholder="Search"
          />
          <button>
            <Image
              src="/icons/filter.svg"
              width={20}
              height={20}
              alt="filter"
              className="size-5"
            />
          </button>
        </label>
      </div>

      <div className="flex items-center justify-between gap-4">
        <button className="p-3 border border-gray-200 rounded-full">
          <Image
            src="/icons/heart-gray.svg"
            width={20}
            height={20}
            alt="filter"
            className="size-5"
          />
        </button>

        <button
          className="p-3 border border-gray-200 rounded-full relative
          after:content-[''] after:w-3 after:h-3 after:bg-red-500 
          after:absolute after:top-0 after:right-0 after:rounded-full"
        >
          <Image
            src="/icons/notification-gray.svg"
            width={20}
            height={20}
            alt="filter"
            className="size-auto"
          />
        </button>
        <button className="p-3 border border-gray-200 rounded-full">
          <Image
            src="/icons/setting-gray.svg"
            width={20}
            height={20}
            alt="filter"
            className="size-5"
          />
        </button>

        <Image
          src="/icons/profile.png"
          width={40}
          height={20}
          alt="filter"
          className="size-11 rounded-full"
        />
      </div>
    </div>
  );
};

export default Navbar;
