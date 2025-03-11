from fastapi import Request
from sqlalchemy.ext.asyncio import AsyncSession


class BasePermission:
    async def has_permission(self, request: Request, session: AsyncSession) -> bool:
        raise NotImplementedError("Subclasses must implement this method.")


class IsAuthenticated(BasePermission):
    async def has_permission(self, request: Request, session) -> bool:
        return getattr(request.state, "user", False)


class IsAdminUser(BasePermission):
    async def has_permission(self, request: Request, session: AsyncSession) -> bool:
        user = getattr(request.state, "user", None)
        return True
