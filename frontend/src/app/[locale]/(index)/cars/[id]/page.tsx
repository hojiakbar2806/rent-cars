import React, { FC } from 'react'
import CarDetail from '@/components/pages/car-detail/CarDetail'
import CarReviews from '@/components/pages/car-detail/CarReview'
import { externalApi } from '@/lib/api'
import { CarItem } from '@/types/cars'
import { Metadata } from 'next'
import { localeConfig } from '@/localization/localeConfig'
import CardWrapper from '@/components/shared/CardWrapper'
import CarsCard from '@/components/shared/CarCard'

type CarsPageProps = {
    params: Promise<{ id: string }>
}

export const generateStaticParams = async () => {
    const cars = await externalApi.get('/v1/cars').then(res => res.data as CarItem[])
    const params = [] as { locale: string, id: string }[]
    localeConfig.locales.forEach(locale => {
        cars.forEach(car => {
            params.push({ locale: locale, id: String(car.id) })
        })
    })
    return params
}

const CarsPage: FC<CarsPageProps> = async ({ params }) => {
    const id = (await params).id;
    const car = await externalApi.get(`/v1/cars/${id}`).then(res => res.data as CarItem)
    const cars = await externalApi.get(`/v1/cars?filter=recommend`).then(res => res.data as CarItem[])
    return (
        <div className='flex-1 flex flex-col gap-5 p-5'>
            <CarDetail car={car} />
            <CarReviews />
            <CardWrapper>
                {cars.map(car => (
                    <CarsCard car={car} key={car.id} />
                ))}
            </CardWrapper>
        </div>
    )
}

export default CarsPage

export const revalidate = 60

export const metadata: Metadata = {
    title: "Rent-cars page",
    description: "A simple rent site",
}