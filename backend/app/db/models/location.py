from sqlalchemy.orm import relationship
from sqlalchemy import Column, Integer, String, Float

from app.db.base import Base


class Location(Base):
    __tablename__ = "locations"

    id = Column(Integer, primary_key=True)
    name = Column(String, nullable=False)
    address = Column(String, nullable=False)
    city = Column(String, nullable=False)
    state = Column(String, nullable=True)
    country = Column(String, nullable=False)
    zip_code = Column(String, nullable=True)
    latitude = Column(Float, nullable=True)
    longitude = Column(Float, nullable=True)

    pickup_rentals = relationship(
        "Rental", foreign_keys="Rental.pickup_location_id",
        back_populates="pickup_location"
    )
    dropoff_rentals = relationship(
        "Rental", foreign_keys="Rental.dropoff_location_id",
        back_populates="dropoff_location"
    )
