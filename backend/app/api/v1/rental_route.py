from fastapi import APIRouter, Depends, Request
from sqlalchemy.ext.asyncio import AsyncSession
from app.core.database import get_async_session
from app.services.rental_service import RentalService
from app.repositories.rental_repository import RentalRepository
from app.schemas.rent_car import RentalCreate, RentalResponse, RentalUpdate

router = APIRouter(prefix="/rentals", tags=["Rentals"])


def get_rental_service(session: AsyncSession = Depends(get_async_session)):
    repo = RentalRepository(session)
    return RentalService(repo)


@router.get("/", response_model=list[RentalResponse])
async def get_all_rentals(request: Request, service: RentalService = Depends(get_rental_service)):
    return await service.get_all_rentals()


@router.post("/", response_model=RentalResponse)
async def create_rental(rental: RentalCreate, service: RentalService = Depends(get_rental_service)):
    return await service.create_rental(rental)


@router.get("/{rental_id}", response_model=RentalResponse)
async def get_rental(rental_id: int, service: RentalService = Depends(get_rental_service)):
    return await service.get_rental(rental_id)


@router.put("/{rental_id}", response_model=RentalResponse)
async def update_rental(rental_id: int, rental: RentalUpdate, service: RentalService = Depends(get_rental_service)):
    return await service.update_rental(rental_id, rental)


@router.delete("/{rental_id}")
async def delete_rental(rental_id: int, service: RentalService = Depends(get_rental_service)):
    return await service.delete_rental(rental_id)
