from pydantic import BaseModel
from typing import Optional


class InteractionCreate(BaseModel):

    hcp_name: str

    interaction_type: str

    attendees: Optional[str] = None

    topics_discussed: Optional[str] = None

    materials_shared: Optional[str] = None

    samples_distributed: Optional[str] = None

    sentiment: Optional[str] = None

    outcomes: Optional[str] = None

    follow_up_actions: Optional[str] = None


class InteractionResponse(InteractionCreate):

    id: int

    class Config:
        from_attributes = True