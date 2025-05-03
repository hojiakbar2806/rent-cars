from fastapi.responses import JSONResponse
from fastapi import APIRouter, Body, Depends, Request
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.decorators import permission_classes
from app.core.permissions import IsAuthenticated, IsAdminUser
from app.db.session import get_async_session
from app.schemas.oauth import OAuthProviderConfig
from app.services.auth import AuthService
from app.repositories.user import UserRepository
from app.schemas.auth import RegisterUser, LoginUser, LoginResponse, UserResponse, TokenRequest
from app.services.oauth import OAuthService
from app.config import settings

router = APIRouter(prefix="/auth", tags=["Auth"])


providers = {
    "google": OAuthProviderConfig(
        client_id=settings.google_client_id,
        client_secret=settings.google_client_secret,
        authorize_redirect_uri=settings.oauth_redirect_uri+"/google",
        access_token_url="https://oauth2.googleapis.com/token",
        auth_url="https://accounts.google.com/o/oauth2/v2/auth",
    ),
    "github": OAuthProviderConfig(
        client_id=settings.github_client_id,
        client_secret=settings.github_client_secret,
        authorize_redirect_uri=settings.oauth_redirect_uri+"/github",
        access_token_url="https://github.com/login/oauth/access_token",
        auth_url="https://github.com/login/oauth/authorize",
    ),
}


def get_auth_service(session: AsyncSession = Depends(get_async_session)):
    return AuthService(UserRepository(session), OAuthService(providers))


@router.post("/register")
async def register_user(user: RegisterUser, auth_service: AuthService = Depends(get_auth_service)):
    return await auth_service.register(user)


@router.post("/login", response_model=LoginResponse)
async def login_user(user: LoginUser, auth_service: AuthService = Depends(get_auth_service)):
    return await auth_service.login(user)


@router.get('/login/google')
async def login_via_google(auth_service: AuthService = Depends(get_auth_service)):
    return await auth_service.login_via_google()

@router.get('/login/github')
async def login_via_google(auth_service: AuthService = Depends(get_auth_service)):
    return await auth_service.login_via_github()


@router.get("/oauth/{provider}")
async def oauth_login(provider: str, code: str, auth_service: AuthService = Depends(get_auth_service)):
    return await auth_service.oauth_login(provider, code)


@router.get("/session", response_model=UserResponse)
@permission_classes(IsAuthenticated)
async def get_auth_user(request: Request):
    current_user = getattr(request.state, "user", None)
    return current_user


@router.post("/refresh_token")
async def refresh_token(token: TokenRequest, auth_service: AuthService = Depends(get_auth_service)):
    return await auth_service.refresh_token(token.refresh_token)
