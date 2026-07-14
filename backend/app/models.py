from sqlalchemy import Column, Integer, String, Text, DateTime
from datetime import datetime

from app.database import Base


class Interaction(Base):

    __tablename__ = "interactions"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    hcp_name = Column(
        String(255),
        nullable=False
    )

    interaction_type = Column(
        String(100),
        nullable=False
    )

    attendees = Column(
        String(500),
        nullable=True
    )

    topics_discussed = Column(
        Text,
        nullable=True
    )

    materials_shared = Column(
        Text,
        nullable=True
    )

    samples_distributed = Column(
        Text,
        nullable=True
    )

    sentiment = Column(
        String(50),
        nullable=True
    )

    outcomes = Column(
        Text,
        nullable=True
    )

    follow_up_actions = Column(
        Text,
        nullable=True
    )

    created_at = Column(
        DateTime,
        default=datetime.utcnow
    )