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

class RestaurantConfigCreate(BaseModel):
    restaurante: dict  

# Modelo para configuración en la base de datos
class RestaurantConfigInDB(BaseModel):
    id: str = Field(..., alias="_id")
    restaurante: dict  

    class Config:
        validate_by_name = True

class RestaurantName(BaseModel):
    id: str = Field(..., alias="_id")
    nombreDelRestaurante: str

    class Config:
        validate_by_name = True
