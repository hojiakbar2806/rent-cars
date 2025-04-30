import { FC } from "react";
import Navbar from "@/components/shared/Navbar";
import Sidebar from "@/components/pages/profile/Sidebar";

type Props = {
  children: React.ReactNode;
};

const ProfileLayout: FC<Props> = ({ children }) => {
  return (
    <div className="w-full min-h-screen flex flex-col bg-slate-100">
      <Navbar />
      <div className="w-full flex flex-1">
        <Sidebar />
        <div className="flex-1">
          {children}
        </div>
      </div>
    </div>
  );
};

export default ProfileLayout;
