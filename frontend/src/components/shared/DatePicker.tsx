import { useState } from "react";
import { format } from "date-fns";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { ChevronDown } from "lucide-react";

export function DatePicker() {
  const [date, setDate] = useState<Date | undefined>();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button className="flex items-center justify-between text-md text-gray-500 py-2">
          {date ? format(date, "dd MMMM yyyy") : "Sana tanlang"}
          <ChevronDown className="ml-2 h-4 w-4" />
        </button>
      </PopoverTrigger>
      <PopoverContent>
        <Calendar mode="single" selected={date} onSelect={setDate} />
      </PopoverContent>
    </Popover>
  );
}
