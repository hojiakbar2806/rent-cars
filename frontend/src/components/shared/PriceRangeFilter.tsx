import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

interface PriceRangeFilterProps {
    initialData: { min_price: number, max_price: number };
}

const PriceRangeFilter: React.FC<PriceRangeFilterProps> = ({ initialData }) => {
    const router = useRouter();
    const searchParams = useSearchParams();

    const [minPrice, setMinPrice] = useState<number>(initialData?.min_price || 0);
    const [maxPrice, setMaxPrice] = useState<number>(initialData?.max_price || 500);

    const handleMinPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = Number(e.target.value);
        if (value <= maxPrice) {
            setMinPrice(value);
        }
    };

    const handleMaxPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = Number(e.target.value);
        if (value >= minPrice) {
            setMaxPrice(value);
        }
    };

    useEffect(() => {
        const updateSearchParams = () => {
            const params = new URLSearchParams(searchParams.toString());

            params.set('min_price', minPrice.toString());
            params.set('max_price', maxPrice.toString());

            router.push(`?${params.toString()}`, { scroll: false });
        };

        updateSearchParams();
    }, [minPrice, maxPrice, searchParams, router]);

    return (
        <div>
            <h3 className="text-xl text-gray-700 font-medium mb-4">Price</h3>
            <div>
                <div className="relative pt-6 pb-6">
                    <input
                        type="range"
                        min={initialData?.min_price || 0}
                        max={initialData?.max_price || 500}
                        value={minPrice}
                        onChange={handleMinPriceChange}
                        className="absolute w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer transition-all duration-200 pointer-events-none"
                        style={{ zIndex: 1 }}
                    />
                    <input
                        type="range"
                        min={initialData?.min_price || 0}
                        max={initialData?.max_price || 500}
                        value={maxPrice}
                        onChange={handleMaxPriceChange}
                        className="absolute w-full h-2 bg-transparent rounded-lg appearance-none cursor-pointer transition-all duration-200"
                        style={{ zIndex: 2 }}
                    />
                </div>
                <div className="flex justify-between mt-2">
                    <span className="text-gray-700">Min: {minPrice}</span>
                    <span className="text-gray-700">Max: {maxPrice}</span>
                </div>
            </div>
        </div>
    );
};

export default PriceRangeFilter;
