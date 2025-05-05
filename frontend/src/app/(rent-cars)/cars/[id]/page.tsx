import React, { FC } from 'react'
import CarDetail from '@/components/pages/car-detail/CarDetail'
import CarReviews from '@/components/pages/car-detail/CarReview'
import { externalApi } from '@/lib/api'
import { CarItem } from '@/types/cars'
import { Metadata } from 'next'
import { localeConfig } from '@/localization/localeConfig'
import RelatedCars from '@/components/pages/car-detail/RelatedCars'

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
    const [car, cars] = await Promise.all([
        externalApi.get(`/v1/cars/${id}`).then(res => res.data as CarItem),
        externalApi.get(`/v1/cars?filter=recommend`).then(res => res.data as CarItem[]),
    ])
    return (
        <div className='w-full flex flex-col gap-5 p-5'>
            <CarDetail car={car} />
            <CarReviews />
            <RelatedCars cars={cars} type={car.car_type.name} />
        </div>
    )
}

export default CarsPage

export const revalidate = 3600

export const metadata: Metadata = {
    title: "Rent-cars page",
    description: "A simple rent site",
}