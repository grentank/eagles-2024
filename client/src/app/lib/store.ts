import { configureStore } from '@reduxjs/toolkit';
import productReducer from '../../entities/product/model/productSlice';
import authReducer from '../../entities/auth/model/authSlice';
import notificationReducer from '../../entities/notification/model/notificationSlice';
import { productApi } from '../../entities/product/api/productApi';
import chatReducer from '../../features/chat/model/chatSlice';

export const store = configureStore({
  reducer: {
    products: productReducer,
    auth: authReducer,
    notification: notificationReducer,
    [productApi.reducerPath]: productApi.reducer,
    chat: chatReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(productApi.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
