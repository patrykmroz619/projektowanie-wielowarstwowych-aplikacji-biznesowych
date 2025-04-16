from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.models.profile import UserProfile  # <- Pydantic model (frontend)
from database.database import SessionLocal
from database.models.profile import UserProfileDB  # <- SQLAlchemy model (db)

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.get("/{user_id}", response_model=UserProfile)
def get_profile(user_id: str, db: Session = Depends(get_db)):
    db_profile = db.query(UserProfileDB).filter(UserProfileDB.user_id == user_id).first()
    if not db_profile:
        return UserProfile(age=0, gender="male", weight=0.0, height=0.0, activityLevel="sedentary")
    return UserProfile(**db_profile.__dict__)

@router.put("/{user_id}", response_model=UserProfile)
def update_profile(user_id: str, updated: UserProfile, db: Session = Depends(get_db)):
    db_profile = db.query(UserProfileDB).filter(UserProfileDB.user_id == user_id).first()
    if not db_profile:
        db_profile = UserProfileDB(user_id=user_id, **updated.dict())
        db.add(db_profile)
    else:
        for key, value in updated.dict().items():
            setattr(db_profile, key, value)
    db.commit()
    return updated

