import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ShoppingCart, Package, Truck, Shield } from 'lucide-react';
import Breadcrumbs from '../components/Layout/Breadcrumbs';
import RelatedProducts from '../components/Product/RelatedProducts';
import { useProducts } from '../contexts/ProductContext';
import { useCart } from '../contexts/CartContext';
import formatPrice from '../utils/formatPrice';

const ProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getProductById, getRelatedProducts } = useProducts();
  const { addToCart } = useCart();
  
  const [selectedVariant, setSelectedVariant] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const product = getProductById(id);

  useEffect(() => {
    if (!product) {
      navigate('/');
    }
  }, [product, navigate]);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-700 mb-4">Product not found</h2>
          <button
            onClick={() => navigate('/')}
            className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  const relatedProducts = getRelatedProducts(product);
  const variant = product.variants[selectedVariant];

  const handleAddToCart = () => {
    addToCart(product, variant, quantity);
  };

  const handleBuyNow = () => {
    addToCart(product, variant, quantity);
    navigate('/cart');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Breadcrumbs />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
            {/* Product Images */}
            <div>
              <div className="bg-gray-100 rounded-lg h-96 flex items-center justify-center mb-4 overflow-hidden">
                {product.image ? (
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <div className="text-center text-gray-500">
                    <div className="text-6xl mb-4">🌱</div>
                    <p className="text-lg font-medium">Product Image Gallery</p>
                    <p className="text-sm mt-2 text-gray-400">Multiple views will be here</p>
                  </div>
                )}
              </div>
              
              {/* Product Tags */}
              <div className="flex flex-wrap gap-2">
                {product.tags?.map(tag => (
                  <span 
                    key={tag} 
                    className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {product.name}
              </h1>
              
              <div className="flex items-center mb-4">
                <span className="text-2xl font-bold text-green-700">
                  {formatPrice(variant.price)} KES
                </span>
                <span className="ml-4 text-gray-600">
                  {variant.weight} pack
                </span>
              </div>

              {/* Variant Selection */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-3">Select Pack Size:</h3>
                <div className="flex flex-wrap gap-3">
                  {product.variants.map((v, index) => (
                    <button
                      key={v.sku}
                      onClick={() => setSelectedVariant(index)}
                      className={`px-4 py-3 rounded-lg border-2 transition-all ${
                        selectedVariant === index
                          ? 'border-green-600 bg-green-50 text-green-700'
                          : 'border-gray-200 hover:border-green-400'
                      }`}
                    >
                      <div className="font-medium">{v.name}</div>
                      <div className="text-sm">{v.weight}</div>
                      <div className="font-bold mt-1">{formatPrice(v.price)} KES</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity Selector */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-3">Quantity:</h3>
                <div className="flex items-center">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="bg-gray-200 w-10 h-10 rounded-l-lg flex items-center justify-center hover:bg-gray-300"
                  >
                    −
                  </button>
                  <div className="w-16 h-10 flex items-center justify-center border-t border-b border-gray-200">
                    {quantity}
                  </div>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="bg-gray-200 w-10 h-10 rounded-r-lg flex items-center justify-center hover:bg-gray-300"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-lg font-semibold flex items-center justify-center transition-colors"
                >
                  <ShoppingCart className="mr-2" size={20} />
                  Add to Cart
                </button>
                <button
                  onClick={handleBuyNow}
                  className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white py-3 px-6 rounded-lg font-semibold transition-colors"
                >
                  Buy Now
                </button>
              </div>

              {/* Product Details */}
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Description</h3>
                  <p className="text-gray-700 leading-relaxed">
                    {product.description}
                  </p>
                </div>

                {/* Features */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                    <Package className="text-green-600 mr-3" size={24} />
                    <div>
                      <div className="font-medium">Free Shipping</div>
                      <div className="text-sm text-gray-600">Over 2000 KES</div>
                    </div>
                  </div>
                  <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                    <Truck className="text-green-600 mr-3" size={24} />
                    <div>
                      <div className="font-medium">Fast Delivery</div>
                      <div className="text-sm text-gray-600">Nairobi 1-2 days</div>
                    </div>
                  </div>
                  <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                    <Shield className="text-green-600 mr-3" size={24} />
                    <div>
                      <div className="font-medium">Quality Guaranteed</div>
                      <div className="text-sm text-gray-600">Fresh & Organic</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <RelatedProducts 
              products={relatedProducts} 
              currentProductId={product._id}
            />
        )}
      </div>
    </div>
  );
};

export default ProductPage;