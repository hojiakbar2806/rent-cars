

const SelectTime = () => {
  return (
    <label htmlFor="" className="flex flex-col gap-2 ">
      <span className="text-xs md:text-sm lg:text-lg font-semibold">Vaqt</span>
      <input type="time" className="text-sm md:text-lg lg:text-xl outline-none text-gray-500"/>
    </label>
  );
};

export default SelectTime;
