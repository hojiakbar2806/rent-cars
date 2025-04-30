import React, { Children, FC } from "react";

type Props = {
  children: React.ReactNode;
  scrollable?: boolean;
};

const CardWrapper: FC<Props> = ({ children, scrollable }) => {
  return (
    <div
      data-scrollable={scrollable}
      className={` w-full gap-5
        ${scrollable
          ? "overflow-x-auto snap-x snap-mandatory flex scrollbar-none"
          : "grid grid-cols-1 sm:grid-cols-[repeat(auto-fill,minmax(300px,1fr))]"}
      `}
    >
      {
        scrollable ? Children.map(children, (child) => (
          <div className={scrollable ? "snap-start shrink-0 w-[300px]" : ""}>
            {child}
          </div>
        )) : children
      }
    </div>
  );
};

export default CardWrapper;
