from app.repositories.car_repository import CarRepository
from app.repositories.car_type_repository import CarTypeRepository


class FilterService:
    def __init__(self, car_repo: CarRepository, car_type_repo: CarTypeRepository):
        self.car_repo = car_repo
        self.car_type_repo = car_type_repo

    async def get_filter_data(self):
        car_types = await self.car_type_repo.get_all_car_types()
        min_price, max_price = await self.car_repo.get_minmax_prices()
        capacities = await self.car_repo.get_cars_capacities()

        return {
            "car_types": car_types,
            "max_price": max_price,
            "min_price": min_price,
            "capacities": capacities,
        }
