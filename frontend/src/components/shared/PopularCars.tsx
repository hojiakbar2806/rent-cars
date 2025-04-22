"use client";

import RentCardWrapper from "@/components/shared/CardWrapper";
import RentCarCard from "@/components/shared/CarCard";

import Link from "next/link";
import { FC } from "react";
import { useQuery } from "@tanstack/react-query";
import { CarItem } from "@/types/cars";
import { useAPIClient } from "@/hooks/useAPIClient";

const PopularCars: FC = () => {
  const { get } = useAPIClient()
  const { data = null, isLoading } = useQuery({
    queryKey: ["popularCars"],
    queryFn: () => get<CarItem[]>("/v1/cars?popular=true"),
    staleTime: 1000 * 60 * 10,
  })

  return (
    <div className="w-full flex flex-col">
      <div className="w-full flex items-center flex-col gap-5">
        <div className="flex items-center justify-between w-full px-4">
          <h1 className="text-2xl font-bold">Mashhur mashinalar</h1>
          <Link
            href="/cars"
            className="text-blue-500 hover:underline"
          >
            Hammasini ko'rish
          </Link>
        </div>

        <RentCardWrapper
          isLoading={isLoading}
          scrollable={true}
          hasData={true}
        >
          {data?.map((car) => (
            <RentCarCard car={car} key={car.id} scrollable={true} invalidate={["popularCars"]} />
          ))}
        </RentCardWrapper>
      </div>
    </div>
  );
};

export default PopularCars;
