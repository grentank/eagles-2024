import axiosInstance, { setAccessToken } from './axiosInstance';

class AuthService {
  #client;
  constructor(client) {
    this.#client = client;
  }

  async refresh() {
    try {
      const response = await this.#client('/tokens/refresh');
      if (response.status !== 200) throw new Error('Неверный статус ответа при refresh');
      setAccessToken(response.data.accessToken);
      return response.data.user;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async signup(formData) {
    try {
      const response = await this.#client.post('/auth/signup', formData);
      if (response.status !== 200) throw new Error('Неверный статус ответа при реге');
      setAccessToken(response.data.accessToken);
      return response.data.user;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async login(formData) {
    try {
      const response = await this.#client.post('/auth/login', formData);
      if (response.status !== 200) throw new Error('Неверный статус ответа при логине');
      setAccessToken(response.data.accessToken);
      return response.data.user;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async logout() {
    await this.#client.get('/auth/logout').catch((error) => console.log(error));
    setAccessToken('');
  }
}
// HTTPClient -> get, post, put, delete ...
// Dependency injection
const authService = new AuthService(axiosInstance);

export default authService;
