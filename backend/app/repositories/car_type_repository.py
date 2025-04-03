from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from app.db.models import CarType
from app.schemas.car_type import CarTypeCreate, CarTypeUpdate


class CarTypeRepository:
    def __init__(self, session: AsyncSession):
        self.db = session

    async def create_car_type(self, car_type: CarTypeCreate) -> CarType:
        new_car_type = CarType(**car_type.dict())
        self.db.add(new_car_type)
        await self.db.commit()
        await self.db.refresh(new_car_type)
        return new_car_type

    async def get_car_type(self, car_type_id: str) -> CarType:
        result = await self.db.execute(select(CarType).where(CarType.id == car_type_id))
        return result.scalar_one_or_none()

    async def get_all_car_types(self) -> list[CarType]:
        result = await self.db.execute(select(CarType))
        return result.scalars().all()

    async def update_car_type(self, car_type_id: str, car_type_data: CarTypeUpdate) -> CarType:
        car_type = await self.get_car_type(car_type_id)
        if not car_type:
            return None
        for key, value in car_type_data.dict(exclude_unset=True).items():
            setattr(car_type, key, value)
        await self.db.commit()
        await self.db.refresh(car_type)
        return car_type

    async def delete_car_type(self, car_type_id: str) -> bool:
        car_type = await self.get_car_type(car_type_id)
        if car_type:
            await self.db.delete(car_type)
            await self.db.commit()
            return True
        return False