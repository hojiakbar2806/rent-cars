"use client";

import React, { FC } from "react";
import Image from "next/image";
import { BASE_URL } from "@/lib/const";

type Props = {
  images: string[];
};

const CarImages: FC<Props> = ({ images }) => {
  const [image, setImage] = React.useState(images[0]);
  return (
    <div className="w-full lg:w-1/2 aspect-[320/230] flex flex-col gap-4">
      <div className="relative flex-1 flex flex-col justify-between bg-white rounded-xl p-8">
        <div className="flex flex-col gap-4 z-10">
          <h1 className="text-2xl md:text-3xl font-bold z-10 text-white">
            Sports car with the best design and acceleration
          </h1>
          <p className="text-sm md:text-lg text-slate-200 z-10">
            Safety and comfort while driving a futuristic and elegant sports car
          </p>
        </div>
        <Image
          src={`${BASE_URL}/${image}`}
          width={247.5}
          height={110}
          priority
          alt="car details"
          className="w-2/3 z-10 mx-auto"
        />
        <Image src={"/images/ads-arrow-bg.png"} fill alt="" className="z-0" />
      </div>
      <div className="w-full h-16 flex gap-4 justify-between items-center rounded-xl">
        {images.map((image) => (
          <div
            key={image}
            className="flex-1 h-full flex justify-center items-center bg-white rounded-xl cursor-pointer p-4"
            onClick={() => setImage(image)}
          >
            <Image
              key={image}
              width={247.5}
              height={110}
              priority
              src={`${BASE_URL}/${image}`}
              alt="car details images"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CarImages;
