"use client";

import { HeartIcon } from "lucide-react";
import { FC } from "react";

const LikeButton: FC<{ id: string; liked: boolean }> = ({ id, liked }) => {
  return (
    <button
      data-liked={liked}
      className="group cursor-pointer size-10 md:size-12"
      onClick={() => {
        console.log(id);
      }}
    >
      <HeartIcon className="text-red-500 group-data-[liked=true]:fill-red-500" />
    </button>
  );
};

export default LikeButton;
