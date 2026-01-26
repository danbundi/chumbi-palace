import React from 'react';
import ProductCard from './ProductCard';

const RelatedProducts = ({ products, currentProductId }) => {
  if (!products.length) return null;

  return (
    <div className="mt-12">
      <h2 className="text-xl font-bold text-black mb-6">
        You Might Also Like
      </h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products
          .filter(product => product._id !== currentProductId)
          .slice(0, 4)
          .map(product => (
            <ProductCard key={product._id} product={product} />
          ))
        }
      </div>
    </div>
  );
};

export default RelatedProducts;