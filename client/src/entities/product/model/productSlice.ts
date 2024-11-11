import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import {
  deleteProductThunk,
  editProductThunk,
  loadAllProductsThunk,
  sendProductFormThunk,
} from './productThunks';
import type { ProductSliceT, ProductT } from './types';

const initialState: ProductSliceT = {
  items: [],
  error: null,
  loading: true,
  isOpenProductModal: false,
  favorites: [],
  chosenProduct: null,
  sort: {
    key: 'id',
    order: 'desc',
  },
};

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    openProductModal: (state, action: PayloadAction<ProductT | undefined>) => {
      if (action.payload) state.chosenProduct = action.payload;
      state.isOpenProductModal = true;
    },
    closeProductModal: (state) => {
      state.isOpenProductModal = false;
      state.chosenProduct = null;
    },
    reverseSort: (state) => {
      if (state.sort.order === 'asc') state.sort.order = 'desc';
      else state.sort.order = 'asc';
      //   state.sort.order = state.sort.order === 'asc' ? 'desc' : 'asc';
    },
    resetSort: (state) => {
      state.sort = {
        key: 'id',
        order: 'desc',
      };
    },
    setSortKey: (state, action: PayloadAction<'id' | 'price'>) => {
      state.sort.key = action.payload;
    },
    setChosenProduct: (state, action: PayloadAction<ProductT>) => {
      state.chosenProduct = action.payload;
    },
    addToFavorites: (state, action: PayloadAction<ProductT>) => {
      const indexInFavs = state.favorites.findIndex(
        (item) => item.id === action.payload.id,
      );
      if (indexInFavs === -1) state.favorites.unshift(action.payload);
      else state.favorites.splice(indexInFavs, 1);
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadAllProductsThunk.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
      })
      .addCase(loadAllProductsThunk.rejected, (state) => {
        state.error = 'Ошибка подгрузки товаров';
        state.loading = false;
      })
      .addCase(sendProductFormThunk.fulfilled, (state, action) => {
        state.items.unshift(action.payload);
      })
      .addCase(sendProductFormThunk.rejected, (state) => {
        state.error = 'Ошибка добавления товара';
      })
      .addCase(deleteProductThunk.fulfilled, (state, action) => {
        state.items = state.items.filter((p) => p.id !== action.payload);
      })
      .addCase(deleteProductThunk.rejected, (state) => {
        state.error = `Ошибка удаления товара`;
      })
      .addCase(editProductThunk.fulfilled, (state, action) => {
        const targetIndex = state.items.findIndex((p) => p.id === action.payload.id);
        if (targetIndex === -1) return;
        state.items[targetIndex] = action.payload;
      });
  },
});

// Action creators are generated for each case reducer function
export const {
  reverseSort,
  setSortKey,
  resetSort,
  setChosenProduct,
  addToFavorites,
  setError,
  openProductModal,
  closeProductModal,
} = productSlice.actions;

export default productSlice.reducer;
