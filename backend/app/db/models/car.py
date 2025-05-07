from sqlalchemy.orm import relationship
from sqlalchemy import Boolean, Enum, Float, ForeignKey, String, Integer, JSON, Column

from app.db.base import Base
from app.core.enums import FuelTypeEnum, TransmissionEnum


class Car(Base):
    __tablename__ = "cars"

    id = Column(Integer, primary_key=True)
    name = Column(String, nullable=False)
    car_type_id = Column(Integer, ForeignKey(
        "car_types.id", ondelete="SET NULL"), nullable=True
    )
    price_per_day = Column(Float, nullable=False)
    original_price = Column(Float, nullable=False)
    images = Column(JSON, nullable=False, default=list)
    fuel_type = Column(Enum(FuelTypeEnum), nullable=False)
    transmission = Column(Enum(TransmissionEnum), nullable=False)

    capacity = Column(Integer, nullable=False)
    fuel_capacity = Column(Integer, nullable=True)
    description = Column(String, nullable=False)
    available = Column(Boolean, default=True)

    car_type = relationship(
        "CarType", back_populates="cars"
    )
    rentals = relationship(
        "Rental", back_populates="car", cascade="all, delete"
    )
    favorites = relationship(
        "Favorite", back_populates="car", cascade="all, delete"
    )
