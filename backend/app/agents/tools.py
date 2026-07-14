from langchain_core.tools import tool

from app.database import SessionLocal
from app.models import Interaction
from app.llm import llm


@tool
def log_interaction(
    hcp_name: str,
    interaction_type: str,
    topics_discussed: str = "",
    sentiment: str = "",
    outcomes: str = "",
    follow_up_actions: str = ""
) -> str:
    """Log and save a new HCP interaction in the CRM database."""

    db = SessionLocal()

    try:
        interaction = Interaction(
            hcp_name=hcp_name,
            interaction_type=interaction_type,
            topics_discussed=topics_discussed,
            sentiment=sentiment,
            outcomes=outcomes,
            follow_up_actions=follow_up_actions
        )

        db.add(interaction)
        db.commit()
        db.refresh(interaction)

        return (
            f"Interaction logged successfully. "
            f"Interaction ID: {interaction.id}"
        )

    except Exception as error:
        db.rollback()
        return f"Failed to log interaction: {str(error)}"

    finally:
        db.close()


@tool
def edit_interaction(
    interaction_id: str,
    field_name: str,
    new_value: str
) -> str:
    """Edit a specific field of an existing HCP interaction."""

    db = SessionLocal()

    try:
        try:
            interaction_id = int(interaction_id)
        except (ValueError, TypeError):
            return "Invalid interaction ID. Please provide a valid number."

        interaction = db.query(Interaction).filter(
            Interaction.id == interaction_id
        ).first()

        if not interaction:
            return "Interaction not found."

        allowed_fields = [
            "hcp_name",
            "interaction_type",
            "attendees",
            "topics_discussed",
            "materials_shared",
            "samples_distributed",
            "sentiment",
            "outcomes",
            "follow_up_actions"
        ]

        if field_name not in allowed_fields:
            return (
                "Invalid field name. "
                f"Allowed fields are: {', '.join(allowed_fields)}"
            )

        setattr(interaction, field_name, new_value)

        db.commit()
        db.refresh(interaction)

        return (
            f"Interaction {interaction_id} updated successfully. "
            f"{field_name} changed to {new_value}."
        )

    except Exception as error:
        db.rollback()
        return f"Failed to edit interaction: {str(error)}"

    finally:
        db.close()


@tool
def get_interaction(interaction_id: str) -> str:
    """Get the details of a specific HCP interaction by interaction ID."""

    db = SessionLocal()

    try:
        try:
            interaction_id = int(interaction_id)
        except (ValueError, TypeError):
            return "Invalid interaction ID. Please provide a valid number."

        interaction = db.query(Interaction).filter(
            Interaction.id == interaction_id
        ).first()

        if not interaction:
            return "Interaction not found."

        return (
            f"ID: {interaction.id}\n"
            f"HCP: {interaction.hcp_name}\n"
            f"Type: {interaction.interaction_type}\n"
            f"Attendees: {interaction.attendees}\n"
            f"Topics: {interaction.topics_discussed}\n"
            f"Materials Shared: {interaction.materials_shared}\n"
            f"Samples Distributed: {interaction.samples_distributed}\n"
            f"Sentiment: {interaction.sentiment}\n"
            f"Outcomes: {interaction.outcomes}\n"
            f"Follow-up: {interaction.follow_up_actions}"
        )

    except Exception as error:
        return f"Failed to get interaction: {str(error)}"

    finally:
        db.close()


@tool
def search_interactions(hcp_name: str) -> str:
    """Search for all CRM interactions associated with an HCP name."""

    db = SessionLocal()

    try:
        interactions = db.query(Interaction).filter(
            Interaction.hcp_name.ilike(f"%{hcp_name}%")
        ).all()

        if not interactions:
            return f"No interactions found for {hcp_name}."

        results = []

        for interaction in interactions:
            results.append(
                f"ID: {interaction.id}, "
                f"HCP: {interaction.hcp_name}, "
                f"Type: {interaction.interaction_type}, "
                f"Sentiment: {interaction.sentiment}"
            )

        return "\n".join(results)

    except Exception as error:
        return f"Failed to search interactions: {str(error)}"

    finally:
        db.close()


@tool
def generate_follow_up_suggestion(interaction_id: str) -> str:
    """Generate an AI-based sales follow-up suggestion for an HCP interaction."""

    db = SessionLocal()

    try:
        try:
            interaction_id = int(interaction_id)
        except (ValueError, TypeError):
            return "Invalid interaction ID. Please provide a valid number."

        interaction = db.query(Interaction).filter(
            Interaction.id == interaction_id
        ).first()

        if not interaction:
            return "Interaction not found."

        prompt = f"""
You are an AI assistant for a life sciences CRM.

Analyze the following Healthcare Professional interaction.

HCP Name: {interaction.hcp_name}
Interaction Type: {interaction.interaction_type}
Topics Discussed: {interaction.topics_discussed}
Sentiment: {interaction.sentiment}
Outcomes: {interaction.outcomes}
Current Follow-up Actions: {interaction.follow_up_actions}

Generate one short, professional, practical sales follow-up suggestion
for the field representative.

Do not invent medical claims or unsupported information.
"""

        response = llm.invoke(prompt)

        return response.content

    except Exception as error:
        return f"Failed to generate follow-up suggestion: {str(error)}"

    finally:
        db.close()


crm_tools = [
    log_interaction,
    edit_interaction,
    get_interaction,
    search_interactions,
    generate_follow_up_suggestion
]