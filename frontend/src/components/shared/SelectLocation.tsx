import * as React from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
} from "@/components/ui/select";

export function SelectLocation() {
  return (
    <div className="flex flex-col gap-2">
      <span className="text-xs md:text-sm lg:text-lg font-semibold">Manzillar</span>

      <Select>
        <SelectTrigger className="flex gap-1 text-md text-gray-500 p-0 m-0 border-none shadow-none h-auto">
          <span className="text-sm md:text-lg">Manzil tanlang</span>
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel className="text-xs">Manzillar</SelectLabel>
            <SelectItem value="apple">Toshkent</SelectItem>
            <SelectItem value="banana">Samarqand</SelectItem>
            <SelectItem value="blueberry">Andijon</SelectItem>
            <SelectItem value="grapes">Sirdaryo</SelectItem>
            <SelectItem value="pineapple">Namangan</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
