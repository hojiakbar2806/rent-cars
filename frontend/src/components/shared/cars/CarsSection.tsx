import { FC } from "react";
import RentCardWrapper from "./CardWrapper";
import { CarItem } from "@/types/cars";
import RentCarCard from "./CarCard";
import Link from "next/link";
import { Button } from "@/components/ui/button";

type Props = {
  data: CarItem[];
  scrollable?: boolean;
  title?: string;
  viewLink?: string;
  showMore?: boolean;
};

const CarsSection: FC<Props> = (props) => {
  return (
    <section className="flex items-center flex-col gap-5">
      {(props.title || props.viewLink) && (
        <div className="flex items-center justify-between w-full px-4">
          {props.title && <h1 className="text-2xl font-bold">{props.title}</h1>}
          {props.viewLink && (
            <Link
              href={props.viewLink}
              className="text-blue-500 hover:underline"
            >
              View all
            </Link>
          )}
        </div>
      )}
      <RentCardWrapper scrollable={props.scrollable}>
        {props.data.map((car) => (
          <RentCarCard car={car} key={car.id} scrollable={props.scrollable} />
        ))}
      </RentCardWrapper>
      {props.showMore && (
        <Button className="mt-5">
          <Link href={"props.viewLink"}>Show more car</Link>
        </Button>
      )}
    </section>
  );
};
export default CarsSection;
