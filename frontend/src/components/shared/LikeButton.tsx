"use client";

import { HeartIcon } from "lucide-react";
import { FC } from "react";
import toast from "react-hot-toast";
import postLike from "@/app/actions/cars/postLike";
import { useSession } from "@/hooks/useSession";
import queryClient from "@/lib/queryClient";

type Props = {
  id?: number;
  is_liked?: boolean;
  invalidate?: string[]
  noAction?: boolean
};

const LikeButton: FC<Props> = ({ id, is_liked, invalidate, noAction }) => {
  const { session } = useSession();


  return (
    <button
      data-liked={is_liked}
      className="group cursor-pointer"
      onClick={async (e) => {
        if (!noAction) {
          e.stopPropagation();
          toast.promise(postLike(id ?? 0, session?.token || null), {
            loading: "Liking...",
            success: (data) => {
              queryClient.invalidateQueries({ queryKey: invalidate });
              return data.message
            },
            error: (err) => err.message,
          });
        }
      }}
    >
      <HeartIcon className="text-red-500 group-data-[liked=true]:fill-red-500" />
    </button>
  );
};

export default LikeButton;