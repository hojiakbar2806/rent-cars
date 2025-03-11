from app.repositories.user_repository import UserRepository
from app.models.user import User
from fastapi import HTTPException


class UserService:
    def __init__(self, repo: UserRepository):
        self.repo = repo

    async def get_user(self, user_id: int) -> User:
        user = await self.repo.get_user(user_id)
        if not user:
            raise HTTPException(status_code=404, detail="User not found")
        return user

    async def create_user(self, username: str, email: str, full_name: str = None) -> User:
        return await self.repo.create_user(username, email, full_name)

    async def delete_user(self, user_id: int) -> bool:
        success = await self.repo.delete_user(user_id)
        if not success:
            raise HTTPException(status_code=404, detail="User not found")
        return success
