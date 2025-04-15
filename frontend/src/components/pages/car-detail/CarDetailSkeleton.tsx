import LikeButton from "@/components/shared/LikeButton";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";

export const CarDetailSkeleton = () => {
    return (
        <div className="flex flex-col lg:flex-row gap-8 animate-pulse">
            <div className="w-full lg:w-1/2 aspect-[320/230] flex flex-col gap-4">
                <Image
                    src="/icons/gallery.svg"
                    width={50}
                    height={50}
                    alt="gallery"
                    className="size-16 mt-auto mx-auto"
                />

                <div className="mt-auto w-full h-16 flex gap-4 justify-between items-center rounded-xl">
                    {[...Array(4)].map((_, i) => (
                        <div key={i} className="flex-1 h-full bg-blue-500 rounded-xl" />
                    ))}
                </div>
            </div>

            <div className="w-full lg:w-1/2 flex flex-col gap-6 bg-white rounded-xl p-4">
                <div className="flex justify-between items-start">
                    <div className="h-6 w-1/3 bg-blue-400 rounded-full" />
                    <LikeButton noAction />
                </div>
                <div className="flex gap-2 items-center mt-2">
                    <div className="h-4 w-24 bg-blue-400 rounded-full" />
                    <div className="h-4 w-32 bg-blue-50 rounded-full" />
                </div>

                <div className="space-y-2 my-auto">
                    <div className="h-4 w-full bg-blue-400 rounded-full" />
                    <div className="h-4 w-5/6 bg-blue-400 rounded-full" />
                </div>

                <div className="grid grid-cols-4 gap-y-2 gap-x-4">
                    {[...Array(8)].map((_, i) => (
                        <div key={i} className="h-4 bg-blue-400 rounded-full" />
                    ))}
                </div>

                <div className="flex justify-between items-center mt-auto">
                    <div>
                        <div className="h-6 w-32 bg-blue-400 rounded-full" />
                        <div className="h-4 w-24 bg-blue-50 rounded-full mt-1" />
                    </div>
                    <Button>Band qilish</Button>
                </div>
            </div>
        </div>
    );
};

export default CarDetailSkeleton;