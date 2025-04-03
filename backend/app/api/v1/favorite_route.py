from fastapi import APIRouter, Depends, Request
from sqlalchemy.ext.asyncio import AsyncSession
from app.core.database import get_async_session
from app.services.favorite_service import FavoriteService
from app.repositories.favorite_repository import FavoriteRepository
from app.schemas.favorite import FavoriteCreate, FavoriteResponse

router = APIRouter()


def get_favorite_service(session: AsyncSession = Depends(get_async_session)):
    repo = FavoriteRepository(session)
    return FavoriteService(repo)


@router.get("/", response_model=list[FavoriteResponse])
async def get_all_favorites(service: FavoriteService = Depends(get_favorite_service)):
    return await service.get_all_favorites()


@router.post("/", response_model=FavoriteResponse)
async def create_favorite(favorite: FavoriteCreate, service: FavoriteService = Depends(get_favorite_service)):
    return await service.create_favorite(favorite)


@router.get("/{favorite_id}", response_model=FavoriteResponse)
async def get_favorite(favorite_id: int, service: FavoriteService = Depends(get_favorite_service)):
    return await service.get_favorite(favorite_id)


@router.delete("/{favorite_id}")
async def delete_favorite(favorite_id: int, service: FavoriteService = Depends(get_favorite_service)):
    return await service.delete_favorite(favorite_id)
