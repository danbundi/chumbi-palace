import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Flame, Clock, Tag, AlertCircle } from 'lucide-react';
import Breadcrumbs from '../components/Layout/Breadcrumbs';
import ProductGrid from '../components/Product/ProductGrid';
import { useHotSales } from '../contexts/HotSaleContext.jsx';
import { useProducts } from '../contexts/ProductContext.jsx';

const HotSalePage = () => {
  const { hotSales, loading } = useHotSales();
  const { products } = useProducts();
  const [hotSaleProducts, setHotSaleProducts] = useState([]);

  useEffect(() => {
    if (hotSales) {
      const hotSaleIds = hotSales.map(item => item.productCode);

      const hotSaleItems = products.filter(product =>
        hotSaleIds.includes(product.productCode || product.id)
      );

      setHotSaleProducts(hotSaleItems);
    }
  }, [hotSales]);

  return (
    <div className="min-h-screen bg-white">
      <Breadcrumbs />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center p-3 bg-pink-600 rounded-full mb-4">
            <Flame size={24} className="text-white" />
          </div>
          <h1 className="text-2xl font-bold text-black mb-3">
            🔥 Hot Sale Deals
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto mb-6">
            Limited time offers on our most popular products.
          </p>
        </div>

        {/* Products */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-3">
            <h2 className="text-xl font-bold text-black">
              Hot Sale Products ({hotSaleProducts.length})
            </h2>
            <div className="flex items-center text-pink-600 font-medium text-sm">
              <Tag size={16} className="mr-1.5" />
              All items on sale
            </div>
          </div>
          
          <ProductGrid products={hotSaleProducts} loading={loading} />
        </div>

        {/* How to Claim */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
          <h2 className="text-lg font-bold text-black mb-4">How to Claim Your Deals</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-gray-50 rounded-lg border border-gray-200">
              <div className="text-2xl mb-3">🛒</div>
              <h3 className="font-medium text-black mb-1">Add to Cart</h3>
              <p className="text-gray-600 text-sm">Select your favorite hot sale items</p>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg border border-gray-200">
              <div className="text-2xl mb-3">💳</div>
              <h3 className="font-medium text-black mb-1">Checkout</h3>
              <p className="text-gray-600 text-sm">Proceed to secure checkout</p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <p className="text-gray-600 mb-4">
            Browse our full collection for more amazing products
          </p>
          <Link
            to="/category/all"
            className="inline-flex items-center px-6 py-3 bg-black text-white font-medium rounded-lg hover:bg-gray-800 transition-colors"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HotSalePage;