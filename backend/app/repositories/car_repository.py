from typing import Any, Coroutine, Sequence

from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from app.models import Car
from app.schemas.rent_car import CarCreate, CarUpdate


class CarRepository:
    def __init__(self, session: AsyncSession):
        self.db = session

    async def create_car(self, car: CarCreate) -> Car:
        new_car = Car(**car.model_dump())
        self.db.add(new_car)
        await self.db.commit()
        await self.db.refresh(new_car)
        return new_car

    async def get_car(self, car_id: int) -> Car:
        result = await self.db.execute(select(Car).where(Car.id == car_id))
        return result.scalar_one_or_none()

    async def get_all_cars(self) -> Sequence[Car]:
        result = await self.db.execute(select(Car))
        return result.scalars().all()

    async def update_car(self, car_id: int, car_data: CarUpdate) -> Car:
        car = await self.get_car(car_id)
        for key, value in car_data.model_dump().items():
            setattr(car, key, value)
        await self.db.commit()
        await self.db.refresh(car)
        return car

    async def delete_car(self, car_id: int) -> bool:
        car = await self.get_car(car_id)
        await self.db.delete(car)
        await self.db.commit()
        return True
