"use client";

import { FC } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import RentCardWrapper from "@/components/shared/CardWrapper";
import RentCarCard from "@/components/shared/CarCard";
import { CarItem } from "@/types/cars";
import { getCars } from "@/app/actions/cars/getCars";

const RecommendedCars: FC = () => {
  const query = useInfiniteQuery({
    queryKey: ["recommendedCars"],
    queryFn: ({ pageParam = 1 }) => getCars("popular", pageParam),
    getNextPageParam: (lastPage, pages) => {
      if (lastPage?.length === 0) return undefined;
      return pages.length + 1;
    },
    initialPageParam: 1,
    staleTime: 1000 * 60,
  });

  const allCars = query.data?.pages.flat() as CarItem[] ?? []

  return (
    <div className="w-full flex flex-col">
      <div className="w-full flex items-center flex-col gap-5">
        <div className="flex items-center justify-between w-full px-4">
          <h1 className="text-2xl font-bold">Tavfsiya qilinadigan mashinalar</h1>
          <Link href="/cars/popular" className="text-blue-500 hover:underline">
            Hammasini ko'rish
          </Link>
        </div>

        <RentCardWrapper
          isLoading={query.isLoading}
          scrollable={false}
          hasData={!!allCars.length}
        >
          {allCars?.map((car) => (
            <RentCarCard
              car={car}
              key={car.id}
              scrollable={false}
              invalidate={["recommendedCars"]}
            />
          ))}
        </RentCardWrapper>

        {query.hasNextPage && (
          <Button
            className="mt-5 cursor-pointer"
            onClick={() => query.fetchNextPage()}
            disabled={query.isFetchingNextPage}
          >
            {query.isFetchingNextPage ? "Yuklanmoqda..." : "Ko'proq mashinalar"}
          </Button>
        )}
      </div>
    </div>
  );
};

export default RecommendedCars;