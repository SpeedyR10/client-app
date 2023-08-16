import { configureStore } from '@reduxjs/toolkit';
import { userSlice } from '../features/User/userSlice';
import { productSlice } from '../features/Product/productSlice';

export const store = configureStore({
  reducer: {
    user : userSlice.reducer,
    product: productSlice.reducer
  },
});
