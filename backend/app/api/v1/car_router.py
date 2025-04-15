from typing import List, Optional
from fastapi import APIRouter, Depends, Query, Request
from pydantic import BaseModel
from sqlalchemy.ext.asyncio import AsyncSession
from app.core.database import get_async_session
from app.repositories.car_type_repository import CarTypeRepository
from app.repositories.favorite_repository import FavoriteRepository
from app.services.car_service import CarService
from app.repositories.car_repository import CarRepository
from app.schemas.car import CarCreate, CarFilterParams, CarResponse, CarUpdate
from app.services.filter_service import FilterService

router = APIRouter(prefix="/cars", tags=["Cars"])


def get_car_service(session: AsyncSession = Depends(get_async_session)):
    car_repo = CarRepository(session)
    favorite_repo = FavoriteRepository(session)
    car_type_repo = CarTypeRepository(session)
    return CarService(car_repo, car_type_repo, favorite_repo)


def get_car_filter_service(session: AsyncSession = Depends(get_async_session)):
    car_repo = CarRepository(session)
    car_type_repo = CarTypeRepository(session)
    return FilterService(car_repo, car_type_repo)


@router.get("", response_model=list[CarResponse])
async def get_all_cars(
    limit: Optional[int] = 20,
    offset: Optional[int] = 0,
    car_type: List[str] = Query(None),
    price: Optional[str] = Query(None),
    capacity: List[int] = Query(None),
    q: str = Query(None),
    service: CarService = Depends(get_car_service)
):
    return await service.get_all_cars(CarFilterParams(limit=limit, offset=offset, car_type=car_type, price=price, capacity=capacity, q=q))


@router.post("", response_model=CarResponse)
async def create_car(car: CarCreate, service: CarService = Depends(get_car_service)):
    return await service.create_car(car)


@router.get("/filters")
async def get_cars_filters(filter_service: FilterService = Depends(get_car_filter_service)):
    return await filter_service.get_filter_data()


@router.get("/populars")
async def get_cars_filters(service: CarService = Depends(get_car_service)):
    return await service.get_popular_cars()


@router.get("/recommends")
async def get_cars_filters(service: CarService = Depends(get_car_service)):
    return await service.get_recommended_cars()


@router.get("/{car_id}", response_model=CarResponse)
async def get_car(car_id: int, service: CarService = Depends(get_car_service)):
    return await service.get_car(car_id)


@router.put("/{car_id}", response_model=CarResponse)
async def update_car(car_id: int, car: CarUpdate, service: CarService = Depends(get_car_service)):
    return await service.update_car(car_id, car)


@router.delete("/{car_id}")
async def delete_car(car_id: int, service: CarService = Depends(get_car_service)):
    return await service.delete_car(car_id)
