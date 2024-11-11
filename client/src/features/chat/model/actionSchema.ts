import { z } from 'zod';
import { userDataSchema } from '../../../entities/auth/model/schema';

const chatActionSchema = z.object({
  type: z.string(),
  payload: z.any(),
});

export default chatActionSchema;
