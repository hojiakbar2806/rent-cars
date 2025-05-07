from sqlalchemy import func
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from sqlalchemy import or_
from sqlalchemy.orm import selectinload
from app.db.models import Car
from app.db.models.car_type import CarType
from app.repositories.car_type import CarTypeRepository
from app.schemas.car import CarCreate, CarFilterDataResponse, CarFilterParams, CarResponse, CarUpdate, CarUpdatePartial
from app.core.exceptions import ResourceNotFoundException


class CarRepository:
    def __init__(self, session: AsyncSession, car_type_repo: CarTypeRepository):
        self.db = session
        self.car_type_repo = car_type_repo

    async def create_car(self, car: CarCreate, refresh: bool = False) -> Car:
        query = select(CarType).where(CarType.id == car.car_type_id)
        result = await self.db.execute(query)
        car_type = result.scalar_one_or_none()
        if not car_type:
            raise ResourceNotFoundException("CarType", car.car_type_id)
        new_car = Car(**car.model_dump())
        self.db.add(new_car)
        await self.db.commit()
        if refresh:
            await self.db.refresh(new_car)
        return new_car

    async def get_car(self, car_id: str) -> Car:
        query = select(Car).options(selectinload(
            Car.car_type)).where(Car.id == car_id)
        result = await self.db.execute(query)
        return result.scalar_one_or_none()

    async def get_car_with_options(self, car_id: int, options: list):
        query = select(Car).options(*options).where(Car.id == car_id)
        result = await self.db.execute(query)
        return result.scalar_one_or_none()

    async def get_car_with_type(self, car_id: int):
        query = select(Car).options(selectinload(
            Car.car_type)).where(Car.id == car_id)
        result = await self.db.execute(query)
        return result.scalar_one_or_none()

    async def get_all_cars(self, params: CarFilterParams) -> list[CarResponse]:
        query = select(Car).join(CarType).options(selectinload(Car.car_type))
        if params.car_type:
            query = query.where(CarType.name.in_(params.car_type))
        if params.price and len(params.price.split("-")) == 2:
            min, max = params.price.split("-")
            query = query.where(Car.price_per_day.between(int(min), int(max)))
        if params.capacity:
            query = query.where(Car.capacity.in_(params.capacity))
        if params.query:
            query = query.filter(or_(Car.name.ilike(f"%{params.query}%")))
        if params.filter_by == "popular":
            query = query.order_by(Car.created_at.desc())
        if params.filter_by == "recommends":
            query = query.order_by(Car.price_per_day)
        query = query.limit(int(params.limit)).offset(int(params.offset))
        result = await self.db.execute(query)
        return result.scalars().all()

    async def update_car(self, car_id: str, car_data: CarUpdate) -> Car:
        car = await self.get_car(car_id)
        if not car:
            raise ResourceNotFoundException("Car", car_id)
        for key, value in car_data.model_dump(exclude_unset=True).items():
            setattr(car, key, value)
        await self.db.commit()
        await self.db.refresh(car)
        return car

    async def update_car_partial(self, car_id: str, car_data: dict) -> Car:
        car = await self.get_car(car_id)
        if not car:
            raise ResourceNotFoundException("Car", car_id)
        for key, value in car_data.items():
            setattr(car, key, value)
        await self.db.commit()
        await self.db.refresh(car)
        return car

    async def delete_car(self, car_id: str) -> bool:
        stmt = select(Car).where(Car.id == car_id)
        db_car = (await self.db.execute(stmt)).scalar_one_or_none()
        if db_car:
            await self.db.delete(db_car)
            await self.db.commit()
        else:
            raise ResourceNotFoundException("Car", car_id)

    async def get_filter_data(self) -> CarFilterDataResponse:
        car_types = await self.car_type_repo.fetch_car_type_stats()
        min_price, max_price = await self.get_minmax_prices()
        capacities = await self.get_cars_capacities()

        return CarFilterDataResponse(
            car_types=car_types,
            max_price=max_price,
            min_price=min_price,
            capacities=capacities
        )

    async def get_minmax_prices(self) -> list:
        query = select(
            func.max(Car.price_per_day),
            func.min(Car.price_per_day)
        )
        price_result = await self.db.execute(query)
        max_price, min_price = price_result.fetchone()
        return [min_price, max_price]

    async def get_cars_capacities(self) -> list :
        query = select(Car.capacity).distinct()
        capacities_result = await self.db.execute(query)
        return [row[0] for row in capacities_result.all()]
