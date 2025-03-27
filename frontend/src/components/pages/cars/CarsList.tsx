import { FC, use } from "react";
import RentCars from "@/components/shared/carCard/CarsSection";
import getCarsWithFilters from "@/app/actions/cars/getCarsWithParams";

type Props = {
  params: Record<string, string>;
  full?: boolean;
};

const CarsList: FC<Props> = ({ params }) => {
  const searchParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach((v) => searchParams.append(key, v));
    } else {
      searchParams.append(key, value);
    }
  });
  const data = use(getCarsWithFilters(searchParams.toString()));
  return <RentCars data={data} showMore full/>;
};

export default CarsList;
