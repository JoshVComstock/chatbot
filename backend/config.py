from dotenv import load_dotenv
import os

load_dotenv()

class Settings:
    def __init__(self):
        self.MONGODB_URI = os.getenv("MONGODB_URI", "mongodb+srv://Fabricio:RomayFa123@cluster0.xphrgcs.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
        self.DATABASE_NAME = os.getenv("DATABASE_NAME", "restaurant_db")
        self.OPENAI_API_KEY = os.getenv("OPENAI_API_KEY", "sk-test-1234567890abcdef")

settings = Settings()
