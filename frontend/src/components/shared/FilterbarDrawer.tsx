"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import useDrawerStore from "@/hooks/useDrawerStore";
import FilterCarType from "../pages/cars/carFilter/FilterCarType";
import FilterCapacity from "../pages/cars/carFilter/FilterCapacity";
import FilterRange from "../pages/cars/carFilter/FilterRange";
import { getCarFilters } from "@/app/actions/cars/getCarFilters";
import { useQuery } from "@tanstack/react-query";

const FilterbarDrawer = () => {
  const { filterbarDrawer, close } = useDrawerStore();
  const { data } = useQuery({
    queryKey: ["carFilters"],
    queryFn: getCarFilters,
    enabled: filterbarDrawer,
  });
  return (
    <Sheet
      open={filterbarDrawer}
      onOpenChange={(open) => (open ? open : close("filterbarDrawer"))}
    >
      <SheetContent side="left">
        <SheetHeader>
          <SheetTitle>Filters</SheetTitle>
        </SheetHeader>

        <div className="px-8">
          <FilterCarType data={data?.car_types} />
          <FilterCapacity data={data?.capacities} />
          <FilterRange max={data?.max_price} min={data?.min_price} />
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default FilterbarDrawer;
