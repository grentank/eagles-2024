import { Box, Spinner, VStack } from '@chakra-ui/react';
import MessageCard from '../ui/MessageCard';
import AddMessageForm from '../ui/AddMessageForm';
import useMessages from '../../hooks/useMessages';

export default function MessagesPage() {
  const { messages, handleSubmitForm, handleDeletePost, loading, error } = useMessages();
  if (error) throw error;
  return (
    <Box p={5}>
      <AddMessageForm handleSubmitForm={handleSubmitForm} />

      {loading ? (
        <Spinner />
      ) : (
        <VStack spacing={4}>
          {messages.map((message) => (
            <MessageCard
              key={message.id}
              message={message}
              onDelete={() => handleDeletePost(message.id)}
            />
          ))}
        </VStack>
      )}
    </Box>
  );
}
