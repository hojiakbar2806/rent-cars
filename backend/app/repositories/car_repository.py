from sqlalchemy import func
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from sqlalchemy import or_
from sqlalchemy.orm import selectinload
from app.db.models import Car
from app.db.models.car_type import CarType
from app.schemas.car import CarCreate, CarUpdate


class CarRepository:
    def __init__(self, session: AsyncSession):
        self.db = session

    async def create_car(self, car: CarCreate) -> Car:
        new_car = Car(**car.model_dump())
        self.db.add(new_car)
        await self.db.commit()
        await self.db.refresh(new_car)
        return new_car

    async def get_car(self, car_id: str) -> Car:
        result = await self.db.execute(select(Car).options(selectinload(Car.car_type)).where(Car.id == car_id))
        return result.scalar_one_or_none()

    async def get_car_with_options(self, car_id: int, options: list):
        result = await self.db.execute(select(Car).options(*options).where(Car.id == car_id))
        return result.scalar_one_or_none()

    async def get_all_cars(self, limit: str, offset: str, car_type: list, price: str, capacity: list,  q: str) -> list[Car]:
        query = select(Car).join(CarType).options(selectinload(Car.car_type))
        if car_type:
            query = query.where(CarType.name.in_(car_type))
        if price and len(price.split("-")) == 2:
            min, max = price.split("-")
            query = query.where(Car.price_per_day.between(int(min), int(max)))
        if capacity:
            query = query.where(Car.capacity.in_(capacity))
        if q:
            query = query.filter(
                or_(
                    Car.name.ilike(f"%{q}%"),
                    # Car.description.ilike(f"%{q}%")
                )
            )
        result = await self.db.execute(query.limit(int(limit)).offset(int(offset)))
        return result.scalars().all()

    async def get_popular_cars(self) -> list[Car]:
        query = select(Car).options(selectinload(
            Car.car_type)).order_by(Car.id.desc())
        result = await self.db.execute(query)
        return result.scalars().all()

    async def get_recommended_cars(self) -> list[Car]:
        query = select(Car).options(selectinload(
            Car.car_type)).order_by(Car.id.desc())
        result = await self.db.execute(query)
        return result.scalars().all()

    async def update_car(self, car_id: str, car_data: CarUpdate) -> Car:
        car = await self.get_car(car_id)
        if not car:
            return None
        for key, value in car_data.dict(exclude_unset=True).items():
            setattr(car, key, value)
        await self.db.commit()
        await self.db.refresh(car)
        return car

    async def delete_car(self, car_id: str) -> bool:
        car = await self.get_car(car_id)
        if car:
            await self.db.delete(car)
            await self.db.commit()
            return True
        return False

    async def get_minmax_prices(self) -> list:
        query = select(func.max(Car.price_per_day),
                       func.min(Car.price_per_day))
        price_result = await self.db.execute(query)
        max_price, min_price = price_result.fetchone()
        return [min_price, max_price]

    async def get_cars_capacities(self) -> list:
        query = select(Car.capacity).distinct()
        capacities_result = await self.db.execute(query)
        return [row[0] for row in capacities_result.all()]
