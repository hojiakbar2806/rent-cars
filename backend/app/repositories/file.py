from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from app.db.models import File
from app.schemas.file import FileCreate


class FileRepository:
    def __init__(self, session: AsyncSession):
        self.db = session

    async def save_file(self, file: FileCreate) -> File:
        new_file = File(**file.model_dump())
        self.db.add(new_file)
        await self.db.commit()
        await self.db.refresh(new_file)
        return new_file

    async def get_file(self, file_id: str) -> File:
        result = await self.db.execute(select(File).where(File.id == file_id))
        return result.scalar_one_or_none()

    async def get_all_files(self) -> list[File]:
        result = await self.db.execute(select(File))
        return result.scalars().all()

    async def delete_file(self, file_id: str) -> bool:
        file = await self.get_file(file_id)
        if file:
            await self.db.delete(file)
            await self.db.commit()
            return True
        return False
