const API_URL = 'http://localhost:8000';

export const chatService = {
  async sendMessage(message) {
    try {
      const response = await fetch(`${API_URL}/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message }),
      });

      if (!response.ok) {
        throw new Error('Error en la comunicación con el servidor');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error al enviar mensaje:', error);
      throw error;
    }
  },

  async getMenu() {
    try {
      const response = await fetch(`${API_URL}/menu`);
      
      if (!response.ok) {
        throw new Error('Error al obtener el menú');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error al obtener el menú:', error);
      throw error;
    }
  }
};
