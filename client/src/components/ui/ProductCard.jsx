import { Box, Button, Image, Text, VStack, HStack, Badge } from "@chakra-ui/react";

const ProductCard = ({ product }) => {
  const { name, description, price, rating, image, categoryId } = product;

  return (
    <Box 
      borderWidth="1px" 
      borderRadius="lg" 
      overflow="hidden" 
      p={4} 
      mb={4} 
      boxShadow="md"
      width="100%"
    >
      {/* Product Image */}
      <Image src={image} alt={name} borderRadius="md" objectFit="cover" width="100%" height="200px" />

      {/* Product Details */}
      <VStack align="start" spacing={2} mt={4}>
        {/* Category */}
        <Badge colorScheme="blue" fontSize="0.8em">
          {categoryId}
        </Badge>

        {/* Name and Price */}
        <HStack justify="space-between" width="100%">
          <Text fontSize="xl" fontWeight="bold">
            {name}
          </Text>
          <Text fontSize="lg" color="green.500">
            ${price}
          </Text>
        </HStack>

        {/* Rating */}
        <Text fontSize="sm" color="gray.500">
          Рейтинг: {rating} / 5
        </Text>

        {/* Description */}
        <Text fontSize="sm" noOfLines={2}>
          {description}
        </Text>

        {/* Add to Cart Button */}
        <Button colorScheme="teal" width="100%" mt={2}>
          Добавить в корзину
        </Button>
      </VStack>
    </Box>
  );
};

export default ProductCard;
