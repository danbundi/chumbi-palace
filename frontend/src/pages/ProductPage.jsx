import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ShoppingCart, Package, Truck, Shield } from 'lucide-react';
import Breadcrumbs from '../components/Layout/Breadcrumbs';
import RelatedProducts from '../components/Product/RelatedProducts';
import { useProducts } from '../contexts/ProductContext';
import { useCart } from '../contexts/CartContext';
import formatPrice from '../utils/formatPrice';
import { API_BASE_URL } from '../api/api';

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
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center bg-white p-8 rounded-xl border border-gray-200 max-w-md">
          <h2 className="text-xl font-bold text-black mb-4">Product Not Found</h2>
          <p className="text-gray-600 mb-6">This product seems to be unavailable.</p>
          <button
            onClick={() => navigate('/')}
            className="px-6 py-3 bg-pink-600 text-white font-medium rounded-lg hover:bg-pink-700 transition-colors"
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
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Product Images */}
            <div>
              <div className="bg-gray-100 rounded-lg h-80 flex items-center justify-center mb-6 overflow-hidden border border-gray-200">
                {product.image ? (
                  <img 
                    src={`${API_BASE_URL}/public/${product.image}`} 
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="text-center p-6">
                    <div className="text-6xl mb-4">🌿</div>
                    <p className="font-medium text-gray-700 mb-2">Chumbi Palace</p>
                    <p className="text-gray-500">Natural Products</p>
                  </div>
                )}
              </div>
              
              {/* Product Tags */}
              <div className="flex flex-wrap gap-2">
                {product.tags?.map(tag => (
                  <span 
                    key={tag} 
                    className="bg-gray-100 text-gray-700 px-3 py-1.5 rounded-lg text-sm border border-gray-200"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div>
              <h1 className="text-2xl font-bold text-black mb-3">
                {product.name}
              </h1>
              
              <div className="flex items-center mb-6">
                <span className="text-2xl font-bold text-black">
                  {formatPrice(variant.price)} KES
                </span>
                <span className="ml-6 px-3 py-1.5 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium border border-gray-200">
                  {variant.weight} pack
                </span>
              </div>

              {/* Variant Selection */}
              <div className="mb-6">
                <h3 className="font-medium text-gray-800 mb-3">Select Pack Size:</h3>
                <div className="flex flex-wrap gap-3">
                  {product.variants.map((v, index) => (
                    <button
                      key={v.sku}
                      onClick={() => setSelectedVariant(index)}
                      className={`px-4 py-3 rounded-lg border transition-colors ${
                        selectedVariant === index
                          ? 'border-pink-600 bg-pink-50 text-pink-700'
                          : 'border-gray-300 hover:border-gray-400 bg-white'
                      }`}
                    >
                      <div className="font-medium">{v.name}</div>
                      <div className="text-sm text-gray-600">{v.weight}</div>
                      <div className="font-bold mt-1 text-black">{formatPrice(v.price)} KES</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity Selector */}
              <div className="mb-6">
                <h3 className="font-medium text-gray-800 mb-3">Quantity:</h3>
                <div className="flex items-center w-fit border border-gray-300 rounded-lg overflow-hidden">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="bg-gray-100 hover:bg-gray-200 w-10 h-10 flex items-center justify-center text-gray-700"
                  >
                    −
                  </button>
                  <div className="w-12 h-10 flex items-center justify-center bg-white text-gray-900 font-medium">
                    {quantity}
                  </div>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="bg-gray-100 hover:bg-gray-200 w-10 h-10 flex items-center justify-center text-gray-700"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 bg-pink-600 hover:bg-pink-700 text-white py-3 px-6 rounded-lg font-medium flex items-center justify-center transition-colors"
                >
                  <ShoppingCart className="mr-2" size={18} />
                  Add to Cart
                </button>
                <button
                  onClick={handleBuyNow}
                  className="flex-1 bg-black hover:bg-gray-800 text-white py-3 px-6 rounded-lg font-medium transition-colors"
                >
                  Buy Now
                </button>
              </div>

              {/* Product Details */}
              <div className="space-y-6">
                <div>
                  <h3 className="font-medium text-gray-800 mb-3">Product Description</h3>
                  <p className="text-gray-600">
                    {product.description}
                  </p>
                </div>

                {/* Features */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex items-center p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="bg-gray-100 p-2 rounded-lg mr-3">
                      <Package className="text-gray-600" size={20} />
                    </div>
                    <div>
                      <div className="font-medium text-gray-800">Free Shipping</div>
                      <div className="text-sm text-gray-600">Over KES 2000</div>
                    </div>
                  </div>
                  <div className="flex items-center p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="bg-gray-100 p-2 rounded-lg mr-3">
                      <Truck className="text-gray-600" size={20} />
                    </div>
                    <div>
                      <div className="font-medium text-gray-800">Fast Delivery</div>
                      <div className="text-sm text-gray-600">Nairobi 1-2 days</div>
                    </div>
                  </div>
                  <div className="flex items-center p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="bg-gray-100 p-2 rounded-lg mr-3">
                      <Shield className="text-gray-600" size={20} />
                    </div>
                    <div>
                      <div className="font-medium text-gray-800">Quality Guaranteed</div>
                      <div className="text-sm text-gray-600">Fresh & Organic</div>
                    </div>
                  </div>
                  <div className="flex items-center p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="bg-gray-100 p-2 rounded-lg mr-3">
                      <div className="text-lg">🌍</div>
                    </div>
                    <div>
                      <div className="font-medium text-gray-800">African Source</div>
                      <div className="text-sm text-gray-600">Authentic Origins</div>
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