import StarsRating from "@/components/shared/StarsRating";
import React from "react";

const ReviewCard = () => {
    return (
        <div className="flex items-start gap-4">
            <div className="bg-blue-400 rounded-full size-14 shrink-0"></div>
            <div className="flex-1 flex flex-col gap-2">
                <div className="flex justify-between">
                    <div>
                        <h2 className="font-semibold text-lg">Muhammad Ali</h2>
                        <h3 className="text-slate-400">Boshliq</h3>
                    </div>
                    <div>
                        <h2 className="text-slate-400">21 July 2022</h2>
                        <StarsRating value={5} />
                    </div>
                </div>
                <p className="text-slate-400">
                    Biz MORENT ilovasining xizmatidan juda mamnunmiz. Morent bor
                    past narx, shuningdek, yaxshi va qulay avtomobillarning katta assortimenti
                    ob'ektlar. Bundan tashqari, ofitserlar tomonidan ko'rsatiladigan xizmat ham
                    juda samimiy va juda muloyim.
                </p>
            </div>
        </div>
    );
};

export default ReviewCard;