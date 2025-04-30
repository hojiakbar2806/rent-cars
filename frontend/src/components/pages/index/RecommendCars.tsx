"use client";

import CarsCard from "@/components/shared/CarCard";
import CardWrapper from "@/components/shared/CardWrapper";
import { Button } from "@/components/ui/button";
import { CarItem } from "@/types/cars";
import Link from "next/link";
import { FC, useState } from "react";

type RecommendCarsProps = {
    data: CarItem[];
};

const RecommendCars: FC<RecommendCarsProps> = ({ data }) => {
    const [visibleCount, setVisibleCount] = useState(1);

    const visibleCars = data.slice(0, visibleCount);

    const hasMore = visibleCount < data.length;

    return (
        <div className="w-full flex flex-col">
            <div className="flex justify-between py-5">
                <h2 className="text-lg sm:text-xl md:text-2xl font-bold">Tavfsiya qilinadigan mashinalar</h2>
                <Link href="/cars" className="text-blue-500 hover:underline">Hammasini ko'rish</Link>
            </div>
            <CardWrapper>
                {visibleCars.map((car) => (
                    <CarsCard car={car} key={car.id} scrollable={true} />
                ))}
            </CardWrapper>
            {hasMore && <Button
                onClick={() => setVisibleCount((prev) => prev + 5)}
                className="mx-auto cursor-pointer mt-5"
            >
                Show More
            </Button>}

        </div >
    );
};

export default RecommendCars;
