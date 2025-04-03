from app.repositories.favorite_repository import FavoriteRepository
from app.schemas.favorite import FavoriteCreate, FavoriteResponse


class FavoriteService:
    def __init__(self, repo: FavoriteRepository):
        self.repo = repo

    async def create_favorite(self, favorite: FavoriteCreate) -> FavoriteResponse:
        new_favorite = await self.repo.create_favorite(favorite)
        return FavoriteResponse.model_validate(new_favorite)

    async def get_favorite(self, favorite_id: int) -> FavoriteResponse:
        favorite = await self.repo.get_favorite(favorite_id)
        if not favorite:
            raise ValueError(f"Favorite with ID {favorite_id} not found")
        return FavoriteResponse.model_validate(favorite)

    async def get_all_favorites(self) -> list[FavoriteResponse]:
        favorites = await self.repo.get_all_favorites()
        return [FavoriteResponse.model_validate(favorite) for favorite in favorites]

    async def delete_favorite(self, favorite_id: int) -> bool:
        return await self.repo.delete_favorite(favorite_id)