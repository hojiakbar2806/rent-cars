import { FC, Fragment } from "react";
import { TransferSelectorBar } from "@/components/shared/transferSelector";
import HeroCard from "@/components/pages/index/HeroCard";
import { getRecommendedCars } from "@/app/actions/cars/getRecommendedCars";
import { getPopularCars } from "@/app/actions/cars/getPopularCars";
import CarsSection from "@/components/shared/carCard/CarsSection";
import Footer from "@/components/shared/Footer";

const HomePage: FC = async () => {
  const [recommends, populars] = await Promise.all([
    getRecommendedCars(),
    getPopularCars(),
  ]);

  const randomRecommendIndex = Math.floor(Math.random() * recommends.length);
  const randomPopularIndex = Math.floor(Math.random() * populars.length);

  const randomImg1 = recommends[randomRecommendIndex]?.images[0];
  const randomImg2 = populars[randomPopularIndex]?.images[0];

  return (
    <Fragment>
      <div className="bg-gray-100 p-8 flex flex-col gap-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <HeroCard
            image={randomImg1}
            bgImg="/images/ads-arrow-bg.png"
            btnClass="bg-blue-400 text-white hover:bg-blue-400/80"
            title="Avtomobil ijarasi uchun eng yaxshi platforma"
            description="Avtomobil ijarasini xavfsiz va ishonchli qilish qulayligi. Albatta, arzon narxda."
          />
          <HeroCard
            image={randomImg2}
            bgImg="/images/ads-circle-bg.png"
            btnClass="bg-blue-500 text-white hover:bg-blue-500/80"
            title="Avtomobilni arzon narxda ijaraga olishning oson usuli"
            description="Arzon avtomobil ijarasi xizmatlari va xavfsiz va qulay imkoniyatlarni taqdim etish."
          />
        </div>
        <TransferSelectorBar />
        <CarsSection
          title="Mashhur mashinalar"
          data={populars}
          viewLink="/cars"
          scrollable
        />
        <CarsSection
          title="Tavfsiya etilgan mashinalar"
          data={populars}
          showMore
        />
      </div>
      <Footer />
    </Fragment>
  );
};

export default HomePage;
