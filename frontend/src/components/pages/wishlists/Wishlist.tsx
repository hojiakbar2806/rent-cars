"use client"

import CarsCard from '@/components/shared/CarCard'
import CarCardSkeleton from '@/components/shared/CarCardSkeleton'
import CardWrapper from '@/components/shared/CardWrapper'
import { useQuery } from '@tanstack/react-query'
import useApi from '@/hooks/useApi'
import { CarItem } from '@/types/cars'

const Wishlist = () => {
    const { get } = useApi(true)
    const { data, isLoading } = useQuery({
        queryKey: ['wishlist'],
        queryFn: () => get<CarItem[]>('/v1/favorites'),
        select(res) { return res.data },
    })

    return (
        <>
            <CardWrapper>
                {isLoading ? (
                    Array(6).fill(0).map((_, i) => <CarCardSkeleton key={i} />)) :
                    data?.map((car) => <CarsCard key={car.id} car={car} />)}
            </CardWrapper>
            {data?.length === 0 && <h1 className="text-2xl text-center">You have no cars in your wishlist</h1>}
        </ >
    )
}

export default Wishlist
