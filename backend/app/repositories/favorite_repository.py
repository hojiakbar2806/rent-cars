from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from app.models import Favorite
from app.schemas.favorite import FavoriteCreate


class FavoriteRepository:
    def __init__(self, session: AsyncSession):
        self.db = session

    async def create_favorite(self, favorite: FavoriteCreate) -> Favorite:
        new_favorite = Favorite(**favorite.dict())
        self.db.add(new_favorite)
        await self.db.commit()
        await self.db.refresh(new_favorite)
        return new_favorite

    async def get_favorite(self, favorite_id: str) -> Favorite:
        result = await self.db.execute(select(Favorite).where(Favorite.id == favorite_id))
        return result.scalar_one_or_none()

    async def get_all_favorites(self) -> list[Favorite]:
        result = await self.db.execute(select(Favorite))
        return result.scalars().all()

    async def delete_favorite(self, favorite_id: str) -> bool:
        favorite = await self.get_favorite(favorite_id)
        if favorite:
            await self.db.delete(favorite)
            await self.db.commit()
            return True
        return False