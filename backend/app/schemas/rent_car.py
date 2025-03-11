from pydantic import BaseModel
from typing import Optional
from app.core.enums import DriveMode


class CarTypeBase(BaseModel):
    name: str


class CarTypeCreate(CarTypeBase):
    pass


class CarType(CarTypeBase):
    id: int

    class Config:
        from_attributes = True


class CarBase(BaseModel):
    name: Optional[str] = None
    image: str
    gas_capacity: int
    drive_mode: DriveMode
    person_capacity: int
    price: float
    discount: float
    car_type_id: int


class CarCreate(CarBase):
    pass

class CarUpdate(CarBase):
    pass

class CarResponse(CarBase):
    id: int

    class Config:
        from_attributes = True
