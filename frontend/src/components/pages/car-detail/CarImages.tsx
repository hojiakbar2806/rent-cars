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
    <div className="w-1/2 aspect-[320/230] flex flex-col gap-4 flex-wrap">
      <div className="flex-1 flex justify-center items-center bg-white rounded-xl p-8">
        <Image
          src={`${BASE_URL}/${image}`}
          width={247.5}
          height={110}
          priority
          alt="car details"
          className="w-full"
        />
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
