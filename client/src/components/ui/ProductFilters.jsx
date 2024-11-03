import {
  Box,
  Text,
  Slider,
  VStack,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  CheckboxGroup,
  Stack,
  Checkbox,
} from '@chakra-ui/react';

function ProductFilters() {
  return (
    <VStack align="stretch" spacing={4}>
      <Text fontSize="lg" fontWeight="bold">
        Фильтры
      </Text>

      {/* Price Slider */}
      <Box>
        <Text>Цена</Text>
        <Slider defaultValue={30} min={0} max={100} step={10}>
          <SliderTrack>
            <SliderFilledTrack />
          </SliderTrack>
          <SliderThumb />
        </Slider>
      </Box>

      {/* Categories */}
      <Box>
        <Text>Категории</Text>
        <CheckboxGroup colorScheme="blue">
          <Stack spacing={[1, 5]} direction={['column']}>
            <Checkbox value="electronics">Электроника</Checkbox>
            <Checkbox value="clothing">Одежда</Checkbox>
            <Checkbox value="books">Книги</Checkbox>
          </Stack>
        </CheckboxGroup>
      </Box>

      {/* Rating */}
      <Box>
        <Text>Рейтинг</Text>
        <CheckboxGroup colorScheme="blue">
          <Stack spacing={[1, 5]} direction={['column']}>
            <Checkbox value="4">4 звезды и выше</Checkbox>
            <Checkbox value="3">3 звезды и выше</Checkbox>
            <Checkbox value="2">2 звезды и выше</Checkbox>
            <Checkbox value="1">1 звезда и выше</Checkbox>
          </Stack>
        </CheckboxGroup>
      </Box>
    </VStack>
  );
}

export default ProductFilters;
