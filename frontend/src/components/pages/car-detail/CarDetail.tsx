import { Button } from "@/components/ui/button";
import { CarItem } from "@/types/cars";
import Link from "next/link";
import React, { FC } from "react";
import CarImages from "./CarImages";

type Props = {
  car: CarItem;
};

const CarDetail: FC<Props> = ({ car }) => {
  return (
    <div className="w-full flex gap-8">
      <CarImages images={car.images} />
      <div className="w-1/2 flex flex-col gap-6 bg-white rounded-xl p-4">
        <h3 className="text-2xl font-bold">{car.name}</h3>
        <p className="text-slate-400 font-semibold">{car.car_type.name}</p>
        <p className="text-slate-400">{car.description}</p>

        <div className="flex justify-between mt-auto">
          <p>{car.fuel_type}</p>
          <p>{car.transmission}</p>
          <p>{car.fuel_capacity} L</p>
          <p>{car.capacity} Person</p>
        </div>

        <div className="flex justify-between items-center">
          <div>
            <p>
              <span className="text-xl font-semibold">
                ${car.price_per_day}/
              </span>
              <span className="text-slate-400 text-lg">kun</span>
            </p>
            <p className="text-slate-400 font-semibold text-sm">
              ${car.original_price}
            </p>
          </div>
          <Button asChild>
            <Link href={`/rent/${car.id}`}>Rent Now</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CarDetail;
