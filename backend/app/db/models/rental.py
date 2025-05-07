from sqlalchemy.orm import relationship
from sqlalchemy import Column, ForeignKey,  Integer, DateTime, Float, Enum

from app.db.base import Base
from app.core.enums import RentalStatusEnum


class Rental(Base):
    __tablename__ = "rentals"

    id = Column(Integer, primary_key=True)
    car_id = Column(Integer, ForeignKey("cars.id"), nullable=False)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    pickup_location_id = Column(
        Integer, ForeignKey("locations.id"), nullable=False)
    dropoff_location_id = Column(
        Integer, ForeignKey("locations.id"), nullable=False
    )
    pickup_date = Column(DateTime, nullable=False)
    dropoff_date = Column(DateTime, nullable=False)
    total_price = Column(Float, nullable=False)
    status = Column(
        Enum(RentalStatusEnum), default=RentalStatusEnum.PENDING, nullable=False
    )

    car = relationship("Car", back_populates="rentals")
    user = relationship("User", back_populates="rentals")
    pickup_location = relationship(
        "Location", foreign_keys=[pickup_location_id], back_populates="pickup_rentals"
    )
    dropoff_location = relationship(
        "Location", foreign_keys=[dropoff_location_id], back_populates="dropoff_rentals"
    )
