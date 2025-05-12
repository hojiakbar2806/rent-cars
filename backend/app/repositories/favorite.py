from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from app.db.models.car import Car
from app.db.models.favorite import Favorite
from sqlalchemy.orm import selectinload
from sqlalchemy.sql import and_



class FavoriteRepository:
    def __init__(self, session: AsyncSession):
        self.db = session

    async def create_or_delete_favorite(self, user_id: int, car_id: int) -> bool:
        stmt = select(Favorite).where(
            and_(Favorite.user_id == user_id, Favorite.car_id == car_id)
        )
        result = await self.db.execute(stmt)
        favorite = result.scalar_one_or_none()
        print(favorite)
        if favorite:
            await self.db.delete(favorite)
            await self.db.commit()
            return "Favorite deleted successfully"
        else:
            new_favorite = Favorite(user_id=user_id, car_id=car_id)
            self.db.add(new_favorite)
            await self.db.commit()

        return "Favorite created successfully"

    async def get_favorites_by_user_id(self, user_id: int):
        result = await self.db.execute(
            select(Car).options(selectinload(Car.car_type))
            .join(Favorite, Car.id == Favorite.car_id).where(Favorite.user_id == user_id)
        )
        favorite_cars = result.scalars().all()
        return favorite_cars
