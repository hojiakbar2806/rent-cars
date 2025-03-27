"use client";

import { useSessionStore } from "@/hooks/useSessionStore";
import { Copy } from "lucide-react";
import { FC } from "react";
import toast from "react-hot-toast";

const PropfilePage: FC = () => {
  const { session } = useSessionStore();
  return (
    <div className="w-full flex justify-center items-center p-10">
      <div className="flex flex-col gap-4 bg-white p-8 rounded-lg">
        <h1 className="text-2xl font-bold">Profile</h1>
        <p>Name: {session?.user?.first_name}</p>
        <p>Surname: {session?.user?.last_name}</p>
        <p>Email: {session?.user?.email}</p>
        <p>Role: {session?.user?.is_admin ? "Admin" : "User"}</p>
        <div>
          <div className="w-full flex items-center p-2 gap-4 rounded-sm ">
            Token:
            <pre className="w-full rounded-md line-clamp-1">
              {session?.token?.slice(0, 30)}
            </pre>
            <Copy
              className="ml-2 cursor-pointer"
              onClick={() =>
                toast.promise(
                  navigator.clipboard.writeText(session?.token || ""),
                  { loading: "Copying...", success: "Copied to clipboard!" }
                )
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropfilePage;
