from fastapi import HTTPException
from app.repositories.favorite import FavoriteRepository
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

    async def get_my_favorite_cars(self, user_id) -> list[CarResponse]:
        favorites = await self.repo.get_favorites_by_user_id(user_id)
        return [CarResponse.model_validate(favorite) for favorite in favorites]
