import axiosInstance from '../services/axiosInstance';
import useQuery from './useQuery';

export default function useMessages() {
  const { data: messages, loading, error, setData: setMessages } = useQuery('/messages');

  const handleSubmitForm = async (event) => {
    try {
      event.preventDefault();
      const formElement = event.target;
      const formData = new FormData(formElement);
      const response = await axiosInstance.post('/messages', formData);
      if (response.status === 201) {
        setMessages((prev) => [response.data, ...prev]);
        formElement.reset();
      }
    } catch (error) {
      console.log(error);
      alert(`Что-то пошло не так: ${error?.response?.data?.text}`);
    }
  };

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

  return {
    messages,
    handleSubmitForm,
    handleDeletePost,
    loading,
    error,
  };
}
