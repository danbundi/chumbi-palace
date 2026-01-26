// src/components/Cart/EmptyCart.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag } from 'lucide-react';

const EmptyCart = () => {
  return (
    <div className="text-center py-12">
      <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-100 rounded-full mb-6 border border-gray-200">
        <ShoppingBag size={40} className="text-gray-500" />
      </div>
      <h1 className="text-2xl font-bold text-black mb-4">Your Cart is Empty</h1>
      <p className="text-gray-600 mb-8 max-w-md mx-auto">
        Looks like you haven't added any products to your cart yet. Start shopping to discover our amazing natural products!
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link
          to="/category/all"
          className="inline-flex items-center justify-center px-6 py-3 bg-pink-600 text-white font-medium rounded-lg hover:bg-pink-700 transition-colors"
        >
          <ShoppingBag size={18} className="mr-2" />
          Start Shopping
        </Link>
        <Link
          to="/hot-sale"
          className="inline-flex items-center justify-center px-6 py-3 bg-white text-gray-700 font-medium rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors"
        >
          🔥 View Hot Deals
        </Link>
      </div>
    </div>
  );
};

export default EmptyCart;