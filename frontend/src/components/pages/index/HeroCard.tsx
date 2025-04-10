"use client";

import { Button } from "@/components/ui/button";
import { BASE_URL } from "@/lib/const";
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
    <div className="relative overflow-hidden rounded-xl bg-gradient-to-r p-8 text-white lg:block hidden">
      <div className="flex flex-col gap-5 items-start relative z-10">
        <h2 className="text-3xl font-bold mb-2 leading-tight max-w-md">
          {title}
        </h2>
        <p className="text-white/90 max-w-sm">{description}</p>
        <Button
          className={cn("cursor-pointer", btnClass)}
          onClick={() => router.push("/cars")}
        >
          Band qilish
        </Button>
      </div>
      <div className="w-full flex justify-end">
        <Image
          src={`${BASE_URL}/${image}`}
          alt="GTR Car"
          width={247.5}
          height={110}
          priority
          className="w-[60%] z-10"
        />
      </div>
      <Image src={bgImg} fill alt="" priority className="z-0" />
    </div>
  );
};

export default HeroCard;
