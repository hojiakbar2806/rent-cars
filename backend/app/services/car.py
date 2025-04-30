from fastapi import HTTPException
from fastapi.responses import JSONResponse

from app.db.models.car import Car
from app.core.exceptions import ResourceNotFoundException
from app.repositories.car import CarRepository
from app.repositories.car_type import CarTypeRepository
from app.schemas.car import CarCreate, CarFilterParams, CarResponse, CarUpdate


class CarService:
    def __init__(self, car_repo: CarRepository, car_type_repo: CarTypeRepository):
        self.car_repo = car_repo
        self.car_type_repo = car_type_repo

    async def create_car(self, car: CarCreate) -> CarResponse:
        try:
            new_car = await self.car_repo.create_car(car, refresh=True)
            return CarResponse.model_validate(new_car)
        except Exception as e:
            raise HTTPException(status_code=500, detail=str(e))

    async def get_car(self, car_id: int) -> CarResponse:
        try:
            car = await self.car_repo.get_car(car_id)
            return CarResponse.model_validate(car)
        except ResourceNotFoundException as e:
            raise HTTPException(status_code=404, detail=str(e))
        except Exception as e:
            raise HTTPException(status_code=500, detail=str(e))

    async def get_all_cars(self, filters: CarFilterParams) -> list[CarResponse]:
        try:
            cars = await self.car_repo.get_all_cars(filters)
            return [CarResponse.model_validate(car) for car in cars]
        except Exception as e:
            raise HTTPException(status_code=500, detail=str(e))

    async def get_car_filter_data(self):
        try:
            return await self.car_repo.get_filter_data()
        except Exception as e:
            raise HTTPException(status_code=500, detail=str(e))

    async def update_car(self, car_id: int, car_data: CarUpdate) -> CarResponse:
        try:
            updated_car = await self.car_repo.update_car(car_id, car_data)
            return CarResponse.model_validate(updated_car)
        except ResourceNotFoundException as e:
            raise HTTPException(status_code=404, detail=str(e))
        except Exception as e:
            raise HTTPException(status_code=500, detail=str(e))

    async def update_car_partial(self, car_id: int, car_data: dict) -> CarResponse:
        try:
            updated_car = await self.car_repo.update_car_partial(car_id, car_data)
            return CarResponse.model_validate(updated_car)
        except ResourceNotFoundException as e:
            raise HTTPException(status_code=404, detail=str(e))
        except Exception as e:
            raise HTTPException(status_code=500, detail=str(e))

    async def delete_car(self, car_id: int) -> bool:
        try:
            await self.car_repo.delete_car(car_id)
            return JSONResponse(content={"message": "Car deleted successfully"}, status_code=204)
        except ResourceNotFoundException as e:
            raise HTTPException(status_code=404, detail=str(e))
        except Exception as e:
            raise HTTPException(status_code=500, detail=str(e))
