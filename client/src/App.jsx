import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './components/Layout';
import MainPage from './components/pages/MainPage';
import MessagesPage from './components/pages/MessagesPage';
import LoginPage from './components/pages/LoginPage';
import SignupPage from './components/pages/SignupPage';
import OneMessagePage from './components/pages/OneMessagePage';
import ErrorPage from './components/pages/ErrorPage';
import { useEffect, useState } from 'react';
import axiosInstance, { setAccessToken } from './services/axiosInstance';
import ProtectedRoute from './components/HOC/ProtectedRoute';
import AccountPage from './components/pages/AccountPage';

function App() {
  // undefined | null | { id, name, email, ... }
  const [user, setUser] = useState();

  useEffect(() => {
    axiosInstance
      .get('/tokens/refresh')
      .then((res) => {
        setUser(res.data.user);
        setAccessToken(res.data.accessToken);
      })
      .catch(() => {
        setUser(null);
      });
  }, []);

  const signupHandler = async (e, formData) => {
    e.preventDefault();
    const response = await axiosInstance.post('/auth/signup', formData);
    setUser(response.data.user);
    setAccessToken(response.data.accessToken);
  };

  const loginHandler = async (e, formData) => {
    e.preventDefault();
    const response = await axiosInstance.post('/auth/login', formData);
    setUser(response.data.user);
    setAccessToken(response.data.accessToken);
  };

  const logoutHandler = async () => {
    await axiosInstance.get('/auth/logout');
    setUser(null);
    setAccessToken('');
  };

  const router = createBrowserRouter([
    {
      element: <Layout user={user} logoutHandler={logoutHandler} />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: '/',
          element: <MainPage />,
        },
        {
          path: '/messages',
          element: <MessagesPage user={user} />,
        },
        {
          path: '/messages/:messageId',
          element: <OneMessagePage user={user} />,
        },
        {
          path: '/account',
          element: (
            <ProtectedRoute redirectPath="/login" isAllowed={!!user}>
              <AccountPage user={user} />
            </ProtectedRoute>
          ),
        },
        {
          element: <ProtectedRoute isAllowed={user === null} />,
          children: [
            {
              path: '/login',
              element: <LoginPage loginHandler={loginHandler} />,
            },
            {
              path: '/signup',
              element: <SignupPage signupHandler={signupHandler} />,
            },
          ],
        },
      ],
    },
  ]);

  if (user === undefined) return <h1>Loading...</h1>;

  return <RouterProvider router={router} />;
}

export default App;
