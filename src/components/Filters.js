import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { updateFilters, clearFilters } from '../features/filter/filterSlice';
import { getUniqueValues, formatPrice } from '../utils/helpers';
import { FaCheck } from 'react-icons/fa';

const Filters = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedTerm, setDebouncedTerm] = useState('');

  const dispatch = useDispatch();
  const {
    filters: {
      category,
      company,
      color,
      min_price,
      price,
      max_price,
      shipping,
    },
    all_products,
  } = useSelector((store) => store.filter);

  /*
    搜尋商品 -> setTimeout 開始計時 -> useEffect( search ) -> 0.5秒後 執行 setTimeout 函式
    -> 執行 setDebouncedText(searchTerm) -> useEffect( search ) 發現相依的 debouncedTerm 相同
    -> 不會觸發 useEffect( search ) 的函式 -> 因此不會執行第二次搜尋
    Debounce : 節流
  */

  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedTerm(searchTerm);
    }, 500);

    return () => {
      clearTimeout(timerId);
    };
  }, [searchTerm]);

  useEffect(() => {
    dispatch(
      updateFilters({
        name: 'text',
        value: debouncedTerm,
      })
    );
    // eslint-disable-next-line
  }, [debouncedTerm])

  const categories = getUniqueValues(all_products, 'category');
  const companies = getUniqueValues(all_products, 'company');
  const colors = getUniqueValues(all_products, 'colors');

  return (
    <Wrapper>
      <div className="content">
        <form onSubmit={(e) => e.preventDefault()}>
          {/* search input */}
          <div className="form-control">
            <input
              type="text"
              name="text"
              placeholder="search"
              className="search-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          {/* end search input */}
          {/* categories */}
          <div className="form-control">
            <h5>category</h5>
            <div>
              {categories.map((c, i) => {
                return (
                  <button
                    key={i}
                    onClick={(e) =>
                      dispatch(
                        updateFilters({
                          name: e.target.name,
                          value: c,
                        })
                      )
                    }
                    type="button"
                    name="category"
                    className={`${category === c ? 'active' : null}`}
                  >
                    {c === 'all' ? '所有商品' : c}
                  </button>
                );
              })}
            </div>
          </div>
          {/* end of categories */}
          {/* companies */}
          <div className="form-control">
            <h5>company</h5>
            <select
              name="company"
              value={company}
              onChange={(e) =>
                dispatch(
                  updateFilters({
                    name: e.target.name,
                    value: e.target.value,
                  })
                )
              }
              className="company"
            >
              {companies.map((c, i) => {
                return (
                  <option key={i} value={c}>
                    {c === 'all' ? '所有廠商' : c}
                  </option>
                );
              })}
            </select>
          </div>
          {/* end of companies */}
          {/* colors */}
          <div className="form-control">
            <h5>colors</h5>
            <div className="colors">
              {colors.map((c, i) => {
                if (c === 'all') {
                  return (
                    <button
                      key={i}
                      name="color"
                      onClick={(e) =>
                        dispatch(
                          updateFilters({
                            name: e.target.name,
                            value: c,
                          })
                        )
                      }
                      data-color="all"
                      className={`${
                        color === 'all' ? 'all-btn active' : 'all-btn'
                      }`}
                    >
                      所有顏色
                    </button>
                  );
                }

                return (
                  <button
                    key={i}
                    name="color"
                    style={{ background: c }}
                    className={`${
                      color === c ? 'color-btn active' : 'color-btn'
                    }`}
                    onClick={(e) =>
                      dispatch(
                        updateFilters({
                          name: e.target.name,
                          value: c,
                        })
                      )
                    }
                  >
                    {color === c ? <FaCheck /> : null}
                  </button>
                );
              })}
            </div>
          </div>
          {/* end of colors */}
          {/* price */}
          <div className="form-control">
            <h5>price</h5>
            <p className="price">{formatPrice(price)}</p>
            <input
              type="range"
              name="price"
              onChange={(e) =>
                dispatch(
                  updateFilters({
                    name: e.target.name,
                    value: e.target.value,
                  })
                )
              }
              min={min_price}
              max={max_price}
              value={price}
            />
          </div>
          {/* end of price */}
          {/* shipping */}
          <div className="form-control shipping">
            <label htmlFor="shipping">免運費</label>
            <input
              type="checkbox"
              name="shipping"
              id="shipping"
              onChange={(e) =>
                dispatch(
                  updateFilters({
                    name: e.target.name,
                    value: e.target.checked,
                  })
                )
              }
              checked={shipping}
            />
          </div>
          {/* end of shipping */}
        </form>
        <button
          type="button"
          className="clear-btn"
          onClick={() => dispatch(clearFilters())}
        >
          清除篩選條件
        </button>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  .form-control {
    margin-bottom: 1.25rem;
    h5 {
      margin-bottom: 0.5rem;
    }
  }

  .search-input {
    padding: 0.5rem;
    background: var(--clr-grey-10);
    border-radius: var(--radius);
    border-color: transparent;
    letter-spacing: var(--spacing);

    &::placeholder {
      text-transform: capitalize;
    }

    &:focus-visible {
      border: 2px solid var(--clr-primary-5);
      outline: none;
    }
  }

  button {
    display: block;
    margin: 0.25em 0;
    padding: 0.25rem 0;
    text-transform: capitalize;
    background: transparent;
    border: none;
    border-bottom: 1px solid transparent;
    letter-spacing: var(--spacing);
    color: var(--clr-grey-5);
    cursor: pointer;
  }

  .active {
    border-color: var(--clr-grey-5);
  }

  .company {
    background: var(--clr-grey-10);
    border-radius: var(--radius);
    border-color: transparent;
    padding: 0.25rem;
    color: var(--clr-grey-1);

    &:focus-visible {
      border: 2px solid var(--clr-primary-5);
      outline: none;
    }
  }

  .colors {
    display: flex;
    align-items: center;
  }
  .color-btn {
    display: inline-block;
    width: 1rem;
    height: 1rem;
    border-radius: 50%;
    background: #222;
    margin-right: 0.5rem;
    border: none;
    cursor: pointer;
    opacity: 0.5;
    display: flex;
    align-items: center;
    justify-content: center;
    svg {
      font-size: 0.5rem;
      color: var(--clr-white);
    }
  }
  .all-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 0.5rem;
    opacity: 0.5;
  }
  .active {
    opacity: 1;
  }
  .all-btn .active {
    text-decoration: underline;
  }
  .price {
    margin-bottom: 0.25rem;
  }
  .shipping {
    display: grid;
    grid-template-columns: auto 1fr;
    align-items: center;
    text-transform: capitalize;
    column-gap: 0.5rem;
    font-size: 1rem;
    max-width: 200px;
  }
  .clear-btn {
    background: var(--clr-primary-5);
    color: var(--clr-white);
    padding: 0.25rem 0.5rem;
    border-radius: var(--radius);
  }
  @media (min-width: 768px) {
    .content {
      position: sticky;
      top: 1rem;
    }
  }
`;

export default Filters;
