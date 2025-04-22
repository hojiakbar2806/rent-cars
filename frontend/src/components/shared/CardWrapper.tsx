import React, { FC } from "react";
import CarCardSkeleton from "./CarCardSkeleton";

type Props = {
  children: React.ReactNode;
  scrollable?: boolean;
  hasData: boolean;
  isLoading: boolean
};

const CardWrapper: FC<Props> = ({ children, scrollable, hasData, isLoading }) => {
  const containerClass = scrollable
    ? "w-full flex gap-4 overflow-x-auto scrollbar-none snap-x"
    : "w-full grid gap-5 grid-cols-[repeat(auto-fill,minmax(400px,1fr))] md:grid-cols-[repeat(auto-fill,minmax(300px,1fr))]"

  if (!hasData && !isLoading) {
    return (
      <div className="flex justify-center">
        <h3 className="text-2xl font-bold">Mashinalar topilmadi</h3>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className={containerClass}>
        {
          Array.from({ length: 8 }).map((_, index) => (
            <CarCardSkeleton key={index} />
          ))
        }
      </div>
    )
  }

  return (
    <div className={containerClass}>
      {children}
    </div>
  );
};

export default CardWrapper;