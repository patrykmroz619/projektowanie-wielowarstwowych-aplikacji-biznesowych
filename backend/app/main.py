from fastapi import FastAPI
from app.api import profile
from app.api.diet import router as diet_router  
from database.database import Base, engine
from database.models import profile as profile_models, diet as diet_models  

Base.metadata.create_all(bind=engine)

app = FastAPI()

# Register routes
app.include_router(profile.router, prefix="/profile", tags=["Profile"])
app.include_router(diet_router, prefix="/diet", tags=["Diet"])
