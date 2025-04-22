from datetime import timedelta
from typing import List, Any, Coroutine, Optional
from fastapi import HTTPException
from fastapi.responses import JSONResponse
from jwt import PyJWTError

from app.core.enums import TokenType
from app.core.security.utils import create_access_token, create_refresh_token
from app.core.security.jwt import decode_jwt
from app.db.models import User
from app.schemas.auth import RegisterUser, LoginUser, TokenResponse
from app.services.user_service import UserService
from app.repositories.user_repository import UserRepository
from app.config import settings


class AuthService(UserService):
    def __init__(self, repo: UserRepository):
        super().__init__(repo)

    async def login(self, user: LoginUser):
        db_user = await self.repo.get_user_by_email(user.email)
        if not db_user:
            raise HTTPException(status_code=404, detail="User not found")
        access_token = create_access_token(db_user.id)
        refresh_token = create_refresh_token(db_user.id)
        return TokenResponse(
            access_token=access_token, 
            refresh_token=refresh_token, 
            expire_minutes=settings.jwt_refresh_token_expire_minutes
        )

    async def register(self, user: RegisterUser):
        db_user = await self.repo.get_user_by_email(user.email)
        if db_user:
            raise HTTPException(status_code=400, detail="User already exists")
        new_user = await self.repo.create_user(user)
        access_token = create_access_token(new_user.id)
        refresh_token = create_refresh_token(new_user.id)
        return TokenResponse(
            access_token=access_token, 
            refresh_token=refresh_token, 
            expire_minutes=settings.jwt_refresh_token_expire_minutes
        )
    
    async def verify_user_token(self, token: str, audience: List[TokenType]) -> Coroutine[Any, Any, User]:
        try:
            sub = decode_jwt(token, audience).get("sub")
            if not sub:
                raise HTTPException(status_code=400, detail="Invalid token")
            db_user = self.repo.get_user_by_id(sub)
            if db_user is None:
                raise HTTPException(status_code=404, detail="Invalid token")
            return db_user
        except PyJWTError:
            raise HTTPException(status_code=404, detail="Invalid token")

    async def get_current_session(self, token: str) -> Optional[User]:
        return await self.verify_user_token(token, [TokenType.ACCESS])

    async def refresh_token(self, token: str):
        try:
            user_id = decode_jwt(token, [TokenType.REFRESH]).get("sub")
            access_token = create_access_token(user_id)
            return JSONResponse(content={"access_token": access_token})
        except PyJWTError:
            raise HTTPException(status_code=401, detail="Invalid token")