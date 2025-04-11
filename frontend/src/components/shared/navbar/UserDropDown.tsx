"use client";

import logout from "@/app/actions/auth/logout";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useSessionStore } from "@/hooks/useSessionStore";
import { UserSession } from "@/types/session";
import { User2, LogOut, UserCircle, LogIn, UserPlus } from "lucide-react";
import { useRouter } from "next/navigation";
import nProgress from "nprogress";
import toast from "react-hot-toast";

interface UserDropdownProps {
  session: UserSession | null;
}

export function UserDropdown({ session }: UserDropdownProps) {
  const router = useRouter();
  const fallbackText = session?.user?.email.slice(0, 2).toUpperCase();

  const handleLogout = async () => {
    await toast.promise(logout(),
      {
        loading: "Siz tizimdan chiqmoqdasiz...",
        success: (res) => res.msg,
        error: (error) => error.msg
      }
    );
    nProgress.start();
    useSessionStore.setState({ session: null });
    router.push("/");
  };

  const handleNavigate = (path: string) => {
    nProgress.start();
    router.push(path);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="size-10 md:size-12 cursor-pointer">
          <AvatarFallback className="text-lg font-bold">
            {session?.user ? (
              fallbackText
            ) : (
              <User2 className="text-slate-500" />
            )}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {session?.user ? (
          <>
            {session.user.is_admin ? <DropdownMenuItem
              onClick={() => handleNavigate("/dashboard")}
              className="cursor-pointer"
            >
              <UserCircle className="size-4 md:size-5" />
              <span className="text-sm md:text-lg">Dashboard</span>
            </DropdownMenuItem> : <DropdownMenuItem
              onClick={() => handleNavigate("/profile")}
              className="cursor-pointer"
            >
              <UserCircle className="size-4 md:size-5" />
              <span className="text-sm md:text-lg">Shaxsiy kabinet</span>
            </DropdownMenuItem>}

            <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
              <LogOut className="size-4 md:size-5" />
              <span className="text-sm md:text-lg">Tizimdan chiqish</span>
            </DropdownMenuItem>
          </>
        ) : (
          <>
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={() => handleNavigate("/login")}
            >
              <LogIn className="size-4 md:size-5" />
              <span className="text-sm md:text-lg">Tizimga kirish</span>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => handleNavigate("/register")}
              className="cursor-pointer"
            >
              <UserPlus className="size-4 md:size-5" />
              <span className="text-sm md:text-lg"> Ro'yxatdan o'tish</span>
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
