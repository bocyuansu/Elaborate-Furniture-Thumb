import React from 'react';
import { useSelector } from 'react-redux';
import { BsFillGridFill, BsList } from 'react-icons/bs';
import styled from 'styled-components';
import {
  setGridView,
  setListView,
  updateSort,
} from '../features/filter/filterSlice';
import { useDispatch } from 'react-redux';

const Sort = () => {
  const dispatch = useDispatch();
  const {
    filtered_products: products,
    grid_view,
    sort,
  } = useSelector((store) => store.filter);

  return (
    <Wrapper>
      <div className="btn-container">
        <button
          type="button"
          className={`${grid_view ? 'active' : null}`}
          onClick={() => dispatch(setGridView())}
        >
          <BsFillGridFill />
        </button>
        <button
          type="button"
          className={`${!grid_view ? 'active' : null}`}
          onClick={() => dispatch(setListView())}
        >
          <BsList />
        </button>
      </div>
      <p>找到 {products.length} 個商品</p>
      <hr />
      <form>
        <label htmlFor="sort">排序</label>
        <select
          name="sort"
          id="sort"
          className="sort-input"
          value={sort}
          onChange={(e) => dispatch(updateSort({ value: e.target.value }))}
        >
          <option value="price-lowest">價格 (從低到高)</option>
          <option value="price-highest">價格 (從高到低)</option>
          <option value="name-a">商品名稱 (a-z)</option>
          <option value="name-z">商品名稱 (z-a)</option>
        </select>
      </form>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  display: grid;
  grid-template-columns: auto auto 1fr auto;
  align-items: center;
  margin-bottom: 2rem;
  column-gap: 2rem;
  @media (max-width: 576px) {
    display: grid;
    grid-template-columns: 1fr;
    row-gap: 0.75rem;
    .btn-container {
      width: 50px;
    }
    label {
      display: inline-block;
      margin-right: 0.5rem;
    }
  }
  @media (min-width: 768px) {
    column-gap: 2rem;
  }
  p {
    text-transform: capitalize;
    margin-bottom: 0;
  }

  .btn-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: 0.5rem;
    button {
      background: transparent;
      border: 1px solid var(--clr-black);
      color: var(--clr-black);
      width: 1.5rem;
      border-radius: var(--radius);
      height: 1.5rem;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      svg {
        font-size: 1rem;
      }
    }
    .active {
      background: var(--clr-black);
      color: var(--clr-white);
    }
  }

  .sort-input {
    border-color: transparent;
    font-size: 1rem;
    text-transform: capitalize;
    margin-left: 0.25rem;
    padding: 0.25rem 0.5rem;
    color: var(--clr-grey-1);

    &:focus-visible {
      border: 2px solid var(--clr-primary-5);
      outline: none;
    }
  }

  label {
    font-size: 1rem;
    text-transform: capitalize;
  }
`;

export default Sort;
