import Sidebar from "@/components/pages/profile/Sidebar";
import React, { FC } from "react";

type Props = {
  children: React.ReactNode;
};

const ProfileLayout: FC<Props> = ({ children }) => {
  return (
    <div className="flex-1 w-full flex">
      <Sidebar />
      {children}
    </div>
  );
};

export default ProfileLayout;
