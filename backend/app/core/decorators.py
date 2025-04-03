from typing import Callable
from functools import wraps
from fastapi import HTTPException, Request
from app.core.database import async_session
from app.core.permissions import BasePermission


def permission_classes(*permissions: type[BasePermission]):
    def decorator(func: Callable) -> Callable:
        @wraps(func)
        async def wrapper(*args,  **kwargs):
            request = kwargs.get("request")
            if request is None:
                raise HTTPException(
                    status_code=500, detail="Request object is required"
                )
            session = None
            try:
                for permission_class in permissions:
                    instance = permission_class()
                    if "session" in instance.has_permission.__code__.co_varnames:
                        if session is None:
                            session = async_session()
                        async with session as db:
                            has_permission = await instance.has_permission(request, db)
                    else:
                        has_permission = await instance.has_permission(request)
                    if not has_permission:
                        raise HTTPException(
                            status_code=403,
                            detail=f"Permission denied: {instance.__class__.__name__}"
                        )
                return await func(*args, **kwargs)

            finally:
                if session:
                    await session.close()
        return wrapper
    return decorator
