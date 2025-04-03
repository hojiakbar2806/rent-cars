from pydantic import BaseModel


class FileBase(BaseModel):
    file_name: str
    file_type: str
    file_size: int
    file_path: str


class FileCreate(FileBase):
    id: str


class FileResponse(FileBase):
    id: str

    class Config:
        from_attributes = True
