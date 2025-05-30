from typing import Optional
from pymongo.collection import Collection
from bson import ObjectId
from datetime import datetime


class RestaurantCRUD:
    def __init__(self, collection: Collection):
        self.collection = collection

    def get_config(self) -> Optional[dict]:
        """Obtiene la configuración del restaurante"""
        config = self.collection.find_one()
        if config:
            config["_id"] = str(config["_id"])
        return config

    def create_config(self, config: dict) -> dict:
        """Crea la configuración inicial del restaurante"""
        # Eliminar cualquier configuración existente
        self.collection.delete_many({})

        # Insertar nueva configuración
        config["created_at"] = datetime.now()
        result = self.collection.insert_one(config)
        created_config = self.collection.find_one({"_id": result.inserted_id})
        created_config["_id"] = str(created_config["_id"])
        return created_config

    def update_config(self, config: dict) -> Optional[dict]:
        """Actualiza la configuración del restaurante"""
        # Obtener el ID de la configuración existente
        existing_config = self.collection.find_one()
        if not existing_config:
            return None

        # Actualizar la configuración
        result = self.collection.update_one(
            {"_id": existing_config["_id"]}, {"$set": config}
        )

        if result.modified_count:
            updated_config = self.collection.find_one({"_id": existing_config["_id"]})
            updated_config["_id"] = str(updated_config["_id"])
            return updated_config
        return None

    def update_menu(self, menu: list) -> Optional[dict]:
        """Actualiza solo el menú del restaurante"""
        existing_config = self.collection.find_one()
        if not existing_config:
            return None

        result = self.collection.update_one(
            {"_id": existing_config["_id"]}, {"$set": {"menu": menu}}
        )

        if result.modified_count:
            updated_config = self.collection.find_one({"_id": existing_config["_id"]})
            updated_config["_id"] = str(updated_config["_id"])
            return updated_config
        return None
