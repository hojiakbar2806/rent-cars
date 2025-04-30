from sqlalchemy.sql import func
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from app.db.models import CarType
from app.db.models.car import Car
from app.schemas.car_type import CarTypeCreate, CarTypeUpdate, FetchCarTypeStatsResponse


class CarTypeRepository:
    def __init__(self, session: AsyncSession):
        self.db = session

    async def create_car_type(self, car_type: CarTypeCreate) -> CarType:
        new_car_type = CarType(**car_type.model_dump())
        self.db.add(new_car_type)
        await self.db.commit()
        await self.db.refresh(new_car_type)
        return new_car_type

    async def get_car_type(self, car_type_id: str) -> CarType:
        result = await self.db.execute(select(CarType).where(CarType.id == car_type_id))
        return result.scalar_one_or_none()

    async def get_all_car_types(self) -> list[CarType]:
        stmt = select(CarType)
        result = await self.db.execute(stmt)
        db_car_types = result.scalars().all()
        return db_car_types

    async def fetch_car_type_stats(self) -> list[FetchCarTypeStatsResponse]:
        stmt = (
            select(CarType.id, CarType.name, CarType.description,
                   func.count(Car.id).label("cars_count"))
            .outerjoin(Car, Car.car_type_id == CarType.id)
            .group_by(CarType.id)
        )
        result = await self.db.execute(stmt)
        rows = result.fetchall()

        return [FetchCarTypeStatsResponse(**dict(row._mapping))for row in rows]

    async def update_car_type(self, car_type_id: str, update_data: CarTypeUpdate) -> CarType:
        existing_car_type = await self.get_car_type(car_type_id)
        if not existing_car_type:
            return None

        updated_fields = update_data.model_dump(exclude_unset=True)
        for field, value in updated_fields.items():
            setattr(existing_car_type, field, value)

        await self.db.commit()
        await self.db.refresh(existing_car_type)
        return existing_car_type

    async def delete_car_type(self, car_type_id: str) -> bool:
        car_type = await self.get_car_type(car_type_id)
        if car_type:
            await self.db.delete(car_type)
            await self.db.commit()
            return True
        return False
