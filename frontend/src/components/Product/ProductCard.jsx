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
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
  <Link to={`/product/${product._id}`}>
        <div className="relative h-48 bg-gray-200">
          {/* Product Image - replace with actual images */}
          <div className="w-full h-full flex items-center justify-center overflow-hidden rounded-lg">
            {product.image ? (
              <img 
                src={product.image} 
                alt={product.name}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            ) : (
              <div className="text-gray-400 text-center p-4">
                <div className="text-6xl mb-4">🌱</div>
                <p className="text-gray-500 font-medium">Product Image</p>
                <p className="text-gray-400 text-sm mt-1">Image coming soon</p>
              </div>
            )}
          </div>
          
          {/* Hot Sale Badge */}
          {product.tags?.includes('hot-sale') && (
            <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-semibold flex items-center">
              <Tag size={12} className="mr-1" />
              HOT SALE
            </div>
          )}
        </div>
        
        <div className="p-4">
          <h3 className="font-semibold text-lg mb-2 text-gray-800 line-clamp-1">
            {product.name}
          </h3>
          
          <p className="text-gray-600 text-sm mb-3 line-clamp-2">
            {product.short_description}
          </p>
          
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xl font-bold text-gray-900">
                {formatPrice(lowestPrice)} KES
              </span>
              <span className="text-gray-500 text-sm ml-2">
                from {product.variants[0].weight}
              </span>
            </div>
            
            <button
              onClick={handleAddToCart}
              className="bg-green-600 hover:bg-green-700 text-white p-2 rounded-full transition-colors"
              aria-label={`Add ${product.name} to cart`}
            >
              <ShoppingCart size={20} />
            </button>
          </div>
          
          <div className="mt-3 flex flex-wrap gap-1">
            {product.tags?.slice(0, 3).map(tag => (
              <span 
                key={tag} 
                className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs"
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