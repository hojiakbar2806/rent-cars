from fastapi import APIRouter
from .car import router as car_router
from .auth import router as auth_router
from .user import router as user_router
from .car_type import router as car_type_router
from .rental import router as rental_router
from .file import router as file_router
from .favorite import router as favorite_router
from .location import router as location_router

v1_router = APIRouter(prefix="/v1")

v1_router.include_router(auth_router)
v1_router.include_router(user_router)
v1_router.include_router(car_router)
v1_router.include_router(favorite_router)
v1_router.include_router(rental_router)
v1_router.include_router(car_type_router)
v1_router.include_router(file_router)
v1_router.include_router(location_router)
