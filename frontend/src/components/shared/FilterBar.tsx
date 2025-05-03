"use client";

import { FC, Suspense } from "react";
import FilterCarType from "./FilterCarType";
import FilterCapacity from "./FilterCapacity";
import FilterPriceRange from "./FilterPriceRange";
import { FilterData } from "@/types/filter";
import useDrawerStore from "@/hooks/useDrawerStore";

type FilterBarProps = {
    filters: FilterData;
}

const FilterBar: FC<FilterBarProps> = ({ filters }) => {
    const { filterbar, close } = useDrawerStore();

    return (
        <div
            data-open={filterbar}
            className="group inset-0 fixed bg-black/30 z-50 transition-opacity duration-300 ease-in-out cursor-pointer opacity-0 pointer-events-none
            lg:inset-auto lg:bg-transparent lg:static lg:z-0 lg:opacity-100 lg:pointer-events-auto
            data-[open=true]:opacity-100 data-[open=true]:pointer-events-auto"
            onClick={() => close("filterbar")}
        >
            <div
                className="w-80 h-full fixed -left-full bg-white transition-all duration-300 ease-in-out
                lg:static
                group-data-[open=true]:left-0">
                <div
                    className="top-0 sticky p-5 lg:flex flex-col gap-5 items-start 
                    lg:top-24
                    ">
                    <Suspense>
                        <FilterCarType data={filters.car_types} />
                    </Suspense>
                    <Suspense>
                        <FilterCapacity data={filters.capacities} />
                    </Suspense>
                    <Suspense>
                        <FilterPriceRange max={filters.max_price} min={filters.min_price} />
                    </Suspense>
                </div>
            </div>
        </div>
    );
};

export default FilterBar;
