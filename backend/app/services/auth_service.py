from typing import List, Any, Coroutine
from jwt import InvalidAudienceError, PyJWTError, ExpiredSignatureError

from app.core.enums import TokenType
from app.core.security.utils import create_access_token, create_refresh_token
from app.core.security.jwt import decode_jwt
from app.models import User
from app.schemas.auth import RegisterUser, LoginUser
from app.services.user_service import UserService
from app.repositories.user_repository import UserRepository


class AuthService(UserService):
    def __init__(self, repo: UserRepository):
        super().__init__(repo)

    async def login(self, user: LoginUser):
        db_user = await self.repo.get_user_by_username(user.username)
        if not db_user:
            raise 
        access_token = create_access_token(db_user.id)
        refresh_token = create_refresh_token(db_user.id)

        return {
            "access_token": access_token,
            "refresh_token": refresh_token,
        }

    async def register(self, user: RegisterUser):
        db_user = await  self.repo.get_user_by_username(user.username)
        if db_user:
            raise 
        new_user = await self.repo.create_user(user)
        return new_user

    async def verify_user_token(self, token: str, audience: List[TokenType]) -> Coroutine[Any, Any, User]:
        try:
            sub = decode_jwt(token, audience).get("sub")
            if not sub:
                raise 
            db_user = self.repo.get_user_by_id(sub)
            if db_user is None:
                raise 
            return db_user
        except ExpiredSignatureError:
            raise 
        except InvalidAudienceError:
            raise 
        except PyJWTError:
            raise 
