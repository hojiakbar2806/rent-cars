import { getCarById } from "@/app/actions/cars/getCarById";
import { getPopularCars } from "@/app/actions/cars/getPopularCars";
import { getRecommendedCars } from "@/app/actions/cars/getRecommendedCars";
import CarDetail from "@/components/pages/car-detail/CarDetail";
import CarsSection from "@/components/shared/carCard/CarsSection";
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
    <div className="w-full flex flex-col gap-8 p-8">
      <CarDetail car={carDetail} />
      <CarsSection title="Recent Car" data={recents} scrollable />
      <CarsSection title="Recommended Car" data={recommends} scrollable />
    </div>
  );
};

export default RentCarPage;
