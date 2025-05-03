"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FC } from "react";

type Props = {
  image: string;
  title: string;
  description: string;
  bgImg: string;
  btnClass: string;
};

const HeroCard: FC<Props> = ({
  image,
  title,
  description,
  bgImg,
  btnClass,
}) => {
  const router = useRouter();
  return (
    <div className="relative overflow-hidden rounded-xl bg-gradient-to-r p-5 text-white lg:first:block first:hidden lg:p-8">
      <div className="flex flex-col md:gap-5 items-start relative z-10">
        <h2 className="text-lg sm:text-xl md:text-3xl font-bold mb-2 leading-tight max-w-md">
          {title}
        </h2>
        <p className="text-white/90 max-w-sm text-xs sm:text-xl">{description}</p>
      </div>
      <div className="w-full mt-4 flex-col flex sm:flex-row justify-between items-start sm:items-center gap-4">
        <Button
          className={cn("cursor-pointer z-20", btnClass)}
          onClick={() => router.push("/cars")}
        >
          Band qilish
        </Button>
        <Image
          src={`${image}`}
          alt="GTR Car"
          width={247.5}
          height={110}
          priority
          className="w-[80%] sm:w-[60%] z-10 ml-auto"
        />
      </div>
      <Image src={bgImg} fill alt="" priority className="z-0" />
    </div>
  );
};

export default HeroCard;
