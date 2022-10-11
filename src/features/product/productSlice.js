import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { firebase_products_url } from '../../utils/constants';

const initialState = {
  isSidebarOpen: false,
  products_loading: false,
  products_error: false,
  products: [],
  featured_products: [],
  single_product_loading: false,
  single_product_error: false,
  single_product: {},
};

// 處理非同步請求 Async actionCreator
export const fetchProducts = createAsyncThunk(
  'product/fetchProducts',
  async (name, thunkAPI) => {
    try {
      const response = await axios.get(`${firebase_products_url}.json`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue('發生錯誤');
    }
  }
);

export const fetchSingleProduct = createAsyncThunk(
  'product/fetchSingleProduct',
  async (url, thunkAPI) => {
    try {
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue('發生錯誤');
    }
  }
);

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    openSidebar: (state, action) => {
      state.isSidebarOpen = true;
    },
    closeSidebar: (state, action) => {
      state.isSidebarOpen = false;
    },
  },
  extraReducers: {
    [fetchProducts.pending]: (state) => {
      state.products_loading = true;
    },
    [fetchProducts.fulfilled]: (state, action) => {
      // 成功獲得資料 -> 資料在 action.payload
      const data = action.payload;

      // 將 物件 轉成 陣列
      const products = [];

      for (const key in data) {
        products.push({
          id: key,
          ...data[key],
        });
      }

      const featured_products = products.filter(
        (product) => product.featured === true
      );

      state.products = products;
      state.featured_products = featured_products;
      state.products_loading = false;
    },
    [fetchProducts.rejected]: (state, action) => {
      // 發生錯誤 -> 自訂錯誤訊息在 action.payload
      state.products_error = true;
      state.products_loading = false;
    },
    [fetchSingleProduct.pending]: (state) => {
      state.single_product_loading = true;
    },
    [fetchSingleProduct.fulfilled]: (state, action) => {
      state.single_product = action.payload;
      state.single_product_loading = false;
    },
    [fetchSingleProduct.rejected]: (state, action) => {
      state.single_product_error = true;
      state.single_product_loading = false;
    },
  },
});

export const { openSidebar, closeSidebar } = productSlice.actions;

export default productSlice.reducer;