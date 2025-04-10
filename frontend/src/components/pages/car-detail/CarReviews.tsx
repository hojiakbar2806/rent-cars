"use client";

import { useEffect, useState } from "react";
import ReviewCard from "./ReviewCard";
import { ChevronDown } from "lucide-react";

const CarReviews = () => {
  const [showAll, setShowAll] = useState(false);
  const [reviews, setReviews] = useState<number[] | null>(null);

  useEffect(() => {
    if (showAll) {
      setReviews([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    } else {
      setReviews([1, 2, 3]);
    }
    console.log("object");
  }, [showAll]);

  return (
    <div className="flex flex-col p-5 gap-4 bg-white rounded-lg">
      <div className="flex gap-4">
        <h1 className="text-lg font-semibold">Reviews</h1>
        <span className="py-1 px-3 text-white rounded bg-blue-600">13</span>
      </div>

      {reviews?.map((i) => <ReviewCard key={i} />) ?? "loading"}

      <button
        className="text-blue-600 cursor-pointer flex mx-auto font-semibold"
        onClick={() => setShowAll(!showAll)}
      >
        {showAll ? "Show less" : "Show all"}
        <ChevronDown className={showAll ? "rotate-180" : ""} />
      </button>
    </div>
  );
};

export default CarReviews;
