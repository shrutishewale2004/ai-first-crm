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
- PyMySQL
- MySQL
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

cd backend

Create a virtual environment:

python -m venv venv

Activate the virtual environment on Windows:

venv\Scripts\activate

Install dependencies:

pip install -r requirements.txt

Create a `.env` file inside the backend directory:

GROQ_API_KEY=your_groq_api_key

DATABASE_URL=mysql+pymysql://username:password@localhost:3306/ai_first_crm

Run the FastAPI backend:

uvicorn app.main:app --reload

Backend URL:

http://127.0.0.1:8000

Swagger API documentation:

http://127.0.0.1:8000/docs

## Frontend Setup

Navigate to the frontend directory:

cd frontend

Install dependencies:

npm install

Run the development server:

npm run dev

Frontend URL:

http://localhost:5173

## Application Workflow

1. A field representative logs an HCP interaction using the structured React form or communicates with the AI CRM Copilot.

2. FastAPI processes API requests.

3. Interaction data is stored in MySQL.

4. Redux Toolkit manages interaction history state on the frontend.

5. The LangGraph agent interprets conversational requests.

6. The agent selects the appropriate CRM tool.

7. Groq LLM supports natural-language understanding and AI-generated follow-up recommendations.

## Error Handling

The application includes error handling for API failures and external Groq API rate limits.

## Author

Shruti Shewale