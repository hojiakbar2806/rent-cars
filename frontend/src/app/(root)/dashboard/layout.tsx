import Navbar from "@/components/pages/dashboard/Navbar";
import Sidebar from "@/components/pages/dashboard/Sidebar";
import React, { FC, Fragment } from "react";

type Props = {
  children: React.ReactNode;
};

const DashboardLayout: FC<Props> = ({ children }) => {
  return (
    <Fragment>
      <Navbar />
      <div className="flex-1 flex flex-col overflow-scroll">
        <div className="w-full flex-1 flex">
          <Sidebar />
          {children}
        </div>
      </div>
    </Fragment>
  );
};

export default DashboardLayout;
