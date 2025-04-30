import Image from "next/image";
import React, { FC } from "react";
import LikeButton from "./LikeButton";

const CarCardSkeleton: FC<{ scrollable?: boolean }> = ({ scrollable = false }) => {
  return (
    <div
      data-scrollable={scrollable}
      className="flex flex-col gap-6 justify-between aspect-[4/3] p-4 rounded-xl bg-white snap-start xxs:aspect-[3/4]
      data-[scrollable=true]:aspect-[3/4]
      data-[scrollable=true]:min-w-[250px]
      md:data-[scrollable=true]:min-w-[300px]
      "
    >
      <div className="w-full flex items-center justify-between">
        <div className="w-1/3 flex flex-col gap-2">
          <span className="h-6 w-full bg-blue-400 rounded-full" />
          <span className="h-5 w-full bg-blue-100 rounded-full" />
        </div>
        <LikeButton />
      </div>

      <div className="w-full flex-1 flex justify-between items-center md:flex-col md:gap-10">
        <div className="flex-1 flex items-center">
          <Image
            src="/icons/gallery.svg"
            width={50}
            height={50}
            alt="gallery"
            className="size-16"
          />
        </div>

        <div className="w-1/4 flex flex-col gap-5 md:flex-row md:w-full">
          <span className="w-full h-4 bg-blue-100 rounded-full" />
          <span className="w-full h-4 bg-blue-100 rounded-full" />
          <span className="w-full h-4 bg-blue-100 rounded-full" />
        </div>
      </div>

      <div className="h-10 flex justify-between items-center mt-4">
        <div className="w-1/3 flex flex-col gap-2">
          <span className="h-4 w-full bg-blue-400 rounded-full" />
          <span className="h-4 w-full bg-blue-100 rounded-full" />
        </div>
        <div className="h-10 w-32 bg-blue-600 rounded-md"></div>
      </div>
    </div>
  );
};

export default CarCardSkeleton;
