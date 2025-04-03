import { DatePicker } from "@/components/shared/DatePicker";
import React from "react";

const SelectDate = () => {
  return (
    <label htmlFor="">
      <span className="text-xl font-semibold">Sana</span>
      <DatePicker />
    </label>
  );
};

export default SelectDate;
