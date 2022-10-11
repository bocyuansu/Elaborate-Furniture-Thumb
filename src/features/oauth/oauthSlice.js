import { createSlice } from '@reduxjs/toolkit';
import jwt_decode from 'jwt-decode';

let isLogin = false;

// 判斷使用者是否已經登入
const getLocalStorage = () => {
  const JWT = localStorage.getItem('googleOAuthJWT');
  if (JWT) {
    isLogin = true;
    const user = jwt_decode(JWT);
    return user;
  } else {
    return {};
  }
};

const initialState = {
  user: getLocalStorage(),
  isLogin: isLogin,
};

const oauthSlice = createSlice({
  name: 'oauth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    signIn: (state, action) => {
      state.isLogin = true;
    },
    signOut: (state, action) => {
      state.isLogin = false;
    },
  },
});

export const { setUser, signIn, signOut } = oauthSlice.actions;

export default oauthSlice.reducer;
