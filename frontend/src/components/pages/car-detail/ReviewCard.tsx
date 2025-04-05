import StarsRating from "@/components/shared/StarsRating";
import React from "react";

const ReviewCard = () => {
  return (
    <div className="flex items-start gap-4">
      <div className="bg-blue-400 rounded-full size-14 shrink-0"></div>
      <div className="flex-1 flex flex-col gap-2">
        <div className="flex justify-between">
          <div>
            <h2 className="font-semibold text-lg">Alex Stanton</h2>
            <h3 className="text-slate-400">CEO at Bukalapak</h3>
          </div>
          <div>
            <h2 className="text-slate-400">21 July 2022</h2>
            <StarsRating value={5}/>
          </div>
        </div>
        <p className="text-slate-400">
          We are very happy with the service from the MORENT App. Morent has a
          low price and also a large variety of cars with good and comfortable
          facilities. In addition, the service provided by the officers is also
          very friendly and very polite.
        </p>
      </div>
    </div>
  );
};

export default ReviewCard;
