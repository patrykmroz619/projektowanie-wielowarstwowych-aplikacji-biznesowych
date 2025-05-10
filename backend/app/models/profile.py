from pydantic import BaseModel
from enum import Enum
from datetime import date

class Gender(str, Enum):
    male = "male"
    female = "female"

class ActivityLevel(str, Enum):
    sedentary = "sedentary"
    light = "light"
    moderate = "moderate"
    active = "active"
    veryActive = "veryActive"

class UserProfile(BaseModel):
    dob: date
    gender: Gender
    weight: float
    height: float
    activityLevel: ActivityLevel
    