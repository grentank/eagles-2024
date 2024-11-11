import type { AxiosInstance } from 'axios';
import axiosInstance from '../../../shared/api/axiosInstance';
import { backendAuthSchema, UserStatusEnum } from '../model/schema';
import type { AuthT, LoginForm } from '../model/types';

class AuthService {
  constructor(private readonly client: AxiosInstance) {}

  async login(formData: LoginForm): Promise<AuthT> {
    const response = await this.client.post('/auth/login', formData);
    const authData = backendAuthSchema.parse(response.data);
    return { ...authData, user: { ...authData.user, status: UserStatusEnum.logged } };
  }

  async check(): Promise<AuthT> {
    const response = await this.client.get('/tokens/refresh');
    const authData = backendAuthSchema.parse(response.data);
    return { ...authData, user: { ...authData.user, status: UserStatusEnum.logged } };
  }

  logout(): Promise<void> {
    return this.client.get('/auth/logout');
  }
}

const authService = new AuthService(axiosInstance);

export default authService;
