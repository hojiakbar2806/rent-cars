from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from app.core.database import get_async_session
from app.repositories.user_repository import UserRepository
from app.schemas.user import UserCreate
from app.services.user_service import UserService

router = APIRouter(prefix="/users", tags=["Users"])


def get_user_service(db: AsyncSession = Depends(get_async_session)):
    repo = UserRepository(db)
    return UserService(repo)


@router.get("")
async def read_users(user_service: UserService = Depends(get_user_service)):
    db_users = await user_service.get_users()
    return db_users


@router.get("/{user_id}", response_model=dict)
async def read_user(user_id: int, user_service: UserService = Depends(get_user_service)):
    user = await user_service.get_user(user_id)
    return user


@router.post("")
async def create_user(
        user_in: UserCreate,
        user_service: UserService = Depends(get_user_service)
):
    user = await user_service.create_user(user_in)
    return user


@router.delete("/{user_id}", response_model=dict)
async def delete_user(user_id: int, user_service: UserService = Depends(get_user_service)):
    await user_service.delete_user(user_id)
    return {"message": "User deleted successfully"}
