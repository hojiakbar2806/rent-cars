import { FC } from "react"
import Link from "next/link"
import { CarItem } from "@/types/cars"
import CarsCard from "@/components/shared/CarCard"
import CardWrapper from "@/components/shared/CardWrapper"

type PopularCarsProps = {
    data: CarItem[]
}

const PopularCars: FC<PopularCarsProps> = async ({ data }) => {

    return (
        <div className="w-full flex flex-col">
            <div className="flex justify-between py-5">
                <h2 className="text-lg sm:text-xl md:text-2xl font-bold">Mashhur mashinalar</h2>
                <Link href="/cars" className="text-blue-500 hover:underline">Hammasini ko'rish</Link>
            </div>
            <CardWrapper scrollable>
                {data.map((car) => (<CarsCard car={car} key={car.id} />))}
            </CardWrapper>
        </div>
    )
}

export default PopularCars
