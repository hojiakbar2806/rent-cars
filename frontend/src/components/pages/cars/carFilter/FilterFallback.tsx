import React from "react";

const FilterbarFallback = () => {
  return (
    <div className="h-[calc(100vh-80px)] flex sticky top-20 flex-col gap-8 w-80 border-r border-b border-gray-200 p-8">
      <div className="flex flex-col gap-2">
        <span className="text-gray-500 text-lg">Car Type</span>
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="flex items-center gap-2 py-1">
            <div className="size-5 rounded-full bg-blue-500 animate-pulse"></div>
            <div className="h-4 w-32 bg-blue-500 rounded-full animate-pulse"></div>
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-2">
        <span className="text-gray-500 text-lg">Capacity</span>
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="flex items-center gap-2 py-1">
            <div className="size-5 rounded-full bg-blue-500 animate-pulse"></div>
            <div className="h-4 w-32 bg-blue-500 rounded-full animate-pulse"></div>
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-2">
        <span className="text-gray-500 text-lg">Price</span>
        <div className="w-full h-2 bg-blue-500/30 rounded-full overflow-hidden">
          <div className="w-2/3 h-full bg-blue-500 rounded-full relative">
            <div className="size-5 bg-blue-500 rounded-full absolute right-0 top-1/2 transform -translate-y-1/2 animate-pulse"></div>
          </div>
        </div>
        <div className="flex justify-between mt-2 text-lg">
          <span>Loading...</span>
          <span>Loading...</span>
        </div>
      </div>
    </div>
  );
};

export default FilterbarFallback;
