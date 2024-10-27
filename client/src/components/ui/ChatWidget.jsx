// src/components/ChatWidget.js
import { useState } from 'react';
import {
  Box,
  Button,
  Heading,
  HStack,
  Input,
  Text,
  VStack,
  IconButton,
} from '@chakra-ui/react';
import { CloseIcon } from '@chakra-ui/icons';

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: 'Привет! Чем могу помочь?', sender: 'ai' },
  ]);
  const [input, setInput] = useState('');

  const handleToggle = () => setIsOpen(!isOpen);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (input.trim()) {
      setMessages([...messages, { text: input, sender: 'user' }]);
      setInput('');
      // Замените ниже на реальный вызов API для получения ответа от AI
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          { text: 'Это ответ AI на ваш запрос.', sender: 'ai' },
        ]);
      }, 1000);
    }
  };

  return (
    <Box position="fixed" bottom={4} right={4} zIndex={1000}>
      {isOpen ? (
        <Box
          w="300px"
          h="400px"
          bg="background.neutral"
          boxShadow="lg"
          borderRadius="md"
          overflow="hidden"
          border="1px solid"
          borderColor="gray.300"
        >
          {/* Заголовок окна чата */}
          <HStack
            p={2}
            bg="accent.main"
            color="white"
            justify="space-between"
            align="center"
          >
            <Heading as="h3" size="sm">
              AI-ассистент
            </Heading>
            <IconButton
              icon={<CloseIcon />}
              size="sm"
              variant="ghost"
              color="white"
              onClick={handleToggle}
              aria-label="Close chat"
            />
          </HStack>

          {/* История сообщений */}
          <VStack
            p={3}
            spacing={3}
            align="start"
            bg="white"
            h="calc(100% - 100px)"
            overflowY="auto"
          >
            {messages.map((msg, index) => (
              <Box
                key={index}
                bg={msg.sender === 'ai' ? 'gray.100' : 'blue.100'}
                color="black"
                p={2}
                borderRadius="md"
                alignSelf={msg.sender === 'user' ? 'flex-end' : 'flex-start'}
              >
                <Text>{msg.text}</Text>
              </Box>
            ))}
          </VStack>

          {/* Поле ввода и кнопка отправки */}
          <form onSubmit={handleSendMessage}>
            <HStack p={2} spacing={2} bg="gray.50">
              <Input
                value={input}
                placeholder="Введите сообщение"
                onChange={(e) => setInput(e.target.value)}
                //   onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              />
              <Button type="submit" colorScheme="teal">
                Отправить
              </Button>
            </HStack>
          </form>
        </Box>
      ) : (
        <Button colorScheme="teal" onClick={handleToggle}>
          Открыть AI-ассистент
        </Button>
      )}
    </Box>
  );
}
