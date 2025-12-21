import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Flame, Clock, Tag, AlertCircle } from 'lucide-react';
import Breadcrumbs from '../components/Layout/Breadcrumbs';
import ProductGrid from '../components/Product/ProductGrid';
import { useHotSales } from '../contexts/HotSaleContext';

const HotSalePage = () => {
  const { products, loading } = useHotSales();
  const [hotSaleProducts, setHotSaleProducts] = useState([]);

  useEffect(() => {
    if (products) {
      const hotSaleIds = hotSaleData.map(item => item.product_id);
      const hotSaleItems = products.filter(product => 
        hotSaleIds.includes(product._id || product.id)
      );
      setHotSaleProducts(hotSaleItems);
    }
  }, [products]);

  return (
  <div className="min-h-screen bg-linear-to-b from-red-50 to-white">
      <Breadcrumbs />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center p-3 bg-linear-to-r from-red-500 to-orange-500 rounded-full mb-4">
            <Flame size={32} className="text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            🔥 Hot Sale Deals
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-6">
            Limited time offers on our most popular products. Don't miss these amazing deals!
          </p>
          
          {/* Countdown Timer Placeholder */}
          <div className="inline-flex items-center space-x-2 bg-white px-6 py-3 rounded-full shadow-md mb-8">
            <Clock size={20} className="text-red-500" />
            <span className="font-semibold text-gray-900">Offer ends in:</span>
            <span className="text-red-600 font-bold">24:59:59</span>
          </div>
        </div>

        {/* Alert Banner */}
  <div className="bg-linear-to-r from-red-500 to-orange-500 rounded-2xl p-6 mb-8 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <AlertCircle size={24} className="mr-3" />
              <div>
                <h3 className="font-bold text-lg">Limited Time Offer!</h3>
                <p>These prices are exclusive to this sale. Shop now before they're gone!</p>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="text-2xl font-bold">UP TO 30% OFF</div>
              <div className="text-sm">On selected items</div>
            </div>
          </div>
        </div>

        {/* Products */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              Hot Sale Products ({hotSaleProducts.length})
            </h2>
            <div className="flex items-center text-red-600 font-semibold">
              <Tag size={20} className="mr-2" />
              All items on sale
            </div>
          </div>
          
          <ProductGrid products={hotSaleProducts} loading={loading} />
        </div>

        {/* How to Claim */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">How to Claim Your Deals</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-gray-50 rounded-xl">
              <div className="text-3xl mb-4">🛒</div>
              <h3 className="font-semibold text-gray-900 mb-2">Add to Cart</h3>
              <p className="text-gray-600">Select your favorite hot sale items</p>
            </div>
            <div className="text-center p-6 bg-gray-50 rounded-xl">
              <div className="text-3xl mb-4">💳</div>
              <h3 className="font-semibold text-gray-900 mb-2">Checkout</h3>
              <p className="text-gray-600">Proceed to secure checkout</p>
            </div>
            <div className="text-center p-6 bg-gray-50 rounded-xl">
              <div className="text-3xl mb-4">🚚</div>
              <h3 className="font-semibold text-gray-900 mb-2">Enjoy Delivery</h3>
              <p className="text-gray-600">Get your items delivered fast</p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <p className="text-gray-600 mb-6">
            Browse our full collection for more amazing products
          </p>
          <Link
            to="/category/all"
            className="inline-flex items-center px-8 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HotSalePage;