import RentCars from "@/components/shared/cars/CarsSection";
import { CarItem } from "@/types/cars";
import { FC } from "react";

type Props = {
  data: CarItem[];
};

const PopularCars: FC<Props> = async ({ data }) => {
  return (
    <div className="w-full flex flex-col">
      <RentCars title="Populars" data={data} scrollable viewLink="/cars" />
    </div>
  );
};

export default PopularCars;
