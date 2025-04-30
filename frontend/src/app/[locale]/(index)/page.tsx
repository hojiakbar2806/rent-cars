import HeroCard from '@/components/pages/index/HeroCard';
import PopularCars from '@/components/pages/index/PopularCars';
import RecommendCars from '@/components/pages/index/RecommendCars';
import TransferSelectorBar from '@/components/shared/TransferSelectorBar';
import { externalApi } from '@/lib/api';
import { CarItem } from '@/types/cars';

export default async function Page() {

    const [popularCars, recommendCars] = await Promise.all([
        externalApi.get("/v1/cars?filter=popular").then((res) => res.data as CarItem[]),
        externalApi.get("/v1/cars?filter=recommend").then((res) => res.data as CarItem[]),
    ])

    return (
        <div className="w-full p-5 flex flex-col gap-5">
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
            <PopularCars data={popularCars} />
            <RecommendCars data={recommendCars} />
        </div>
    );
}

export const revalidate = 60; 