import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import AuthContext from './contexts/authContext';
import useAuth from './hooks/useAuth';
import useAppRoutes from './hooks/useAppRoutes.jsx';

function App() {
  const auth = useAuth(); // auth = { user, loginHandler, logoutHandler, ... }

  const routes = useAppRoutes(auth.user);
  const router = createBrowserRouter(routes);

  if (auth.loading) return <h1>Loading...</h1>;

  return (
    <AuthContext.Provider value={auth}>
      <RouterProvider router={router} />
    </AuthContext.Provider>
  );
}

export default App;
