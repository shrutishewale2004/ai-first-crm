from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from groq import RateLimitError

from app.agents.crm_agent import run_crm_agent


router = APIRouter(
    prefix="/agent",
    tags=["AI Agent"]
)


class ChatRequest(BaseModel):
    message: str


class ChatResponse(BaseModel):
    response: str


@router.post("/chat", response_model=ChatResponse)
def chat_with_agent(request: ChatRequest):

    try:
        response = run_crm_agent(request.message)

        return {
            "response": response
        }

    except RateLimitError:
        raise HTTPException(
            status_code=429,
            detail=(
                "Groq API rate limit reached. "
                "Please wait a few minutes and try again."
            )
        )

    except Exception as error:
        raise HTTPException(
            status_code=500,
            detail=f"AI Agent Error: {str(error)}"
        )