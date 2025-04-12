import { FC, Fragment, use } from "react";
import CarsList from "@/components/pages/cars/CarsList";
import CarFilter from "@/components/pages/cars/carFilter/CarFilter";
import Navbar from "@/components/shared/Navbar";
import TransferSelectorBar from "@/components/shared/TransferSelectorBar";

type Props = {
  searchParams: Promise<Record<string, string>>;
};

const RentCarPage: FC<Props> = ({ searchParams }) => {
  const params = use(searchParams);

  return (
    <Fragment>
      <Navbar />
      <div className="flex-1 flex flex-col overflow-scroll">
        <div className="w-full flex-1 flex">
          <CarFilter />
          <div className="flex-1 overflow-scroll p-5 flex flex-col gap-5">
            <TransferSelectorBar />
            <CarsList params={params} full />
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default RentCarPage;
