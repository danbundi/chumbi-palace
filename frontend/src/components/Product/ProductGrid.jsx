import React from 'react';
import ProductCard from './ProductCard';

const ProductGrid = ({ products, loading }) => {
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="bg-gradient-to-b from-amber-50/50 to-yellow-50/50 rounded-2xl shadow-lg p-6 animate-pulse border border-amber-200/50">
            <div className="bg-gradient-to-r from-amber-200/50 to-orange-200/50 h-56 rounded-xl mb-6"></div>
            <div className="h-5 bg-gradient-to-r from-amber-200/50 to-amber-300/50 rounded-lg mb-3"></div>
            <div className="h-4 bg-gradient-to-r from-amber-200/50 to-amber-300/50 rounded-lg mb-4"></div>
            <div className="h-4 bg-gradient-to-r from-amber-200/50 to-amber-300/50 rounded-lg mb-6 w-2/3"></div>
            <div className="flex justify-between items-center">
              <div className="h-7 bg-gradient-to-r from-amber-200/50 to-amber-300/50 rounded-lg w-24"></div>
              <div className="h-12 w-12 bg-gradient-to-r from-amber-200/50 to-amber-300/50 rounded-xl"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (!products.length) {
    return (
      <div className="text-center py-16">
        <div className="text-8xl mb-6">🌾</div>
        <h3 className="text-2xl font-bold text-stone-800 mb-3 font-display">No Natural Treasures Found</h3>
        <p className="text-stone-600 max-w-md mx-auto">Try exploring other categories or check back soon for new arrivals.</p>
        <div className="mt-8 flex justify-center space-x-3">
          <div className="w-3 h-3 rounded-full bg-amber-500"></div>
          <div className="w-3 h-3 rounded-full bg-emerald-700"></div>
          <div className="w-3 h-3 rounded-full bg-orange-600"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
      {products.map(product => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
  );
};

export default ProductGrid;