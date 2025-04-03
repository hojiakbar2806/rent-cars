from pydantic import BaseModel
from typing import Optional
from datetime import date


class RentalBase(BaseModel):
    car_id: str
    user_id: str
    pickup_location_id: str
    dropoff_location_id: str
    pickup_date: date
    dropoff_date: date
    total_price: float


class RentalCreate(RentalBase):
    pass


class RentalUpdate(BaseModel):
    car_id: Optional[str]
    user_id: Optional[str]
    pickup_location_id: Optional[str]
    dropoff_location_id: Optional[str]
    pickup_date: Optional[date]
    dropoff_date: Optional[date]
    total_price: Optional[float]


class RentalResponse(RentalBase):
    id: str

    class Config:
        from_attributes = True
