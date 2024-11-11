/* eslint-disable import/prefer-default-export */
import { z } from 'zod';
import { userDataSchema } from '../../auth/model/schema';

export const messageSchema = z.object({
  id: z.number(),
  text: z.string(),
  userId: z.number().nullable(),
  createdAt: z.string().datetime(),
  User: userDataSchema.optional(),
});
