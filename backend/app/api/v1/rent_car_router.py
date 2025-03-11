from fastapi import APIRouter, Depends, Request
from sqlalchemy.ext.asyncio import AsyncSession
from app.core.database import get_async_session
from app.services.car_service import CarService
from app.repositories.car_repository import CarRepository
from app.schemas.rent_car import CarCreate, CarResponse

router = APIRouter()


def get_car_service(session: AsyncSession = Depends(get_async_session)):
    repo = CarRepository(session)
    return CarService(repo)


@router.get("/")
async def get_all_cars(request: Request, service: CarService = Depends(get_car_service)):
    return await service.get_all_cars()


@router.post("/", response_model=CarResponse)
async def create_car(car: CarCreate, service: CarService = Depends(get_car_service)):
    return await service.create_car(car)


@router.get("/{car_id}", response_model=CarResponse)
async def get_car(car_id: int, service: CarService = Depends(get_car_service)):
    return await service.get_car(car_id)


@router.put("/{car_id}", response_model=CarResponse)
async def update_car(car_id: int, car: CarCreate, service: CarService = Depends(get_car_service)):
    return await service.update_car(car_id, car)


@router.delete("/{car_id}")
async def delete_car(car_id: int, service: CarService = Depends(get_car_service)):
    return await service.delete_car(car_id)
