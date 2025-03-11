"use client";
import { FC, useState, useTransition } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { useQueryState } from "@/hooks/useQueryState";
import { Loader2 } from "lucide-react";
import NProgress from "nprogress";

interface Props {
  data: { id: number; name: string; count: number }[];
}

const FilterCarType: FC<Props> = ({ data }) => {
  const [filterCarType, setFilterCarType] = useQueryState("car_type", true);
  const [isPending, startTransition] = useTransition();
  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  const handleClick = (name: string) => {
    setSelectedItem(name);
    NProgress.start();
    startTransition(() => {
      setFilterCarType(name);
    });
  };

  return (
    <div className="flex flex-col gap-2 text-lg">
      <span className="text-gray-500">Car Type</span>
      {data.map((item, i) => {
        const isActive = filterCarType.includes(item.name);
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
            <span className="text-gray-400">({item.count})</span>
          </div>
        );
      })}
    </div>
  );
};

export default FilterCarType;
