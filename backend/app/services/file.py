import os
import uuid
from fastapi import HTTPException, UploadFile
import aiofiles

from app.config import settings
from app.schemas.file import FileCreate
from app.repositories.file import FileRepository


class FileService:
    def __init__(self, file_repo: FileRepository):
        self.file_repo = file_repo

    @staticmethod
    def is_valid_extension(filename: str) -> bool:
        ext = filename.split(".")[-1].lower()
        return ext in settings.allowed_file_extensions

    @staticmethod
    async def save_file_locally(file: UploadFile, file_name: str) -> str:

        upload_dir = settings.file_uploads_path
        os.makedirs(settings.file_uploads_path, exist_ok=True)
        file_path = os.path.join(upload_dir, file_name)

        async with aiofiles.open(file_path, "wb") as buffer:
            content = await file.read()
            await buffer.write(content)
        return file_path

    async def upload_file(self, file: UploadFile):
        if not self.is_valid_extension(file.filename):
            raise HTTPException(
                status_code=400, detail="Fayl turi ruxsat etilmagan")

        new_filename = f"{uuid.uuid4()}.{file.filename.split('.')[-1].lower()}"
        file_path = await self.save_file_locally(file, new_filename)

        file_record = FileCreate(
            id=str(uuid.uuid4()),
            file_name=new_filename,
            file_type=file.content_type,
            file_size=os.path.getsize(file_path),
            file_path=file_path,
        )

        return await self.file_repo.save_file(file_record)

    async def upload_multiple_files(self, files: list[UploadFile]):
        results = []
        for file in files:
            try:
                result = await self.upload_file(file)
                results.append(result.file_path)
            except HTTPException as e:
                return e
        return results

    async def get_file(self, file_id: str):
        file = await self.file_repo.get_file(file_id)
        if not file:
            raise HTTPException(status_code=404, detail="Fayl topilmadi")
        return file

    async def delete_file(self, file_id: str):
        file = await self.file_repo.get_file(file_id)
        if not file:
            raise HTTPException(status_code=404, detail="Fayl topilmadi")

        os.remove(file.file_path)
        return await self.file_repo.delete_file(file_id)
