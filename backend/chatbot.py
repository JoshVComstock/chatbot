from langchain_openai import ChatOpenAI
from langchain.schema import HumanMessage, SystemMessage
from config import settings
from database import db
from crud_restaurant.restaurant import RestaurantCRUD
from pymongo import MongoClient


class RestaurantChatbot:
    def __init__(self):
        # Inicialización del modelo de lenguaje
        self.llm = ChatOpenAI(
            temperature=0.7, openai_api_key=settings.OPENAI_API_KEY, max_tokens=150
        )

        # Configuración de MongoDB usando variables de entorno
        client = MongoClient(settings.MONGODB_URI)
        db = client[settings.DATABASE_NAME]
        self.restaurant_crud = RestaurantCRUD(db.restaurant_config)

        # Obtener configuración del restaurante
        self.restaurant_config = self.restaurant_crud.get_config()

        # Mensaje del sistema que define el rol del chatbot
        self.system_message = self._create_system_message()

    def _create_system_message(self) -> SystemMessage:
        """Crea el mensaje del sistema con la información del restaurante"""
        if not self.restaurant_config:
            return SystemMessage(
                content="Eres un asistente virtual amable para un restaurante."
            )

        config = self.restaurant_config.get("restaurante", {})
        info = config.get("informacion_basica", {})
        menu = config.get("menu", {})
        promos = config.get("precios_promociones", {})
        servicios = config.get("ambiente_servicios", {})



        system_content = f"""Eres un asistente virtual amable para el restaurante {info.get("nombre", "doña lupe")}.

        
Información del Restaurante:
- Nombre: {info.get("nombre", "doña lupe")}
- Dirección: {info.get("direccion", "No especificada")}
- Teléfono: {info.get("telefono", "No especificado")}
- Sitio Web: {info.get("pagina_web", "No disponible")}
- Horarios: {info.get("horario_atencion", {}).get("lunes_a_viernes", "No info")} (Lun-Vie), {info.get("horario_atencion", {}).get("sabado", "No info")} (Sáb), {info.get("horario_atencion", {}).get("domingo", "No info")} (Dom)

Menú:
- Tipo de Cocina: {menu.get("tipo_cocina", "No especificado")}
- Platos Destacados: {', '.join(plato.get("nombre", "") for plato in menu.get("platos_estrella", []))}
- Menú Infantil: {'Disponible' if menu.get("menu_infantil", False) else 'No disponible'}

Promociones:
- Rango de Precios: {promos.get("rango_precios", "No info")}
- Promociones Actuales: {', '.join(promo.get("descripcion", "") for promo in promos.get("promociones", []))}

Servicios:
- Estilo: {servicios.get("estilo", "No especificado")}
- Servicios Disponibles: {', '.join(servicios.get("servicios", []))}

Debes usar esta información para proporcionar respuestas precisas y útiles a las consultas de los clientes. Siempre sé amable y profesional. Responde en español, a menos que el cliente te pida específicamente responder en otro idioma."""

        return SystemMessage(content=system_content)

    def get_response(self, user_id: str, message: str) -> str:
        # Obtiene historial de conversación
        history = db.get_conversation_history(user_id)

        # Prepara mensajes para el modelo
        messages = [self.system_message, HumanMessage(content=message)]

        # Genera respuesta
        response = self.llm.invoke(messages).content

        # Guarda la conversación
        db.save_conversation(user_id, message, response)

        return response
