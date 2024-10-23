import Layout from '../components/Layout';
import MainPage from '../components/pages/MainPage';
import MessagesPage from '../components/pages/MessagesPage';
import LoginPage from '../components/pages/LoginPage';
import SignupPage from '../components/pages/SignupPage';
import OneMessagePage from '../components/pages/OneMessagePage';
import ErrorPage from '../components/pages/ErrorPage';
import ProtectedRoute from '../components/HOC/ProtectedRoute';
import AccountPage from '../components/pages/AccountPage';

export default function useAppRoutes(user) {
  return [
    {
      element: <Layout />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: '/',
          element: <MainPage />,
        },
        {
          path: '/messages',
          element: <MessagesPage />,
        },
        {
          path: '/messages/:messageId',
          element: <OneMessagePage />,
        },
        {
          path: '/account',
          element: (
            <ProtectedRoute redirectPath="/login" isAllowed={!!user}>
              <AccountPage />
            </ProtectedRoute>
          ),
        },
        {
          element: <ProtectedRoute isAllowed={!user} />,
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
      ],
    },
  ];
}
