import React, { FC, use } from "react";
import FilterRange from "./FilterRange";
import FilterCarType from "./FilterCarType";
import FilterCapacity from "./FilterCapacity";
import { getCarFilters } from "@/app/actions/cars/getCarFilters";

const CarFilter: FC = () => {
  const data = use(getCarFilters());

  return (
    <div
      className="w-80 hidden top-0 flex-col gap-8 border border-gray-100 bg-white
      md:flex"
    >
      <div className="top-0 sticky p-8">
        <FilterCarType data={data.car_types} />
        <FilterCapacity data={data.capacities} />
        <FilterRange max={data.max_price} min={data.min_price} />
      </div>
    </div>

  );
};

export default CarFilter;
