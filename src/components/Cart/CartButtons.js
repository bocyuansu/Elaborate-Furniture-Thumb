import React, { useEffect } from 'react';
import { FaShoppingCart, FaUser } from 'react-icons/fa';
import { Link, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { closeSidebar } from '../../features/product/productSlice';
import { useDispatch, useSelector } from 'react-redux';
import { calculateCartTotals } from '../../features/cart/cartSlice';
import { setUser, signIn, signOut } from '../../features/oauth/oauthSlice';
import jwt_decode from 'jwt-decode';

const CLIENT_ID =
  '1090328410694-p7uj36nish7agt93po8fc1eqs95jknub.apps.googleusercontent.com';

const CartButtons = () => {
  const dispatch = useDispatch();
  const { cart, total_items } = useSelector((store) => store.cart);
  const { isLogin } = useSelector((store) => store.oauth);
  const history = useHistory();

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

  function handleSignOut() {
    dispatch(setUser({}));
    dispatch(signOut());
    document.getElementById('signInDiv').hidden = false;
    history.push('/');

    localStorage.removeItem('googleOAuthJWT');
  }

  // 載入 google OAuth
  useEffect(() => {
    // 計時器
    const timer = setTimeout(() => {
      // global google
      const google = window.google;

      google.accounts.id.initialize({
        client_id: CLIENT_ID,
        callback: handleCallbackResponse,
        auto_select: false,
      });

      google.accounts.id.renderButton(document.getElementById('signInDiv'), {
        theme: 'outline',
        size: 'large',
        type: 'standard',
      });
    }, 500);

    // google.accounts.id.prompt();

    return () => {
      clearTimeout(timer);
    };
    // eslint-disable-next-line
  }, []);

  // 購物車 商品數量
  useEffect(() => {
    dispatch(calculateCartTotals());
    // 把購物車商品存入 Local Storage
    localStorage.setItem('cart', JSON.stringify(cart));
    // eslint-disable-next-line
  }, [cart]);

  // // 判斷使用者是否已登入
  useEffect(() => {
    if (isLogin) {
      document.getElementById('signInDiv').hidden = true;
    }
    // eslint-disable-next-line
  }, []);

  return (
    <Wrapper className={`cart-btn-wrapper ${isLogin ? 'loginWidth' : null}`}>
      <Link
        to="/cart"
        className="cart-btn"
        onClick={() => dispatch(closeSidebar)}
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
`;
export default CartButtons;
