from sqlalchemy import Column, String, Integer, Enum, Float, ForeignKey, Text
from sqlalchemy.dialects.postgresql import UUID
import uuid
import enum
from database.database import Base

class DietGoalEnum(str, enum.Enum):
    reduction = "reduction"
    maintenance = "maintenance"
    muscleGain = "muscleGain"
    healthyEating = "healthyEating"

class DietTypeEnum(str, enum.Enum):
    standard = "standard"
    vegetarian = "vegetarian"
    vegan = "vegan"
    ketogenic = "ketogenic"
    lowCarb = "lowCarb"
    highProtein = "highProtein"

class RecipeDifficultyEnum(str, enum.Enum):
    easy = "easy"
    medium = "medium"
    advanced = "advanced"

class DietPlanDB(Base):
    __tablename__ = "diet_plans"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(String, ForeignKey("user_profiles.user_id"))
    diet_goal = Column(Enum(DietGoalEnum))
    diet_type = Column(Enum(DietTypeEnum))
    caloric_intake = Column(Float, nullable=True)
    meals_per_day = Column(Integer)
    generated_json = Column(Text, nullable=True)  # JSON jako tekst (na razie pusty)
