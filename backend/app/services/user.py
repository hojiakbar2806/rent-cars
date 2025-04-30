from app.core.security.hash import hash_password
from app.repositories.user import UserRepository
from app.db.models import User
from fastapi import HTTPException

from app.schemas.user import UserCreate


class UserService:
    def __init__(self, repo: UserRepository):
        self.repo = repo

    async def get_user(self, user_id: int) -> User:
        user = await self.repo.get_user_by_id(user_id)
        if not user:
            raise HTTPException(status_code=404, detail="User not found")
        return user

    async def get_users(self) -> list[User]:
        return await self.repo.get_users()

    async def create_user(self, user_in: UserCreate) -> User:
        user_in.hashed_password = hash_password(user_in.hashed_password)
        return await self.repo.create_user(user_in)

    async def delete_user(self, user_id: int) -> bool:
        success = await self.repo.delete_user(user_id)
        if not success:
            raise HTTPException(status_code=404, detail="User not found")
        return success
