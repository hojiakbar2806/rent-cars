from app.repositories.car_repository import CarRepository
from app.schemas.rent_car import CarCreate, CarResponse, CarUpdate

class CarService:
    def __init__(self, repo: CarRepository):
        self.repo = repo

    async def create_car(self, car: CarCreate) -> CarResponse:
        if not car.name:
            raise 
        new_car = await self.repo.create_car(car)
        return CarResponse.model_validate(new_car)

    async def get_car(self, car_id: int) -> CarResponse:
        car = await self.repo.get_car(car_id)
        return CarResponse.model_validate(car)

    async def get_all_cars(self) -> list[CarResponse]:
        cars = await self.repo.get_all_cars()
        return [CarResponse.model_validate(car) for car in cars]

    async def update_car(self, car_id: int, car_data: CarUpdate) -> CarResponse:
        updated_car = await self.repo.update_car(car_id, car_data)
        return CarResponse.model_validate(updated_car)

    async def delete_car(self, car_id: int) -> bool:
        return await self.repo.delete_car(car_id)
