import { Heading, Text, VStack } from '@chakra-ui/react';

export default function Feature({ title, description }) {
  return (
    <VStack
      p={5}
      border="1px solid"
      borderColor="gray.200"
      borderRadius="md"
      shadow="md"
      bg="white"
    >
      <Heading as="h3" size="md" textAlign="center">
        {title}
      </Heading>
      <Text textAlign="center">{description}</Text>
    </VStack>
  );
}
