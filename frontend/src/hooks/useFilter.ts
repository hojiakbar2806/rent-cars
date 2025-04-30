"use client"

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

interface FilterParams {
  minPrice: number;
  maxPrice: number;
  capacity: number[];
  carType: string[];
}

export const useFilter = (initialData: FilterParams) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [minPrice, setMinPrice] = useState<number>(initialData?.minPrice || 0);
  const [maxPrice, setMaxPrice] = useState<number>(initialData?.maxPrice || 500);
  const [capacity, setCapacity] = useState<number[]>(initialData?.capacity || []);
  const [carType, setCarType] = useState<string[]>(initialData?.carType || []);

  // Barcha filtrlarni URLga qo'shish
  useEffect(() => {
    const updateSearchParams = () => {
      const params = new URLSearchParams(searchParams.toString());

      params.set('min_price', minPrice.toString());
      params.set('max_price', maxPrice.toString());
      params.set('capacity', capacity.join(','));  // multiple values for capacity
      params.set('car_type', carType.join(','));    // multiple values for carType

      router.push(`?${params.toString()}`, { scroll: false });
    };

    updateSearchParams();
  }, [minPrice, maxPrice, capacity, carType, searchParams, router]);

  const toggleCapacity = (value: number) => {
    setCapacity((prev) =>
      prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]
    );
  };

  const toggleCarType = (value: string) => {
    setCarType((prev) =>
      prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]
    );
  };

  return {
    minPrice,
    maxPrice,
    capacity,
    carType,
    setMinPrice,
    setMaxPrice,
    toggleCapacity,
    toggleCarType
  };
};
