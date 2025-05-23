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

        config = self.restaurant_config.restaurante
        info = config.informacion_basica
        menu = config.menu
        promos = config.precios_promociones
        servicios = config.ambiente_servicios

        system_content = f"""Eres un asistente virtual amable para el restaurante {info.nombre}.
        
Información del Restaurante:
- Nombre: {info.nombre}
- Dirección: {info.direccion}
- Teléfono: {info.telefono}
- Sitio Web: {info.pagina_web}
- Horarios: {info.horario_atencion.lunes_a_viernes} (Lun-Vie), {info.horario_atencion.sabado} (Sáb), {info.horario_atencion.domingo} (Dom)

Menú:
- Tipo de Cocina: {menu.tipo_cocina}
- Platos Destacados: {', '.join(plato.nombre for plato in menu.platos_estrella)}
- Menú Infantil: {'Disponible' if menu.menu_infantil else 'No disponible'}

Promociones:
- Rango de Precios: {promos.rango_precios}
- Promociones Actuales: {', '.join(promo.descripcion for promo in promos.promociones)}

Servicios:
- Estilo: {servicios.estilo}
- Servicios Disponibles: {', '.join(servicios.servicios)}

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
