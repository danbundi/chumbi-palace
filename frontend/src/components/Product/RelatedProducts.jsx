import React from 'react';
import ProductCard from './ProductCard';

const RelatedProducts = ({ products, currentProductId }) => {
  if (!products.length) return null;

  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Related Products
      </h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products
          .filter(product => product.id !== currentProductId)
          .slice(0, 4)
          .map(product => (
            <ProductCard key={product.id} product={product} />
          ))
        }
      </div>
    </div>
  );
};

export default RelatedProducts;