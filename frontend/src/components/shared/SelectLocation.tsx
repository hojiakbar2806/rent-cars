import * as React from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function SelectLocation() {
  return (
    <div>
      <span className="text-lg font-semibold">Manzillar</span>

      <Select>
        <SelectTrigger className="text-md text-gray-500 p-0 m-0 border-none shadow-none">
          <SelectValue placeholder="Manzil tanlang" className="ring-0"/>
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Manzillar</SelectLabel>
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
