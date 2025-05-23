from typing import Optional, Dict
from pymongo.collection import Collection
from datetime import datetime
from models import RestaurantConfigInDB


class RestaurantCRUD:
    def __init__(self, collection: Collection):
        self.collection = collection

    def get_config(self) -> Optional[RestaurantConfigInDB]:
        """Obtener la configuración del restaurante"""
        config = self.collection.find_one()
        if config:
            config["_id"] = str(config["_id"])
            return RestaurantConfigInDB(**config)
        return None

    def create_config(self, config_data: Dict) -> RestaurantConfigInDB:
        """Crear nueva configuración del restaurante"""
        # Eliminar cualquier configuración existente
        self.collection.delete_many({})

        # Insertar nueva configuración
        config_data["created_at"] = datetime.now()
        result = self.collection.insert_one(config_data)
        created_config = self.collection.find_one({"_id": result.inserted_id})
        created_config["_id"] = str(created_config["_id"])
        return RestaurantConfigInDB(**created_config)

    def update_config(self, config_data: Dict) -> Optional[RestaurantConfigInDB]:
        """Actualizar la configuración del restaurante"""
        if not config_data:
            return None

        # Obtener el documento actual
        current_config = self.collection.find_one()
        if not current_config:
            return None

        # Actualizar solo los campos proporcionados
        update_data = {}
        for key, value in config_data.items():
            if value is not None:
                if isinstance(value, dict):
                    # Para campos anidados, actualizar solo los subcampos proporcionados
                    current_value = current_config.get(key, {})
                    current_value.update(value)
                    update_data[key] = current_value
                else:
                    update_data[key] = value

        if update_data:
            self.collection.update_one(
                {"_id": current_config["_id"]}, {"$set": update_data}
            )

        # Obtener y retornar la configuración actualizada
        updated_config = self.collection.find_one()
        if updated_config:
            updated_config["_id"] = str(updated_config["_id"])
            return RestaurantConfigInDB(**updated_config)
        return None

    def update_menu(self, menu_data: Dict) -> Optional[RestaurantConfigInDB]:
        """Actualizar el menú del restaurante"""
        return self.update_config(menu_data)

    def update_promociones(
        self, promociones_data: Dict
    ) -> Optional[RestaurantConfigInDB]:
        """Actualizar las promociones del restaurante"""
        return self.update_config(promociones_data)

    def delete_config(self) -> bool:
        """Eliminar la configuración del restaurante"""
        result = self.collection.delete_one({})
        return result.deleted_count > 0
