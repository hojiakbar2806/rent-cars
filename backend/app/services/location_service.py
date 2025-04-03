from app.repositories.location_repository import LocationRepository
from app.schemas.rent_car import LocationCreate, LocationResponse, LocationUpdate


class LocationService:
    def __init__(self, repo: LocationRepository):
        self.repo = repo

    async def create_location(self, location: LocationCreate) -> LocationResponse:
        new_location = await self.repo.create_location(location)
        return LocationResponse.model_validate(new_location)

    async def get_location(self, location_id: int) -> LocationResponse:
        location = await self.repo.get_location(location_id)
        if not location:
            raise ValueError(f"Location with ID {location_id} not found")
        return LocationResponse.model_validate(location)

    async def get_all_locations(self) -> list[LocationResponse]:
        locations = await self.repo.get_all_locations()
        return [LocationResponse.model_validate(location) for location in locations]

    async def update_location(self, location_id: int, location_data: LocationUpdate) -> LocationResponse:
        updated_location = await self.repo.update_location(location_id, location_data)
        if not updated_location:
            raise ValueError(f"Location with ID {location_id} not found")
        return LocationResponse.model_validate(updated_location)

    async def delete_location(self, location_id: int) -> bool:
        return await self.repo.delete_location(location_id)