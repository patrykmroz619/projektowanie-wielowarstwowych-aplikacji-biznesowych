from sqlalchemy import Column, String, Integer, Float, Enum, Date
from database.database import Base
import enum

class GenderEnum(str, enum.Enum):
    male = "male"
    female = "female"

class ActivityLevelEnum(str, enum.Enum):
    sedentary = "sedentary"
    light = "light"
    moderate = "moderate"
    active = "active"
    veryActive = "veryActive"

class UserProfileDB(Base):
    __tablename__ = "user_profiles"

    user_id = Column(String, primary_key=True, index=True)
    dob = Column(Date)
    gender = Column(Enum(GenderEnum))
    weight = Column(Float)
    height = Column(Float)
    activityLevel = Column(Enum(ActivityLevelEnum))
