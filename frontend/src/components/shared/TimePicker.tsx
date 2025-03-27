"use client";

import * as React from "react";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { Button } from "react-day-picker";
import { Input } from "../ui/Input";

export function TimePicker() {
  const [date, setDate] = React.useState<Date | undefined>();
  const [time, setTime] = React.useState<string>("");

  return (
    <div className="flex flex-col gap-2">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            className={cn(
              "w-full justify-start text-left",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date ? format(date, "PPP") : "Sanani tanlang"}
          </Button>
        </PopoverTrigger>
        <PopoverContent align="start">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            initialFocus
          />
        </PopoverContent>
      </Popover>

      <Input
        type="time"
        value={time}
        onChange={(e) => setTime(e.target.value)}
        className="w-full"
      />
    </div>
  );
}
