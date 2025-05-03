"use client";

import { useDebounce } from "@/hooks/useDebounce";
import { FC, useEffect, useState, useTransition } from "react";
import { Slider } from "@/components/ui/slider";
import { useQueryState } from "@/hooks/useQueryState";
import { Loader2 } from "lucide-react";
import nProgress from "nprogress";

type FilterPriceRangeProps = {
    min?: number;
    max?: number;
    onChange?: () => void;
};

const FilterPriceRange: FC<FilterPriceRangeProps> = ({ min = 0, max = 100, onChange }) => {
    const [isPending, startTransition] = useTransition();
    const [priceRange, setPriceRange] = useQueryState("price", false, "/cars");
    const [current, setCurrent] = useState<[number, number]>(parsedRange());
    const debouncedRange = useDebounce(current, 300);

    useEffect(() => {
        if (!priceRange && debouncedRange[0] === min && debouncedRange[1] === max) return;

        const [debouncedMin, debouncedMax] = [
            Math.max(min, debouncedRange[0]),
            Math.min(max, debouncedRange[1]),
        ];

        const newRange = `${debouncedMin}-${debouncedMax}`;

        if (newRange !== priceRange) {
            nProgress.start();
            startTransition(() => setPriceRange(newRange));
        }
    }, [debouncedRange, priceRange, min, max, setPriceRange]);


    const handleChange = ([newMin, newMax]: [number, number]) => {
        setCurrent([
            Math.max(min, Math.min(newMin, max)),
            Math.max(min, Math.min(newMax, max)),
        ]);
        if (onChange) onChange();
    };

    function parsedRange(): [number, number] {
        const parts = priceRange?.split("-").map(Number);
        if (parts?.length === 2 && !parts.some(isNaN)) {
            return [parts[0], parts[1]];
        }
        return [min, max];
    }


    return (
        <div className="w-full flex flex-col gap-2 text-lg">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-gray-500">
                    Price
                    {isPending && <Loader2 className="size-5 animate-spin text-gray-400" />}
                </div>
            </div>

            <Slider
                step={1}
                max={max}
                min={min}
                value={current}
                disabled={isPending}
                onValueChange={handleChange}
            />

            <div className="flex justify-between text-sm text-gray-600 mt-2">
                <span>Min: {current[0]}</span>
                <span>Max: {current[1]}</span>
            </div>
        </div>
    );
};

export default FilterPriceRange;
