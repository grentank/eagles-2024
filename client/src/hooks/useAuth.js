import { useEffect, useState } from 'react';
import authService from '../services/authService';

export default function useAuth() {
  const [user, setUser] = useState();
  console.log({ user });

  useEffect(() => {
    authService.refresh().then(setUser);
  }, []);

  const signupHandler = async (e, formData) => {
    e.preventDefault();
    const newUser = await authService.signup(formData);
    setUser(newUser);
  };

  const loginHandler = async (e, formData) => {
    e.preventDefault();
    const newUser = await authService.login(formData);
    setUser(newUser);
  };

  const logoutHandler = async () => {
    await authService.logout();
    setUser(null);
  };

  return { user, loginHandler, signupHandler, logoutHandler };
}
