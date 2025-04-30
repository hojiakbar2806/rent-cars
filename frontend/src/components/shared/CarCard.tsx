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

type Props = {
  car: CarItem;
  scrollable?: boolean;
};

const CarsCard: FC<Props> = ({ scrollable = false, car }) => {
  const router = useRouter();

  const handleClick = () => {
    nProgress.start();
    router.push(`/cars/${car.id}`);
  };

  return (
    <div
      data-scrollable={scrollable}
      className="flex flex-col min-w-[300px] gap-6 justify-between aspect-[4/3] p-4 rounded-xl bg-white snap-start xxs:aspect-[3/4]
      data-[scrollable=true]:aspect-[3/4]
      data-[scrollable=true]:min-w-[250px]
      md:data-[scrollable=true]:min-w-[300px]
      "
      onClick={handleClick}
    >
      <div className="w-full flex items-center justify-between">
        <div>
          <h1 className="font-bold text-lg sm:text-xl">{car.name}</h1>
          <p className="text-slate-400 font-semibold text-sm sm:text-lg">{car.car_type.name}</p>
        </div>
        <LikeButton id={car.id} />
      </div>

      <div
        data-scrollable={scrollable}
        className="w-full flex-1 flex flex-row justify-between items-center xxs:flex-col
        data-[scrollable=true]:flex-col">
        <Image
          src={`${BASE_URL}/${car.images[0]}`}
          width={250}
          height={110}
          alt={car.name}
          priority
          className="w-[180px] sm:w-full flex-1 my-auto object-contain"
        />

        <div
          data-scrollable={scrollable}
          className="flex flex-col justify-between xxs:flex-row xxs:w-full
          data-[scrollable=true]:flex-row
          data-[scrollable=true]:w-full
          ">
          <InfoLab Icon={Fuel} label={`${car.fuel_capacity} L`} />
          <InfoLab Icon={Target} label={car.transmission} />
          <InfoLab Icon={UsersRound} label={`${car.capacity} Yo'lovchi`} />
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

function InfoLab({
  Icon,
  label,
}: {
  Icon: LucideIcon;
  label: string | number;
}) {
  return (
    <div className="shrink-0 flex space-y-2 items-center gap-1 text-gray-400 text-xs">
      <Icon size={18} />
      <span className="whitespace-nowrap">{label}</span>
    </div>
  );
}