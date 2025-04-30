"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import React, { FC } from "react";
import StarsRating from "@/components/shared/StarsRating";
import LikeButton from "@/components/shared/LikeButton";
import CarImages from "./CarImages";
import { CarItem } from "@/types/cars";

type Props = {
    car: CarItem
};

const CarDetail: FC<Props> = ({ car }) => {
    return (
        <div className="flex flex-col lg:flex-row gap-8">
            <CarImages images={car?.images ?? []} />
            <div className="w-full lg:w-1/2 flex flex-col gap-6 bg-white rounded-xl p-4">
                <div>
                    <div className="flex justify-between">
                        <h3 className="text-2xl font-bold">
                            {car?.name}{" "}
                            <span className="text-slate-400 text-lg font-normal">
                                {car?.car_type.name}
                            </span>
                        </h3>
                        <LikeButton id={car.id} />
                    </div>
                    <div className="flex gap-2 items-center">
                        <StarsRating readonly value={4} />
                        <span className="text-slate-400">400 + ko'ruvchilar</span>
                    </div>
                </div>
                <p className="text-slate-400">{car?.description}</p>

                <div className="my-auto grid grid-cols-4">
                    <p className="text-slate-500">Yoqilg'i</p>
                    <p className="text-slate-500">Boshqaruv</p>
                    <p className="text-slate-500">Sig'im</p>
                    <p className="text-slate-500">Yo'lovchilar</p>
                    <p>{car.fuel_type}</p>
                    <p>{car.transmission}</p>
                    <p>{car.fuel_capacity} L</p>
                    <p>{car.capacity} </p>
                </div>

                <div className="flex justify-between items-center">
                    <div>
                        <p>
                            <span className="text-xl font-semibold">
                                {car?.price_per_day} ming/
                            </span>
                            <span className="text-slate-400 text-lg">kun</span>
                        </p>
                        <p className="text-slate-400 font-semibold text-sm">
                            {car?.original_price} ming
                        </p>
                    </div>
                    <Button asChild>
                        <Link href={`/rent/${car?.id}`}>Band qilish</Link>
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default CarDetail;