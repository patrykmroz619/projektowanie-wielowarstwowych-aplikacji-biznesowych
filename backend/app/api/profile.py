from fastapi import APIRouter
from app.models.profile import UserProfile

router = APIRouter()

# Simulated user data
user_data = UserProfile(name="Alice", age=28, goal="Gain muscle")

@router.get("/", response_model=UserProfile)
def get_profile():
    return user_data

@router.post("/", response_model=UserProfile)
def update_profile(updated: UserProfile):
    global user_data
    user_data = updated
    return user_data
