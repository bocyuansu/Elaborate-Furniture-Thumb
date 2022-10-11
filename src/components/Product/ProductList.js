import React, { useEffect } from 'react';
import Loading from '../Loading';
import GridView from './GridView';
import ListView from './ListView';
import { fetchProducts } from '../../features/product/productSlice';
import { loadProducts, sortProducts, filterProducts } from '../../features/filter/filterSlice';
import { useDispatch, useSelector } from 'react-redux';

const ProductList = () => {
  const dispatch = useDispatch();
  const { products_loading: loading, products } = useSelector((store) => store.products);
  const { filtered_products, grid_view, sort, filters } = useSelector((store) => store.filter);

  // Get all products
  useEffect(() => {
    dispatch(fetchProducts());
    // eslint-disable-next-line
  }, []);

  // 設置篩選要使用的 products
  // Set products to filtered_products , all_products
  useEffect(() => {
    dispatch(loadProducts(products));
    // eslint-disable-next-line
  }, [products]);

  useEffect(() => {
    // 篩選
    dispatch(filterProducts());
    // 排序
    dispatch(sortProducts());
    // eslint-disable-next-line
  }, [products, sort, filters])

  if (loading) {
    return <Loading />;
  }

  if (products.length < 1) {
    return (
      <h5 style={{ textTransform: 'none' }}>
        Sorry, no products matched your search...
      </h5>
    );
  }

  // 商品清單呈現方式 ; 呈現篩選後的商品
  if (grid_view) {
    return <GridView products={filtered_products}>product list</GridView>;
  }

  return <ListView products={filtered_products} />
};

export default ProductList;
