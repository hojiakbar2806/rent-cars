from sqlalchemy.orm import relationship
from sqlalchemy import Integer, String, Column

from app.db.base import Base


class CarType(Base):
    __tablename__ = "car_types"

    id = Column(Integer, primary_key=True)
    name = Column(String, nullable=False, unique=True)
    description = Column(String, nullable=True)

    cars = relationship("Car", back_populates="car_type")
