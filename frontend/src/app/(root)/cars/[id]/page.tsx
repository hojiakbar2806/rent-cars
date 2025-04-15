import { getCarById } from "@/app/actions/cars/getCarById";
import CarDetail from "@/components/pages/car-detail/CarDetail";
import CarReview from "@/components/pages/car-detail/CarReviews";
import CarFilter from "@/components/pages/cars/carFilter/CarFilter";
import Navbar from "@/components/shared/Navbar";
import PopularCars from "@/components/shared/PopularCars";
import RecommendedCars from "@/components/shared/RecommendCars";
import { Metadata } from "next";
import { FC, Fragment } from "react";

type Props = {
  params: Promise<{ id: string }>;
};

const RentCarPage: FC<Props> = async ({ params }) => {
  const id = (await params).id;
  return (
    <Fragment>
      <Navbar />
      <div className="w-full flex-1 flex flex-col overflow-scroll">
        <div className="w-full flex">
          <CarFilter />
          <div className="w-full md:max-w-[calc(100%-320px)] flex flex-col p-5 gap-5">
            <CarDetail id={+id} />
            <CarReview />
            <PopularCars />
            <RecommendedCars />
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default RentCarPage;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const id = (await params).id;
  const carDetail = await getCarById(+id);

  return {
    title: carDetail?.name,
    description: carDetail?.description,
    openGraph: {
      title: carDetail?.name,
      description: carDetail?.description,
      images: [carDetail?.images[0]],
    },
  };
}
