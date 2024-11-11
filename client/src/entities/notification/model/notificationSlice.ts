import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { ClassVariant, NotificationState } from './notificationTypes';

const initialState: NotificationState = {
  modal: {
    open: false,
    text: '',
  },
  toasts: [],
};

export const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    openModal: (state, action: PayloadAction<string>) => {
      state.modal = {
        open: true,
        text: action.payload,
      };
    },
    closeModal: (state) => {
      state.modal = {
        open: false,
        text: '',
      };
    },
    addToast: (state, action: PayloadAction<{ type: ClassVariant; text: string }>) => {
      const { type, text } = action.payload;
      state.toasts.push({ type, text, id: Math.random(), show: true });
    },
    hideToast: (state, action: PayloadAction<number>) => {
      state.toasts = state.toasts.filter((toast) => toast.id !== action.payload);
    },
  },
});

// Action creators are generated for each case reducer function
export const { openModal, closeModal, addToast, hideToast } = notificationSlice.actions;

export default notificationSlice.reducer;
