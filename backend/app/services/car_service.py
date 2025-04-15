from fastapi import HTTPException
from sqlalchemy.orm import selectinload

from app.db.models.car import Car
from app.repositories.car_repository import CarRepository
from app.repositories.car_type_repository import CarTypeRepository
from app.repositories.favorite_repository import FavoriteRepository
from app.schemas.car import CarCreate, CarFilterParams, CarResponse, CarUpdate


class CarService:
    def __init__(self, car_repo: CarRepository, car_type_repo: CarTypeRepository, favorite_repo: FavoriteRepository):
        self.car_repo = car_repo
        self.car_type_repo = car_type_repo
        self.favorite_repo = favorite_repo

    async def create_car(self, car: CarCreate) -> CarResponse:
        car_type = await self.car_type_repo.get_car_type(car.car_type_id)
        if not car_type:
            raise HTTPException(
                status_code=404, detail="Car type not found with id"
            )
        new_car = await self.car_repo.create_car(car)
        return CarResponse.model_validate(new_car)

    async def get_car(self, car_id: int) -> CarResponse:
        db_car = await self.car_repo.get_car_with_options(car_id, [selectinload(Car.car_type)])
        if not db_car:
            raise HTTPException(
                status_code=404, detail=f"Car with ID {car_id} not found"
            )
        return CarResponse.model_validate(db_car)

    async def get_all_cars(self, params: CarFilterParams):
        cars = await self.car_repo.get_all_cars(params)
        favorites = await self.favorite_repo.get_favorites_car_id_by_user_id(1)
        for car in cars:
            car.is_liked = car.id in favorites
        return [CarResponse.model_validate(car) for car in cars]

    async def get_popular_cars(self) -> list[CarResponse]:
        cars = await self.car_repo.get_popular_cars()
        return [CarResponse.model_validate(car) for car in cars]

    async def get_recommended_cars(self) -> list[CarResponse]:
        cars = await self.car_repo.get_recommended_cars()
        return [CarResponse.model_validate(car) for car in cars]

    async def update_car(self, car_id: int, car_data: CarUpdate) -> CarResponse:
        updated_car = await self.car_repo.update_car(car_id, car_data)
        if not updated_car:
            raise ValueError(f"Car with ID {car_id} not found")
        return CarResponse.model_validate(updated_car)

    async def delete_car(self, car_id: int) -> bool:
        return await self.car_repo.delete_car(car_id)
