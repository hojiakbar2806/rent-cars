"use client";
import { FC, useState, useTransition } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { useQueryState } from "@/hooks/useQueryState";
import { Loader2 } from "lucide-react";
import NProgress from "nprogress";

interface Props {
    data?: number[];
    onChange?: () => void;
}

const FilterCapacity: FC<Props> = ({ data }) => {
    const [capacity, setCapacity, clear] = useQueryState(
        "capacity",
        true,
        "/cars"
    );
    const [isPending, startTransition] = useTransition();
    const [selectedItem, setSelectedItem] = useState<number | null>(null);

    const handleClick = (item: number) => {
        setSelectedItem(item);
        NProgress.start();
        startTransition(() => setCapacity(item.toString()));
    };

    const clearFilters = () => {
        NProgress.start();
        startTransition(() => clear());
    };

    return (
        <div className="w-full flex flex-col gap-2 text-lg">
            <div className="w-full flex justify-between items-center">
                <span className="text-gray-500">Capacity</span>
                {capacity.length > 0 && (
                    <button
                        onClick={clearFilters}
                        className="text-red-500 cursor-pointer text-sm hover:text-red-700 transition-all flex items-center gap-1"
                    >
                        Clear
                    </button>
                )}
            </div>
            {data?.map((item, i) => {
                const isActive = capacity.includes(item.toString());
                const isLoading = isPending && selectedItem === item;

                return (
                    <div
                        key={i}
                        data-loading={isLoading}
                        className="flex items-center gap-2 cursor-pointer font-semibold text-xl text-zinc-500
            data-[loading=true]:pointer-events-none"
                        onClick={() => handleClick(item)}
                    >
                        {isLoading ? (
                            <Loader2 className="size-5 animate-spin text-gray-400" />
                        ) : (
                            <Checkbox
                                className="size-5 cursor-pointer transition-all duration-300"
                                checked={isActive}
                            />
                        )}
                        <p className="flex">Yo&apos;lovchi</p>
                        <span className="text-gray-400">({item})</span>
                    </div>
                );
            })}
        </div>
    );
};

export default FilterCapacity;