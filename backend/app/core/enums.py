import enum


class DriveMode(enum.Enum):
    MANUAL = "Manual"
    AUTO = "Auto"
    HYBRID = "Hybrid"


class TokenType(str, enum.Enum):
    ACCESS = "access"
    REFRESH = "refresh"


class UserStatus(str, enum.Enum):
    ACTIVE = 'active'
    INACTIVE = 'inactive'
    DELETED = 'deleted'


class OAuthProvider(str, enum.Enum):
    GOOGLE = 'google'
    GITHUB = 'github'

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