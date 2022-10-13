import React from 'react';
import styled from 'styled-components';
import { PageHero, StripeCheckout } from '../components';
// extra imports
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const CheckoutPage = () => {
  const { cart } = useSelector((store) => store.cart);

  return (
    <main>
      <PageHero title="結帳" />
      <Wrapper className="page">
        {cart.length < 1 ? (
          <div className="empty">
            <h2>您的購物車沒有商品</h2>
            <Link to='/products' className="btn">
              購物去~
            </Link>
          </div>
        ) : (
          <StripeCheckout />
        )}
      </Wrapper>
    </main>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  .empty {
    text-align: center;
  }
`;

export default CheckoutPage;
