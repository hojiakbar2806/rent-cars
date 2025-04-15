import React, { FC } from "react";
import CarCardSkeleton from "./CarCardSkeleton";

type Props = {
  children: React.ReactNode;
  scrollable?: boolean;
  hasData: boolean;
  isLoading: boolean
};

const CardWrapper: FC<Props> = ({ children, scrollable, hasData, isLoading }) => {
  if (isLoading) {
    return (
      <div
        data-scrollable={scrollable}
        className="w-full grid gap-5 grid-cols-[repeat(auto-fill,minmax(400px,1fr))]
      md:grid-cols-[repeat(auto-fill,minmax(300px,1fr))] 
      overflow-scroll scrollbar-none snap-x
      data-[scrollable=true]:flex data-[scrollable=true]:gap-4"
      >
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((_, index) => (
          <CarCardSkeleton key={index} />
        ))}
      </div>
    )
  }
  if (!hasData) {
    return (
      <div className="flex justify-center">
        <h3 className="text-2xl font-bold">Cars not found</h3>
      </div>
    );
  }
  return (
    <div
      data-scrollable={scrollable}
      className="w-full grid gap-5 grid-cols-[repeat(auto-fill,minmax(400px,1fr))]
      md:grid-cols-[repeat(auto-fill,minmax(300px,1fr))] 
      overflow-scroll scrollbar-none snap-x
      data-[scrollable=true]:flex data-[scrollable=true]:gap-4"
    >
      {children}
    </div>
  );
};

export default CardWrapper;
