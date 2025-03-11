from pydantic import BaseModel
from typing import List


class ValidationErrorDetail(BaseModel):
    field: str
    message: str
    type: str


class ValidationErrorResponse(BaseModel):
    type: str
    detail: List[ValidationErrorDetail]


class GeneralErrorResponse(BaseModel):
    type: str
    detail: str
