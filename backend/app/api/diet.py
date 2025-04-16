from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.models.diet import DietRequest
from database.models.diet import DietPlanDB
from database.models.profile import UserProfileDB
from database.database import SessionLocal

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

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
