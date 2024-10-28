import { useEffect, useState } from 'react';
import messageService from '../services/messagesService';

export default function useMyMessages() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    messageService.getMyMessages().then(setMessages);
  }, []);

  const handleDeletePost = async (id) => {
    try {
      await messageService.deleteMessage(id);
      setMessages(messages.filter((message) => message.id !== id));
    } catch (error) {
      console.log(error);
      alert(`Что-то пошло не так: ${error?.response?.data?.text}`);
    }
  };

  return [messages, handleDeletePost];
}
