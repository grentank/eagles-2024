import { Outlet } from 'react-router-dom';
import NavBar from './ui/NavBar';
import { Box, Flex } from '@chakra-ui/react';
import ChatWidget from './ui/ChatWidget';

export default function Layout() {
  return (
    <Flex direction="column" minH="100vh">
      <Box as="header">
        <NavBar />
      </Box>
      <Box as="main" flex="1">
        <Outlet />
      </Box>
      <ChatWidget />
    </Flex>
  );
}
