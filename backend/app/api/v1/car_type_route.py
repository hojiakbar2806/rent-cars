from fastapi import APIRouter, Depends, Request
from sqlalchemy.ext.asyncio import AsyncSession
from app.core.database import get_async_session
from app.services.car_type_service import CarTypeService
from app.repositories.car_type_repository import CarTypeRepository
from app.schemas.car_type import CarTypeCreate, CarTypeResponse, CarTypeUpdate

router = APIRouter(prefix="/car-types", tags=["Car Types"])


def get_car_type_service(session: AsyncSession = Depends(get_async_session)):
    return CarTypeService(CarTypeRepository(session))


@router.get("/", response_model=list[CarTypeResponse])
async def get_all_car_types(service: CarTypeService = Depends(get_car_type_service)):
    return await service.get_all_car_types()


@router.post("/", response_model=CarTypeResponse)
async def create_car_type(car_type: CarTypeCreate, service: CarTypeService = Depends(get_car_type_service)):
    return await service.create_car_type(car_type)


@router.get("/{car_type_id}", response_model=CarTypeResponse)
async def get_car_type(car_type_id: int, service: CarTypeService = Depends(get_car_type_service)):
    return await service.get_car_type(car_type_id)


@router.put("/{car_type_id}", response_model=CarTypeResponse)
async def update_car_type(car_type_id: int, car_type: CarTypeUpdate, service: CarTypeService = Depends(get_car_type_service)):
    return await service.update_car_type(car_type_id, car_type)


@router.delete("/{car_type_id}")
async def delete_car_type(car_type_id: int, service: CarTypeService = Depends(get_car_type_service)):
    return await service.delete_car_type(car_type_id)
