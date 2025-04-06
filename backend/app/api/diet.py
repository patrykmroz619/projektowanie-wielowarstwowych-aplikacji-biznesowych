from fastapi import APIRouter
from app.models.diet import DietPlan
from typing import List

router = APIRouter()

# In-memory "diet list"
diet_list: List[DietPlan] = []

@router.post("/new")
def create_diet(diet: DietPlan):
    diet_list.append(diet)
    return {"message": "Diet added!"}

@router.get("/list", response_model=List[DietPlan])
def get_diets():
    return diet_list
