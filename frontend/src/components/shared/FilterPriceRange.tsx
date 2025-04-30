"use client";

import { useDebounce } from "@/hooks/useDebounce";
import { FC, useEffect, useRef, useState, useTransition } from "react";
import { Slider } from "@/components/ui/slider";
import { useQueryState } from "@/hooks/useQueryState";
import { Loader2 } from "lucide-react";
import NProgress from "nprogress";
import { usePathname } from "next/navigation";

type FilterPriceRangeProps = {
    min?: number;
    max?: number;
    onChange?: () => void;
};

const FilterPriceRange: FC<FilterPriceRangeProps> = ({ min = 0, max = 100, onChange }) => {
    const [isPending, startTransition] = useTransition();
    const [priceRange, setPriceRange] = useQueryState("price", false, "/cars");
    const parsedRange = priceRange?.split("-").map(Number) ?? [min, max];
    const [current, setCurrent] = useState<[number, number]>([
        isNaN(parsedRange[0]) ? min : parsedRange[0],
        isNaN(parsedRange[1]) ? max : parsedRange[1],
    ]);
    const debouncedRange = useDebounce(current, 300);
    const hasChanged = useRef(false);
    const pathname = usePathname();

    useEffect(() => { hasChanged.current = false }, [pathname]);

    useEffect(() => {
        if (hasChanged.current) {
            const [debouncedMin, debouncedMax] = [
                Math.max(min, debouncedRange[0]),
                Math.min(max, debouncedRange[1]),
            ];

            const newRange = `${debouncedMin}-${debouncedMax}`;

            if (newRange !== priceRange) {
                NProgress.start();
                startTransition(() => setPriceRange(newRange));
            }
        }
        hasChanged.current = true
    }, [debouncedRange, priceRange, min, max, setPriceRange]);

    const handleChange = ([newMin, newMax]: [number, number]) => {
        setCurrent([
            Math.max(min, Math.min(newMin, max)),
            Math.max(min, Math.min(newMax, max)),
        ]);
        hasChanged.current = false
        if (onChange) onChange();
    };

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
