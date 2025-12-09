import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Truck, Shield, CreditCard, ArrowRight } from 'lucide-react';
import formatPrice from '../../utils/formatPrice';

const CartSummary = ({ cart, total, onCheckout }) => {
  const shippingThreshold = 2000;
  const shippingCost = total >= shippingThreshold ? 0 : 300;
  const estimatedTax = total * 0.16; // 16% VAT in Kenya
  const orderTotal = total + shippingCost + estimatedTax;
  
  const progressPercentage = Math.min((total / shippingThreshold) * 100, 100);

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8">
      <div className="flex items-center mb-8">
        <ShoppingBag className="text-green-600 mr-3" size={24} />
        <h2 className="text-2xl font-bold text-gray-900">Order Summary</h2>
      </div>

      {/* Cart Stats */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <span className="text-gray-600">Items ({cart.length})</span>
          <span className="font-semibold">{formatPrice(total)} KES</span>
        </div>

        {/* Free Shipping Progress */}
        <div className="mb-6">
          <div className="flex justify-between text-sm mb-2">
            <span className="text-gray-600">
              {total >= shippingThreshold ? (
                <span className="text-green-600 font-semibold">
                  🎉 You've earned free shipping!
                </span>
              ) : (
                <>
                  Add {formatPrice(shippingThreshold - total)} more for{' '}
                  <span className="font-semibold">FREE shipping</span>
                </>
              )}
            </span>
            <span className="font-semibold">
              {formatPrice(total)} / {formatPrice(shippingThreshold)} KES
            </span>
          </div>
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-green-500 transition-all duration-500"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>

        {/* Shipping */}
        <div className="flex justify-between items-center mb-4">
          <span className="text-gray-600">Shipping</span>
          <span className={shippingCost === 0 ? 'text-green-600 font-semibold' : ''}>
            {shippingCost === 0 ? 'FREE' : `${formatPrice(shippingCost)} KES`}
          </span>
        </div>

        {/* Estimated Tax */}
        <div className="flex justify-between items-center mb-6 border-b border-gray-200 pb-6">
          <span className="text-gray-600">Estimated Tax (16% VAT)</span>
          <span className="font-semibold">{formatPrice(estimatedTax)} KES</span>
        </div>

        {/* Order Total */}
        <div className="flex justify-between items-center mb-8">
          <span className="text-xl font-bold text-gray-900">Order Total</span>
          <div className="text-right">
            <div className="text-3xl font-bold text-green-600">
              {formatPrice(orderTotal)} KES
            </div>
            <div className="text-sm text-gray-500">
              Including VAT and shipping
            </div>
          </div>
        </div>
      </div>

      {/* Checkout Button */}
      <button
        onClick={onCheckout}
        disabled={cart.length === 0}
        className={`w-full py-4 rounded-xl font-semibold text-lg flex items-center justify-center transition-all ${
          cart.length === 0
            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
            : 'bg-gradient-to-r from-green-600 to-emerald-600 text-white hover:shadow-lg hover:scale-[1.02]'
        }`}
      >
        Proceed to Checkout
        <ArrowRight size={20} className="ml-3" />
      </button>

      {/* Security & Payment Info */}
      <div className="mt-8 pt-8 border-t border-gray-200">
        <h3 className="font-semibold text-gray-900 mb-4">Safe & Secure Checkout</h3>
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="flex flex-col items-center p-3 bg-gray-50 rounded-lg">
            <Shield className="text-green-600 mb-2" size={20} />
            <span className="text-sm text-gray-600">Secure Payment</span>
          </div>
          <div className="flex flex-col items-center p-3 bg-gray-50 rounded-lg">
            <CreditCard className="text-green-600 mb-2" size={20} />
            <span className="text-sm text-gray-600">Multiple Options</span>
          </div>
          <div className="flex flex-col items-center p-3 bg-gray-50 rounded-lg">
            <Truck className="text-green-600 mb-2" size={20} />
            <span className="text-sm text-gray-600">Fast Delivery</span>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="text-center">
          <p className="text-gray-600 text-sm mb-3">We accept:</p>
          <div className="flex justify-center space-x-4">
            <div className="bg-gray-100 px-4 py-2 rounded-lg">M-Pesa</div>
            <div className="bg-gray-100 px-4 py-2 rounded-lg">Visa</div>
            <div className="bg-gray-100 px-4 py-2 rounded-lg">Mastercard</div>
          </div>
        </div>
      </div>

      {/* Continue Shopping */}
      <div className="mt-8 text-center">
        <Link
          to="/category/all"
          className="text-green-600 hover:text-green-700 font-semibold inline-flex items-center"
        >
          Continue Shopping
          <ArrowRight size={16} className="ml-2" />
        </Link>
      </div>
    </div>
  );
};

export default CartSummary;