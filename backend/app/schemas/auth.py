from typing import Optional
from datetime import date
from pydantic import BaseModel, EmailStr, Field


class LoginUser(BaseModel):
    email: str = Field(..., example="qwerty@gmail.com")
    hashed_password: str = Field(..., alias="password")


class RegisterUser(BaseModel):
    email: EmailStr = Field(..., example="qwerty@gmail.com")
    first_name: Optional[str] = Field(None, example="qwerty")
    last_name: Optional[str] = Field(None, example="qwerty")
    hashed_password: str = Field(..., alias="password")


class ProfileResponse(BaseModel):
    id: int
    first_name: Optional[str] = Field(None, example="John")
    last_name: Optional[str] = Field(None, example="Doe")
    bio: Optional[str] = Field(None, example="Software Developer")
    profile_pic: Optional[str] = Field(None)
    date_of_birth: Optional[date]

    class Config:
        from_attributes = True


class UserResponse(BaseModel):
    id: int
    email: str
    first_name: str
    last_name: str
    is_admin: bool

    class Config:
        from_attributes = True


class TokenResponse(BaseModel):
    access_token: str
    refresh_token: str
    token_type: str = "Bearer"


class UserWithProfile(BaseModel):
    user: UserResponse
    profile: Optional[ProfileResponse]

    class Config:
        from_attributes = True
