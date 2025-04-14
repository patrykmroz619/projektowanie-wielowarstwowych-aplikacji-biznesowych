from fastapi import APIRouter
from app.models.profile import UserProfile

router = APIRouter()

# FAKE DB – trzymanie profili w pamięci
user_profiles: dict[str, UserProfile] = {}

@router.get("/{user_id}", response_model=UserProfile)
def get_profile(user_id: str):
    # Jeśli brak profilu, zwróć domyślny
    if user_id not in user_profiles:
        user_profiles[user_id] = UserProfile(
            age=0,
            gender="male",
            weight=0.0,
            height=0.0,
            activityLevel="sedentary"
        )
    return user_profiles[user_id]

@router.put("/{user_id}", response_model=UserProfile)
def update_profile(user_id: str, updated: UserProfile):
    user_profiles[user_id] = updated
    return updated
