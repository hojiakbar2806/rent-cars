from fastapi import APIRouter
from .car_router import router as car_router
from .auth_router import router as auth_router
from .user_router import router as user_router
from .car_type_route import router as car_type_router
from .rental_route import router as rental_router
from .file_router import router as file_router

v1_router = APIRouter(prefix="/v1")

v1_router.include_router(auth_router)
v1_router.include_router(user_router)
v1_router.include_router(car_router)
v1_router.include_router(rental_router)
v1_router.include_router(car_type_router)
v1_router.include_router(file_router)
