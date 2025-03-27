import { FC, use } from "react";
import CarsList from "@/components/pages/cars/CarsList";
import TransferSelectorBar from "@/components/shared/transferSelector/TransferSelectorBar";
import CarFilter from "@/components/pages/cars/carFilter/CarFilter";

type Props = {
  searchParams: Promise<Record<string, string>>;
};

const RentCarPage: FC<Props> = ({ searchParams }) => {
  const params = use(searchParams);

  return (
    <div className="flex">
      <CarFilter />

      <div className="flex-1 flex flex-col gap-4 p-4">
        <TransferSelectorBar />
        <CarsList params={params} full/>
      </div>
    </div>
  );
};

export default RentCarPage;
