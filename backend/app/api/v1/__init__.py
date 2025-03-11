from fastapi import APIRouter
from .rent_car_router import router as rent_car_router
from .auth_router import router as auth_router
from .user_router import router as user_router

v1_router = APIRouter(prefix="/v1")

v1_router.include_router(rent_car_router, prefix="/rent-cars", tags=["V1 Rent Car"])
v1_router.include_router(auth_router, prefix="/auth", tags=["Authentication"])
v1_router.include_router(user_router, prefix="/users", tags=["Users"])
