from fastapi import FastAPI, Depends
from fastapi.security import HTTPBearer

from app.middleware import register_middleware
from app.api.v1 import v1_router

auth_scheme = HTTPBearer(auto_error=False)


def create_app() -> FastAPI:
    app = FastAPI(
        dependencies=[Depends(auth_scheme)],
        title="FastAPI",
        version="1.0.0",
        description="API with custom error format", )

    register_middleware(app)

    app.include_router(v1_router)

    return app
