import { createAsyncThunk } from '@reduxjs/toolkit';
import { ZodError } from 'zod';
import { AxiosError } from 'axios';
import authService from '../api/authService';
import { loginFormSchema, UserStatusEnum } from './schema';
import { addToast } from '../../notification/model/notificationSlice';

export const loginThunk = createAsyncThunk(
  'auth/loginThunk',
  async (formData: FormData, { dispatch }) => {
    try {
      const data = loginFormSchema.parse(Object.fromEntries(formData));
      const auth = await authService.login(data);
      if (auth.user.status === UserStatusEnum.logged)
        dispatch(
          addToast({ type: 'success', text: `Добро пожаловать, ${auth.user.name}!` }),
        );
      return auth;
    } catch (error) {
      // dispatch -> error
      if (error instanceof ZodError) {
        console.log('Ошибка валидации при логине', error.issues);
      } else if (error instanceof AxiosError) {
        console.log('Ошибка запроса', error.response?.data);
      }
      dispatch(addToast({ type: 'danger', text: 'Ошибка входа' }));
      throw error;
    }
  },
);

export const checkAuthThunk = createAsyncThunk(
  'auth/checkAuthThunk',
  async (_, { dispatch }) => {
    try {
      const data = await authService.check();
      if (data.user.status === UserStatusEnum.logged) {
        dispatch(
          addToast({ type: 'success', text: `Добро пожаловать, ${data.user.name}!` }),
        );
      }
      return data;
    } catch (error) {
      if (error instanceof ZodError) {
        console.log('Ошибка валидации', error.issues);
      } else if (error instanceof AxiosError) {
        console.log('Ошибка запроса', error.response?.data);
      }
      dispatch(addToast({ type: 'warning', text: 'Вы не вошли в аккаунт' }));
      throw error;
    }
  },
);

export const logoutThunk = createAsyncThunk(
  'auth/logoutThunk',
  async (_, { dispatch }) => {
    try {
      await authService.logout();
      dispatch(addToast({ type: 'success', text: `Выход успешен` }));
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log('Ошибка запроса', error.response?.data);
      }
      dispatch(addToast({ type: 'warning', text: 'Ошибка при выходе' }));
      throw error;
    }
  },
);
