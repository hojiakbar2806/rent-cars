"use client";

import { FC } from "react";
import Link from "next/link";
import {
  CarIcon,
  FileType2,
  LayoutDashboardIcon,
  LucideIcon,
  Users,
} from "lucide-react";
import { usePathname } from "next/navigation";

const Sidebar = () => {
  return (
    <div className="w-80 hidden md:flex h-full bg-white">
      <div className="w-full flex flex-col gap-2 sticky top-0 p-5">
        <h2 className="text-lg font-semibold mb-4">Asosiy menu</h2>
        <SidebarItem
          Icon={LayoutDashboardIcon}
          path="/dashboard"
          label="Boshqaruv paneli"
        />
        <SidebarItem
          Icon={Users}
          path="/dashboard/users-list"
          label="Foydalanuvchilar"
        />
        <SidebarItem
          Icon={CarIcon}
          path="/dashboard/cars-list"
          label="Mashinalar"
        />
        <SidebarItem
          Icon={FileType2}
          path="/dashboard/car-type-list"
          label="Mashina turlari"
        />
      </div>
    </div>
  );
};

export default Sidebar;

type Props = {
  path: string;
  Icon: LucideIcon;
  label: string;
};

const SidebarItem: FC<Props> = ({ path, Icon, label }) => {
  const pathname = usePathname();
  const isActive = pathname.split("/")[2] === path.split("/")[2];
  return (
    <Link
      href={path}
      data-active={isActive}
      className="flex items-center gap-2 p-3 text-slate-500 font-semibold hover:bg-blue-500 hover:text-white rounded-md transition-colors duration-300
      data-[active=true]:bg-blue-600 data-[active=true]:text-white"
    >
      <Icon /> {label}
    </Link>
  );
};
