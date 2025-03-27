import { FC } from "react";
import { TransferSelectorBar } from "@/components/shared/transferSelector";
import HeroCard from "@/components/pages/index/HeroCard";
import { getRecommendedCars } from "@/app/actions/cars/getRecommendedCars";
import { getPopularCars } from "@/app/actions/cars/getPopularCars";
import CarsSection from "@/components/shared/carCard/CarsSection";

const HomePage: FC = async () => {
  const [recommends, populars] = await Promise.all([
    getRecommendedCars(),
    getPopularCars(),
  ]);

  const randomRecommendIndex = Math.floor(Math.random() * recommends.length);
  const randomPopularIndex = Math.floor(Math.random() * populars.length);

  return (
    <div className="bg-gray-100 p-8 flex flex-col gap-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <HeroCard image={recommends[randomRecommendIndex].images[0]} />
        <HeroCard image={populars[randomPopularIndex].images[0]} />
      </div>
      <TransferSelectorBar />
      <CarsSection
        title="Populars"
        data={populars}
        viewLink="/cars"
        scrollable
      />
      <CarsSection title="Recommended Car" data={populars} showMore />
    </div>
  );
};

export default HomePage;
