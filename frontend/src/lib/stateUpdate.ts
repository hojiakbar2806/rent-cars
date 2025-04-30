export function updateSelectedCarTypes(
    selectedCarTypes: string[], 
    typeId: string
): string[] {
    if (selectedCarTypes.includes(typeId)) {
        return selectedCarTypes.filter(id => id !== typeId);
    } else {
        return [...selectedCarTypes, typeId];
    }
}

export function updateSelectedCapacities(
    selectedCapacities: number[], 
    capacity: number
): number[] {
    if (selectedCapacities.includes(capacity)) {
        return selectedCapacities.filter(cap => cap !== capacity);
    } else {
        return [...selectedCapacities, capacity];
    }
}

export function updatePriceRange(
    minPrice: number, 
    maxPrice: number, 
    newMinPrice: number, 
    newMaxPrice: number
): { minPrice: number, maxPrice: number } {
    return {
        minPrice: newMinPrice > maxPrice ? maxPrice : newMinPrice,
        maxPrice: newMaxPrice < minPrice ? minPrice : newMaxPrice,
    };
}
