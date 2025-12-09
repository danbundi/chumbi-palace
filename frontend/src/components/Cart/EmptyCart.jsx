// src/components/Cart/EmptyCart.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag } from 'lucide-react';

const EmptyCart = () => {
  return (
    <div className="text-center py-12">
      <div className="inline-flex items-center justify-center w-24 h-24 bg-gray-200 rounded-full mb-6">
        <ShoppingBag size={48} className="text-gray-400" />
      </div>
      <h1 className="text-3xl font-bold text-gray-900 mb-4">Your Cart is Empty</h1>
      <p className="text-gray-600 mb-8 max-w-md mx-auto">
        Looks like you haven't added any products to your cart yet. Start shopping to discover our amazing natural products!
      </p>
      <div className="space-x-4">
        <Link
          to="/category/all"
          className="inline-flex items-center px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors"
        >
          <ShoppingBag size={20} className="mr-2" />
          Start Shopping
        </Link>
        <Link
          to="/hot-sale"
          className="inline-flex items-center px-6 py-3 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition-colors"
        >
          🔥 View Hot Deals
        </Link>
      </div>
    </div>
  );
};

export default EmptyCart;