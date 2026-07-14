from app.llm import llm


response = llm.invoke(
    "Reply with exactly this sentence: AI CRM connection successful"
)

print(response.content)