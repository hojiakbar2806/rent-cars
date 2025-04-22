"use client";

import { HeartIcon } from "lucide-react";
import { FC } from "react";
import toast from "react-hot-toast";
import { useSession } from "@/hooks/useSession";
import queryClient from "@/lib/queryClient";
import { useAPIClient } from "@/hooks/useAPIClient";

type Props = {
  id?: number;
  is_liked?: boolean;
  invalidate?: string[]
  noAction?: boolean
};

const LikeButton: FC<Props> = ({ id, is_liked, invalidate, noAction }) => {
  const { session } = useSession();
  const { post } = useAPIClient()


  return (
    <button
      data-liked={is_liked}
      className="group cursor-pointer"
      onClick={async (e) => {
        if (!noAction) {
          e.stopPropagation()
          if (session?.access_token === null) {
            toast.error("Avval ro'yxatdan o'ting");
            return
          }

          toast.promise(post(`/v1/favorites/${id}`), {
            loading: "Liking...",
            success: (data) => {
              queryClient.invalidateQueries({ queryKey: invalidate });
              return data.message
            },
            error: "Avval ro'yxatdan o'ting",
          });
        }
      }}
    >
      <HeartIcon className="text-red-500 group-data-[liked=true]:fill-red-500" />
    </button>
  );
};

export default LikeButton;