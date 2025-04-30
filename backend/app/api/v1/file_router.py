from typing import List
from fastapi import APIRouter, Request, UploadFile, Depends
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.decorators import permission_classes
from app.core.permissions import IsAdminUser, IsAuthenticated
from app.db.session import get_async_session
from app.services.file import FileService
from app.repositories.file import FileRepository

router = APIRouter(prefix="/files", tags=["File"])


def get_file_service(session: AsyncSession = Depends(get_async_session)):
    return FileService(FileRepository(session))


@router.post("/upload")
async def upload_files(files: List[UploadFile], file_service: FileService = Depends(get_file_service)):
    return await file_service.upload_multiple_files(files)


@router.get("/{file_id}")
async def get_file(file_id: str, file_service: FileService = Depends(get_file_service)):
    """ Faylni olish """
    return await file_service.get_file(file_id)


@router.delete("/{file_id}")
@permission_classes(IsAuthenticated, IsAdminUser)
async def delete_file(request: Request, file_id: str, file_service: FileService = Depends(get_file_service)):
    return await file_service.delete_file(file_id)
