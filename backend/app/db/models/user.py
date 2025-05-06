from sqlalchemy.orm import relationship
from sqlalchemy import Boolean, String, Column, Integer

from app.db.base import Base


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, nullable=False)
    email = Column(String, unique=True, nullable=False)
    first_name = Column(String, nullable=False)
    last_name = Column(String, nullable=False)
    hashed_password = Column(String, nullable=False)
    is_active = Column(Boolean, default=True)
    is_admin = Column(Boolean, default=False)

    rentals = relationship("Rental", back_populates="user", cascade="all, delete")
    favorites = relationship("Favorite", back_populates="user")
