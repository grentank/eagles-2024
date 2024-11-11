import { createAsyncThunk } from '@reduxjs/toolkit';
import productService from '../api/productService';
import { productFormSchema } from './schemas';
import type { ProductT } from './types';

export const loadAllProductsThunk = createAsyncThunk('products/loadAllProducts', () =>
  productService.getProducts(),
);

export const sendProductFormThunk = createAsyncThunk(
  'products/sendProductFormThunk',
  (formData: FormData) => {
    const data = productFormSchema.parse(Object.fromEntries(formData));
    return productService.createProduct(data);
  },
);

export const deleteProductThunk = createAsyncThunk(
  'products/deleteProductThunk',
  async (productId: ProductT['id']) => {
    // thunkApi <-- createAsyncThunk
    await productService.deleteProduct(productId); // .then(() => productId),
    return productId;
  },
);

export const editProductThunk = createAsyncThunk(
  'products/editProductThunk',
  async ({ id, formData }: { id: number; formData: FormData }) => {
    const newProduct = await productService.editProduct(id, formData);
    return newProduct;
  },
);
