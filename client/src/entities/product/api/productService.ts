import type { AxiosInstance } from 'axios';
import { ZodError } from 'zod';
import { productSchema } from '../model/schemas';
import axiosInstance from '../../../shared/api/axiosInstance';
import type { ProductFormT, ProductT } from '../model/types';

class ProductService {
  // Dependency Injection
  constructor(private readonly client: AxiosInstance) {}

  async getProducts(): Promise<ProductT[]> {
    try {
      const response = await this.client('/products');
      if (response.status !== 200) throw new Error('Неверный статус получения товаров');
      return productSchema.array().parse(response.data);
    } catch (error) {
      if (error instanceof ZodError) {
        console.log('ZOD ERROR', error.issues);
      } else {
        console.log('Ошибка получения товаров в сервисе', error);
      }
      return Promise.reject(error);
    }
  }

  // Метод на создание товара
  async createProduct(data: ProductFormT): Promise<ProductT> {
    try {
      const response = await this.client.post('/products', data);
      if (response.status !== 201) throw new Error('Неверный статус создания товара');
      return productSchema.parse(response.data);
    } catch (error) {
      if (error instanceof ZodError) {
        console.log('ZOD ERROR', error.issues);
      } else {
        console.log('Ошибка создания товара в сервисе', error);
      }
      return Promise.reject(error);
    }
  }

  // Метод на удаление товара
  async deleteProduct(id: ProductT['id']): Promise<void> {
    try {
      const response = await this.client.delete(`/products/${id}`);
      if (response.status !== 204) throw new Error('Неверный статус удаления товара');
      // if (Number.isNaN(Number(response.data))) throw new Error('Неверный формат данных');
      // return Number(response.data);
    } catch (error) {
      console.log('Ошибка удаления товара в сервисе', error);
      throw error;
    }
  }

  async editProduct(id: ProductT['id'], formData: FormData): Promise<ProductT> {
    try {
      const response = await this.client.patch(
        `/products/${id}`,
        Object.fromEntries(formData),
      );
      if (response.status !== 200)
        throw new Error('Неверный статус редактирования товара');
      return productSchema.parse(response.data);
    } catch (error) {
      if (error instanceof ZodError) {
        console.log('ZOD ERROR', error.issues);
      } else {
        console.log('Ошибка редактирования товара в сервисе', error);
      }
      return Promise.reject(error);
    }
  }
}

const productService = new ProductService(axiosInstance);

export default productService;
