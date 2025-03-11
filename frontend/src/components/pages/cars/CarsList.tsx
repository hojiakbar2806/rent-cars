import { FC } from "react";
import { fetchCars } from "@/app/actions/product";
import { CarItem } from "@/types/cars";
import RentCars from "@/components/shared/cars/CarsSection";

type Props = {
  params: Record<string, string>;
};

const CarsList: FC<Props> = async ({ params }) => {
  const data: CarItem[] = await fetchCars(params.toString());
  return <RentCars data={data} showMore />;
};

export default CarsList;
