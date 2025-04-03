from starlette.middleware.base import BaseHTTPMiddleware
from fastapi import Request

from app.core.enums import TokenType
from app.core.database import async_session
from app.core.security.utils import verify_jwt_token


class JWTAuthMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next):
        auth_header = request.headers.get("Authorization")
        if not auth_header or not len(auth_header.split(" ")) == 2:
            request.state.user = None
            return await call_next(request)
        try:
            async with async_session() as session:
                token = auth_header.split(" ")[1]
                db_user = await verify_jwt_token(token, [TokenType.ACCESS], session)
                request.state.user = db_user
                return await call_next(request)
        except Exception:
            request.state.user = None
            return await call_next(request)
