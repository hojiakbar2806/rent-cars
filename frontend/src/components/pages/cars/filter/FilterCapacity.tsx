"use client";
import { FC, useState, useTransition } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { useQueryState } from "@/hooks/useQueryState";
import { Loader2 } from "lucide-react";
import NProgress from "nprogress";

interface Props {
  data: number[];
}

const FilterCapacity: FC<Props> = ({ data }) => {
  const [filterCapacity, setFilterCapacity] = useQueryState("capacity", true);
  const [isPending, startTransition] = useTransition();
  const [selectedItem, setSelectedItem] = useState<number | null>(null);

  const handleClick = (item: number) => {
    setSelectedItem(item);
    NProgress.start();
    startTransition(() => {
      setFilterCapacity(item.toString());
    });
  };
  return (
    <div className="flex flex-col gap-2 text-lg">
      <span className="text-gray-500">Capacity</span>
      {data.map((item, i) => {
        const isActive = filterCapacity.includes(item.toString());
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
