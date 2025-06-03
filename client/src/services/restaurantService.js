const API_URL = 'http://localhost:8000';

export const restaurantService = {
  async getConfig() {
    try {
      const response = await fetch(`${API_URL}/restaurant/config`);
      
      if (!response.ok) {
        throw new Error('Error al obtener la configuración del restaurante');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error al obtener la configuración:', error);
      throw error;
    }
  },

  async createConfig(config) {
    try {
      const response = await fetch(`${API_URL}/restaurant/config`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(config),
      });

      if (!response.ok) {
        throw new Error('Error al crear la configuración del restaurante');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error al crear la configuración:', error);
      throw error;
    }
  },

  async updateConfig(config) {
    try {
      const response = await fetch(`${API_URL}/restaurant/config`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(config),
      });

      if (!response.ok) {
        throw new Error('Error al actualizar la configuración del restaurante');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error al actualizar la configuración:', error);
      throw error;
    }
  },

  async updateMenu(menu) {
    try {
      const response = await fetch(`${API_URL}/restaurant/menu`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(menu),
      });

      if (!response.ok) {
        throw new Error('Error al actualizar el menú');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error al actualizar el menú:', error);
      throw error;
    }
  },
 async sendMessage(message){
    const response = await fetch(`${API_URL}/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message }),
    });
    if (!response.ok) throw new Error("Error al enviar mensaje al chatbot");
    return response.json();
  }
}; 