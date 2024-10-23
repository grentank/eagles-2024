import { Box, Button, Heading, HStack, Image, Text } from '@chakra-ui/react';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../../contexts/authContext';

export default function MessageCard({ message, onDelete }) {
  const { user } = useContext(AuthContext);
  // user: undefined | null | { id, name, email }
  return (
    <Box borderWidth="1px" borderRadius="lg" overflow="hidden" p={4} w="100%" shadow="md">
      <Heading as="h3" size="md" mb={2}>
        {message.title}
      </Heading>

      {message.img && (
        <Box display="flex" justifyContent="center" mb={4}>
          <Image src={`/images/${message.img}`} alt={message.title} maxW="300px" />
        </Box>
      )}

      {message.body && <Text mb={4}>{message.body}</Text>}

      <HStack justifyContent="space-between">
        <Button
          disabled={user?.id !== message.userId}
          colorScheme="red"
          onClick={onDelete}
        >
          &#x2716; Удалить
        </Button>
        <Button
          as={Link}
          to={`/messages/${message.id}`}
          colorScheme="teal"
          variant="outline"
        >
          Подробнее
        </Button>
      </HStack>
    </Box>
  );
}
