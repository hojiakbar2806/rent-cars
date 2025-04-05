import { getCarById } from "@/app/actions/cars/getCarById";
import { getPopularCars } from "@/app/actions/cars/getPopularCars";
import { getRecommendedCars } from "@/app/actions/cars/getRecommendedCars";
import CarDetail from "@/components/pages/car-detail/CarDetail";
import CarReview from "@/components/pages/car-detail/CarReviews";
import CarFilter from "@/components/pages/cars/carFilter/CarFilter";
import CarsSection from "@/components/shared/carCard/CarsSection";
import { Metadata } from "next";
import { FC } from "react";

type Props = {
  params: Promise<{ id: string }>;
};

const RentCarPage: FC<Props> = async ({ params }) => {
  const id = (await params).id;
  const [recents, recommends, carDetail] = await Promise.all([
    getRecommendedCars(),
    getPopularCars(),
    getCarById(+id),
  ]);

  return (
    <div className="flex">
      <CarFilter />
      <div className="w-full md:w-[calc(100%-320px)] flex flex-col gap-8 p-8">
        <CarDetail car={carDetail} />
        <CarReview />
        <CarsSection title="Recent Car" data={recents} scrollable />
        <CarsSection title="Recommended Car" data={recommends} scrollable />
      </div>
    </div>
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
