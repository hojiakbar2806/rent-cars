from sqlalchemy.orm import relationship
from sqlalchemy import Column, Integer, ForeignKey, UniqueConstraint

from app.db.base import Base


class Favorite(Base):
    __tablename__ = "favorites"

    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    car_id = Column(Integer, ForeignKey("cars.id"), nullable=False)

    user = relationship(
        "User", back_populates="favorites",
        cascade="all, delete"
    )
    car = relationship(
        "Car", back_populates="favorites",
        cascade="all, delete"
    )

    __table_args__ = (
        UniqueConstraint("user_id", "car_id", name="unique_user_car_favorite"),
    )
