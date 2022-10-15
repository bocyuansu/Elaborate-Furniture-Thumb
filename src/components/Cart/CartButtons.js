import React, { useEffect } from 'react';
import { FaShoppingCart, FaUser } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { closeSidebar } from '../../features/product/productSlice';
import { calculateCartTotals } from '../../features/cart/cartSlice';
import { setUser, signIn, signOut } from '../../features/oauth/oauthSlice';
import jwt_decode from 'jwt-decode';

const CartButtons = () => {
  const dispatch = useDispatch();
  const { cart, total_items } = useSelector((store) => store.cart);
  const { isLogin } = useSelector((store) => store.oauth);
  const { isSidebarOpen } = useSelector((store) => store.products);
  const navigate = useNavigate();

  // 點選登入會執行此函式
  function handleCallbackResponse(response) {
    // 使用 jwt_decode 解密 Json Web Token
    const userObject = jwt_decode(response.credential);
    dispatch(setUser(userObject));
    dispatch(signIn());
    document.getElementById('signInDiv').hidden = true;

    localStorage.setItem('googleOAuthJWT', JSON.stringify(response.credential));
    // console.log('Encoded JWT ID token: ' + response.credential);
    // console.log(userObject);
  }

  // 登出時執行
  function handleSignOut() {
    dispatch(setUser({}));
    dispatch(signOut());
    document.getElementById('signInDiv').hidden = false;
    navigate('/');

    localStorage.removeItem('googleOAuthJWT');
  }

  // 載入 google OAuth
  useEffect(() => {
    // 載入完成才執行 (否則會出錯)
    if (window.google) {
      // 如果登入按鈕未渲染
      if (document.getElementById('signInDiv').children.length === 0) {
        const google = window.google;
  
        google.accounts.id.initialize({
          client_id: process.env.REACT_APP_AUTH_CLIENT_ID,
          callback: handleCallbackResponse,
          auto_select: false,
        });
    
        google.accounts.id.renderButton(document.getElementById('signInDiv'), {
          type: 'standard',
          theme: 'filled_blue',
          size: 'medium',
          text: 'signin_with',
          width: 200,
        });

        // google.accounts.id.prompt();
      }
    }
  });

  // 判斷使用者是否已登入
  useEffect(() => {
    if (isLogin) {
      document.getElementById('signInDiv').hidden = true;
    }
    // eslint-disable-next-line
  }, []);

  // 當 cart 發生變動時，計算商品數量 並 重新寫入localStorage
  useEffect(() => {
    dispatch(calculateCartTotals());
    // 把購物車商品存入 Local Storage ，必須轉成 JSON 字串
    localStorage.setItem('cart', JSON.stringify(cart));
    // eslint-disable-next-line
  }, [cart]);

  return (
    <Wrapper className={`cart-btn-wrapper ${isLogin ? 'loginWidth' : ''} ${isSidebarOpen ? 'd-none-cart d-show-cart' : 'd-none-cart'}`}>
      <Link
        to="/cart"
        className="cart-btn"
        onClick={() => dispatch(closeSidebar())}
      >
        購物車
        <span className="cart-container">
          <FaShoppingCart />
          <span className="cart-value">{total_items}</span>
        </span>
      </Link>
      <div type="button" id="signInDiv"></div>
      {isLogin && (
        <button
          type="button"
          className="auth-btn"
          onClick={() => handleSignOut()}
        >
          <FaUser />
          登出
        </button>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  width: 325px;

  .cart-btn {
    color: var(--clr-grey-1);
    font-size: 1.2rem;
    letter-spacing: var(--spacing);
    color: var(--clr-grey-1);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .cart-container {
    display: flex;
    align-items: center;
    position: relative;
    svg {
      height: 1.6rem;
      margin-left: 5px;
    }
  }
  .cart-value {
    position: absolute;
    top: -10px;
    right: -16px;
    background: var(--clr-primary-5);
    width: 16px;
    height: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    font-size: 0.75rem;
    color: var(--clr-white);
    padding: 12px;
  }
  .auth-btn {
    width: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: transparent;
    border-color: transparent;
    font-size: 1.5rem;
    cursor: pointer;
    color: var(--clr-grey-1);
    letter-spacing: var(--spacing);

    svg {
      margin-right: 0.5rem;
    }
  }
  @media (max-width: 992px) {
    .cart-btn {
      justify-content: start;
      margin-bottom: 40px;
    }
  }
`;
export default CartButtons;
