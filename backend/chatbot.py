from langchain_openai import ChatOpenAI  # Para integración con OpenAI
from langchain.schema import HumanMessage, SystemMessage
from config import settings
from database import db

class RestaurantChatbot:
    def __init__(self):
        # Inicialización del modelo de lenguaje
        self.llm = ChatOpenAI(
            temperature=0.7,
            openai_api_key=settings.OPENAI_API_KEY,
            max_tokens=50
        )
        
        # Mensaje del sistema que define el rol del chatbot
        self.system_message = SystemMessage(content="""You are a helpful restaurant chatbot assistant...""")

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

