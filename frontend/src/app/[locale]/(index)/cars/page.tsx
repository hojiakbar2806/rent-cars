import { FC } from 'react'
import { Metadata } from 'next'
import { CarItem } from '@/types/cars'
import { externalApi } from '@/lib/api'
import { toQueryString } from '@/lib/toQueryString'
import CarsCard from '@/components/shared/CarCard'
import CardWrapper from '@/components/shared/CardWrapper'
import TransferSelectorBar from '@/components/shared/TransferSelectorBar'

type CarsPageProps = {
    searchParams: Promise<Record<string, string>>
}

const CarsPage: FC<CarsPageProps> = async ({ searchParams }) => {
    const params = await searchParams
    const query = toQueryString(params)
    const cars = await externalApi.get(`/v1/cars?${query}`).then(res => res.data) as CarItem[]
    return (
        <div className='flex-1 flex flex-col gap-5 p-5'>
            <TransferSelectorBar />
            <CardWrapper>
                {cars.map(car => (
                    <CarsCard key={car.id} car={car} />
                ))}
            </CardWrapper>
        </div>
    )
}

export default CarsPage

export const metadata: Metadata = {
    title: "Rent-cars page",
    description: "A simple rent site",
}