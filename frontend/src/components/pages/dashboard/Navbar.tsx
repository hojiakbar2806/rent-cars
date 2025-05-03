"use client"

import { FC, Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import SearchInput from "@/components/shared/SearchInput";
import { UserDropdown } from "@/components/shared/UserDropDown";
import { MenuIcon } from "lucide-react";
import useDrawerStore from "@/hooks/useDrawerStore";


const Navbar: FC = () => {
    const { open } = useDrawerStore()
    return (
        <header className="w-full flex flex-col gap-2 z-50 bg-white shadow sticky top-0 p-4
            md:p-6">
            <div className="flex items-center justify-between gap-4">
                <button className="block md:hidden cursor-pointer"
                    onClick={() => open("dashboardSidebar")}>
                    <MenuIcon />
                </button>
                <Link href="/" className="hidden md:flex items-center gap-2">
                    <Image
                        src="/icons/logo.svg"
                        alt="logo"
                        width={50}
                        height={51.5}
                        className="size-12"
                    />
                    <span className="text-2xl font-semibold">Mashinalar</span>
                </Link>

                <UserDropdown />
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