import enum

class FuelTypeEnum(str, enum.Enum):
    PETROL = "Petrol"
    DIESEL = "Diesel"
    ELECTRIC = "Electric"
    HYBRID = "Hybrid"

class TransmissionEnum(str, enum.Enum):
    MANUAL = "Manual"
    AUTOMATIC = "Automatic"

class RentalStatusEnum(str, enum.Enum):
    PENDING = "Pending"
    CONFIRMED = "Confirmed"
    ACTIVE = "Active"
    COMPLETED = "Completed"
    CANCELLED = "Cancelled"