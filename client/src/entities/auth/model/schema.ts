import { z } from 'zod';

export enum UserStatusEnum {
  pending = 'pending',
  guest = 'guest',
  logged = 'logged',
}

export const userDataSchema = z.object({
  email: z.string(),
  name: z.string(),
  id: z.number(),
});
// extends
// export type UserT =
//   | { loading: false }
//   | { loading: true; guest: true }
//   | {
//       loading: true;
//       email: string;
//       name: string;
//       id: number;
//     };

export const backendAuthSchema = z.object({
  accessToken: z.string(),
  user: userDataSchema,
});

export const loginFormSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});
