import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, ArrowLeft, Trash2, ShoppingCart } from 'lucide-react';
import Breadcrumbs from '../components/Layout/Breadcrumbs';
import CartItem from '../components/Cart/CartItem';
import CartSummary from '../components/Cart/CartSummary';
import { useCart } from '../contexts/CartContext';

const CartPage = () => {
  const { cart, getCartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);

  const handleCheckout = () => {
    setIsCheckoutModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsCheckoutModalOpen(false);
  };

  const handleProceedToPayment = () => {
    // This will be implemented with M-Pesa API
    console.log('Proceeding to M-Pesa payment...');
    // navigate('/checkout');
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Breadcrumbs />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-gray-200 rounded-full mb-6">
              <ShoppingCart size={48} className="text-gray-400" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Your Cart is Empty</h1>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              Looks like you haven't added any products to your cart yet. Start shopping to discover our amazing natural products!
            </p>
            <div className="space-x-4">
              <Link
                to="/category/all"
                className="inline-flex items-center px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors"
              >
                <ShoppingBag size={20} className="mr-2" />
                Start Shopping
              </Link>
              <Link
                to="/hot-sale"
                className="inline-flex items-center px-6 py-3 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition-colors"
              >
                🔥 View Hot Deals
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Breadcrumbs />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Shopping Cart</h1>
            <p className="text-gray-600">
              You have {cart.length} item{cart.length !== 1 ? 's' : ''} in your cart
            </p>
          </div>
          
          <div className="flex space-x-4 mt-4 md:mt-0">
            <button
              onClick={clearCart}
              className="flex items-center text-red-600 hover:text-red-700 hover:bg-red-50 px-4 py-2 rounded-lg transition-colors"
            >
              <Trash2 size={18} className="mr-2" />
              Clear Cart
            </button>
            <Link
              to="/category/all"
              className="flex items-center text-green-600 hover:text-green-700 hover:bg-green-50 px-4 py-2 rounded-lg transition-colors"
            >
              <ArrowLeft size={18} className="mr-2" />
              Continue Shopping
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="space-y-4">
              {cart.map(item => (
                <CartItem key={item.id} item={item} />
              ))}
            </div>

            {/* Cart Tips */}
            <div className="mt-8 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6">
              <h3 className="font-semibold text-gray-900 mb-3">✨ Shopping Tips</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Orders over 2,000 KES qualify for FREE shipping</li>
                <li>• Mix and match products to reach free shipping threshold</li>
                <li>• Check out our Hot Sale section for amazing deals</li>
                <li>• All prices include 16% VAT as per Kenyan regulations</li>
              </ul>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <CartSummary 
              cart={cart} 
              total={getCartTotal()} 
              onCheckout={handleCheckout}
            />
          </div>
        </div>
      </div>

      {/* Checkout Modal */}
      {isCheckoutModalOpen && (
        <>
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-50 transition-opacity"
            onClick={handleCloseModal}
          />

          {/* Modal */}
          <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4">
              <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-md">
                {/* Header */}
                <div className="p-6 border-b">
                  <h3 className="text-xl font-bold text-gray-900">Choose Payment Method</h3>
                  <p className="text-gray-600 text-sm mt-1">Select how you'd like to pay</p>
                </div>

                {/* Payment Options */}
                <div className="p-6">
                  <div className="space-y-4">
                    {/* M-Pesa Option */}
                    <button
                      onClick={handleProceedToPayment}
                      className="w-full p-4 border-2 border-green-500 rounded-xl hover:bg-green-50 transition-colors text-left"
                    >
                      <div className="flex items-center">
                        <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4">
                          <div className="text-2xl">📱</div>
                        </div>
                        <div>
                          <div className="font-semibold text-gray-900">Pay with M-Pesa</div>
                          <div className="text-sm text-gray-600">Instant mobile money payment</div>
                        </div>
                      </div>
                    </button>

                    {/* Card Payment Option (Coming Soon) */}
                    <button
                      disabled
                      className="w-full p-4 border-2 border-gray-300 rounded-xl opacity-50 cursor-not-allowed text-left"
                    >
                      <div className="flex items-center">
                        <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mr-4">
                          <div className="text-2xl">💳</div>
                        </div>
                        <div>
                          <div className="font-semibold text-gray-900">Credit/Debit Card</div>
                          <div className="text-sm text-gray-600">Coming soon</div>
                        </div>
                      </div>
                    </button>

                    {/* Cash on Delivery Option */}
                    <button
                      disabled
                      className="w-full p-4 border-2 border-gray-300 rounded-xl opacity-50 cursor-not-allowed text-left"
                    >
                      <div className="flex items-center">
                        <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mr-4">
                          <div className="text-2xl">💰</div>
                        </div>
                        <div>
                          <div className="font-semibold text-gray-900">Cash on Delivery</div>
                          <div className="text-sm text-gray-600">Coming soon</div>
                        </div>
                      </div>
                    </button>
                  </div>

                  {/* Instructions */}
                  <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
                    <h4 className="font-semibold text-gray-900 mb-2">📝 M-Pesa Payment Instructions:</h4>
                    <ol className="text-sm text-gray-600 space-y-1">
                      <li>1. You'll receive a payment prompt on your phone</li>
                      <li>2. Enter your M-Pesa PIN when prompted</li>
                      <li>3. Confirm the transaction amount</li>
                      <li>4. You'll receive a confirmation message</li>
                    </ol>
                  </div>
                </div>

                {/* Footer */}
                <div className="p-6 border-t flex justify-between">
                  <button
                    onClick={handleCloseModal}
                    className="px-6 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleProceedToPayment}
                    className="px-6 py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors"
                  >
                    Proceed with M-Pesa
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CartPage;