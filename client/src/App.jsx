import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './components/Layout';
import MainPage from './components/pages/MainPage';
import MessagesPage from './components/pages/MessagesPage';
import LoginPage from './components/pages/LoginPage';
import SignupPage from './components/pages/SignupPage';
import OneMessagePage from './components/pages/OneMessagePage';
import ErrorPage from './components/pages/ErrorPage';

function App() {
  const router = createBrowserRouter([
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
          path: '/login',
          element: <LoginPage />,
        },
        {
          path: '/signup',
          element: <SignupPage />,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
