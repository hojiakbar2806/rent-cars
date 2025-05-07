from fastapi import HTTPException
from starlette.responses import JSONResponse

from app.db.models import User
from app.schemas.user import UserCreate
from app.core.security.hash import hash_password
from app.repositories.user import UserRepository
from app.core.exceptions import ResourceAlreadyExistException, ResourceNotFoundException


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

    async def create_user(self, user_in: UserCreate):
        try:
            user_in.hashed_password = hash_password(user_in.hashed_password)
            await self.repo.create_user(user_in.model_dump())
            return JSONResponse(content={"message": "User created successfully"}, status_code=201)
        except ResourceAlreadyExistException as e:
            raise HTTPException(status_code=400, detail=str(e))
        except Exception as e:
            raise HTTPException(status_code=500, detail=str(e))

    async def delete_user(self, user_id: int):
        try:
            await self.repo.delete_user(user_id)
            return JSONResponse(content={"message": "User deleted successfully"})
        except ResourceNotFoundException as e:
            raise HTTPException(status_code=404, detail=str(e))
        except Exception as e:
            raise HTTPException(status_code=500, detail=str(e))
        
