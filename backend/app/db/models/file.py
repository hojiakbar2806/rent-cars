from sqlalchemy import Column, String, Integer
from app.db.base import Base


class File(Base):
    __tablename__ = "files"

    id = Column(String, primary_key=True, index=True)
    file_name = Column(String, nullable=False)
    file_type = Column(String, nullable=False)
    file_size = Column(Integer, nullable=False)
    file_path = Column(String, nullable=False)
