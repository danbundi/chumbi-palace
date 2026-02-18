import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Tag } from 'lucide-react';
import { useCart } from '../../contexts/CartContext';
import formatPrice from '../../utils/formatPrice';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const lowestPrice = Math.min(...product.variants.map(v => v.price));

  const handleAddToCart = (e) => {
    e.preventDefault();
    addToCart(product, product.variants[0], 1);
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:border-gray-300 transition-colors group">
      <Link to={`/product/${product._id}`}>
        <div className="relative h-48 bg-gray-100">
          {/* Product Image */}
          <div className="w-full h-full flex items-center justify-center overflow-hidden">
            {product.image ? (
              <img 
                src={`${import.meta.env.VITE_API_URL}/public/${product.image}`} 
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            ) : (
              <div className="text-gray-400 text-center p-6">
                <div className="text-6xl mb-2">🌿</div>
                <p className="text-gray-700 font-medium">Chumbi Palace</p>
                <p className="text-gray-500 text-sm mt-1">Natural Products</p>
              </div>
            )}
          </div>
          
          {/* Hot Sale Badge */}
          {product.tags?.includes('hot-sale') && (
            <div className="absolute top-3 left-3 bg-pink-600 text-white px-3 py-1.5 rounded-full text-xs font-bold flex items-center">
              <Tag size={12} className="mr-1.5" />
              HOT SALE
            </div>
          )}

          {/* Organic Badge */}
          {product.tags?.includes('organic') && (
            <div className="absolute top-3 right-3 bg-black text-white px-3 py-1.5 rounded-full text-xs font-bold">
              ORGANIC
            </div>
          )}
        </div>
        
        <div className="p-4">
          <h3 className="font-bold text-lg text-black mb-2 line-clamp-1 group-hover:text-pink-600 transition-colors">
            {product.name}
          </h3>
          
          <p className="text-gray-600 text-sm mb-4 line-clamp-2">
            {product.short_description}
          </p>
          
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xl font-bold text-black">
                {formatPrice(lowestPrice)} KES
              </div>
              <div className="text-gray-500 text-xs mt-1">
                from {product.variants[0].weight}
              </div>
            </div>
            
            <button
              onClick={handleAddToCart}
              className="bg-pink-600 hover:bg-pink-700 text-white p-2.5 rounded-lg transition-colors"
              aria-label={`Add ${product.name} to cart`}
            >
              <ShoppingCart size={18} />
            </button>
          </div>
          
          <div className="mt-4 flex flex-wrap gap-1.5">
            {product.tags?.slice(0, 3).map(tag => (
              <span 
                key={tag} 
                className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs border border-gray-200"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;