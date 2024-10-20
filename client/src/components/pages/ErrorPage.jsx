import { Box, VStack, Heading, Text, Button, Image } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

export default function ErrorPage() {
  return (
    <Box textAlign="center" py={10} px={6}>
      <Image src="/images/400.jpg" alt="Error cat" maxW="500px" mx="auto" mb={6} />
      <Heading as="h1" size="2xl" mb={4}>
        Ой! Что-то пошло не так
      </Heading>
      <Text fontSize="lg" mb={6}>
        Страница, которую вы ищете, не существует. Возможно, она была перемещена или
        удалена.
      </Text>
      <VStack spacing={4}>
        <Button as={Link} to="/" colorScheme="teal" size="lg">
          На главную
        </Button>
        <Text color="gray.500">
          Попробуйте вернуться на главную страницу и начать заново.
        </Text>
      </VStack>
    </Box>
  );
}
