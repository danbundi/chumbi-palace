import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Tag } from 'lucide-react';
import { useCart } from '../../contexts/CartContext';
import formatPrice from '../../utils/formatPrice';
import { API_BASE_URL } from '../../api/api';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const lowestPrice = Math.min(...product.variants.map(v => v.price));

  const handleAddToCart = (e) => {
    e.preventDefault();
    addToCart(product, product.variants[0], 1);
  };

  return (
    <div className="bg-gradient-to-b from-white to-amber-50 rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 border border-amber-200 group">
  <Link to={`/product/${product._id}`}>
        <div className="relative h-56 bg-gradient-to-br from-amber-100 to-orange-100">
          {/* Product Image - replace with actual images */}
          <div className="w-full h-full flex items-center justify-center overflow-hidden rounded-t-2xl">
            {product.image ? (
              <img 
                src={`${API_BASE_URL}/public/${product.image}`} 
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
            ) : (
              <div className="text-amber-800 text-center p-6">
                <div className="text-8xl mb-4">🌿</div>
                <p className="text-amber-900 font-bold text-lg">African Natural</p>
                <p className="text-amber-700 text-sm mt-1">Pure & Authentic</p>
              </div>
            )}
          </div>
          
          {/* Hot Sale Badge */}
          {product.tags?.includes('hot-sale') && (
            <div className="absolute top-4 left-4 bg-gradient-to-r from-red-600 to-orange-600 text-white px-4 py-2 rounded-full text-xs font-bold flex items-center shadow-lg">
              <Tag size={14} className="mr-2" />
              HOT SALE
            </div>
          )}

          {/* Organic/New Badge */}
          {product.tags?.includes('organic') && (
            <div className="absolute top-4 right-4 bg-gradient-to-r from-emerald-700 to-green-800 text-white px-4 py-2 rounded-full text-xs font-bold shadow-lg">
              ORGANIC
            </div>
          )}
        </div>
        
        <div className="p-6">
          <h3 className="font-bold text-xl mb-3 text-stone-900 line-clamp-1 group-hover:text-amber-800 transition-colors">
            {product.name}
          </h3>
          
          <p className="text-stone-700 text-sm mb-4 line-clamp-2 leading-relaxed">
            {product.short_description}
          </p>
          
          <div className="flex items-center justify-between mb-4">
            <div>
              <span className="text-2xl font-bold text-amber-900">
                {formatPrice(lowestPrice)} KES
              </span>
              <span className="text-stone-600 text-sm ml-3 font-medium">
                from {product.variants[0].weight}
              </span>
            </div>
            
            <button
              onClick={handleAddToCart}
              className="bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white p-3 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg hover:scale-105"
              aria-label={`Add ${product.name} to cart`}
            >
              <ShoppingCart size={22} />
            </button>
          </div>
          
          <div className="mt-4 flex flex-wrap gap-2">
            {product.tags?.slice(0, 3).map(tag => (
              <span 
                key={tag} 
                className="bg-gradient-to-r from-amber-100 to-yellow-100 text-amber-900 px-3 py-1.5 rounded-lg text-xs font-medium border border-amber-300"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Bottom decorative line */}
          <div className="mt-6 h-1 w-16 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full mx-auto group-hover:w-24 transition-all duration-300"></div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;