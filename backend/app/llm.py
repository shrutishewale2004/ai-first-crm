import os

from dotenv import load_dotenv
from langchain_groq import ChatGroq


load_dotenv()


llm = ChatGroq(
    api_key=os.getenv("GROQ_API_KEY"),

    # Faster and lighter model
    model="llama-3.1-8b-instant",

    temperature=0,

    # Prevent unnecessarily long responses
    max_tokens=300,

    # Avoid automatic repeated requests
    max_retries=1
)