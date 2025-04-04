"use client";

import { useDebounce } from "@/hooks/useDebounce";
import { FC, useEffect, useState, useTransition } from "react";
import { Slider } from "@/components/ui/slider";
import { useQueryState } from "@/hooks/useQueryState";
import { Loader2 } from "lucide-react";
import NProgress from "nprogress";

type FilterRangeProps = {
  min?: number;
  max?: number;
};

const FilterRange: FC<FilterRangeProps> = ({ min = 0, max = 100 }) => {
  const [isPending, startTransition] = useTransition();
  const [priceRange, setPriceRange] = useQueryState("price", false, "/cars");

  const [current, setCurrent] = useState<[number, number]>([
    +priceRange?.split("-")[0] || min,
    +priceRange?.split("-")[1] || max,
  ]);

  const debouncedRange = useDebounce(current, 300);

  useEffect(() => {
    if (
      debouncedRange.join("-") !== priceRange &&
      (min !== debouncedRange[0] || max !== debouncedRange[1])
    ) {
      NProgress.start();
      startTransition(() => setPriceRange(debouncedRange.join("-")));
    }
  }, [debouncedRange, priceRange]);

  return (
    <div className="w-full flex flex-col gap-2 text-lg">
      <span className="flex items-center gap-2 text-gray-500">
        Price
        {isPending && <Loader2 className="size-5 animate-spin text-gray-400" />}
      </span>
      <label className="w-full">
        <Slider
          step={1}
          max={max + 1}
          min={min - 1}
          value={current}
          disabled={isPending}
          onValueChange={(values) => setCurrent([values[0], values[1]])}
        />
      </label>

      <div className="flex justify-between mt-2">
        <span>Min: {current[0]}</span>
        <span>Max: {current[1]}</span>
      </div>
    </div>
  );
};

export default FilterRange;
