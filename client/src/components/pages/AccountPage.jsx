import { useContext } from 'react';
import { Box, Spinner, VStack } from '@chakra-ui/react';
import MessageCard from '../ui/MessageCard';
import AuthContext from '../../contexts/authContext';
import useMyMessages from '../../hooks/useMyMessages';

export default function AccountPage() {
  const { user } = useContext(AuthContext);
  const [messages, handleDeletePost, loading] = useMyMessages();
  return (
    <Box p={5}>
      {loading ? (
        <Spinner />
      ) : (
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
      )}
    </Box>
  );
}
