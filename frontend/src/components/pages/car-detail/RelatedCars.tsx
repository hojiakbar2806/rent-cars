import CarsCard from '@/components/shared/CarCard'
import CardWrapper from '@/components/shared/CardWrapper'
import { CarItem } from '@/types/cars'
import Link from 'next/link'
import React, { FC } from 'react'

const RelatedCars: FC<{ cars: CarItem[], type: string }> = ({ cars, type }) => {
    return (
        <div>
            <div className='flex justify-between items-center'>
                <h2 className='text-lg sm:text-xl md:text-2xl font-bold py-2'>O'xshash mashinalar</h2>
                <Link href={`/cars/?car_type=${type}`} className='text-blue-500 hover:underline'>Hammasini ko'rish</Link>
            </div>
            <CardWrapper scrollable>
                {cars.map((car) => <CarsCard key={car.id} car={car} />)}
            </CardWrapper>
        </div>
    )
}

export default RelatedCars
