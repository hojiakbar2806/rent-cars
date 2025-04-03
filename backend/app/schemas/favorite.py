from pydantic import BaseModel


class FavoriteBase(BaseModel):
    user_id: str
    car_id: str


class FavoriteCreate(FavoriteBase):
    pass


class FavoriteResponse(FavoriteBase):
    id: str

    class Config:
        from_attributes = True
