import { FC, ReactNode } from 'react'
import { externalApi } from '@/lib/api'
import { FilterData } from '@/types/filter'
import FilterBar from '@/components/shared/FilterBar'

type CarsLayoutProps = {
    children: ReactNode
}

const CarsLayout: FC<CarsLayoutProps> = async ({ children }) => {
    const filters = await externalApi.get("/v1/cars/filters").then(res => res.data) as FilterData;
    return (
        <div className='w-full flex'>
            <FilterBar filters={filters} />
            {children}
        </div>
    )
}

export default CarsLayout
