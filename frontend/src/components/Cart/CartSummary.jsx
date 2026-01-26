import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Truck, Shield, CreditCard, ArrowRight } from 'lucide-react';
import formatPrice from '../../utils/formatPrice';

const CartSummary = ({ cart, total, onCheckout }) => {
  const orderTotal = total

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6">
      <div className="flex items-center mb-6">
        <ShoppingBag className="text-pink-600 mr-3" size={24} />
        <h2 className="text-xl font-bold text-black">Order Summary</h2>
      </div>

      {/* Cart Stats */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <span className="text-gray-600">Items ({cart.length})</span>
          <span className="font-medium text-black">{formatPrice(orderTotal)} KES</span>
        </div>

        {/* Shipping
        <div className="flex justify-between items-center mb-4">
          <span className="text-gray-600">Shipping</span>
          <span className={shippingCost === 0 ? 'text-pink-600 font-medium' : 'text-black'}>
            {shippingCost === 0 ? 'FREE' : `${formatPrice(shippingCost)} KES`}
          </span>
        </div> */}

        {/* Order Total */}
        <div className="flex justify-between items-center mb-6">
          <span className="text-lg font-bold text-black">Order Total</span>
          <div className="text-right">
            <div className="text-xl font-bold text-pink-600">
              {formatPrice(orderTotal)} KES
            </div>
          </div>
        </div>
      </div>

      {/* Checkout Button */}
      <button
        onClick={onCheckout}
        disabled={cart.length === 0}
        className={`w-full py-3 rounded-lg font-medium flex items-center justify-center transition-colors ${
          cart.length === 0
            ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
            : 'bg-pink-600 text-white hover:bg-pink-700'
        }`}
      >
        Proceed to Checkout
        <ArrowRight size={18} className="ml-2" />
      </button>

      {/* Security & Payment Info */}
      <div className="mt-6 pt-6 border-t border-gray-200">
        <h3 className="font-medium text-black mb-4">Safe & Secure Checkout</h3>

        {/* Payment Methods */}
        <div className="text-center">
          <p className="text-gray-600 text-xs mb-2">We accept:</p>
          <div className="flex justify-center gap-2">
            <div className="bg-gray-100 px-3 py-1.5 rounded text-xs border border-gray-200">M-Pesa</div>
          </div>
        </div>
      </div>

      {/* Continue Shopping */}
      <div className="mt-6 text-center">
        <Link
          to="/category/all"
          className="text-gray-600 hover:text-black font-medium text-sm inline-flex items-center"
        >
          Continue Shopping
          <ArrowRight size={14} className="ml-1" />
        </Link>
      </div>
    </div>
  );
};

export default CartSummary;