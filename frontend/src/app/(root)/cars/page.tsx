import { FC } from "react";
import CarsList from "@/components/pages/cars/CarsList";
import TransferSelectorBar from "@/components/pages/cars/transferSelector/TransferSelectorBar";

type Props = {
  searchParams: Promise<Record<string, string>>;
};

const RentCarPage: FC<Props> = async ({ searchParams }) => {
  const params = await searchParams;
  return (
    <div className="flex-1 flex flex-col gap-4 bg-gray-100 p-4">
      <TransferSelectorBar />
      <CarsList params={params} />
    </div>
  );
};

export default RentCarPage;
