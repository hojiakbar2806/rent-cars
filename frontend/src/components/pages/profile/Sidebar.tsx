"use client";

import { FC } from "react";
import Link from "next/link";
import {
    BellRing,
    Heart,
    LayoutDashboardIcon,
    LucideIcon,
    Settings,
} from "lucide-react";
import { usePathname } from "next/navigation";
import LogoutButton from "@/components/shared/LogoutButton";

const Sidebar = () => {
    return (
        <div className="w-80 bg-white hidden md:block">
            <div className="flex h-full flex-col gap-2 sticky top-24 p-5">
                <h2 className="text-lg font-semibold mb-4">Sizning kabinetingiz</h2>
                <SidebarItem
                    Icon={LayoutDashboardIcon}
                    path="/profile"
                    label="Mening kabinetim"
                />
                <SidebarItem
                    Icon={Settings}
                    path="/profile/settings"
                    label="Sozlamalar"
                />
                <SidebarItem
                    Icon={Heart}
                    path="/profile/wishlists"
                    label="Sevimlilar"
                />
                <SidebarItem
                    Icon={BellRing}
                    path="/profile/notifications"
                    label="Xabarlar"
                />
                <LogoutButton />
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
    const isActive = pathname.split("/")[3] === path.split("/")[2];
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