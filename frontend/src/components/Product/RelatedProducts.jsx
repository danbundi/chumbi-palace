import React from 'react';
import ProductCard from './ProductCard';

const RelatedProducts = ({ products, currentProductId }) => {
  if (!products.length) return null;

  return (
    <div className="mt-16">
      <h2 className="text-3xl font-bold text-stone-900 mb-8 font-display">
        You Might Also Like
      </h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {products
          .filter(product => product._id !== currentProductId)
          .slice(0, 4)
          .map(product => (
            <ProductCard key={product._id} product={product} />
          ))
        }
      </div>

      {/* Decorative separator */}
      <div className="mt-12 pt-8 border-t border-amber-200">
        <div className="flex justify-center space-x-4">
          <div className="w-3 h-3 rounded-full bg-amber-500"></div>
          <div className="w-3 h-3 rounded-full bg-emerald-700"></div>
          <div className="w-3 h-3 rounded-full bg-orange-600"></div>
        </div>
      </div>
    </div>
  );
};

export default RelatedProducts;