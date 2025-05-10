from pydantic import BaseModel
from typing import Optional
from enum import Enum
from uuid import UUID
from typing import Any

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

class DietListItem(BaseModel):
    id: UUID
    user_id: str
    diet_goal: DietGoal
    diet_type: DietType
    caloric_intake: Optional[float]
    meals_per_day: int

    class Config:
        orm_mode = True 

class DietDetail(BaseModel):
    data: Any  # Zwracamy JSON z pola generated_json (lub mock)

    class Config:
        orm_mode = True