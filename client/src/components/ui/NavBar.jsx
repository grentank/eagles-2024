import { Box, Button, Flex, HStack, Link, Text } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';

export default function NavBar({ user, logoutHandler }) {
  return (
    <Box bg="teal.500" px={4}>
      <Flex h={16} alignItems="center" justifyContent="space-between">
        <HStack spacing={8} alignItems="center">
          <Box color="white" fontWeight="bold" fontSize="xl">
            Кото-пост
          </Box>
          <HStack as="nav" spacing={4}>
            <Link as={RouterLink} to="/" color="white" fontWeight="medium">
              Главная
            </Link>
            <Link as={RouterLink} to="/messages" color="white" fontWeight="medium">
              Сообщения
            </Link>
          </HStack>
        </HStack>

        <HStack spacing={4}>
          {user ? (
            <>
              <Text>Привет, {user.name}</Text>
              <Button onClick={logoutHandler} colorScheme="teal" variant="solid">
                Выйти
              </Button>
            </>
          ) : (
            <>
              <Button as={RouterLink} to="/login" colorScheme="teal" variant="solid">
                Войти
              </Button>
              <Button as={RouterLink} to="/signup" colorScheme="teal" variant="solid">
                Зарегистрироваться
              </Button>
            </>
          )}
        </HStack>
      </Flex>
    </Box>
  );
}
