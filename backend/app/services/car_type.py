from app.repositories.car_type import CarTypeRepository
from app.schemas.car_type import CarTypeCreate, CarTypeResponse, CarTypeUpdate


class CarTypeService:
    def __init__(self, repo: CarTypeRepository):
        self.repo = repo

    async def create_car_type(self, car_type: CarTypeCreate) -> CarTypeResponse:
        new_car_type = await self.repo.create_car_type(car_type)
        return CarTypeResponse.model_validate(new_car_type)

    async def get_car_type(self, car_type_id: int) -> CarTypeResponse:
        car_type = await self.repo.get_car_type(car_type_id)
        if not car_type:
            raise ValueError(f"CarType with ID {car_type_id} not found")
        return CarTypeResponse.model_validate(car_type)

    async def get_all_car_types(self) -> list[CarTypeResponse]:
        car_types = await self.repo.get_all_car_types()
        return [CarTypeResponse.model_validate(car_type) for car_type in car_types]

    async def update_car_type(self, car_type_id: int, car_type_data: CarTypeUpdate) -> CarTypeResponse:
        updated_car_type = await self.repo.update_car_type(car_type_id, car_type_data)
        if not updated_car_type:
            raise ValueError(f"CarType with ID {car_type_id} not found")
        return CarTypeResponse.model_validate(updated_car_type)

    async def delete_car_type(self, car_type_id: int) -> bool:
        return await self.repo.delete_car_type(car_type_id)
