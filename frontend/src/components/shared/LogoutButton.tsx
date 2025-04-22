"use client";

import logout from "@/app/actions/auth/logout";
import { useSession } from "@/hooks/useSession";
import { LogOutIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import nProgress from "nprogress";
import toast from "react-hot-toast";


const LogoutButton = () => {
  const router = useRouter();
  const { setSession } = useSession()

  const handleLogout = async () => {
    await toast.promise(logout(),
      {
        loading: "Siz tizimdan chiqmoqdasiz...",
        success: (res) => {
          setSession(null)
          return res.msg
        },
        error: (error) => error.msg
      }
    );

    nProgress.start();
    router.push("/");
  };
  return (
    <button className="flex items-center justify-center gap-4 font-semibold mt-auto p-3 cursor-pointer hover:bg-blue-500 hover:text-white transition-colors duration-300 rounded-md"
      onClick={handleLogout}>
      <LogOutIcon /> Tizimdan chiqish
    </button>
  );
};

export default LogoutButton;
