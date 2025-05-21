from pydantic import BaseModel, Field
from typing import Optional, List

# Modelo para los mensajes del Chatbot
class Message(BaseModel):
    message: str

# Modelo para ítems del menú
class MenuItem(BaseModel):
    name: str
    price: str
    description: str


# Modelo para configuración del restaurante
class RestaurantConfig(BaseModel):
    name: str
    welcomeMessage: str
    specialOffer: str
    menu: List[MenuItem]


# Modelos para crear y actualizar configuración
class RestaurantConfigCreate(RestaurantConfig):
    pass


class RestaurantConfigUpdate(BaseModel):
    name: Optional[str] = None
    welcomeMessage: Optional[str] = None
    specialOffer: Optional[str] = None
    menu: Optional[List[MenuItem]] = None


# Modelo para configuración en la base de datos
class RestaurantConfigInDB(RestaurantConfig):
    id: str = Field(..., alias="_id")

    class Config:
        allow_population_by_field_name = True
