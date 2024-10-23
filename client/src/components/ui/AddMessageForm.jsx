import { VStack, HStack, Heading, Input, Textarea, Button } from '@chakra-ui/react';
import { useContext } from 'react';
import AuthContext from '../../contexts/authContext';

export default function AddMessageForm({ handleSubmitForm }) {
  const { user } = useContext(AuthContext);
  return (
    <form onSubmit={handleSubmitForm}>
      <VStack spacing={4} mb={6}>
        <Heading as="h2" size="lg">
          Сообщи о котах всему миру
        </Heading>

        <HStack w="100%" spacing={4}>
          <Input name="title" placeholder="Назови своё сообщение" required w="50%" />
          <input name="img" type="file" accept="image/*" />
        </HStack>

        <Textarea name="body" placeholder="(необязательно) Напиши подробности" />

        <Button disabled={!user} colorScheme="teal" type="submit">
          Запостить
        </Button>
      </VStack>
    </form>
  );
}
