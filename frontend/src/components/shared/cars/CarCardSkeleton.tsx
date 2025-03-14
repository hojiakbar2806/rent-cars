import { Heart } from "lucide-react";
import Image from "next/image";
import React, { FC } from "react";

const CarCardSkeleton: FC = () => {
  return (
    <div
      className="w-full flex flex-col justify-between bg-white rounded-lg shadow-lg p-4
      aspect-[400/320] md:aspect-[320/400] animate-pulse md:gap-10"
    >
      <div className="w-full flex items-center justify-between">
        <div className="w-1/3 flex flex-col gap-2">
          <span className="h-6 w-full bg-blue-400 rounded-full" />
          <span className="h-4 w-full bg-blue-100 rounded-full" />
        </div>
        <Heart className="w-6 h-6 text-red-500 fill-red-500" />
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
