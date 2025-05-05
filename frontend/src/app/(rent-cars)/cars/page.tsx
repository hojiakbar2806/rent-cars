import { FC } from 'react'
import { Metadata } from 'next'
import { toQueryString } from '@/lib/toQueryString'
import CarsCard from '@/components/shared/CarCard'
import CardWrapper from '@/components/shared/CardWrapper'
import TransferSelectorBar from '@/components/shared/TransferSelectorBar'
import FilterBar from '@/components/shared/FilterBar'
import { getCarsWithParams } from '@/app/actions/cars/getCarsWithParams'
import { getCarsFilter } from '@/app/actions/cars/getCarsFilter'

type CarsPageProps = {
    searchParams: Promise<Record<string, string>>
}

const CarsPage: FC<CarsPageProps> = async ({ searchParams }) => {
    const params = await searchParams
    const query = toQueryString(params)
    const [cars, filters] = await Promise.all([getCarsWithParams(query), getCarsFilter()])

    return (
        <div className='w-full flex'>
            <FilterBar filters={filters} />
            <div className='flex-1 flex flex-col gap-5 p-5'>
                <TransferSelectorBar />
                <CardWrapper>
                    {cars.map(car => (<CarsCard key={car.id} car={car} />))}
                </CardWrapper>
            </div>
        </div>
    )
}

export default CarsPage

export const metadata: Metadata = {
    title: "Rent-cars page",
    description: "A simple rent site",
}