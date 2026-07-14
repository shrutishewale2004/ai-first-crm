from app.agents.crm_agent import run_crm_agent


print("\n--- LANGGRAPH AGENT TEST ---")

message = """
Log a new interaction with Dr. Patil.
It was a meeting.
We discussed Product B benefits.
The doctor's sentiment was positive.
The doctor requested more clinical information.
Follow up next week.
"""

result = run_crm_agent(message)

print("\nAGENT RESPONSE:")
print(result)