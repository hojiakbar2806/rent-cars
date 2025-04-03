"use client";

import { FC } from "react";
import Image from "next/image";
import { Heart, LucideIcon, UsersRound, Fuel, Target } from "lucide-react";

import { Button } from "@/components/ui/button";
import { CarItem } from "@/types/cars";
import Link from "next/link";
import { BASE_URL } from "@/lib/const";
import { useRouter } from "next/navigation";
import nProgress from "nprogress";

type Props = {
  car: CarItem;
  scrollable?: boolean;
};

const CarsCard: FC<Props> = ({ scrollable = false, car }) => {
  const router = useRouter();
  return (
    <div
      data-scrollable={scrollable}
      className="flex flex-col gap-6 justify-between aspect-[400/300] min-w-[400px] p-4 rounded-xl bg-white snap-start
      md:aspect-[300/400] md:min-w-[300px]
      data-[scrollable=true]:aspect-[300/400] 
      data-[scrollable=true]:min-w-[300px]"
      onClick={() => {
        nProgress.start();
        router.push(`/cars/${car.id}`);
      }}
    >
      <div className="w-full flex items-center justify-between">
        <div>
          <h1 className="font-bold text-xl">{car.name}</h1>
          <p className="text-slate-400 font-semibold">{car.car_type.name}</p>
        </div>
        <button className="cursor-pointer">
          <Heart className="w-6 h-6 text-red-500 fill-red-500" />
        </button>
      </div>

      <div
        data-scrollable={scrollable}
        className="w-full flex-1 flex flex-row justify-between items-center
        md:flex-col
        data-[scrollable=true]:flex-col
        "
      >
        <Image
          src={`${BASE_URL}/${car.images[0]}`}
          width={250}
          height={110}
          alt={car.name}
          priority
          className="w-full my-auto"
        />

        <div
          data-scrollable={scrollable}
          className="flex flex-col gap-3
          md:flex-row md:w-full md:justify-between
          data-[scrollable=true]:flex-row
          data-[scrollable=true]:w-full"
        >
          <InfoLab Icon={Fuel} label={`${car.fuel_capacity} L`} />
          <InfoLab Icon={Target} label={car.transmission} />
          <InfoLab Icon={UsersRound} label={`${car.capacity} Yo'lovchi`} />
        </div>
      </div>

      <div className="flex justify-between items-center">
        <div>
          <p>
            <span className="text-lg font-semibold">{car.price_per_day} ming/</span>
            <span className="text-slate-400 text-sm">kun</span>
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
    <div className="flex flex-1 items-center gap-1 text-gray-400 text-sm">
      <Icon size={18} />
      <span className="whitespace-nowrap">{label}</span>
    </div>
  );
}
