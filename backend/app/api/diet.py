from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.models.diet import DietRequest
from database.models.diet import DietPlanDB
from database.models.profile import UserProfileDB
from database.database import SessionLocal
from typing import List
from app.models.diet import DietListItem, DietDetail
import json

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.get("/list/{user_id}", response_model=List[DietListItem])
def get_user_diets(user_id: str, db: Session = Depends(get_db)):
    diets = db.query(DietPlanDB).filter(DietPlanDB.user_id == user_id).all()
    return diets

@router.post("/new")
def create_diet(data: DietRequest, db: Session = Depends(get_db)):
    # Sprawdź, czy użytkownik istnieje
    user = db.query(UserProfileDB).filter(UserProfileDB.user_id == data.userId).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    new_diet = DietPlanDB(
        user_id=data.userId,
        diet_goal=data.dietGoal,
        diet_type=data.dietType,
        caloric_intake=data.caloricIntake,
        meals_per_day=data.mealsPerDay,
        generated_json=None  # pusty na razie
    )
    db.add(new_diet)
    db.commit()
    db.refresh(new_diet)
    return {"id": new_diet.id, "message": "Diet created!"}

EXAMPLE_DIET_JSON = {
    "title": "Przykładowa dieta",
    "summary": {
        "calories": 2200,
        "protein": 120,
        "carbs": 220,
        "fat": 73,
        "meals": 5,
    },
    "meals": [
        {
            "name": "Śniadanie",
            "time": "7:00 - 8:00",
            "calories": 450,
            "protein": 25,
            "carbs": 45,
            "fat": 15,
            "recipe": {
                "name": "Owsianka z owocami i orzechami",
                "ingredients": [
                    "50g płatków owsianych",
                    "200ml mleka 2%",
                    "1 banan",
                    "garść jagód",
                    "15g orzechów włoskich",
                    "5g miodu"
                ],
                "instructions": "1. Zagotuj mleko. 2. Dodaj płatki i gotuj. 3. Dodaj dodatki.",
                "difficulty": "Łatwy",
                "prepTime": "10 minut"
            }
        },
        # ... (dodaj inne jeśli chcesz)
    ]
}


@router.get("/detail/{diet_id}", response_model=DietDetail)
def get_diet_detail(diet_id: str, db: Session = Depends(get_db)):
    diet = db.query(DietPlanDB).filter(DietPlanDB.id == diet_id).first()
    if not diet:
        raise HTTPException(status_code=404, detail="Dieta nie znaleziona")

    if diet.generated_json:
        try:
            parsed = json.loads(diet.generated_json)
        except json.JSONDecodeError:
            raise HTTPException(status_code=500, detail="Nieprawidłowy JSON")
        return {"data": parsed}
    else:
        # Jeśli nie ma jeszcze wygenerowanego planu → zwróć przykładowy
        return {"data": EXAMPLE_DIET_JSON}