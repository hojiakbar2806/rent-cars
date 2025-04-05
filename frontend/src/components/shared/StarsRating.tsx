"use client";

import { StarIcon } from "lucide-react";
import { FC, useState } from "react";

type StarsRatingProps = {
  readonly?: boolean;
  onChange?: (value: number) => number;
  value?: number;
};

const StarsRating: FC<StarsRatingProps> = ({ readonly, onChange, value }) => {
  const stars = [1, 2, 3, 4, 5];
  const [hoveredIndex, setHoveredIndex] = useState<number>(0);
  const [activeIndex, setActiveIndex] = useState<number>(value || 0);

  const handleClick = (i: number) => {
    setActiveIndex(i);
    if (onChange) {
      onChange(activeIndex);
    }
  };

  return (
    <div className="flex">
      {stars.map((i) => {
        return (
          <StarIcon
            key={i}
            size={18}
            data-readonly={readonly}
            data-onhover={activeIndex >= i || hoveredIndex >= i}
            className="text-slate-400 hover:text-yellow-400 hover:fill-yellow-400
            data-[onhover=true]:fill-yellow-400 data-[onhover=true]:text-yellow-400
            data-[readonly=true]:pointer-events-none"
            onMouseEnter={() => setHoveredIndex(i)}
            onMouseLeave={() => setHoveredIndex(0)}
            onClick={() => !readonly && handleClick(i)}
          />
        );
      })}
    </div>
  );
};

export default StarsRating;
