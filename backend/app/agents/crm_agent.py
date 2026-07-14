from langgraph.prebuilt import create_react_agent

from app.llm import llm
from app.agents.tools import crm_tools


SYSTEM_PROMPT = """
You are a concise AI assistant for a life sciences CRM.

Use the CRM tools to manage Healthcare Professional interactions.

Tool rules:

- log_interaction: create a new interaction.
- edit_interaction: update an interaction.
- get_interaction: retrieve an interaction by ID.
- search_interactions: find interactions by HCP name.
- generate_follow_up_suggestion: generate a follow-up recommendation.

Always use the correct tool when the request requires CRM data.

Keep responses short and professional.

Do not invent missing information.
Do not repeatedly call the same tool.
After receiving the tool result, return the result to the user.
"""


crm_agent = create_react_agent(
    model=llm,
    tools=crm_tools,
    prompt=SYSTEM_PROMPT
)


def run_crm_agent(user_message: str) -> str:
    try:
        result = crm_agent.invoke(
            {
                "messages": [
                    {
                        "role": "user",
                        "content": user_message
                    }
                ]
            },
            {
              "recursion_limit": 25
            }
        )

        return result["messages"][-1].content

    except Exception as error:
        error_message = str(error).lower()

        if "rate_limit" in error_message or "429" in error_message:
            return "Groq API rate limit reached. Please try again later."

        return f"AI Assistant Error: {str(error)}"