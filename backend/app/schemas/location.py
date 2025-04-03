from pydantic import BaseModel
from typing import Optional


class LocationBase(BaseModel):
    name: str
    address: str
    city: str
    country: str
    state: Optional[str] = None
    zip_code: Optional[str] = None
    latitude: Optional[float] = None
    longitude: Optional[float] = None


class LocationCreate(LocationBase):
    pass


class LocationUpdate(BaseModel):
    name: Optional[str]
    address: Optional[str]
    city: Optional[str]
    country: Optional[str]
    state: Optional[str]
    zip_code: Optional[str]
    latitude: Optional[float]
    longitude: Optional[float]


class LocationOut(LocationBase):
    id: str

    class Config:
        from_attributes = True
