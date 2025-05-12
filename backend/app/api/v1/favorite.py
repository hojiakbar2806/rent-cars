from fastapi import APIRouter, Depends, HTTPException, Request
from sqlalchemy.ext.asyncio import AsyncSession
from app.db.session import get_async_session
from app.core.decorators import permission_classes
from app.core.permissions import IsAuthenticated
from app.schemas.car import CarResponse
from app.services.favorite import FavoriteService
from app.repositories.favorite import FavoriteRepository
from app.schemas.favorite import FavoriteResponse

router = APIRouter(prefix="/favorites", tags=["Favorites"])


def get_favorite_service(session: AsyncSession = Depends(get_async_session)):
    return FavoriteService(FavoriteRepository(session))


@router.get("", response_model=list[CarResponse])
@permission_classes(IsAuthenticated)
async def get_my_favorite_cars(request: Request, service: FavoriteService = Depends(get_favorite_service)):
    user_id = getattr(request.state.user, "id", None)
    return await service.get_my_favorite_cars(user_id)



@router.post("/{car_id}", response_model=FavoriteResponse)
@permission_classes(IsAuthenticated)
async def create_favorite(request: Request, car_id: int, service: FavoriteService = Depends(get_favorite_service)):
    user_id = getattr(request.state.user, "id", None)
    return await service.create_favorite(car_id, user_id)