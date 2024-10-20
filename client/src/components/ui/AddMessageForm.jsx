import { VStack, HStack, Heading, Input, Textarea, Button } from '@chakra-ui/react';

export default function AddMessageForm({ handleSubmitForm }) {
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

        <Button colorScheme="teal" type="submit">
          Запостить
        </Button>
      </VStack>
    </form>
  );
}
