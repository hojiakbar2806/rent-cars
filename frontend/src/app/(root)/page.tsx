import { FC } from "react";
import RecommendCars from "@/components/pages/index/RecommendCars";
import { fetchCars } from "../actions/product";
import PopularCars from "@/components/pages/index/PopularCars";

const HomePage: FC = async () => {
  const [recommends, populars] = await Promise.all([
    fetchCars(""),
    fetchCars(""),
  ]);
  return (
    <div className="bg-gray-100 p-8">
      <PopularCars data={populars} />;
      <RecommendCars data={recommends} />
    </div>
  );
};

export default HomePage;
