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
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-amber-50 to-yellow-50">
        <div className="text-center bg-white p-10 rounded-2xl shadow-2xl border border-amber-200 max-w-md">
          <h2 className="text-2xl font-bold text-stone-800 mb-4 font-display">Product Not Found</h2>
          <p className="text-stone-600 mb-6">This natural treasure seems to be unavailable.</p>
          <button
            onClick={() => navigate('/')}
            className="bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white px-8 py-3 rounded-xl font-bold transition-all duration-300 shadow-lg hover:shadow-xl"
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
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-yellow-50">
      <Breadcrumbs />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-gradient-to-br from-white to-amber-50 rounded-2xl shadow-2xl overflow-hidden border border-amber-200">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 p-10">
            {/* Product Images */}
            <div>
              <div className="bg-gradient-to-br from-amber-100 to-orange-100 rounded-2xl h-96 flex items-center justify-center mb-6 overflow-hidden border-2 border-amber-300/50">
                {product.image ? (
                  <img 
                    src={`${API_BASE_URL}/public/${product.image}`} 
                    alt={product.name}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                  />
                ) : (
                  <div className="text-center p-8">
                    <div className="text-8xl mb-6">🌿</div>
                    <p className="text-xl font-bold text-stone-800 mb-2">African Natural Product</p>
                    <p className="text-stone-600">Authentic & Pure</p>
                    <div className="flex justify-center mt-6 space-x-3">
                      <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                      <div className="w-3 h-3 rounded-full bg-emerald-700"></div>
                      <div className="w-3 h-3 rounded-full bg-orange-600"></div>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Product Tags */}
              <div className="flex flex-wrap gap-3">
                {product.tags?.map(tag => (
                  <span 
                    key={tag} 
                    className="bg-gradient-to-r from-emerald-800/10 to-emerald-900/10 text-emerald-900 px-4 py-2 rounded-full text-sm font-medium border border-emerald-800/20"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div>
              <h1 className="text-4xl font-bold text-stone-900 mb-3 font-display">
                {product.name}
              </h1>
              
              <div className="flex items-center mb-6">
                <span className="text-3xl font-bold text-amber-800">
                  {formatPrice(variant.price)} KES
                </span>
                <span className="ml-6 px-4 py-2 bg-amber-100 text-amber-900 rounded-lg font-medium">
                  {variant.weight} pack
                </span>
              </div>

              {/* Variant Selection */}
              <div className="mb-8">
                <h3 className="text-xl font-bold text-stone-800 mb-4">Select Pack Size:</h3>
                <div className="flex flex-wrap gap-4">
                  {product.variants.map((v, index) => (
                    <button
                      key={v.sku}
                      onClick={() => setSelectedVariant(index)}
                      className={`px-6 py-4 rounded-xl border-2 transition-all duration-300 shadow-md hover:shadow-lg ${
                        selectedVariant === index
                          ? 'border-amber-600 bg-gradient-to-r from-amber-50 to-orange-50 text-amber-900'
                          : 'border-amber-200 hover:border-amber-400 bg-white'
                      }`}
                    >
                      <div className="font-bold text-lg">{v.name}</div>
                      <div className="text-stone-600">{v.weight}</div>
                      <div className="font-bold mt-2 text-amber-800">{formatPrice(v.price)} KES</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity Selector */}
              <div className="mb-8">
                <h3 className="text-xl font-bold text-stone-800 mb-4">Quantity:</h3>
                <div className="flex items-center w-fit border-2 border-amber-300 rounded-xl overflow-hidden shadow-md">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="bg-amber-100 hover:bg-amber-200 w-12 h-12 flex items-center justify-center text-xl font-bold text-amber-900 transition-colors"
                  >
                    −
                  </button>
                  <div className="w-16 h-12 flex items-center justify-center bg-white text-xl font-bold text-stone-900">
                    {quantity}
                  </div>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="bg-amber-100 hover:bg-amber-200 w-12 h-12 flex items-center justify-center text-xl font-bold text-amber-900 transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-6 mb-10">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white py-4 px-8 rounded-xl font-bold flex items-center justify-center transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  <ShoppingCart className="mr-3" size={22} />
                  Add to Cart
                </button>
                <button
                  onClick={handleBuyNow}
                  className="flex-1 bg-gradient-to-r from-red-700 to-orange-700 hover:from-red-800 hover:to-orange-800 text-white py-4 px-8 rounded-xl font-bold transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  Buy Now
                </button>
              </div>

              {/* Product Details */}
              <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-bold text-stone-800 mb-4">Product Description</h3>
                  <p className="text-stone-700 leading-relaxed text-lg">
                    {product.description}
                  </p>
                </div>

                {/* Features */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="flex items-center p-5 bg-gradient-to-r from-amber-50 to-yellow-100 rounded-xl border border-amber-200">
                    <div className="bg-amber-100 p-3 rounded-lg mr-4">
                      <Package className="text-amber-700" size={24} />
                    </div>
                    <div>
                      <div className="font-bold text-stone-800">Free Shipping</div>
                      <div className="text-stone-600">Over 2000 KES</div>
                    </div>
                  </div>
                  <div className="flex items-center p-5 bg-gradient-to-r from-amber-50 to-yellow-100 rounded-xl border border-amber-200">
                    <div className="bg-amber-100 p-3 rounded-lg mr-4">
                      <Truck className="text-amber-700" size={24} />
                    </div>
                    <div>
                      <div className="font-bold text-stone-800">Fast Delivery</div>
                      <div className="text-stone-600">Nairobi 1-2 days</div>
                    </div>
                  </div>
                  <div className="flex items-center p-5 bg-gradient-to-r from-emerald-50 to-green-100 rounded-xl border border-emerald-200">
                    <div className="bg-emerald-100 p-3 rounded-lg mr-4">
                      <Shield className="text-emerald-800" size={24} />
                    </div>
                    <div>
                      <div className="font-bold text-stone-800">Quality Guaranteed</div>
                      <div className="text-stone-600">Fresh & Organic</div>
                    </div>
                  </div>
                  <div className="flex items-center p-5 bg-gradient-to-r from-emerald-50 to-green-100 rounded-xl border border-emerald-200">
                    <div className="bg-emerald-100 p-3 rounded-lg mr-4">
                      <div className="text-xl">🌍</div>
                    </div>
                    <div>
                      <div className="font-bold text-stone-800">African Source</div>
                      <div className="text-stone-600">Authentic Origins</div>
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