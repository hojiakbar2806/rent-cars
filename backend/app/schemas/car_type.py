from pydantic import BaseModel
from typing import Optional


class CarTypeCreate(BaseModel):
    name: str
    description: Optional[str] = None


class CarTypeUpdate(BaseModel):
    name: Optional[str]
    description: Optional[str]


class CarTypeResponse(BaseModel):
    id: int
    name: str
    description: Optional[str] = None

    class Config:
        from_attributes = True
