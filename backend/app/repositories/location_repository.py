from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from app.models import Location
from app.schemas.rent_car import LocationCreate, LocationUpdate


class LocationRepository:
    def __init__(self, session: AsyncSession):
        self.db = session

    async def create_location(self, location: LocationCreate) -> Location:
        new_location = Location(**location.dict())
        self.db.add(new_location)
        await self.db.commit()
        await self.db.refresh(new_location)
        return new_location

    async def get_location(self, location_id: str) -> Location:
        result = await self.db.execute(select(Location).where(Location.id == location_id))
        return result.scalar_one_or_none()

    async def get_all_locations(self) -> list[Location]:
        result = await self.db.execute(select(Location))
        return result.scalars().all()

    async def update_location(self, location_id: str, location_data: LocationUpdate) -> Location:
        location = await self.get_location(location_id)
        if not location:
            return None
        for key, value in location_data.dict(exclude_unset=True).items():
            setattr(location, key, value)
        await self.db.commit()
        await self.db.refresh(location)
        return location

    async def delete_location(self, location_id: str) -> bool:
        location = await self.get_location(location_id)
        if location:
            await self.db.delete(location)
            await self.db.commit()
            return True
        return False