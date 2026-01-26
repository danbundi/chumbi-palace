import React from 'react';
import { X, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../../contexts/CartContext';
import formatPrice from '../../utils/formatPrice';
import { API_BASE_URL } from '../../api/api';

const CartSidebar = () => {
  const { cart, removeFromCart, updateQuantity, getCartTotal, getCartCount, setIsCartOpen } = useCart();

  const handleClose = () => {
    setIsCartOpen(false);
  };

  const handleCheckout = () => {
    handleClose();
    window.location.href = '/cart';
  };

  return (
    <>
      {/* Blurry Overlay */}
      <div
        className="fixed inset-0 bg-black/50 z-50 transition-all duration-300"
        onClick={handleClose}
      />

      {/* Sidebar */}
      <div className="fixed right-0 top-0 h-full w-full sm:w-96 bg-white z-50 flex flex-col border-l border-gray-200">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <div className="flex items-center">
            <ShoppingBag className="text-pink-600 mr-3" size={24} />
            <h2 className="text-lg font-bold text-black">Your Cart</h2>
            <span className="ml-3 bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs font-medium">
              {getCartCount()} items
            </span>
          </div>
          <button
            onClick={handleClose}
            className="p-2 text-gray-500 hover:text-black hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-4">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-8">
              <div className="text-gray-400 mb-4">
                <ShoppingBag size={48} />
              </div>
              <h3 className="text-lg font-medium text-black mb-2">Your cart is empty</h3>
              <p className="text-gray-500 mb-6">Add some products to get started</p>
              <button
                onClick={handleClose}
                className="px-6 py-3 bg-pink-600 text-white font-medium rounded-lg hover:bg-pink-700 transition-colors"
              >
                Start Shopping
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {cart.map(item => (
                <div key={item.id} className="flex items-center p-3 border border-gray-200 rounded-lg">
                  {/* Product Image */}
                  <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden border border-gray-200">
                    {item.image ? (
                      <img 
                        src={`${API_BASE_URL}/public/${item.image}`} 
                        alt={item.productName} 
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="text-xl">🌱</div>
                    )}
                  </div>

                  {/* Product Info */}
                  <div className="flex-1 ml-3">
                    <h4 className="font-medium text-black text-sm truncate">{item.productName}</h4>
                    <div className="flex items-center justify-between mt-1">
                      <div className="text-xs text-gray-600">
                        {item.variantName} • {formatPrice(item.price)} KES
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                          className="w-6 h-6 flex items-center justify-center bg-gray-100 rounded hover:bg-gray-200 transition-colors text-gray-600"
                        >
                          −
                        </button>
                        <span className="font-medium text-black w-6 text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-6 h-6 flex items-center justify-center bg-gray-100 rounded hover:bg-gray-200 transition-colors text-gray-600"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="ml-2 p-2 text-gray-500 hover:text-black hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {cart.length > 0 && (
          <div className="border-t border-gray-200 p-4">
            <div className="flex justify-between items-center mb-4">
              <span className="text-gray-600">Subtotal</span>
              <span className="text-lg font-bold text-black">
                {formatPrice(getCartTotal())} KES
              </span>
            </div>
            
            <div className="space-y-2">
              <button
                onClick={handleCheckout}
                className="w-full bg-pink-600 text-white py-3 rounded-lg font-medium hover:bg-pink-700 transition-colors flex items-center justify-center"
              >
                Checkout Now
                <ArrowRight size={18} className="ml-2" />
              </button>
              
              <Link
                to="/cart"
                onClick={handleClose}
                className="block w-full border border-gray-300 text-gray-700 py-3 rounded-lg font-medium text-center hover:bg-gray-50 transition-colors"
              >
                View Full Cart
              </Link>
            </div>
            
            <p className="text-center text-gray-500 text-xs mt-4">
              Free shipping on orders over KES 2000
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default CartSidebar;