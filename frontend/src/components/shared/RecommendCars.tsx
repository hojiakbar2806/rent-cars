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

  const limit = 5;

  const {
    data,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteQuery({
    queryKey: ["recommendedCars"],
    queryFn: async ({ pageParam = 1 }) => {
      const res = await get(`/v1/cars?page=${pageParam}&limit=${limit}&offset=${(pageParam - 1) * limit}`);
      return res;
    },
    getNextPageParam: (lastPage, allPages) => {
      return lastPage?.length === 0 ? undefined : allPages.length + 1;
    },
    initialPageParam: 1,
    staleTime: 60_000,
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
              invalidate={["recommendedCars"]}
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