from app.agents.tools import (
    log_interaction,
    edit_interaction,
    get_interaction,
    search_interactions,
    generate_follow_up_suggestion
)


print("\n--- TOOL 1: LOG INTERACTION ---")

result = log_interaction.invoke({
    "hcp_name": "Dr. Mehta",
    "interaction_type": "Meeting",
    "topics_discussed": "Discussed Product A benefits",
    "sentiment": "Positive",
    "outcomes": "Doctor showed interest",
    "follow_up_actions": "Contact next week"
})

print(result)


print("\n--- TOOL 2: GET INTERACTION ---")

result = get_interaction.invoke({
    "interaction_id": "4"
})

print(result)


print("\n--- TOOL 3: SEARCH INTERACTIONS ---")

result = search_interactions.invoke({
    "hcp_name": "Mehta"
})

print(result)


print("\n--- TOOL 4: EDIT INTERACTION ---")

result = edit_interaction.invoke({
    "interaction_id": "4",
    "field_name": "sentiment",
    "new_value": "Very Positive"
})

print(result)


print("\n--- TOOL 5: GENERATE FOLLOW-UP ---")

result = generate_follow_up_suggestion.invoke({
    "interaction_id": "4"
})

print(result)