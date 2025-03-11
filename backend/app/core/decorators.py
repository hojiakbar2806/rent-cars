from typing import Callable
from functools import wraps
from fastapi import HTTPException, Request
from app.core.database import get_async_session
from app.core.permissions import BasePermission


def permission_classes(*permissions: type[BasePermission]):
    def decorator(func: Callable) -> Callable:
        @wraps(func)
        async def wrapper(*args, request: Request, **kwargs):
            for permission_class in permissions:
                instance = permission_class()
                has_permission = await instance.has_permission(request)
                if not has_permission:
                    raise HTTPException(f"Permission denied: {instance.__class__.__name__}")
            return await func(*args, request=request, **kwargs)

        return wrapper

    return decorator
