from pydantic import BaseModel
from typing import List

class DietPlan(BaseModel):
    name: str
    description: str
    meals: List[str]
