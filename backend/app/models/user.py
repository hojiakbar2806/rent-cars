from sqlalchemy import Column,  Boolean, String
from sqlalchemy.orm import relationship
import uuid

from app.core.database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(uuid.UUID, primary_key=True, default=uuid.uuid4())
    email = Column(String, unique=True, nullable=False)
    first_name = Column(String, nullable=False)
    last_name = Column(String, nullable=False)
    password_hash = Column(String, nullable=False)
    is_active = Column(Boolean, default=True)
    is_admin = Column(Boolean, default=False)
    
    rentals = relationship("Rental", back_populates="user")
    favorites = relationship("Favorite", back_populates="user")