import { FC, ReactNode } from "react";
import { Filterbar } from "@/components/pages/cars/filter";

type Props = {
  children: ReactNode;
};

const RentCarLayout: FC<Props> = async ({ children }) => {
  return (
    <div className="w-full flex">
      <Filterbar />
      {children}
    </div>
  );
};

export default RentCarLayout;
