"use client";

import { FC } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import RentCardWrapper from "@/components/shared/CardWrapper";
import RentCarCard from "@/components/shared/CarCard";
import { CarItem } from "@/types/cars";
import { useAPIClient } from "@/hooks/useAPIClient";

const RecommendedCars: FC = () => {
  const { get } = useAPIClient();


  const {
    data,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteQuery({
    queryKey: ["recommends"],
    queryFn: async ({ pageParam = 1 }) => {
      const res = await get(`/v1/cars?page=${pageParam}&limit=10&offset=${(pageParam - 1) * 10}`);
      return res;
    },
    getNextPageParam: (lastPage, allPages) => {
      return lastPage?.length === 0 ? undefined : allPages.length + 1;
    },
    initialPageParam: 1,
    staleTime: 1000 * 60 * 10,
  });

  const allCars = data?.pages.flat() as CarItem[] ?? [];

  return (
    <div className="w-full flex flex-col">
      <div className="w-full flex items-center flex-col gap-5">
        <div className="flex items-center justify-between w-full px-4">
          <h1 className="text-2xl font-bold">Tavsiya qilinadigan mashinalar</h1>
          <Link href="/cars/popular" className="text-blue-500 hover:underline">
            Hammasini ko‘rish
          </Link>
        </div>

        <RentCardWrapper
          isLoading={isLoading}
          hasData={!!allCars.length}
        >
          {allCars.map((car) => (
            <RentCarCard
              key={car.id}
              car={car}
              scrollable={false}
            />
          ))}
        </RentCardWrapper>

        {hasNextPage && (
          <Button
            className="mt-5"
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}
          >
            {isFetchingNextPage ? "Yuklanmoqda..." : "Ko‘proq mashinalar"}
          </Button>
        )}
      </div>
    </div>
  );
};

export default RecommendedCars;