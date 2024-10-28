import { useEffect, useState } from 'react';
import messageService from '../services/messagesService';

export default function useMessages() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    messageService.getMessages().then(setMessages);
  }, []);

  const handleSubmitForm = async (event) => {
    try {
      event.preventDefault();
      const formElement = event.target;
      const formData = new FormData(formElement);
      const newMessage = await messageService.addMessage(formData);
      setMessages((prev) => [newMessage, ...prev]);
      formElement.reset();
    } catch (error) {
      console.log(error);
      alert(`Что-то пошло не так: ${error?.response?.data?.text || error?.message}`);
    }
  };

  const handleDeletePost = async (id) => {
    try {
      await messageService.deleteMessage(id);
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
  };
}
