import React from 'react';
import Product from './Product';
import Box from '@mui/material/Grid';

export default function Main(props) {
  const { products, onAdd } = props;
  return (
    <main> 
      <h2>Products</h2>
      <div className='products'>
        {products.map((product) => (
          <div className='product'>
          <Product key={product.id} product={product} onAdd={onAdd}></Product>
          </div>
        ))}
      </div>
    </main>
  );
}
