"use client";

import { HeartIcon } from "lucide-react";
import { FC, useEffect, useState } from "react";
import { useAPIClient } from "@/hooks/useAPIClient";
import { useQuery } from "@tanstack/react-query";
import queryClient from "@/lib/queryClient";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";


type Props = {
  id?: number;
  noAction?: boolean;
};

const LikeButton: FC<Props> = ({ id }) => {
  const { get, post } = useAPIClient(true);
  const [isLiked, setIsLiked] = useState(false);
  const router = useRouter();
  const { data } = useQuery({
    queryKey: ["cars-likes"],
    queryFn: () => get<number[]>("/v1/favorites"),
  });


  useEffect(() => {
    setIsLiked(data?.some((carId) => carId === id) || false)
  }, [data, id]);


  return (
    <button
      data-liked={isLiked}
      className="group cursor-pointer"
      onClick={(e) => {
        e.stopPropagation();
        toast.promise(post(`/v1/favorites/${id}`), {
          loading: isLiked ? "Removing..." : "Adding...",
          success: (res) => {
            queryClient.invalidateQueries({ queryKey: ["cars-likes"] });
            queryClient.invalidateQueries({ queryKey: ["wishlist"] });
            router.refresh()
            return res.message
          },
          error: (error) => error.message
        })
      }}
    >
      <HeartIcon className="text-red-500 group-data-[liked=true]:fill-red-500" />
    </button>
  );
};

export default LikeButton;
