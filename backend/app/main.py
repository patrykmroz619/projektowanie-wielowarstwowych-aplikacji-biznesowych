from fastapi import FastAPI
from app.api import profile, diet

app = FastAPI()

# Register routes
app.include_router(profile.router, prefix="/profile", tags=["Profile"])
app.include_router(diet.router, prefix="/diet", tags=["Diet"])
