from pydantic import BaseModel, Field
from typing import Optional, List, Dict


# Modelo para los mensajes del Chatbot
class Message(BaseModel):
    message: str


# Modelo para horario de atención
class HorarioAtencion(BaseModel):
    lunes_a_viernes: str
    sabado: str
    domingo: str


# Modelo para información básica del restaurante
class InformacionBasica(BaseModel):
    nombre: str
    direccion: str
    telefono: str
    horario_atencion: HorarioAtencion
    pagina_web: str


# Modelo para platos del menú
class Plato(BaseModel):
    nombre: str
    descripcion: str
    precio: float
    vegano: Optional[bool] = False
    popular: Optional[bool] = False


# Modelo para el menú
class Menu(BaseModel):
    tipo_cocina: str
    platos_estrella: List[Plato]
    menu_infantil: bool


# Modelo para promociones
class Promocion(BaseModel):
    descripcion: str
    dias_validos: List[str]


# Modelo para precios y promociones
class PreciosPromociones(BaseModel):
    rango_precios: str
    promociones: List[Promocion]


# Modelo para ambiente y servicios
class AmbienteServicios(BaseModel):
    estilo: str
    servicios: List[str]


# Modelo principal del restaurante
class RestaurantConfig(BaseModel):
    informacion_basica: InformacionBasica
    menu: Menu
    precios_promociones: PreciosPromociones
    ambiente_servicios: AmbienteServicios


# Modelo para el wrapper del restaurante
class RestaurantWrapper(BaseModel):
    restaurante: RestaurantConfig


# Modelo para crear configuración
class RestaurantConfigCreate(RestaurantWrapper):
    pass


# Modelo para actualizar configuración
class RestaurantConfigUpdate(BaseModel):
    restaurante: Optional[RestaurantConfig] = None


# Modelo para configuración en la base de datos
class RestaurantConfigInDB(RestaurantWrapper):
    id: str = Field(..., alias="_id")

    class Config:
        allow_population_by_field_name = True
