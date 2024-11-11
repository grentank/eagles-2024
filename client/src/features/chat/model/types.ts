import type { UserDataT } from '../../../entities/auth/model/types';
import type { MessageT } from '../../../entities/message/model/types';

export type ChatState = {
  users: UserDataT[];
  messages: MessageT[];
};
