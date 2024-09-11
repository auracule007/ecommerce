import React, { useContext } from 'react';
import ProductItems from './ProductItems';
import EcomContext from '../context/EcomContext';

function Product() {
  const { product } = useContext(EcomContext);
  return (
    <div>
        <div className="container max-w-6xl mt-24 mb-24 m-auto">
          <h1 className="text-2xl my-5 uppercase font-bold text-center">Our Product</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {product.map((items, index) => (
                    <ProductItems key={index} product_item_prop={items} />
                ))}
            </div>
        </div>
    </div>
  )
}

export default Product;
