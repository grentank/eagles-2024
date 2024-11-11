import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { UserStatusEnum } from './schema';
import { checkAuthThunk, loginThunk, logoutThunk } from './authThunks';
import type { AuthT } from './types';

const initialState: AuthT = {
  accessToken: '',
  user: { status: UserStatusEnum.pending },
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAccessToken: (state, action: PayloadAction<string>) => {
      state.accessToken = action.payload; // action.type: auth/setAccessToken
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginThunk.fulfilled, (_, action) => action.payload)
      .addCase(checkAuthThunk.fulfilled, (_, action) => action.payload)
      .addCase(checkAuthThunk.rejected, (state) => {
        state.user.status = UserStatusEnum.guest;
      })
      .addCase(logoutThunk.fulfilled, (state) => {
        state.accessToken = '';
        state.user = { status: UserStatusEnum.guest };
      });
  },
});

// Action creators are generated for each case reducer function
export const { setAccessToken } = authSlice.actions;

export default authSlice.reducer;
