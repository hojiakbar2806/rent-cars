import { FC } from "react";
import Navbar from "@/components/pages/dashboard/Navbar";
import Sidebar from "@/components/pages/dashboard/Sidebar";
import DashboardSidebarDrawer from "@/components/shared/SidebarDrawer";

type Props = {
  children: React.ReactNode;
};

const DashboardLayout: FC<Props> = async ({ children }) => {
  return (
    <div className="w-full min-h-screen flex flex-col bg-slate-100">
      <Navbar />
      <div className="w-full flex flex-1">
        <Sidebar />
        {children}
      </div>
      <DashboardSidebarDrawer />
    </div>
  );
};

export default DashboardLayout;
