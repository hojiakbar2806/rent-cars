from fastapi import HTTPException
from app.repositories.favorite_repository import FavoriteRepository
from app.schemas.favorite import FavoriteResponse
from app.schemas.car import CarResponse
from fastapi.responses import JSONResponse


class FavoriteService:
    def __init__(self, repo: FavoriteRepository):
        self.repo = repo

    async def create_favorite(self, car_id: int, user_id: int) -> FavoriteResponse:
        try:
            msg = await self.repo.create_or_delete_favorite(car_id=car_id, user_id=user_id)
            return JSONResponse(content={"message": msg})
        except Exception as e:
            raise HTTPException(
                status_code=400, detail=f"Server error: {str(e)}"
            )

    async def get_favorite(self, favorite_id: int) -> FavoriteResponse:
        favorite = await self.repo.get_favorite(favorite_id)
        if not favorite:
            raise ValueError(f"Favorite with ID {favorite_id} not found")
        return FavoriteResponse.model_validate(favorite)

    async def get_all_favorite_cars(self, user_id) -> list[CarResponse]:
        favorites = await self.repo.get_favorites_by_user_id(user_id)
        return favorites

    async def delete_favorite(self, favorite_id: int) -> bool:
        return await self.repo.delete_favorite(favorite_id)
