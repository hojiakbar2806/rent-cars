"use client";

import { FC } from "react";
import { Heart, LucideIcon, UsersRound, Fuel, Target } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { CarItem } from "@/types/cars";

type Props = {
  car: CarItem;
  scrollable?: boolean;
};

const CarsCard: FC<Props> = ({ scrollable = false }) => {
  return (
    <div
      data-scrollable={scrollable}
      className="flex flex-col justify-between
      aspect-[400/300] min-w-[400px] p-4 rounded-xl bg-white snap-start
      md:aspect-[300/400] md:min-w-[300px]
      data-[scrollable=true]:aspect-[300/400] 
      data-[scrollable=true]:min-w-[300px]"
    >
      <div className="w-full flex items-center justify-between">
        <div>
          <h1 className="font-bold text-xl">Koenigsegg</h1>
          <p className="text-slate-400 font-semibold">Sport</p>
        </div>
        <button className="cursor-pointer">
          <Heart className="w-6 h-6 text-red-500 fill-red-500" />
        </button>
      </div>

      <div
        data-scrollable={scrollable}
        className="w-full flex flex-row justify-between items-center gap-4
        md:flex-col
        data-[scrollable=true]:flex-col
        "
      >
        <Image
          src={"/image.png"}
          width={200}
          height={60}
          alt={"car.name"}
          priority
        />

        <div
          data-scrollable={scrollable}
          className="flex flex-col gap-3
          md:flex-row md:w-full md:justify-between
          data-[scrollable=true]:flex-row
          data-[scrollable=true]:w-full"
        >
          <InfoLab Icon={Fuel} label="90 L" />
          <InfoLab Icon={Target} label="Manual" />
          <InfoLab Icon={UsersRound} label="2 Yo'lovchi" />
        </div>
      </div>

      <div className="flex justify-between items-center">
        <div>
          <p>
            <span className="text-lg font-semibold">$30/</span>
            <span className="text-slate-400 text-sm">kun</span>
          </p>
          <p className="text-slate-400 font-semibold text-xs">$100</p>
        </div>
        <Button>Rent Now</Button>
      </div>
    </div>
  );
};

export default CarsCard;

function InfoLab({ Icon, label }: { Icon: LucideIcon; label: string }) {
  return (
    <div className="flex flex-1 items-center gap-1 text-gray-400 text-sm">
      <Icon size={18} />
      <span className="whitespace-nowrap">{label}</span>
    </div>
  );
}
