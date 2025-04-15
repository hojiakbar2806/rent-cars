"use client";

import { FC, useMemo } from "react";
import getCarsWithFilters from "@/app/actions/cars/getCarsWithParams";
import { useSearchParams } from "next/navigation";
import CardWrapper from "@/components/shared/CardWrapper";
import { useQuery } from "@tanstack/react-query";
import RentCarCard from "@/components/shared/CarCard";



const CarsList: FC = () => {
  const params = useSearchParams();
  const search = useMemo(() => params.toString(), [params]);
  const { data, isLoading } = useQuery({
    queryKey: [`cars`, search],
    queryFn: () => getCarsWithFilters(params.toString()),
    staleTime: 5,
  })

  return <CardWrapper isLoading={isLoading} hasData={!!data?.length}>
    {data?.map((car) => (
      <RentCarCard car={car} invalidate={[`cars`, search]} key={car.id} />
    ))}
  </CardWrapper>
};

export default CarsList;
