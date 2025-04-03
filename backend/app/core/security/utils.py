from datetime import timedelta
from sqlalchemy import select
from typing import List

from sqlalchemy.ext.asyncio import AsyncSession

from app.config import settings
from app.core.enums import TokenType
from app.core.security.jwt import encode_jwt, decode_jwt
from app.db.models import User


def create_access_token(sub) -> str:
    exp_delta = timedelta(minutes=settings.jwt_access_token_expire_minutes)
    jwt_payload = {"sub": str(sub), "aud": TokenType.ACCESS}
    return encode_jwt(jwt_payload, exp_delta)


def create_refresh_token(sub) -> str:
    exp_delta = timedelta(minutes=settings.jwt_refresh_token_expire_minutes)
    jwt_payload = {"sub": str(sub), "aud": TokenType.REFRESH}
    return encode_jwt(jwt_payload, exp_delta)


async def verify_jwt_token(token: str, audience: List[TokenType], session: AsyncSession) -> User:
    sub = decode_jwt(token, audience).get("sub")
    result = await session.execute(select(User).where(User.id == int(sub)))
    db_user = result.scalar_one_or_none()
    return db_user
