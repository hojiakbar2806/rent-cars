from datetime import date
from typing import Optional
from pydantic import BaseModel, Field


class ProfileCreate(BaseModel):
    first_name: Optional[str] = Field(None, example="John")
    last_name: Optional[str] = Field(None, example="Doe")
    bio: Optional[str] = Field(None, example="Software Developer")
    profile_pic: Optional[str] = Field(None)
    date_of_birth: Optional[date]


class ProfileUpdate(BaseModel):
    first_name: Optional[str] = Field(None, example="John")
    last_name: Optional[str] = Field(None, example="Doe")
    bio: Optional[str] = Field(None, example="Software Developer")
    profile_pic: Optional[str] = Field(None)
    date_of_birth: Optional[date]


class ProfileResponse(BaseModel):
    id: int
    first_name: Optional[str] = Field(None, example="John")
    last_name: Optional[str] = Field(None, example="Doe")
    bio: Optional[str] = Field(None, example="Software Developer")
    profile_pic: Optional[str] = Field(None)
    date_of_birth: Optional[date]

    class Config:
        from_attributes = True


class UserCreate(BaseModel):
    email: str
    first_name: str
    last_name: str
    is_admin: bool
    is_active: bool


class UserResponse(BaseModel):
    id: int
    email: str
    first_name: str
    last_name: str
    is_admin: bool

    class Config:
        from_attributes = True


class UserWithProfile(BaseModel):
    user: UserResponse
    profile: Optional[ProfileResponse]

    class Config:
        from_attributes = True
