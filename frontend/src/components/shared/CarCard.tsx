"use client"

import { FC } from "react";
import Image from "next/image";
import { LucideIcon, UsersRound, Fuel, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CarItem } from "@/types/cars";
import Link from "next/link";
import { BASE_URL } from "@/lib/const";
import { useRouter } from "next/navigation";
import LikeButton from "./LikeButton";
import nProgress from "nprogress";


const CarsCard: FC<{ car: CarItem }> = ({ car }) => {
  const router = useRouter();

  const handleClick = () => {
    nProgress.start();
    router.push(`/cars/${car.id}`);
  };

  return (
    <div
      onClick={handleClick}
      className="w-full h-full flex flex-col gap-2 p-4 justify-between rounded-xl bg-white
      sm:gap-6">
      <div className="w-full flex items-center justify-between">
        <div>
          <h1 className="font-bold text-lg sm:text-xl">{car.name}</h1>
          <p className="text-slate-400 font-semibold text-sm sm:text-lg">{car.car_type.name}</p>
        </div>
        <LikeButton id={car.id} />
      </div>

      <div
        className="w-full flex flex-row justify-between items-center
        sm:flex-col gap-10
        group-data-[scrollable=true]:flex-col
        group-data-[scrollable=true]:gap-6
        ">
        <Image
          priority
          width={250}
          height={110}
          alt={car.name}
          src={`${BASE_URL}/${car.images[0]}`}
          className="w-[180px] sm:w-auto my-auto object-contain"
        />

        <div
          className="flex shrink-0 flex-col gap-3 justify-between sm:flex-row sm:w-full
          group-data-[scrollable=true]:flex-row
          group-data-[scrollable=true]:w-full
          ">
          <InfoLabel Icon={Fuel} label={`${car.fuel_capacity} L`} />
          <InfoLabel Icon={Target} label={car.transmission} />
          <InfoLabel Icon={UsersRound} label={`${car.capacity} Yo'lovchi`} />
        </div>
      </div>
      

      <div className="flex justify-between items-center">
        <div>
          <p>
            <span className="text-sm sm:text-lg font-semibold">{car.price_per_day} ming/</span>
            <span className="text-slate-400 text-xs sm:text-sm">kun</span>
          </p>
          <p className="text-slate-400 font-semibold text-xs">
            {car.original_price} ming
          </p>
        </div>
        <Button asChild onClick={(e) => e.stopPropagation()}>
          <Link href={`/rent/${car.id}`}>Band qilish</Link>
        </Button>
      </div>
    </div>
  );
};

export default CarsCard;


const InfoLabel: FC<{
  Icon: LucideIcon;
  label: string | number;
}> = ({ Icon, label }) => {
  return (
    <div className="shrink-0 flex space-y-2 items-center gap-1 text-gray-400 text-xs">
      <Icon size={18} />
      <span className="whitespace-nowrap">{label}</span>
    </div>
  );
};
