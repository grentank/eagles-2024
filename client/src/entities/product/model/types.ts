import type { z } from 'zod';
import type { productFormSchema, productSchema } from './schemas';

export type ProductT = z.infer<typeof productSchema>;

export type ProductTExt = ProductT & { isFavorite: boolean };

export type ProductFormT = z.infer<typeof productFormSchema>;

export type ProductSliceT = {
  items: ProductT[];
  error: string | null;
  loading: boolean;
  isOpenProductModal: boolean;
  chosenProduct: ProductT | null;
  favorites: ProductT[];
  sort: {
    key: 'id' | 'price';
    order: 'asc' | 'desc';
  };
};
