"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useSession } from "@/hooks/useSession";
import { useSessionStore } from "@/hooks/useSessionStore";
import { internalApi } from "@/lib/api";
import queryClient from "@/lib/queryClient";
import { User2, LogOut, UserCircle, LogIn, UserPlus, HeartIcon, Bell, Settings } from "lucide-react";
import { useRouter } from "next/navigation";
import nProgress from "nprogress";
import toast from "react-hot-toast";

export function UserDropdown() {
  const router = useRouter();
  const { session, setSession } = useSession()
  const fallbackText = session?.user?.email.slice(0, 2).toUpperCase();

  const handleLogout = async () => {
    await toast.promise(internalApi.post("/api/auth/logout"),
      {
        loading: "Siz tizimdan chiqmoqdasiz...",
        success: (res) => {
          setSession(null)
          queryClient.clear()
          return res.data.message
        },
        error: (error) => error.msg
      }
    );
    nProgress.start();
    useSessionStore.setState({ session: null });
    router.push("/");
  };

  const handleNavigate = (path: string) => {
    nProgress.start();
    router.replace(path);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="size-12 cursor-pointer">
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
              <span className="text-sm md:text-lg">Boshqaruv panel</span>
            </DropdownMenuItem> : <DropdownMenuItem
              onClick={() => handleNavigate("/profile")}
              className="cursor-pointer"
            >
              <UserCircle className="size-4 md:size-5" />
              <span className="text-sm md:text-lg">Shaxsiy kabinet</span>
            </DropdownMenuItem>}

            <DropdownMenuItem onClick={()=>handleNavigate("/profile/wishlists")} className="md:hidden cursor-pointer">
              <HeartIcon className="size-4 md:size-5" />
              <span className="text-sm md:text-lg">Sevimlilar</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={()=>handleNavigate("/profile/settings")} className="md:hidden cursor-pointer">
              <Settings className="size-4 md:size-5" />
              <span className="text-sm md:text-lg">Sozlamalar</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={()=>handleNavigate("/profile/notifications")} className="md:hidden cursor-pointer flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Bell className="size-4 md:size-5" />
                <span className="text-sm md:text-lg">Xabarlar</span>
              </div>
              <span data-has={true} className="size-2 bg-red-500 rounded-full
                data-[has=false]:opacity-0 data-[has=true]:animate-ping" />
            </DropdownMenuItem>
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




//  <Link
//     href="/profile/wishlists"
//     className="size-12 grid place-items-center border border-slate-100 rounded-full"
//   >
//     <HeartIcon className="w-6 h-6 text-slate-500" />
//   </Link>
//   <Link
//     href="/profile/notifications"
//     data-has={true}
//     className="size-12 grid place-items-center border border-slate-100 rounded-full relative transition cursor-pointer
//
//     data-[has=false]:after:opacity-0 data-[has=true]:after:animate-ping"
//   >
//     <Bell className="w-6 h-6 text-slate-500" />
//   </Link>
//   <Link
//     href="/profile/settings"
//     className="size-12 grid place-items-center border border-slate-100 rounded-full"
//   >
//     <Settings className="w-6 h-6 text-slate-500" />
//   </Link>