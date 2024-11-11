import { z } from 'zod';
import { userDataSchema } from '../../auth/model/schema';

export const productSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string().nullable(),
  image: z.string().nullable(),
  price: z.number(),
  createdAt: z.string().datetime(),
  User: userDataSchema,
});

/// /////////////////////////////////////////////////////
// Хэндлеры и расширенная типизация

// Схема формы добавления -- все поля string и обязательные
export const productFormSchema = z.object({
  title: z.string(),
  description: z.string(),
  image: z.string(),
  price: z.string(),
});

// Типизация обработчиков
// export type SubmitProductHandler = (
//   event: React.FormEvent<HTMLFormElement>,
// ) => Promise<void>;

// export type DeleteProductHandler = (productId: ProductT['id']) => Promise<void>;

// export type ProductContextValue = {
//   products: ProductT[];
//   error: string | null;
//   loading: boolean;
//   submitHandler: SubmitProductHandler;
//   deleteHandler: DeleteProductHandler;
// };

// export type ProductsActionT =
//   | { type: 'SET_PRODUCTS'; payload: ProductT[] }
//   | { type: 'DELETE_PRODUCT'; payload: ProductT['id'] }
//   | { type: 'REVERSE_ORDER' }
//   | { type: 'SORT_BY'; payload: keyof ProductT }
//   | { type: 'ADD_PRODUCT'; payload: ProductT };
