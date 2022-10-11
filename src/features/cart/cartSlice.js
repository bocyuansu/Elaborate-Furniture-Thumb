import { createSlice } from '@reduxjs/toolkit';

const getLocalStorage = () => {
  let cart = localStorage.getItem('cart');
  if (cart) {
    return JSON.parse(localStorage.getItem('cart'));
  } else {
    return [];
  }
};

const initialState = {
  cart: getLocalStorage(),
  total_items: 0,
  total_amount: 0,
  shipping_fee: 534,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { id, color, amount, product } = action.payload;
      const newItem = state.cart.find((item) => item.id === id + color);
      if (newItem) {
        const newCart = state.cart.map((cartItem) => {
          if (cartItem.id === id + color) {
            let newAmount = cartItem.amount + amount;
            if (newAmount > cartItem.max) {
              newAmount = cartItem.max;
            }
            return { ...cartItem, amount: newAmount };
          }
          return cartItem;
        });
        state.cart = newCart;
      } else {
        const newItem = {
          id: id + color,
          name: product.name,
          color,
          amount,
          image: product.images[0].url,
          price: product.price,
          max: product.stock,
        };
        state.cart = [...state.cart, newItem];
      }
    },
    removeItem: (state, action) => {
      state.cart = state.cart.filter((item) => item.id !== action.payload);
    },
    toggleAmount: (state, action) => {
      const { id, value } = action.payload;
      const newCart = state.cart.map((item) => {
        if (item.id === id) {
          let newAmount;
          // 商品數量增加
          if (value === 'inc') {
            newAmount = item.amount + 1;
            if (newAmount > item.max) {
              newAmount = item.max;
            }
          }
          // 商品數量減少
          if (value === 'dec') {
            newAmount = item.amount - 1;
            if (newAmount < 1) {
              newAmount = 1;
            }
          }
          return { ...item, amount: newAmount };
        }
        return item;
      });
      state.cart = newCart;
    },
    clearCart: (state, action) => {
      state.cart = [];
    },
    calculateCartTotals: (state, action) => {
      const { total_items, total_amount } = state.cart.reduce(
        (total, cartItem) => {
          const { amount, price } = cartItem;
          // 每個商品 數量 相加
          total.total_items += amount;
          // 每個商品 總金額 相加
          total.total_amount += price * amount;
          return total;
        },
        {
          total_items: 0,
          total_amount: 0,
        }
      );
      state.total_items = total_items;
      state.total_amount = total_amount;
    },
  },
});

export const {
  addToCart,
  removeItem,
  toggleAmount,
  clearCart,
  calculateCartTotals,
} = cartSlice.actions;

export default cartSlice.reducer;
