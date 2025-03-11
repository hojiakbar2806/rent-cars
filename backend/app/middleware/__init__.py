from fastapi import FastAPI
from starlette.middleware.cors import CORSMiddleware

from app.middleware.auth_middleware import JWTAuthMiddleware


def register_middleware(app: FastAPI):
    app.add_middleware(
        CORSMiddleware,
        allow_origins=["*"],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    app.add_middleware(JWTAuthMiddleware)
