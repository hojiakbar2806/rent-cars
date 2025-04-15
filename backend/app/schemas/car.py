from dataclasses import dataclass
from fastapi import Query
from pydantic import BaseModel
from typing import List, Optional

from app.core.enums import TransmissionEnum, FuelTypeEnum
from app.schemas.car_type import CarTypeResponse


class CarCreate(BaseModel):
    name: str
    car_type_id: int
    images: list
    price_per_day: float
    original_price: float
    fuel_type: FuelTypeEnum
    transmission: TransmissionEnum
    capacity: int
    fuel_capacity: int
    description: str


class CarUpdate(BaseModel):
    name: str
    car_type_id: int
    price_per_day: Optional[float]
    original_price: Optional[float]
    fuel_type: FuelTypeEnum
    transmission: TransmissionEnum
    capacity: Optional[int]
    description: Optional[str]


class CarResponse(BaseModel):
    id: int
    name: str
    car_type: CarTypeResponse
    images: List[str]
    price_per_day: float
    original_price: float
    fuel_type: FuelTypeEnum
    is_liked: bool = False
    fuel_capacity: Optional[int] = None
    transmission: TransmissionEnum
    capacity: int
    description: str

    class Config:
        from_attributes = True


class CarFilterParams(BaseModel):
    limit: Optional[int] = 20
    offset: Optional[int] = 0
    car_type: Optional[List[str]] = None
    price: Optional[str] = None
    capacity: Optional[List[int]] = None
    q: Optional[str] = None
