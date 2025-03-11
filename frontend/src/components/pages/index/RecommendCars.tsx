import RentCars from "@/components/shared/cars/CarsSection";
import { CarItem } from "@/types/cars";
import { FC } from "react";

type Props = {
  data: CarItem[];
};

const RecommendCars: FC<Props> = async ({ data }) => {
  return <RentCars title="Recommends" data={data} showMore />;
};

export default RecommendCars;
