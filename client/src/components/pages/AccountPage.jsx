import { useEffect, useState } from 'react';
import axiosInstance from '../../services/axiosInstance';
import { Box, VStack } from '@chakra-ui/react';
import MessageCard from '../ui/MessageCard';

export default function AccountPage({ user }) {
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
  return (
    <Box p={5}>
      <VStack spacing={4}>
        {messages.map((message) => (
          <MessageCard
            user={user}
            key={message.id}
            message={message}
            onDelete={() => handleDeletePost(message.id)}
          />
        ))}
      </VStack>
    </Box>
  );
}
