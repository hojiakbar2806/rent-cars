from fastapi import APIRouter, Depends, Request
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.decorators import permission_classes
from app.core.permissions import IsAuthenticated, IsAdminUser
from app.core.database import get_async_session
from app.services.auth_service import AuthService
from app.repositories.user_repository import UserRepository
from app.schemas.auth import RegisterUser, LoginUser, TokenResponse

router = APIRouter()


def get_auth_service(session: AsyncSession = Depends(get_async_session)):
    return AuthService(UserRepository(session))


@router.post("/register")
async def register_user(user: RegisterUser, auth_service: AuthService = Depends(get_auth_service)):
    return await auth_service.register(user)


@router.post("/login", response_model=TokenResponse)
async def login_user(user: LoginUser, auth_service: AuthService = Depends(get_auth_service)):
    return await auth_service.login(user)


@router.get("/me")
@permission_classes(IsAuthenticated)
async def get_auth_user(request: Request):
    user_agent = request.headers.get("User-Agent")
    forwarded_for = request.headers.get("X-Forwarded-For")

    return {
        "user_agent": user_agent,
        "user": request.state.user,
        "forwarded_for": forwarded_for
    }
