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
    <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
      <div className="flex flex-col md:flex-row md:items-center gap-6">
        {/* Product Image */}
        <div className="flex-shrink-0">
          {product.image ? (
            <img 
              src={product.image} 
              alt={product.name}
              className="w-24 h-24 rounded-lg object-cover border border-gray-200"
            />
          ) : (
            <div className="w-24 h-24 bg-gradient-to-br from-green-50 to-emerald-100 rounded-lg flex items-center justify-center border border-gray-200">
              <div className="text-3xl">🌱</div>
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="flex-1">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between">
            <div>
              <h3 className="font-semibold text-lg text-gray-900 mb-1">
                {product.name}
              </h3>
              <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                <span className="bg-gray-100 px-3 py-1 rounded-full">
                  {item.variantName}
                </span>
                <span>{item.weight}</span>
                <span>SKU: {item.sku}</span>
              </div>
              <p className="text-gray-600 text-sm">
                {product.short_description}
              </p>
            </div>

            {/* Price */}
            <div className="mt-4 md:mt-0">
              <div className="text-2xl font-bold text-gray-900">
                {formatPrice(item.price)} KES
              </div>
              <div className="text-sm text-gray-500">
                per {item.weight.split(' ')[0]} kg
              </div>
            </div>
          </div>

          {/* Quantity Controls & Actions */}
          <div className="flex items-center justify-between mt-6">
            <div className="flex items-center space-x-4">
              {/* Quantity Controls */}
              <div className="flex items-center border border-gray-300 rounded-lg">
                <button
                  onClick={decrementQuantity}
                  className="w-10 h-10 flex items-center justify-center text-gray-600 hover:bg-gray-100 rounded-l-lg"
                  aria-label="Decrease quantity"
                >
                  <Minus size={18} />
                </button>
                <div className="w-12 h-10 flex items-center justify-center border-x border-gray-300">
                  <span className="font-medium">{item.quantity}</span>
                </div>
                <button
                  onClick={incrementQuantity}
                  className="w-10 h-10 flex items-center justify-center text-gray-600 hover:bg-gray-100 rounded-r-lg"
                  aria-label="Increase quantity"
                >
                  <Plus size={18} />
                </button>
              </div>

              {/* Item Total */}
              <div className="text-lg font-semibold text-green-600">
                {formatPrice(itemTotal)} KES
              </div>
            </div>

            {/* Remove Button */}
            <button
              onClick={() => removeFromCart(item.id)}
              className="flex items-center text-red-600 hover:text-red-700 hover:bg-red-50 px-4 py-2 rounded-lg transition-colors"
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