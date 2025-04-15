from pydantic import BaseModel


class FavoriteCreate(BaseModel):
    user_id: int
    car_id: int


class FavoriteResponse(BaseModel):
    car_id: int

    class Config:
        from_attributes = True
