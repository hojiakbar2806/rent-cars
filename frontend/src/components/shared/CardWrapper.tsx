import React, { Children, FC } from "react";

type Props = {
  children: React.ReactNode;
  scrollable?: boolean;
};

const CardWrapper: FC<Props> = ({ children, scrollable }) => {
  return (
    <div
      className={` w-full gap-5 p-2
        ${scrollable
          ? "flex snap-x snap-mandatory scrollbar-none overflow-x-scroll overscroll-auto!"
        : "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-[repeat(auto-fill,minmax(300px,1fr))]"}
      `}
    >
      {
        scrollable ? Children.map(children, (child) => (
          <div
            data-scrollable={scrollable}
            className={scrollable ? "group snap-start shrink-0 w-[260px] md:w-[300px] aspect-[3/4]" : ""}>
            {child}
          </div>
        )) : Children.map(children, (child) => (
          <div
            data-scrollable={scrollable}
            className={scrollable ? "" : "aspect-[4/3] xxs:aspect-[3/4]"}>
            {child}
          </div>
        ))
      }
    </div>
  );
};

export default CardWrapper;
