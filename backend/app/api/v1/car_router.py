from typing import List, Literal, Optional
from fastapi import APIRouter, Depends, Query, Request
from pydantic import BaseModel
from sqlalchemy.ext.asyncio import AsyncSession
from app.core.database import get_async_session
from app.repositories.car_type import CarTypeRepository
from app.repositories.favorite import FavoriteRepository
from app.services.car import CarService
from app.repositories.car import CarRepository
from app.schemas.car import CarCreate, CarFilterDataResponse, CarFilterParams, CarResponse, CarUpdate

router = APIRouter(prefix="/cars", tags=["Cars"])


def get_car_service(session: AsyncSession = Depends(get_async_session)):
    car_type_repo = CarTypeRepository(session)
    car_repo = CarRepository(session, car_type_repo)
    return CarService(car_repo, car_type_repo)


@router.get("", response_model=list[CarResponse])
async def get_all_cars(
    limit: Optional[int] = 20,
    offset: Optional[int] = 0,
    car_type: List[str] = Query(None),
    price: Optional[str] = Query(None),
    capacity: List[int] = Query(None),
    query: str = Query(None),
    filter_by: Optional[Literal['recommends', 'popular']] = None,
    service: CarService = Depends(get_car_service)
):
    filters = CarFilterParams(
        limit=limit,
        offset=offset,
        car_type=car_type,
        car_type_id=car_type,
        price=price,
        capacity=capacity,
        query=query,
        filter_by=filter_by
    )
    return await service.get_all_cars(filters)


@router.post("", response_model=CarResponse)
async def create_car(car: CarCreate, service: CarService = Depends(get_car_service)):
    return await service.create_car(car)


@router.get("/filters", response_model=CarFilterDataResponse)
async def get_cars_filters(service: CarService = Depends(get_car_service)):
    return await service.get_car_filter_data()


@router.get("/{car_id}", response_model=CarResponse)
async def get_car(car_id: int, service: CarService = Depends(get_car_service)):
    return await service.get_car(car_id)


@router.put("/{car_id}", response_model=CarResponse)
async def update_car(car_id: int, car: CarUpdate, service: CarService = Depends(get_car_service)):
    return await service.update_car(car_id, car)


@router.delete("/{car_id}")
async def delete_car(car_id: int, service: CarService = Depends(get_car_service)):
    return await service.delete_car(car_id)
