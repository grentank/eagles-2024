import { useContext, useState } from 'react';
import {
  Box,
  VStack,
  Heading,
  Input,
  Button,
  FormControl,
  FormLabel,
  InputGroup,
  InputRightElement,
} from '@chakra-ui/react';
import AuthContext from '../../contexts/authContext';

export default function LoginPage() {
  const { loginHandler } = useContext(AuthContext);
  const [showPass, setShowPass] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <Box maxW="md" mx="auto" mt={10} p={6} boxShadow="lg" borderRadius="md">
      <Heading as="h1" mb={6} textAlign="center">
        Вход
      </Heading>
      <form onSubmit={(e) => loginHandler(e, formData)}>
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
            <FormLabel>Пароль</FormLabel>
            <InputGroup size="md">
              <Input
                type={showPass ? 'text' : 'password'}
                name="password"
                placeholder="Введите ваш пароль"
                value={formData.password}
                onChange={handleChange}
              />
              <InputRightElement width="4.5rem">
                <Button h="1.75rem" size="sm" onClick={() => setShowPass((s) => !s)}>
                  {showPass ? 'Hide' : 'Show'}
                </Button>
              </InputRightElement>
            </InputGroup>
          </FormControl>

          <Button type="submit" colorScheme="teal" size="lg" w="full">
            Войти
          </Button>
        </VStack>
      </form>
    </Box>
  );
}
