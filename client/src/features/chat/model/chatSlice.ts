import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { ChatState } from './types';
import type { UserDataT } from '../../../entities/auth/model/types';
import type { MessageT } from '../../../entities/message/model/types';

const initialState: ChatState = {
  users: [],
  messages: [],
};

export const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setUsers: (state, action: PayloadAction<UserDataT[]>) => {
      state.users = action.payload;
    },
    addMessage: (state, action: PayloadAction<MessageT>) => {
      state.messages.push(action.payload);
    },
    setMessages: (state, action: PayloadAction<MessageT[]>) => {
      state.messages = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setUsers, addMessage } = chatSlice.actions;

export default chatSlice.reducer;
