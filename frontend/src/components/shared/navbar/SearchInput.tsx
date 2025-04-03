"use client";

import { ChangeEvent, useEffect, useState } from "react";
import { SearchIcon, Settings2 } from "lucide-react";
import { useDebounce } from "@/hooks/useDebounce";
import { useQueryState } from "@/hooks/useQueryState";
import nProgress from "nprogress";
import Link from "next/link";
import useDrawerStore from "@/hooks/useDrawerStore";

const SearchInput = () => {
  const [search, setSearch] = useQueryState("q", false, "/cars");
  const [current, setCurrent] = useState(search);
  const { open } = useDrawerStore();

  const debouncedSearch = useDebounce(current, 500);

  useEffect(() => {
    if (debouncedSearch !== search) {
      nProgress.start();
      setSearch(debouncedSearch);
    }
  }, [debouncedSearch]);

  return (
    <label
      htmlFor="search"
      className="w-full h-12 flex items-center justify-between gap-4
      md:rounded-full md:border md:p-2"
    >
      <label className="flex flex-1 border rounded-lg md:border-none">
        <i className="p-2">
          <SearchIcon className="text-slate-500 size-5 md:size-6" />
        </i>
        <input
          id="search"
          placeholder="Qidiruv..."
          defaultValue={search}
          className="flex-1 outline-none bg-none"
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setCurrent(e.target.value)
          }
        />
      </label>
      <Link
        href="/cars"
        className="hidden md:flex cursor-pointer p-2 rounded-lg border 
        md:border-none md:hover:bg-slate-50 md:rounded-full"
      >
        <Settings2 className="text-slate-500 size-5 md:size-6" />
      </Link>
      <button
        className="flex md:hidden cursor-pointer p-2 rounded-lg border 
        md:border-none md:hover:bg-slate-50 md:rounded-full"
        onClick={() => open("filterbarDrawer")}
      >
        <Settings2 className="text-slate-500 size-5 md:size-6" />
      </button>
    </label>
  );
};

export default SearchInput;
