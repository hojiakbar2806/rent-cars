"use client";

import RentCardWrapper from "@/components/shared/CardWrapper";
import RentCarCard from "@/components/shared/CarCard";

import { FC } from "react";
import { useQuery } from "@tanstack/react-query";
import { getCars } from "@/app/actions/cars/getCars";

const PopularCars: FC = () => {
  const { data = null, isLoading } = useQuery({
    queryKey: ["cars"],
    queryFn: () => getCars("all"),
    staleTime: 5,
  })

  return (
    <div className="w-full flex flex-col">
      <RentCardWrapper
        isLoading={isLoading}
        scrollable={true}
        hasData={true}
      >
        {data?.map((car) => (
          <RentCarCard car={car} key={car.id} scrollable={true} invalidate={["cars"]} />
        ))}
      </RentCardWrapper>
    </div>
  );
};

export default PopularCars;
