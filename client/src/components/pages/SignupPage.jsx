import { useState } from 'react';
import {
  Box,
  VStack,
  Heading,
  Input,
  Button,
  FormControl,
  FormLabel,
} from '@chakra-ui/react';

export default function SignupPage() {
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e) =>
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  return (
    <Box maxW="md" mx="auto" mt={10} p={6} boxShadow="lg" borderRadius="md">
      <Heading as="h1" mb={6} textAlign="center">
        Регистрация
      </Heading>
      <form>
        <VStack spacing={4}>
          <FormControl isRequired>
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              name="email"
              placeholder="Введите ваш email"
              value={formData.email}
              onChange={handleChange}
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Имя пользователя</FormLabel>
            <Input
              type="text"
              name="username"
              placeholder="Введите имя пользователя"
              value={formData.username}
              onChange={handleChange}
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Пароль</FormLabel>
            <Input
              type="password"
              name="password"
              placeholder="Введите пароль"
              value={formData.password}
              onChange={handleChange}
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Подтверждение пароля</FormLabel>
            <Input
              type="password"
              name="confirmPassword"
              placeholder="Подтвердите пароль"
              isInvalid={
                formData.password !== formData.confirmPassword &&
                formData.confirmPassword.length > 0
              }
              errorBorderColor="crimson"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
          </FormControl>

          <Button type="submit" colorScheme="teal" size="lg" w="full">
            Зарегистрироваться
          </Button>
        </VStack>
      </form>
    </Box>
  );
}
