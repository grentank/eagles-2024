import type { z } from 'zod';
import type { loginFormSchema, UserStatusEnum, userDataSchema } from './schema';

export type UserDataT = z.infer<typeof userDataSchema>;

export type AuthT = {
  accessToken: string;
  user: UserT;
};

export type UserT =
  | { status: UserStatusEnum.pending }
  | { status: UserStatusEnum.guest }
  | ({
      status: UserStatusEnum.logged;
    } & UserDataT);

export type LoginForm = z.infer<typeof loginFormSchema>;
