from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database import engine
from app.models import Base
from app.routes.interaction_routes import router as interaction_router
from app.routes.agent_routes import router as agent_router


Base.metadata.create_all(bind=engine)


app = FastAPI(
    title="AI-First CRM HCP API",
    description="Backend API for managing Healthcare Professional interactions",
    version="1.0.0",
)


app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://localhost:5173"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(interaction_router)

app.include_router(agent_router)


@app.get("/")
def home():
    return {
        "message": "AI-First CRM HCP Backend is running"
    }


@app.get("/health")
def health_check():
    return {
        "status": "healthy"
    }