import Sidebar from "@/components/pages/profile/Sidebar";
import Navbar from "@/components/shared/Navbar";
import React, { FC, Fragment } from "react";

type Props = {
  children: React.ReactNode;
};

const ProfileLayout: FC<Props> = ({ children }) => {
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

export default ProfileLayout;
