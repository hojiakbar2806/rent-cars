"use client";

import { LogOutIcon } from "lucide-react";


const LogoutButton = () => {
  return (
    <button className="flex items-center justify-center gap-4 font-semibold mt-auto p-3 cursor-pointer hover:bg-blue-500 hover:text-white transition-colors duration-300 rounded-md">
      <LogOutIcon /> Logout
    </button>
  );
};

export default LogoutButton;
