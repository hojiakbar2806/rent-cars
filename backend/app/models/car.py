from sqlalchemy import Boolean, Column, DateTime, Enum, Float, ForeignKey, Integer, String, JSON
from sqlalchemy.orm import relationship
from datetime import datetime
import uuid
from app.core.database import Base
from app.core.enums import FuelTypeEnum, TransmissionEnum, RentalStatusEnum

class Car(Base):
    __tablename__ = "cars"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    name = Column(String, nullable=False)
    type_id = Column(String, ForeignKey("car_types.id"), nullable=False)
    price_per_day = Column(Float, nullable=False)
    original_price = Column(Float, nullable=False)
    images = Column(JSON, nullable=False, default=[])
    fuel_type = Column(Enum(FuelTypeEnum), nullable=False)
    transmission = Column(Enum(TransmissionEnum), nullable=False)
    capacity = Column(Integer, nullable=False)
    description = Column(String, nullable=True)
    available = Column(Boolean, default=True)
    

    type_info = relationship("CarType", back_populates="cars")
    rentals = relationship("Rental", back_populates="car")
    favorites = relationship("Favorite", back_populates="car")


class CarType(Base):
    __tablename__ = "car_types"
    
    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    name = Column(String, nullable=False, unique=True)
    description = Column(String, nullable=True)
    
    cars = relationship("Car", back_populates="type_info")


class Location(Base):
    __tablename__ = "locations"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    name = Column(String, nullable=False)
    address = Column(String, nullable=False)
    city = Column(String, nullable=False)
    state = Column(String, nullable=True)
    country = Column(String, nullable=False)
    zip_code = Column(String, nullable=True)
    latitude = Column(Float, nullable=True)
    longitude = Column(Float, nullable=True)
    
    pickup_rentals = relationship("Rental", foreign_keys="Rental.pickup_location_id", back_populates="pickup_location")
    dropoff_rentals = relationship("Rental", foreign_keys="Rental.dropoff_location_id", back_populates="dropoff_location")




class Rental(Base):
    __tablename__ = "rentals"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    car_id = Column(String, ForeignKey("cars.id"), nullable=False)
    user_id = Column(String, ForeignKey("users.id"), nullable=False)
    pickup_location_id = Column(String, ForeignKey("locations.id"), nullable=False)
    dropoff_location_id = Column(String, ForeignKey("locations.id"), nullable=False)
    pickup_date = Column(DateTime, nullable=False)
    dropoff_date = Column(DateTime, nullable=False)
    total_price = Column(Float, nullable=False)
    status = Column(Enum(RentalStatusEnum), default=RentalStatusEnum.PENDING, nullable=False)

    
    car = relationship("Car", back_populates="rentals")
    user = relationship("User", back_populates="rentals")
    pickup_location = relationship("Location", foreign_keys=[pickup_location_id], back_populates="pickup_rentals")
    dropoff_location = relationship("Location", foreign_keys=[dropoff_location_id], back_populates="dropoff_rentals")


class Favorite(Base):
    __tablename__ = "favorites"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    user_id = Column(String, ForeignKey("users.id"), nullable=False)
    car_id = Column(String, ForeignKey("cars.id"), nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)
    
    user = relationship("User", back_populates="favorites")
    car = relationship("Car", back_populates="favorites")