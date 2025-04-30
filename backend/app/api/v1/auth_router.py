from fastapi.responses import JSONResponse
from fastapi import APIRouter, Body, Depends, Request
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.decorators import permission_classes
from app.core.permissions import IsAuthenticated, IsAdminUser
from app.core.database import get_async_session
from app.services.auth_service import AuthService
from app.repositories.user import UserRepository
from app.schemas.auth import RegisterUser, LoginUser, LoginResponse, UserResponse, TokenRequest

router = APIRouter(prefix="/auth", tags=["Auth"])


def get_auth_service(session: AsyncSession = Depends(get_async_session)):
    return AuthService(UserRepository(session))


@router.post("/register")
async def register_user(user: RegisterUser, auth_service: AuthService = Depends(get_auth_service)):
    return await auth_service.register(user)


@router.post("/login", response_model=LoginResponse)
async def login_user(user: LoginUser, auth_service: AuthService = Depends(get_auth_service)):
    return await auth_service.login(user)


@router.get("/session", response_model=UserResponse)
@permission_classes(IsAuthenticated)
async def get_auth_user(request: Request):
    current_user = getattr(request.state, "user", None)
    return current_user


@router.post("/refresh_token")
async def refresh_token(token: TokenRequest, auth_service: AuthService = Depends(get_auth_service)):
    return await auth_service.refresh_token(token.refresh_token)
