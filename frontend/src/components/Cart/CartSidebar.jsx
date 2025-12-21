import React from 'react';
import { X, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../../contexts/CartContext';
import formatPrice from '../../utils/formatPrice';

const CartSidebar = () => {
  // ✅ Keep useCart hook at the top level of component
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
        className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 transition-all duration-300"
        onClick={handleClose}
      />

      {/* Sidebar */}
      <div className="fixed right-0 top-0 h-full w-full sm:w-96 bg-white shadow-2xl z-50 flex flex-col transform transition-transform duration-300">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <div className="flex items-center">
            <ShoppingBag className="text-green-600 mr-3" size={24} />
            <h2 className="text-xl font-bold text-gray-900">Your Cart</h2>
            <span className="ml-3 bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm font-semibold">
              {getCartCount()} items
            </span>
          </div>
          <button
            onClick={handleClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-4">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-8">
              <div className="text-6xl mb-4">🛒</div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">Your cart is empty</h3>
              <p className="text-gray-500 mb-6">Add some amazing products to get started!</p>
              <button
                onClick={handleClose}
                className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
              >
                Start Shopping
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {cart.map(item => (
                <div key={item.id} className="flex items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  {/* Product Image - CORRECTLY STYLED */}
                  <div className="w-16 h-16 bg-linear-to-br from-green-50 to-emerald-100 rounded-lg flex items-center justify-center overflow-hidden">
                    {item.image ? (
                      <img 
                        src={item.image} 
                        alt={item.productName} 
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="text-2xl">🌱</div>
                    )}
                  </div>

                  {/* Product Info */}
                  <div className="flex-1 ml-4">
                    <h4 className="font-medium text-gray-900 truncate">{item.productName}</h4>
                    <div className="flex items-center justify-between mt-1">
                      <div className="text-sm text-gray-600">
                        {item.variantName} • {formatPrice(item.price)} KES
                      </div>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                          className="w-6 h-6 flex items-center justify-center bg-gray-200 rounded hover:bg-gray-300 transition-colors"
                        >
                          −
                        </button>
                        <span className="font-medium w-8 text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-6 h-6 flex items-center justify-center bg-gray-200 rounded hover:bg-gray-300 transition-colors"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="ml-2 text-red-500 hover:text-red-700 transition-colors p-2 hover:bg-red-50 rounded-lg"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {cart.length > 0 && (
          <div className="border-t p-6">
            <div className="flex justify-between items-center mb-4">
              <span className="text-gray-600">Subtotal</span>
              <span className="text-xl font-bold text-gray-900">
                {formatPrice(getCartTotal())} KES
              </span>
            </div>
            
            <div className="space-y-3">
              <button
                onClick={handleCheckout}
                className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold flex items-center justify-center transition-colors hover:shadow-lg"
              >
                Checkout Now
                <ArrowRight size={20} className="ml-2" />
              </button>
              
              <Link
                to="/cart"
                onClick={handleClose}
                className="block w-full border border-green-600 text-green-600 hover:bg-green-50 py-3 rounded-lg font-semibold text-center transition-colors"
              >
                View Full Cart
              </Link>
            </div>
            
            <p className="text-center text-gray-500 text-sm mt-4">
              Free shipping on orders over 2000 KES
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default CartSidebar;