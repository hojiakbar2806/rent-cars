import React, { FC, use } from "react";
import FilterRange from "./FilterRange";
import FilterCarType from "./FilterCarType";
import FilterCapacity from "./FilterCapacity";
import { getCarFilters } from "@/app/actions/cars/getCarFilters";

const CarFilter: FC = () => {
  const data = use(getCarFilters());

  return (
    <div
      className="min-w-80 hidden flex-col gap-8 border border-gray-100 bg-white p-8
      md:flex"
    >
      <FilterCarType data={data.car_types} />
      <FilterCapacity data={data.capacities} />
      <FilterRange max={data.max_price} min={data.min_price} />
    </div>
  );
};

export default CarFilter;
