"use client";
import { FC, useState, useTransition } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { useQueryState } from "@/hooks/useQueryState";
import { Loader2 } from "lucide-react";
import NProgress from "nprogress";
import { IFilterCarType } from "@/types/filter";

interface Props {
    data?: IFilterCarType[];
    onChange?: () => void;
}

const FilterCarType: FC<Props> = ({ data, onChange }) => {
    const [carType, setCarType, clear] = useQueryState("car_type", true, "/cars");
    const [isPending, startTransition] = useTransition();
    const [selectedItem, setSelectedItem] = useState<string | null>(null);

    const handleClick = (name: string) => {
        setSelectedItem(name);
        NProgress.start();
        startTransition(() => { setCarType(name) });
        if (onChange) onChange();
    };

    const clearFilters = () => {
        NProgress.start();
        startTransition(() => { clear() });
    };

    return (
        <div className="w-full flex flex-col gap-2 text-lg">
            <div className="w-full flex justify-between items-center">
                <span className="text-gray-500">Car Type</span>
                {carType.length > 0 && (
                    <button
                        onClick={clearFilters}
                        className="text-red-500 cursor-pointer text-sm hover:text-red-700 transition-all flex items-center gap-1"
                    >
                        Clear
                    </button>
                )}
            </div>

            {data?.map((item, i) => {
                const isActive = carType.includes(item.name);
                const isLoading = isPending && selectedItem === item.name;

                return (
                    <div
                        key={i}
                        data-loading={isLoading}
                        className="flex items-center gap-2 cursor-pointer font-semibold text-xl text-zinc-500
                        data-[loading=true]:pointer-events-none"
                        onClick={(e) => {
                            e.preventDefault();
                            handleClick(item.name);
                        }}
                    >
                        {isLoading ? (
                            <Loader2 className="size-5 animate-spin text-gray-400" />
                        ) : (
                            <Checkbox
                                className="size-5 cursor-pointer transition-all duration-300"
                                checked={isActive}
                            />
                        )}
                        <p className="flex">{item.name}</p>
                        <span className="text-gray-400">({item.cars_count})</span>
                    </div>
                );
            })}
        </div>
    );
};

export default FilterCarType;