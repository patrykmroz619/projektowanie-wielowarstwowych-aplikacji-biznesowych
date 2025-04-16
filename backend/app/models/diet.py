from pydantic import BaseModel
from typing import List
from database.database import SessionLocal
from database.models.profile import UserProfileDB

class DietPlan(BaseModel):
    name: str
    description: str
    meals: List[str]
