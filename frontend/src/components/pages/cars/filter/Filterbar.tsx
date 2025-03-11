import React, { FC } from "react";
import FilterRange from "./FilterRange";
import { fetchCars } from "@/app/actions/product";
import FilterCarType from "./FilterCarType";
import FilterCapacity from "./FilterCapacity";
import { CarItem } from "@/types/cars";

const Filterbar: FC = async () => {
  const data: CarItem[] = await fetchCars("");

  const maxPrice = data?.reduce((prev, car) => Math.max(prev, car.id), 0);

  const types = [
    {
      id: 1,
      name: "Sedan",
      count: 10,
    },
    {
      id: 2,
      name: "SUV",
      count: 32,
    },
    {
      id: 3,
      name: "Hatchback",
      count: 12,
    },
    {
      id: 4,
      name: "MPV",
      count: 10,
    },
    {
      id: 5,
      name: "Truck",
      count: 10,
    },
    {
      id: 6,
      name: "Van",
      count: 10,
    },
  ];

  const capacities = [12, 14, 16, 18];
  return (
    <div className="h-[calc(100vh-80px)] flex sticky top-20 flex-col gap-8 w-80 border-r border-b border-gray-200 p-8">
      <FilterCarType data={types} />
      <FilterCapacity data={capacities} />
      <FilterRange max={maxPrice} />
    </div>
  );
};

export default Filterbar;
