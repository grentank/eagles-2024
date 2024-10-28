import axiosInstance from './axiosInstance';

class MessageService {
  #client;
  constructor(client) {
    this.#client = client;
  }

  async getMessages() {
    try {
      const response = await this.#client.get('/messages');
      if (response.status !== 200) throw new Error('Неверный статус получения сообщений');
      return response.data;
    } catch (error) {
      console.log(error);
      return [];
    }
  }

  async addMessage(formData) {
    try {
      const response = await this.#client.post('/messages', formData);
      if (response.status === 201) {
        return response.data;
      }
      throw new Error('Возникла ошибка добавления (проверь статус код 201)');
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async deleteMessage(messageId) {
    try {
      const response = await this.#client.delete(`/messages/${messageId}`);
      if (response.status !== 204 && response.status !== 200) {
        throw new Error('Возникла ошибка добавления (проверь статус код 204 или 200)');
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async getMyMessages() {
    try {
      const response = await this.#client.get('/messages/my');
      if (response.status !== 200) throw new Error('Неверный статус получения сообщений');
      return response.data;
    } catch (error) {
      console.log(error);
      return [];
    }
  }
}

const messageService = new MessageService(axiosInstance);

export default messageService;
