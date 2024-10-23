import { useEffect, useState } from 'react';
import axiosInstance, { setAccessToken } from '../services/axiosInstance';
import useQuery from './useQuery';

export default function useAuth() {
  const [user, setUser] = useState();
  //   const { data, loading, error } = useQuery('/tokens/refresh');

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

  return { user, loginHandler, signupHandler, logoutHandler };
}
