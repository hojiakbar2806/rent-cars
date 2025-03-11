import React, { FC } from "react";

type Props = {
  children: React.ReactNode;
  scrollable?: boolean;
};

const CardWrapper: FC<Props> = ({ children, scrollable }) => {
  return (
    <div
      data-scrollable={scrollable}
      className="w-full grid gap-8 grid-cols-[repeat(auto-fill,minmax(400px,1fr))]
      md:grid-cols-[repeat(auto-fill,minmax(300px,1fr))] 
      overflow-x-auto scrollbar-none snap-x
      data-[scrollable=true]:flex data-[scrollable=true]:gap-4"
    >
      {children}
    </div>
  );
};

export default CardWrapper;
