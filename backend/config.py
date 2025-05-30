from dotenv import load_dotenv
import os

load_dotenv()

class Settings:
    def __init__(self):
        self.MONGODB_URI = os.getenv("MONGODB_URI")
        self.DATABASE_NAME = os.getenv("DATABASE_NAME")
        self.OPENAI_API_KEY = os.getenv("OPENAI_API_KEY", "")

settings = Settings() 