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
      <h2 className="font-bold text-xl">Ijara haqida xulosa</h2>
      <p className="text-sm text-slate-500 mt-2">
        Narxlar ijara muddati va narxiga qarab o'zgarishi mumkin sizning ijara
        mashinangiz.
      </p>

      <div className="flex items-center gap-4 mt-4">
        <figure className="w-32 aspect-video relative rounded-md overflow-hidden p-2">
          <Image
            src={`${BASE_URL}/${data.images[0]}`}
            width={247.5}
            height={110}
            className="relative z-40"
            alt="rent image"
          />
          <Image src="/images/ads-arrow-bg.png" fill alt="" className="z-0" />
        </figure>
        <div>
          <h2 className="text-xl font-bold text-slate-700">{data.name}</h2>
          <p className="text-sm text-slate-500">440+ Ko'ruvchilar</p>
        </div>
      </div>

      <div className="w-full h-[1px] bg-slate-300" />

      <div className="flex justify-between items-center">
        <p className="text-slate-400">Jami narx</p>
        <p className="text-slate-600">{data.price_per_day} ming</p>
      </div>

      <div className="flex justify-between items-center">
        <p className="text-slate-400">Soliq</p>
        <p className="text-slate-600">5 ming</p>
      </div>

      <label
        htmlFor="promo"
        className="w-full bg-slate-100 flex justify-between items-center p-4 rounded-md"
      >
        <input
          type="text"
          id="promo"
          className="flex-1 outline-none border-none"
          placeholder="Promo kodni kiriting"
        />
        <button className="cursor-pointer font-semibold">Olish</button>
      </label>

      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold">Umumiy ijara narxi</h2>
          <p className="text-sm text-slate-500">
            Umumiy narx va ijara chegirmasini o'z ichiga oladi
          </p>
        </div>
        <p className="text-2xl font-bold">80 ming</p>
      </div>
    </div>
  );
};

export default RentalSummary;
