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
        <div
            className="w-full p-2 flex flex-col gap-2
            sm:p-5 sm:gap-5">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <HeroCard
                    image="/images/06a792ba-4b14-4aec-b18b-0f9d66db1a91.png"
                    bgImg="/images/ads-arrow-bg.png"
                    btnClass="bg-blue-400 text-white hover:bg-blue-400/80"
                    title="Avtomobil ijarasi uchun eng yaxshi platforma"
                    description="Avtomobil ijarasini xavfsiz va ishonchli qilish qulayligi. Albatta, arzon narxda."
                />
                <HeroCard
                    image="/images/35827b2d-06df-4428-8ea2-80ba9713c00c.png"
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

export const revalidate = 3600; 