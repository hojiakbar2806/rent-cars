from fastapi import HTTPException, Request


class BasePermission:
    async def has_permission(self, request: Request) -> bool:
        raise NotImplementedError("Subclasses must implement this method.")


class IsAuthenticated(BasePermission):
    async def has_permission(self, request: Request) -> bool:
        user = getattr(request.state, "user", None)
        if user is None:
            raise HTTPException(status_code=401, detail="Not authenticated")
        return True


class IsAdminUser(BasePermission):
    async def has_permission(self, request: Request) -> bool:
        user = getattr(request.state, "user", None)
        return user is not None and getattr(user, "is_admin", False)
