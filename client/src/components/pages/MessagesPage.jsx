import { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, VStack } from '@chakra-ui/react';
import MessageCard from '../ui/MessageCard';
import AddMessageForm from '../ui/AddMessageForm';

export default function MessagesPage() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    axios.get('/api/messages').then((response) => {
      setMessages(response.data);
    });
  }, []);

  const handleSubmitForm = async (event) => {
    try {
      event.preventDefault();
      const formElement = event.target;
      const formData = new FormData(formElement);
      const response = await axios.post('/api/messages', formData);
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
      const response = await axios.delete(`/api/messages/${id}`);
      if (response.status === 204)
        setMessages(messages.filter((message) => message.id !== id));
    } catch (error) {
      console.log(error);
      alert(`Что-то пошло не так: ${error?.response?.data?.text}`);
    }
  };
  return (
    <Box p={5}>
      <AddMessageForm handleSubmitForm={handleSubmitForm} />

      <VStack spacing={4}>
        {messages.map((message) => (
          <MessageCard
            key={message.id}
            message={message}
            onDelete={() => handleDeletePost(message.id)}
          />
        ))}
      </VStack>
    </Box>
  );
}
