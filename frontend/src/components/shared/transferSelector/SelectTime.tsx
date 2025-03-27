import { DatePicker } from "@/components/shared/DatePicker";
import React from "react";

const SelectTime = () => {
  return (
    <label htmlFor="" className="flex flex-col">
      <span className="text-lg font-semibold">Time</span>
      <DatePicker />
    </label>
  );
};

export default SelectTime;
