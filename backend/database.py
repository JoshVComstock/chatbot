from pymongo import MongoClient
from bson import ObjectId
from config import settings
from datetime import datetime


class Database:
    def __init__(self):
        self.client = MongoClient(settings.MONGODB_URI)
        self.db = self.client[settings.DATABASE_NAME]
        self.conversations = self.db.conversations
        self.menu = self.db.menu
        self.users = self.db.users


    def save_conversation(self, user_id: str, message: str, response: str):
        conversation = {
            "user_id": user_id,
            "message": message,
            "response": response,
            "timestamp": datetime.now(),
        }
        return self.conversations.insert_one(conversation)

    def get_conversation_history(self, user_id: str, limit: int = 10):
        return list(
            self.conversations.find({"user_id": user_id})
            .sort("timestamp", -1)
            .limit(limit)
        )
    def add_menu_item(self, item):
        self.menu.insert_one(item)


db = Database()
users_collection = db.users