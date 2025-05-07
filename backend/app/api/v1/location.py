from fastapi import APIRouter, Depends, Request
from sqlalchemy.ext.asyncio import AsyncSession
from app.db.session import get_async_session
from app.services.location import LocationService
from app.repositories.location import LocationRepository
from app.schemas.location import LocationCreate, LocationResponse, LocationUpdate

router = APIRouter(prefix="/locations", tags=["Locations"])


def get_location_service(session: AsyncSession = Depends(get_async_session)):
    repo = LocationRepository(session)
    return LocationService(repo)


@router.get("", response_model=list[LocationResponse])
async def get_all_locations(request: Request, service: LocationService = Depends(get_location_service)):
    return await service.get_all_locations()


@router.post("", response_model=LocationResponse)
async def create_location(location: LocationCreate, service: LocationService = Depends(get_location_service)):
    return await service.create_location(location)


@router.get("/{location_id}", response_model=LocationResponse)
async def get_location(location_id: int, service: LocationService = Depends(get_location_service)):
    return await service.get_location(location_id)


@router.put("/{location_id}", response_model=LocationResponse)
async def update_location(location_id: int, location: LocationUpdate, service: LocationService = Depends(get_location_service)):
    return await service.update_location(location_id, location)


@router.delete("/{location_id}")
async def delete_location(location_id: int, service: LocationService = Depends(get_location_service)):
    return await service.delete_location(location_id)