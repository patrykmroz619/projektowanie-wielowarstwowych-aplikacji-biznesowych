from fastapi import APIRouter, Depends, HTTPException, BackgroundTasks
from sqlalchemy.orm import Session
from app.models.diet import DietRequest
from database.models.diet import DietPlanDB
from database.models.profile import UserProfileDB
from database.database import SessionLocal
from typing import List
from app.models.diet import DietListItem, DietDetail
import json
from dotenv import load_dotenv
import os
import httpx
import asyncio
from datetime import date

# Switch between "openai" or "deepseek"
model = "openai"

load_dotenv()

OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
DEEPSEEK_API_KEY = os.getenv("DEEPSEEK_API_KEY")

router = APIRouter()

def calculate_age(dob: date) -> int:
    today = date.today()
    return today.year - dob.year - ((today.month, today.day) < (dob.month, dob.day))

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

# @router.post("/new")
# def create_diet(data: DietRequest, db: Session = Depends(get_db)):
#     # Sprawdź, czy użytkownik istnieje
#     user = db.query(UserProfileDB).filter(UserProfileDB.user_id == data.userId).first()
#     if not user:
#         raise HTTPException(status_code=404, detail="User not found")

#     new_diet = DietPlanDB(
#         user_id=data.userId,
#         diet_goal=data.dietGoal,
#         diet_type=data.dietType,
#         caloric_intake=data.caloricIntake,
#         meals_per_day=data.mealsPerDay,
#         generated_json=None  # pusty na razie
#     )
#     db.add(new_diet)
#     db.commit()
#     db.refresh(new_diet)
#     return {"id": new_diet.id, "message": "Diet created!"}

@router.post("/new")
async def create_diet(data: DietRequest, db: Session = Depends(get_db)):
    user = db.query(UserProfileDB).filter(UserProfileDB.user_id == data.userId).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    age = calculate_age(user.dob)

    # Construct a prompt
    prompt = f"""
    Return a diet plan in strict JSON format using this data:

    {{
    "user": {{
        "gender": "{user.gender}",
        "age": {age},
        "weight": {user.weight},
        "height": {user.height},
        "activityLevel": "{user.activityLevel}",
        "goal": "{data.dietGoal}",
        "dietType": "{data.dietType}",
        "mealsPerDay": {data.mealsPerDay}
    }},
    "format": {{
        "title": string,
        "summary": {{
        "calories": int,
        "protein": int,
        "carbs": int,
        "fat": int,
        "meals": int
        }},
        "meals": [{{...}}]  // detailed meal objects
    }}
    }}

    Make sure the output is only valid JSON with no extra explanation or comments.
    """

    # Get JSON from selected model
    try:
        generated_json = await generate_diet_plan(prompt)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

    new_diet = DietPlanDB(
        user_id=data.userId,
        diet_goal=data.dietGoal,
        diet_type=data.dietType,
        caloric_intake=data.caloricIntake,
        meals_per_day=data.mealsPerDay,
        generated_json=generated_json
    )
    db.add(new_diet)
    db.commit()
    db.refresh(new_diet)
    return {"id": new_diet.id, "message": "Diet created with AI!"}

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
    
async def generate_diet_plan(prompt: str) -> str:
    headers = {
        "Content-Type": "application/json",
    }

    if model == "openai":
        headers["Authorization"] = f"Bearer {OPENAI_API_KEY}"
        url = "https://api.openai.com/v1/chat/completions"
        payload = {
            "model": "gpt-3.5-turbo",
            "messages": [
                {"role": "system", "content": "You're a diet assistant. Return a JSON-formatted diet plan."},
                {"role": "user", "content": prompt}
            ],
            "temperature": 0.7
        }

    elif model == "deepseek":
        headers["Authorization"] = f"Bearer {DEEPSEEK_API_KEY}"
        url = "https://api.deepseek.com/v1/chat/completions"
        payload = {
            "model": "deepseek-chat",
            "messages": [
                {"role": "system", "content": "You're a diet assistant. Return a JSON-formatted diet plan."},
                {"role": "user", "content": prompt}
            ],
            "temperature": 0.7
        }

    async with httpx.AsyncClient() as client:
        response = await client.post(url, headers=headers, json=payload)
        response.raise_for_status()
        return response.json()["choices"][0]["message"]["content"]