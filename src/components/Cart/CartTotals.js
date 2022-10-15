import React from 'react';
import styled from 'styled-components';
// import { formatPrice } from '../../utils/helpers';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const CartTotals = () => {
  const { total_amount, shipping_fee } = useSelector((store) => store.cart);
  const { isLogin } = useSelector((store) => store.oauth);

  return (
    <Wrapper>
      <div>
        <article>
          <h5>
            小計 : <span>$ {total_amount && total_amount.toLocaleString()}</span>
          </h5>
          <h5>
            運費 : <span>{shipping_fee}</span>
          </h5>
          <hr />
          <h4>
            訂單金額:
            <span>$&nbsp;{total_amount && (total_amount + shipping_fee).toLocaleString()}</span>
          </h4>
        </article>
        {isLogin ? (
          <Link to="/checkout" className="btn">
            前往結帳
          </Link>
        ) : (
          <button
            type="button"
            className="btn"
            onClick={() => window.scrollTo(0,0)}
          >
            結帳前請先登入
          </button>
        )}
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  margin-top: 3rem;
  display: flex;
  justify-content: center;
  article {
    border: 1px solid var(--clr-grey-8);
    border-radius: var(--radius);
    padding: 1.5rem 3rem;
  }
  h4,
  h5,
  p {
    display: grid;
    grid-template-columns: 200px 1fr;
  }
  p {
    text-transform: capitalize;
  }
  h4 {
    margin-top: 2rem;
  }
  @media (min-width: 776px) {
    justify-content: flex-end;
  }
  .btn {
    width: 100%;
    margin-top: 1rem;
    text-align: center;
    font-weight: 700;
  }
  span {
    text-align: right;
  }
`;

export default CartTotals;
