from fastapi.responses import JSONResponse
from fastapi import APIRouter, Depends, Request
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.decorators import permission_classes
from app.core.permissions import IsAuthenticated, IsAdminUser
from app.core.database import get_async_session
from app.services.auth_service import AuthService
from app.repositories.user_repository import UserRepository
from app.schemas.auth import RegisterUser, LoginUser, TokenResponse, UserResponse

router = APIRouter(prefix="/auth", tags=["Auth"])


def get_auth_service(session: AsyncSession = Depends(get_async_session)):
    return AuthService(UserRepository(session))


@router.post("/register")
async def register_user(user: RegisterUser, auth_service: AuthService = Depends(get_auth_service)):
    return await auth_service.register(user)


@router.post("/login", response_model=TokenResponse)
async def login_user(user: LoginUser, auth_service: AuthService = Depends(get_auth_service)):
    return await auth_service.login(user)


@router.get("/session", response_model=UserResponse)
@permission_classes(IsAuthenticated)
async def get_auth_user(request: Request):
    current_user = getattr(request.state, "user", None)
    return current_user


@router.get("/refresh_token")
async def refresh_token(request: Request, auth_service: AuthService = Depends(get_auth_service)):
    refresh_token = request.cookies.get("refresh_token")
    return await auth_service.refresh_token(refresh_token)
