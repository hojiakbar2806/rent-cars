import os
from fastapi import FastAPI, Depends
from fastapi.security import HTTPBearer
from fastapi.staticfiles import StaticFiles

from app.middleware import register_middleware
from app.api.v1 import v1_router
from app.config import settings

auth_scheme = HTTPBearer(auto_error=False)


def create_app() -> FastAPI:
    app = FastAPI(
        dependencies=[Depends(auth_scheme)],
        title="FastAPI",
        version="1.0.0",
        description="API with custom error format",
        openapi_url=f"{settings.api_prefix}/openapi.json",
        docs_url=f"{settings.api_prefix}/docs",
        redoc_url=f"{settings.api_prefix}/redoc",
    )

    register_middleware(app)

    app.include_router(v1_router, prefix=settings.api_prefix)
    app.mount(f"{settings.api_prefix}/uploads",
              StaticFiles(directory="uploads",), name="uploads")

    return app
