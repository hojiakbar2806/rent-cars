import { FC, Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import SearchInput from "@/components/shared/SearchInput";
import { UserDropdown } from "@/components/shared/UserDropDown";


const Navbar: FC = () => {
    return (
        <header className="w-full flex flex-col gap-4 z-50 bg-white p-6 shadow sticky top-0">
            <div className="flex items-center justify-between gap-4">
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