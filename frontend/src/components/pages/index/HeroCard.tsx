import { Button } from "@/components/ui/button";
import { BASE_URL } from "@/lib/const";
import Image from "next/image";
import { FC } from "react";

type Props = {
  image: string;
};

const HeroCard: FC<Props> = ({ image }) => (
  <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-indigo-700 to-indigo-900 p-8 text-white lg:block hidden">
    <div className="relative z-10">
      <h2 className="text-3xl font-bold mb-2 leading-tight">
        Easy way to rent a<br /> car at a low price
      </h2>
      <p className="text-white/90 mb-6">
        Providing cheap car rental services <br /> and safe and comfortable
        facilities.
      </p>
      <Button className="cursor-pointer"> Rental Car</Button>
    </div>
    <div className="w-full flex justify-center">
      <Image
        src={`${BASE_URL}/${image}`}
        alt="GTR Car"
        width={247.5}
        height={110}
        className="w-1/2"
      />
    </div>
  </div>
);

export default HeroCard;
