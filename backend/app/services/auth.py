from datetime import timedelta
from typing import List, Any, Coroutine, Optional
from fastapi import HTTPException
from fastapi.responses import JSONResponse, RedirectResponse
from jwt import PyJWTError

from app.core.enums import TokenType
from app.core.security.utils import create_access_token, create_refresh_token
from app.core.security.jwt import decode_jwt
from app.db.models import User
from app.schemas.auth import LoginResponse, RegisterUser, LoginUser, TokenResponse
from app.services.user import UserService
from app.repositories.user import UserRepository
from app.config import settings


from fastapi import HTTPException, Depends
from fastapi.responses import JSONResponse
from app.services.oauth import OAuthService


class AuthService(UserService):
    def __init__(self, repo: UserRepository, oauth_service: OAuthService):
        super().__init__(repo)
        self.oauth_service = oauth_service

    async def login(self, user: LoginUser):
        db_user = await self.repo.get_user_by_email(user.email)
        if not db_user:
            raise HTTPException(status_code=404, detail="User not found")
        access_token = create_access_token(db_user.id)
        refresh_token = create_refresh_token(db_user.id)
        return LoginResponse(
            access_token=access_token,
            refresh_token=refresh_token,
            expire_minutes=settings.jwt_refresh_token_expire_minutes,
            user_info=db_user
        )

    async def login_via_google(self):
        google_provider = self.oauth_service.providers['google']
        redirect_uri = (
            f"{google_provider.auth_url}"
            f"?response_type=code"
            f"&client_id={google_provider.client_id}"
            f"&redirect_uri={google_provider.authorize_redirect_uri}"
            f"&scope=openid email profile"
        )
        return RedirectResponse(url=redirect_uri)

    async def login_via_github(self):
        github_provider = self.oauth_service.providers['github']
        redirect_uri = (
            f"{github_provider.auth_url}"
            f"?client_id={github_provider.client_id}"
            f"&redirect_uri={github_provider.authorize_redirect_uri}"
            f"&scope=user:email"
        )
        return RedirectResponse(url=redirect_uri)

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

    async def oauth_login(self, provider: str, code: str):
        if provider not in self.oauth_service.providers:
            raise HTTPException(
                status_code=400,
                detail="Invalid OAuth provider"
            )
        if provider == "google":
            return await self.oauth_service.google(code)
        if provider == "github":
            return await self.oauth_service.github(code)