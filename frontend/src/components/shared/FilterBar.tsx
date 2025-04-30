"use client";

import { FC } from "react";
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
            md:inset-auto md:bg-transparent md:static md:z-0 md:opacity-100 md:pointer-events-auto
            data-[open=true]:opacity-100 data-[open=true]:pointer-events-auto
            "
            onClick={() => close("filterbar")}
        >
            <div
                className="w-80 h-full fixed -left-full bg-white transition-all duration-300 ease-in-out
                md:static
                group-data-[open=true]:left-0">
                <div
                    className="top-0 sticky p-5 md:flex flex-col gap-5 items-start 
                    md:top-24
                    ">
                    <FilterCarType data={filters.car_types} />
                    <FilterCapacity data={filters.capacities} />
                    <FilterPriceRange max={filters.max_price} min={filters.min_price} />
                </div>
            </div>
        </div>
    );
};

export default FilterBar;
