from fastapi import FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List
from pymongo import MongoClient
from chatbot import RestaurantChatbot
from crud_restaurant.restaurant import RestaurantCRUD
from config import settings
from models import (
    RestaurantConfigCreate,
    RestaurantConfigInDB,
    Message,
    RestaurantName,
    LoginData,
)
from services.feedback_service import run_analysis
from database import users_collection
from services.auth import verify_password
from services.jwt_handler import create_access_token

app = FastAPI(title="Restaurant Chatbot API")

# Configurar CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configuración de MongoDB
client = MongoClient(settings.MONGODB_URI)
db = client.restaurant_db

# Inicializar CRUD
restaurant_crud = RestaurantCRUD(db.restaurant_config)

# Inicializar el chatbot
chatbot = RestaurantChatbot()

@app.post("/login")
def login(data: LoginData):
    # Find user in database
    user = users_collection.find_one({"username": data.username})
    if not user:
        # Dont reveal whether user exists or not
        raise HTTPException(
            status_code=401,
            detail="Verifique credenciales de autenticacion",
            headers={"WWW-Authenticate": "Bearer"}
        )
    
    # Verify password
    if not verify_password(data.password, user["hashed_password"]):
        raise HTTPException(
            status_code=401,
            detail="Verifique credenciales de autenticacion",
            headers={"WWW-Authenticate": "Bearer"}
        )
    
    # Create token (make sure you have create_access_token implemented)
    token = create_access_token(data={"sub": user["username"]})
    
    return {"access_token": token, "token_type": "bearer"}

@app.post("/chat")
async def chat(message: Message):
    try:
        # Usamos un ID temporal para el usuario
        user_id = "default_user"
        response = chatbot.get_response(user_id, message.message)
        return {"response": response}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


# Endpoints de Configuración del Restaurante
@app.get("/restaurant/config", response_model=RestaurantConfigInDB)
async def get_restaurant_config():
    try:
        config = restaurant_crud.get_config()
        if not config:
            raise HTTPException(status_code=404, detail="Configuracion no encontrada")
        return config
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# nombre de restaurants 
@app.get("/restaurants", response_model=List[RestaurantName])
async def get_restaurant_names():
    try:
        restaurants = restaurant_crud.get_all_names()
        return restaurants
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# feedback de restaurant
@app.get("/feedback")
async def get_feedback(restaurant_name: str = Query(...)):
    return run_analysis(restaurant_name)


@app.post("/restaurant/config", response_model=RestaurantConfigInDB)
async def create_restaurant_config(config: RestaurantConfigCreate):
    try:
        return restaurant_crud.create_config(config.dict())
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.put("/restaurant/config", response_model=RestaurantConfigInDB)
async def update_restaurant_config(config: RestaurantConfigInDB):
    try:
        updated_config = restaurant_crud.update_config(config.dict(exclude_unset=True))
        if not updated_config:
            raise HTTPException(status_code=404, detail="Configuracion no encontrada")
        return updated_config
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.put("/restaurant/menu", response_model=RestaurantConfigInDB)
async def update_restaurant_menu(menu: List[dict]):
    try:
        updated_config = restaurant_crud.update_menu(menu)
        if not updated_config:
            raise HTTPException(status_code=404, detail="Configuracion no encontrada")
        return updated_config
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="0.0.0.0", port=8000)