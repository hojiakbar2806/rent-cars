import { FC } from "react";
import HeroCard from "@/components/pages/index/HeroCard";
import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/Navbar";
import TransferSelectorBar from "@/components/shared/TransferSelectorBar";
import PopularCars from "@/components/shared/PopularCars";
import queryClient from "@/lib/queryClient";
import HydrateProvider from "@/components/providers/HydrateProvider";
import { getCars } from "../actions/cars/getCars";
import RecommentdedCars from "@/components/shared/RecommendCars";

const HomePage: FC = () => {
  queryClient.prefetchQuery({
    queryKey: ["popularCars"],
    queryFn: () => getCars("popular")
  })


  return (
    <HydrateProvider state={queryClient}>
      <Navbar />
      <div className="flex-1 flex flex-col overflow-scroll">
        <div className="bg-gray-100 p-8 flex flex-col gap-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <HeroCard
              image={"https://rent-cars.hojiakbar.me/api/uploads/d7d4e42f-4905-4837-8782-706dd51a3cb1.png"}
              bgImg="/images/ads-arrow-bg.png"
              btnClass="bg-blue-400 text-white hover:bg-blue-400/80"
              title="Avtomobil ijarasi uchun eng yaxshi platforma"
              description="Avtomobil ijarasini xavfsiz va ishonchli qilish qulayligi. Albatta, arzon narxda."
            />
            <HeroCard
              image={"https://rent-cars.hojiakbar.me/api/uploads/c5bee4c7-dbe7-4060-a986-fa146931536a.png"}
              bgImg="/images/ads-circle-bg.png"
              btnClass="bg-blue-500 text-white hover:bg-blue-500/80"
              title="Avtomobilni arzon narxda ijaraga olishning oson usuli"
              description="Arzon avtomobil ijarasi xizmatlari va xavfsiz va qulay imkoniyatlarni taqdim etish."
            />
          </div>
          <TransferSelectorBar />
          <PopularCars />
          <RecommentdedCars />
        </div>
        <Footer />
      </div>
    </HydrateProvider>
  );
};

export default HomePage;
