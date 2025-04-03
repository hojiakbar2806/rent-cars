"use client";

import { SelectLocation } from "./SelectLocation";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import SelectDate from "./SelectDate";
import SelectTime from "./SelectTime";

export default function TransferSelectorBar() {
  return (
    <div className="w-full flex flex-col xl:flex-row items-center justify-between">
      <div className="flex-1 w-full xl:w-auto flex flex-col bg-white rounded-lg px-6 pt-6 pb-4 gap-2">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-blue-500/30 rounded-full grid place-items-center">
            <span className="w-2 h-2 bg-blue-500 rounded-full" />
          </div>
          <label htmlFor="pick-up" className="font-semibold text-lg">
            Olib ketish - ko'tarish
          </label>
        </div>
        <div className="w-full flex justify-between">
          <SelectLocation />
          <SelectDate />
          <SelectTime />
        </div>
      </div>

      <Button className="scale-150 aspect-square relative">
        <ArrowUpDown size={15} strokeWidth={1.5} className="absolute" />
      </Button>

      <div className="flex-1 w-full xl:w-auto flex flex-col bg-white rounded-lg px-6 pt-6 pb-4 gap-2">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-blue-500/30 rounded-full grid place-items-center">
            <span className="w-2 h-2 bg-blue-500 rounded-full" />
          </div>
          <label htmlFor="pick-up" className="font-semibold text-lg">
            Olib ketish - ko'tarish
          </label>
        </div>
        <div className="w-full flex justify-between">
          <SelectLocation />
          <SelectDate />
          <SelectTime />
        </div>
      </div>
    </div>
  );
}
