import { configureStore } from '@reduxjs/toolkit';
import productSlice from './features/product/productSlice';
import filterSlice from './features/filter/filterSlice';
import cartSlice from './features/cart/cartSlice';
import oauthSlice from './features/oauth/oauthSlice';
// 將 redux 的 combineReducers 和 createStore 簡化成一個函式
export const store = configureStore({
  reducer: {
    products: productSlice,
    filter: filterSlice,
    cart: cartSlice,
    oauth: oauthSlice,
  },
});
