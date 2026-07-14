# AI-First CRM – HCP Interaction Management System

An AI-first Customer Relationship Management application designed for life sciences field representatives to log and manage Healthcare Professional (HCP) interactions.

## Features

- Structured HCP interaction logging form
- Conversational AI CRM assistant
- Create, view, edit, and delete HCP interactions
- Interaction history dashboard
- Redux Toolkit state management
- FastAPI REST API
- SQLite database integration
- LangGraph AI agent
- Groq LLM integration
- Five CRM tools for AI-driven interaction management
- Graceful API rate-limit handling
- Responsive user interface using Google Inter font

## Tech Stack

### Frontend

- React
- Vite
- Redux Toolkit
- React Redux
- Axios
- CSS
- Google Inter Font

### Backend

- Python
- FastAPI
- SQLAlchemy
- SQLite
- LangChain
- LangGraph
- Groq API

## LangGraph AI Agent

The application uses a LangGraph ReAct agent to understand user requests and select appropriate CRM tools.

The agent supports five tools:

1. `log_interaction` – Logs and saves a new HCP interaction.

2. `edit_interaction` – Modifies an existing interaction.

3. `get_interaction` – Retrieves interaction details using an interaction ID.

4. `search_interactions` – Searches interactions associated with an HCP.

5. `generate_follow_up_suggestion` – Uses the LLM to generate professional follow-up recommendations.

## Project Structure

AI-FIRST-CRM/

- backend/
  - app/
    - agents/
    - routes/
    - database.py
    - models.py
    - schemas.py
    - llm.py
    - main.py
  - requirements.txt

- frontend/
  - src/
    - app/
    - components/
    - features/
    - App.jsx
    - main.jsx
    - style.css
  - package.json

## Backend Setup

Navigate to the backend directory:

```bash
cd backend