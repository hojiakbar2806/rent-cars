import { FC } from "react";
import Link from "next/link";
import SearchInput from "./SearchInput";
import { HeartIcon, Settings } from "lucide-react";
import { UserDropdown } from "./UserDropDown";
import { UserSession } from "@/types/session";
import MenuButton from "./MenuButton";
import NotifButton from "./NotifButton";
import Image from "next/image";

type Props = {
  session: UserSession | null;
};

const Navbar: FC<Props> = ({ session }) => {
  return (
    <header className="w-full flex flex-col gap-4 sticky top-0 z-50 bg-white p-6 shadow">
      <div className="flex items-center justify-between gap-4">
        <MenuButton />
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
        <div className="max-w-2xl flex-1 hidden md:flex">
          <SearchInput />
        </div>
        <div className="flex items-center gap-10">
          <div className="hidden md:flex gap-6">
            <Link
              href="/profile/wishlists"
              className="size-12 grid place-items-center border border-slate-100 rounded-full"
            >
              <HeartIcon className="w-6 h-6 text-slate-500" />
            </Link>
            <NotifButton />
            <Link
              href="/profile/settings"
              className="size-12 grid place-items-center border border-slate-100 rounded-full"
            >
              <Settings className="w-6 h-6 text-slate-500" />
            </Link>
          </div>
          <UserDropdown session={session} />
        </div>
      </div>
      <div className="md:hidden flex items-center justify-between">
        <SearchInput />
      </div>
    </header>
  );
};

export default Navbar;
