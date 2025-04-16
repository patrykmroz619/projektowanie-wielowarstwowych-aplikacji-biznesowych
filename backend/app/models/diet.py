from pydantic import BaseModel
from typing import Optional
from enum import Enum

class DietGoal(str, Enum):
    reduction = "reduction"
    maintenance = "maintenance"
    muscleGain = "muscleGain"
    healthyEating = "healthyEating"

class DietType(str, Enum):
    standard = "standard"
    vegetarian = "vegetarian"
    vegan = "vegan"
    ketogenic = "ketogenic"
    lowCarb = "lowCarb"
    highProtein = "highProtein"

class DietRequest(BaseModel):
    dietGoal: DietGoal
    dietType: DietType
    caloricIntake: Optional[float] = None
    mealsPerDay: int
    userId: str  # przesyłany z frontu
