from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from app.db.models.car import Car
from app.db.models.favorite import Favorite
from app.db.models.user import User
from app.schemas.favorite import FavoriteCreate
from sqlalchemy.orm import selectinload
from sqlalchemy.sql import and_


class FavoriteRepository:
    def __init__(self, session: AsyncSession):
        self.db = session

    async def create_favorite(self, favorite: FavoriteCreate) -> Favorite:
        new_favorite = Favorite(**favorite.model_dump())
        self.db.add(new_favorite)
        await self.db.commit()
        await self.db.refresh(new_favorite)
        return new_favorite

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

    async def get_favorites_by_user_id(self, user_id: int) -> list[Favorite]:
        result = await self.db.execute(
            select(Car).options(selectinload(Car.car_type))
            .join(Favorite, Car.id == Favorite.car_id).where(Favorite.user_id == user_id)
        )
        favorite_cars = result.scalars().all()
        return favorite_cars

    async def get_favorites_car_id_by_user_id(self, user_id: int) -> list[int]:
        stmt = select(Favorite.car_id).where(Favorite.user_id == user_id)
        result = await self.db.execute(stmt)
        return [row[0] for row in result]

    async def delete_favorite_by_user_id(self, user_id, car_id) -> list[Favorite]:
        stmt = select(Favorite).where(
            and_(Favorite.user_id == user_id, Favorite.car_id == car_id)
        )
        result = await self.db.execute(stmt)
        self.db.delete(result)
        await self.db.commit()
