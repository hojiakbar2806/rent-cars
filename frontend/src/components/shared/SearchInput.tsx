"use client";

import useDrawerStore from "@/hooks/useDrawerStore";
import { useQueryState } from "@/hooks/useQueryState";
import { SearchIcon, Settings2, X } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import nProgress from "nprogress";
import { ChangeEvent } from "react";

const SearchInput = () => {
  const [search, setSearch, clear] = useQueryState("query", false, "/cars");
  const { open } = useDrawerStore();
  const pathname = usePathname();
  const router = useRouter();

  const handleClick = () => {
    if (!pathname.includes("cars")) {
      router.push("/cars");
    }
    open("filterbar");
  };

  const handleSubmit = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (e.target.search.value !== "") {
      nProgress.start();
      setSearch(e.target.search.value);
    }
    else {
      nProgress.start();
      clear();
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full h-12 flex items-center justify-between gap-4
      md:rounded-full md:border md:p-2"
    >
      <label htmlFor="search" className="flex flex-1 border rounded-lg md:border-none items-center">
        <i className="p-2">
          <SearchIcon className="text-slate-500 size-5 md:size-6" />
        </i>
        <input
          id="search"
          name="search"
          placeholder="Qidiruv..."
          defaultValue={search}
          className="flex-1 outline-none bg-none"
        />
        {search && (
          <i className="p-2 cursor-pointer" onClick={clear}>
            <X className="text-slate-500 size-5 md:size-6" />
          </i>
        )}
      </label>
      <Link
        href="/cars"
        className="hidden md:flex cursor-pointer p-2 rounded-lg border 
        md:border-none md:hover:bg-slate-50 md:rounded-full"
      >
        <Settings2 className="text-slate-500 size-5 md:size-6" />
      </Link>
      <button
        type="button"
        className="flex md:hidden cursor-pointer p-2 rounded-lg border 
        md:border-none md:hover:bg-slate-50 md:rounded-full"
        onClick={handleClick}
      >
        <Settings2 className="text-slate-500 size-5 md:size-6" />
      </button>
    </form>
  );
};

export default SearchInput;
