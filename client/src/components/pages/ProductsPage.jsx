import { Box, Flex } from '@chakra-ui/react';
import ProductFilters from '../ui/ProductFilters';
import ProductCard from '../ui/ProductCard';
import { useEffect, useState } from 'react';
import axiosInstance from '../../services/axiosInstance';

const ProductPage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axiosInstance('/products').then((res) => setProducts(res.data));
  }, []);

  return (
    <Flex p={4}>
      {/* Sidebar */}
      <Box w="250px" mr={4}>
        <ProductFilters />
      </Box>

      {/* Product List */}
      <Box flex="1">
        <Flex wrap="wrap" gap={4}>
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </Flex>
      </Box>
    </Flex>
  );
};

export default ProductPage;
