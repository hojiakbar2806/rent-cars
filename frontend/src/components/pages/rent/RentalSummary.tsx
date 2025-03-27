import { BASE_URL } from "@/lib/const";
import { CarItem } from "@/types/cars";
import Image from "next/image";
import { FC } from "react";

type Props = {
  data: CarItem;
};

const RentalSummary: FC<Props> = ({ data }) => {
  return (
    <div className="w-full md:w-[450px] bg-white p-4 flex flex-col gap-4 rounded-lg shadow">
      <h2 className="font-bold text-xl">Rental Summary</h2>
      <p className="text-sm text-slate-500 mt-2">
        Prices may change depending on the length of the rental and the price of
        your rental car.
      </p>

      <div className="flex items-center gap-4 mt-4">
        <figure className="w-32 aspect-video relative rounded-md overflow-hidden p-2">
          <Image
            src={`${BASE_URL}/${data.images[0]}`}
            width={247.5}
            height={110}
            className="relative z-50"
            alt="rent image"
          />
          <Image src="/images/ads-arrow-bg.png" fill alt="" className="z-0" />
        </figure>
        <div>
          <h2 className="text-xl font-bold text-slate-700">{data.name}</h2>
          <p className="text-sm text-slate-500">440+ Reviewer</p>
        </div>
      </div>

      <div className="w-full h-[1px] bg-slate-300" />

      <div className="flex justify-between items-center">
        <p className="text-slate-400">Subtotal</p>
        <p className="text-slate-600">${data.price_per_day}</p>
      </div>

      <div className="flex justify-between items-center">
        <p className="text-slate-400">Tax</p>
        <p className="text-slate-600">$0.00</p>
      </div>

      <label
        htmlFor="promo"
        className="w-full bg-slate-100 flex justify-between items-center p-4 rounded-md"
      >
        <input
          type="text"
          id="promo"
          className="flex-1 outline-none border-none"
          placeholder="Apply promo code"
        />
        <button className="cursor-pointer font-semibold">Apply now</button>
      </label>

      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold">Total Rental Price</h2>
          <p className="text-sm text-slate-500">
            Overall price and includes rental discount
          </p>
        </div>
        <p className="text-2xl font-bold">$80.00</p>
      </div>
    </div>
  );
};

export default RentalSummary;
