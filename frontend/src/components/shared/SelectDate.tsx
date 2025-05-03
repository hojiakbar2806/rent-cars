import React from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { ChevronDown } from "lucide-react";
import { Calendar } from "../ui/calendar";
import { format } from "date-fns";


const SelectDate = () => {
  const date = new Date();
  return (
    <div className="flex flex-col gap-2">
      <span className="text-xs md:text-sm lg:text-lg font-semibold">Sana</span>
      <Popover>
        <PopoverTrigger asChild>
          <button className="flex items-center justify-between text-gray-500 text-sm md:text-lg">
            {date ? format(date, "dd MMMM yyyy") : "Sana tanlang"}
            <ChevronDown className="ml-1 h-4 w-4" />
          </button>
        </PopoverTrigger>
        <PopoverContent>
          <Calendar mode="single" />
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default SelectDate;


