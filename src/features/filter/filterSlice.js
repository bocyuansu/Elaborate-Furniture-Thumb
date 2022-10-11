import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  filtered_products: [],
  all_products: [],
  grid_view: true,
  sort: 'price-lowest',
  filters: {
    text: '',
    company: 'all',
    category: 'all',
    color: 'all',
    min_price: 0,
    max_price: 0,
    price: 0,
    shipping: false,
  },
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    loadProducts: (state, action) => {
      let maxPrice = action.payload.map((product) => product.price);
      maxPrice = Math.max(...maxPrice);

      state.all_products = action.payload;
      state.filtered_products = action.payload;
      state.filters.max_price = maxPrice;
      state.filters.price = maxPrice;
    },
    setGridView: (state, action) => {
      state.grid_view = true;
    },
    setListView: (state, action) => {
      state.grid_view = false;
    },
    updateSort: (state, action) => {
      // const name = action.payload.name;
      const value = action.payload.value;
      state.sort = value;
    },
    sortProducts: (state, action) => {
      const { sort, filtered_products } = state;
      let newProducts = [...filtered_products];
      if (sort === 'price-lowest') {
        newProducts = newProducts.sort((a, b) => a.price - b.price);
      }
      if (sort === 'price-highest') {
        newProducts = newProducts.sort((a, b) => b.price - a.price);
      }
      if (sort === 'name-a') {
        newProducts = newProducts.sort((a, b) => {
          return a.name.localeCompare(b.name);
        });
      }
      if (sort === 'name-z') {
        newProducts = newProducts.sort((a, b) => {
          return b.name.localeCompare(a.name);
        });
      }
      state.filtered_products = newProducts;
    },
    updateFilters: (state, action) => {
      // action.payload = e.target
      let { name, value } = action.payload;
      if (name === 'price') {
        value = Number(value);
      }
      state.filters[name] = value;
    },
    filterProducts: (state, action) => {
      const { all_products } = state;
      const { text, category, company, color, price, shipping } = state.filters;

      let newProducts = [...all_products];
      // Filtering
      // text
      if (text) {
        const getValue = new RegExp(text, 'gi');
        newProducts = [...newProducts].filter((product) =>
          getValue.exec(product.name)
        );
      }

      // category
      if (category !== 'all') {
        newProducts = newProducts.filter(
          (product) => product.category === category
        );
      }

      // company
      if (company !== 'all') {
        newProducts = newProducts.filter(
          (product) => product.company === company
        );
      }

      // colors
      if (color !== 'all') {
        newProducts = newProducts.filter((product) =>
          product.colors.find((c) => c === color)
        );
      }

      // price
      newProducts = newProducts.filter((product) => product.price <= price);

      // shipping
      if (shipping) {
        newProducts = newProducts.filter(
          (product) => product.shipping === true
        );
      }

      state.filtered_products = newProducts;
    },
    clearFilters: (state, action) => {
      state.filters = {
        ...state.filters,
        text: '',
        company: 'all',
        category: 'all',
        color: 'all',
        price: state.filters.max_price,
        shipping: false,
      };
    },
  },
});

export const {
  loadProducts,
  setGridView,
  setListView,
  updateSort,
  sortProducts,
  updateFilters,
  filterProducts,
  clearFilters,
} = filterSlice.actions;

export default filterSlice.reducer;
