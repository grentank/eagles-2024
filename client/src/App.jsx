import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './components/Layout';
import MainPage from './components/pages/MainPage';
import MessagesPage from './components/pages/MessagesPage';
import LoginPage from './components/pages/LoginPage';
import SignupPage from './components/pages/SignupPage';
import OneMessagePage from './components/pages/OneMessagePage';
import ErrorPage from './components/pages/ErrorPage';
import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  // undefined | null | { id, name, email, ... }
  const [user, setUser] = useState();

  useEffect(() => {
    axios
      .get('/api/tokens/refresh')
      .then((res) => {
        setUser(res.data.user);
      })
      .catch(() => {
        setUser(null);
      });
  }, []);

  const signupHandler = async (e, formData) => {
    e.preventDefault();
    const response = await axios.post('/api/auth/signup', formData);
    setUser(response.data.user);
  };

  const loginHandler = async (e, formData) => {
    e.preventDefault();
    const response = await axios.post('/api/auth/login', formData);
    setUser(response.data.user);
  };

  const logoutHandler = async () => {
    const response = await axios.get('/api/auth/logout');
    setUser(null);
  }

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
          element: <MessagesPage />,
        },
        {
          path: '/messages/:messageId',
          element: <OneMessagePage />,
        },
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
  ]);
  return <RouterProvider router={router} />;
}

export default App;
