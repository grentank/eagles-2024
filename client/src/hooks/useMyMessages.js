import axiosInstance from '../services/axiosInstance';
import useQuery from './useQuery';

export default function useMyMessages() {
  const { data: messages, setData: setMessages, loading } = useQuery('/messages/my');
  //   const [messages, setMessages] = useState([]);

  //   useEffect(() => {
  //     axiosInstance.get('/messages/my').then((response) => {
  //       setMessages(response.data);
  //     });
  //   }, []);

  const handleDeletePost = async (id) => {
    try {
      const response = await axiosInstance.delete(`/messages/${id}`);
      if (response.status === 204)
        setMessages(messages.filter((message) => message.id !== id));
    } catch (error) {
      console.log(error);
      alert(`Что-то пошло не так: ${error?.response?.data?.text}`);
    }
  };

  return [messages, handleDeletePost, loading];
}
