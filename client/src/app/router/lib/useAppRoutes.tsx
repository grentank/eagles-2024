import React from 'react';
import type { RouteObject } from 'react-router-dom';
import Layout from '../../layout/Layout';
import MainPage from '../../../pages/Main/MainPage';
import ProtectedRoute from '../feature/ProtectedRoute';
import { useAppSelector } from '../../../shared/lib/hooks';
import LoginPage from '../../../pages/Login/LoginPage';
import SignupPage from '../../../pages/SignUp/SignupPage';
import { UserStatusEnum } from '../../../entities/auth/model/schema';
import ChatPage from '../../../pages/Chat/ChatPage';

export default function useAppRoutes(): RouteObject[] {
  const status = useAppSelector((store) => store.auth.user.status);
  return [
    {
      element: <Layout />,
      errorElement: <h1>404</h1>,
      children: [
        {
          path: '/',
          element: <MainPage />,
        },
        {
          errorElement: <h1>Ошибка страницы</h1>,
          element: <ProtectedRoute isAllowed={status === UserStatusEnum.guest} />,
          children: [
            {
              path: '/login',
              element: <LoginPage />,
            },
            {
              path: '/signup',
              element: <SignupPage />,
            },
          ],
        },
        {
          element: <ChatPage />,
          path: '/chat',
        },
      ],
    },
  ];
}
