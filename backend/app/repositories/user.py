from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from app.db.models import User
from app.core.exceptions import ResourceNotFoundException, ResourceAlreadyExistException


class UserRepository:
    def __init__(self, session: AsyncSession):
        self.db = session

    async def get_user_by_id(self, user_id: int) -> User:
        stmt = select(User).where(User.id == user_id)
        db_user = (await self.db.execute(stmt)).scalar_one_or_none()
        if not db_user:
            raise ResourceNotFoundException("User", user_id)
        return db_user

    async def get_users(self) -> list[User]:
        stmt = select(User)
        db_users = (await self.db.execute(stmt)).scalars().all()
        return db_users

    async def get_user_by_email(self, user_email: str) -> User:
        stmt = select(User).where(User.email == user_email)
        db_user = (await self.db.execute(stmt)).scalar_one_or_none()
        return db_user

    async def create_user(self, user_in: dict, refresh=True):
        stmt = select(User).where(User.email == user_in["email"])
        db_user = (await self.db.execute(stmt)).scalar_one_or_none()
        if db_user:
            raise ResourceAlreadyExistException("User", user_in["email"])
        new_user = User(**user_in)
        self.db.add(new_user)
        await self.db.commit()
        if refresh:
            await self.db.refresh(new_user)
        return new_user

    async def delete_user(self, user_id: int) -> bool:
        stmt = select(User).where(User.id==user_id)
        db_user = (await self.db.execute(stmt)).scalar_one_or_none()
        if db_user:
            await self.db.delete(db_user)
            await self.db.commit()
        else:
            raise ResourceNotFoundException("User", user_id)
