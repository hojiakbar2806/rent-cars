"use client";

import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";
import ReviewCard from "./ReviewCard";

const CarReviews = () => {
    const [showAll, setShowAll] = useState(false);
    const [reviews, setReviews] = useState<number[]>([1, 2, 3]);

    useEffect(() => {
        if (showAll) {
            setReviews([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
        } else {
            setReviews([1, 2, 3]);
        }
    }, [showAll]);

    return (
        <div className="flex flex-col p-5 gap-4 bg-white rounded-lg">
            <div className="flex gap-4">
                <h1 className="text-lg font-semibold">Sharh</h1>
                <span className="py-1 px-3 text-white rounded bg-blue-600">13</span>
            </div>

            {reviews.map((i) => <ReviewCard key={i} />)}

            <button
                className="text-blue-600 cursor-pointer flex mx-auto font-semibold"
                onClick={() => setShowAll(!showAll)}
            >
                {showAll ? "Kamroq ko'rsatish" : "Ko'proq ko'rsatish"}
                <ChevronDown className={showAll ? "rotate-180" : ""} />
            </button>
        </div>
    );
};

export default CarReviews;