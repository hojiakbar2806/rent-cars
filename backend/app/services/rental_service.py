from app.repositories.rental_repository import RentalRepository
from app.schemas.rent_car import RentalCreate, RentalResponse, RentalUpdate


class RentalService:
    def __init__(self, repo: RentalRepository):
        self.repo = repo

    async def create_rental(self, rental: RentalCreate) -> RentalResponse:
        new_rental = await self.repo.create_rental(rental)
        return RentalResponse.model_validate(new_rental)

    async def get_rental(self, rental_id: int) -> RentalResponse:
        rental = await self.repo.get_rental(rental_id)
        if not rental:
            raise ValueError(f"Rental with ID {rental_id} not found")
        return RentalResponse.model_validate(rental)

    async def get_all_rentals(self) -> list[RentalResponse]:
        rentals = await self.repo.get_all_rentals()
        return [RentalResponse.model_validate(rental) for rental in rentals]

    async def update_rental(self, rental_id: int, rental_data: RentalUpdate) -> RentalResponse:
        updated_rental = await self.repo.update_rental(rental_id, rental_data)
        if not updated_rental:
            raise ValueError(f"Rental with ID {rental_id} not found")
        return RentalResponse.model_validate(updated_rental)

    async def delete_rental(self, rental_id: int) -> bool:
        return await self.repo.delete_rental(rental_id)