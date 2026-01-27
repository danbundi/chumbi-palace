import React from 'react';
import { Trash2, Plus, Minus } from 'lucide-react';
import { useCart } from '../../contexts/CartContext';
import { useProducts } from '../../contexts/ProductContext';
import formatPrice from '../../utils/formatPrice';

const CartItem = ({ item }) => {
  const { removeFromCart, updateQuantity } = useCart();
  const { getProductById } = useProducts();
  const product = getProductById(item.productId);

  if (!product) return null;

  const handleQuantityChange = (newQuantity) => {
    updateQuantity(item.id, newQuantity);
  };

  const incrementQuantity = () => {
    handleQuantityChange(item.quantity + 1);
  };

  const decrementQuantity = () => {
    if (item.quantity > 1) {
      handleQuantityChange(item.quantity - 1);
    } else {
      removeFromCart(item.id);
    }
  };

  const itemTotal = item.price * item.quantity;

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 sm:p-6 hover:border-gray-300 transition-colors">
      <div className="flex flex-col md:flex-row gap-4 sm:gap-6">
        {/* Product Image */}
        <div className="shrink-0">
          {product.image ? (
            <img 
              src={`/public/${product.image}`} 
              alt={product.name}
              className="w-20 h-20 sm:w-24 sm:h-24 rounded-lg object-cover border border-gray-200"
            />
          ) : (
            <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gray-100 rounded-lg flex items-center justify-center border border-gray-200">
              <div className="text-2xl">🌱</div>
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="flex-1">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
            <div>
              <h3 className="font-semibold text-black text-lg mb-1">
                {product.name}
              </h3>
              <div className="flex flex-wrap items-center gap-2 text-sm text-gray-600 mb-3">
                <span className="bg-gray-100 px-3 py-1 rounded-full border border-gray-200">
                  {item.variantName}
                </span>
                <span>{item.weight}</span>
                <span className="text-gray-500">SKU: {item.sku}</span>
              </div>
              <p className="text-gray-600 text-sm hidden sm:block">
                {product.short_description}
              </p>
            </div>

            {/* Price */}
            <div>
              <div className="text-xl sm:text-2xl font-bold text-black">
                {formatPrice(item.price)} KES
              </div>
              <div className="text-sm text-gray-500">
                per {item.weight.split(' ')[0]} kg
              </div>
            </div>
          </div>

          {/* Quantity Controls & Actions */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-6 pt-6 border-t border-gray-100">
            <div className="flex items-center gap-4">
              {/* Quantity Controls */}
              <div className="flex items-center border border-gray-300 rounded-lg">
                <button
                  onClick={decrementQuantity}
                  className="w-10 h-10 flex items-center justify-center text-gray-600 hover:bg-gray-100 rounded-l-lg transition-colors"
                  aria-label="Decrease quantity"
                >
                  <Minus size={18} />
                </button>
                <div className="w-12 h-10 flex items-center justify-center border-x border-gray-300">
                  <span className="font-medium text-black">{item.quantity}</span>
                </div>
                <button
                  onClick={incrementQuantity}
                  className="w-10 h-10 flex items-center justify-center text-gray-600 hover:bg-gray-100 rounded-r-lg transition-colors"
                  aria-label="Increase quantity"
                >
                  <Plus size={18} />
                </button>
              </div>

              {/* Item Total */}
              <div className="text-lg font-semibold text-pink-600">
                {formatPrice(itemTotal)} KES
              </div>
            </div>

            {/* Remove Button */}
            <button
              onClick={() => removeFromCart(item.id)}
              className="flex items-center text-gray-600 hover:text-black hover:bg-gray-100 px-4 py-2 rounded-lg transition-colors border border-gray-300"
            >
              <Trash2 size={18} className="mr-2" />
              Remove
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;