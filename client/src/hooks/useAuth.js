import axiosInstance, { setAccessToken } from '../services/axiosInstance';
import useQuery from './useQuery';

export default function useAuth() {
  const { data, loading, error, setData } = useQuery('/tokens/refresh');

  //   useEffect(() => {
  //     axiosInstance
  //       .get('/tokens/refresh')
  //       .then((res) => {
  //         setUser(res.data?.user);
  //         setAccessToken(res.data.accessToken);
  //       })
  //       .catch(() => {
  //         setUser(null);
  //       });
  //   }, []);

  const signupHandler = async (e, formData) => {
    e.preventDefault();
    const response = await axiosInstance.post('/auth/signup', formData);
    // setUser(response.data?.user);
    setData(response.data);
    setAccessToken(response.data.accessToken);
  };

  const loginHandler = async (e, formData) => {
    e.preventDefault();
    const response = await axiosInstance.post('/auth/login', formData);
    // setUser(response.data?.user);
    setData(response.data);
    setAccessToken(response.data.accessToken);
  };

  const logoutHandler = async () => {
    await axiosInstance.get('/auth/logout');
    // setUser(null);
    setData({ user: null, accessToken: '' });
    setAccessToken('');
  };

  return {
    loading,
    error,
    user: loading ? undefined : data?.user,
    loginHandler,
    signupHandler,
    logoutHandler,
  };
}
