from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from app.db.models import Rental
from app.schemas.rent_car import RentalCreate, RentalUpdate


class RentalRepository:
    def __init__(self, session: AsyncSession):
        self.db = session

    async def create_rental(self, rental: RentalCreate) -> Rental:
        new_rental = Rental(**rental.dict())
        self.db.add(new_rental)
        await self.db.commit()
        await self.db.refresh(new_rental)
        return new_rental

    async def get_rental(self, rental_id: str) -> Rental:
        result = await self.db.execute(select(Rental).where(Rental.id == rental_id))
        return result.scalar_one_or_none()

    async def get_all_rentals(self) -> list[Rental]:
        result = await self.db.execute(select(Rental))
        return result.scalars().all()

    async def update_rental(self, rental_id: str, rental_data: RentalUpdate) -> Rental:
        rental = await self.get_rental(rental_id)
        if not rental:
            return None
        for key, value in rental_data.dict(exclude_unset=True).items():
            setattr(rental, key, value)
        await self.db.commit()
        await self.db.refresh(rental)
        return rental

    async def delete_rental(self, rental_id: str) -> bool:
        rental = await self.get_rental(rental_id)
        if rental:
            await self.db.delete(rental)
            await self.db.commit()
            return True
        return False