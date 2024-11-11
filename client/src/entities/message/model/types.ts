import type { z } from 'zod';
import type { messageSchema } from './schema';

export type MessageT = z.infer<typeof messageSchema>;
