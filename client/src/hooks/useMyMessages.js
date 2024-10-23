import { useEffect, useState } from 'react';
import axiosInstance from '../services/axiosInstance';

export default function useMyMessages() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    axiosInstance.get('/messages/my').then((response) => {
      setMessages(response.data);
    });
  }, []);

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

  return [messages, handleDeletePost];
}
