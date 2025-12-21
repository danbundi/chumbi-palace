import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, ArrowLeft, Trash2, ShoppingCart } from 'lucide-react';
import Breadcrumbs from '../components/Layout/Breadcrumbs';
import CartItem from '../components/Cart/CartItem';
import CartSummary from '../components/Cart/CartSummary';
import { useCart } from '../contexts/CartContext';

const CartPage = () => {
  const { cart, getCartTotal, clearCart } = useCart();
  const totalPrice = getCartTotal();
  const navigate = useNavigate();
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);

  const handleCheckout = () => {
    setIsCheckoutModalOpen(true);
  };

  // Add these state variables at the top of your component
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  // M-Pesa Payment Handler
  const handleMpesaPayment = async () => {
    setIsProcessing(true);
    
    try {
      // Step 1: Prepare order data from cart
      const orderData = {
        items: cart.map(item => ({
          // send canonical product id expected by backend
          productId: item.productId || item.itemId,
          productName: item.productName || item.name,
          category: item.category || [],  // optional snapshot
          image: item.image,
          variant: {
            name: item.variant?.name,
            weight: item.variant?.weight,
            sku: item.variant?.sku,
            price: item.variant?.price,
          },
          quantity: item.quantity,
          subtotal: item.price * item.quantity,
        })),
        totalAmount: cart.reduce(
          (sum, item) => sum + item.price * item.quantity,
          0
        ),
        status: 'pending',
      };

      // Step 2: Save order to database
      const orderResponse = await fetch('http://localhost:5000/api/orders/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData)
      });

      if (!orderResponse.ok) {
        throw new Error('Failed to create order');
      }

      const orderResult = await orderResponse.json();
      console.log('Order created:', orderResult);
      const orderId = orderResult._id;

      // Step 3: Prepare M-Pesa payment data
      const paymentData = {
        phoneNumber: formatPhoneNumber(phoneNumber),
        amount: orderResult.totalAmount,
        orderId: orderId
      };

      // Step 4: Initiate M-Pesa STK Push
      const paymentResponse = await fetch('http://localhost:5000/api/mpesa/stk-push', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(paymentData)
      });

      if (!paymentResponse.ok) {
        throw new Error('Failed to initiate M-Pesa payment');
      }

      const paymentResult = await paymentResponse.json();
      console.log('Payment response received', paymentResult);
      
      // Step 5: Start polling for payment status
      if (paymentResult.checkoutRequestID) {
        startPaymentPolling(paymentResult.checkoutRequestID, orderId);
      } else {
        throw new Error('No CheckoutRequestID received');
      }

    } catch (error) {
      console.error('Payment error:', error);
      alert(`Payment failed: ${error.message}`);
      setIsProcessing(false);
    }
  };

  // Helper function to format phone number
  const formatPhoneNumber = (phone) => {
    let cleanPhone = phone.replace(/\D/g, '');
    
    // Format to 254...
    if (cleanPhone.startsWith('0')) {
      return '254' + cleanPhone.substring(1);
    } else if (cleanPhone.startsWith('7')) {
      return '254' + cleanPhone;
    }
    
    console.log(`${cleanPhone}`)
    return cleanPhone;
  };

  // Function to poll for payment status
  const startPaymentPolling = (checkoutRequestID, orderId) => {
  const interval = setInterval(async () => {
    try {
      checkoutRequestID.trim()
      const response = await fetch(
        `http://localhost:5000/api/mpesa/status/${checkoutRequestID}`
      );

      const data = await response.json();

      // Check if Safaricom returned a ResultCode (payment completed/failed)
      if (data.ResultCode !== undefined) {
        clearInterval(interval); // Stop polling

        if (data.ResultCode === 0) {
          console.log("Payment successful!", data);
          // Optional: update order status in DB
        } else {
          console.log("Payment failed or cancelled", data);
        }
      } else {
        console.log("Payment pending...", data);
      }
    } catch (err) {
      console.error("Polling error:", err);
      clearInterval(interval); // Stop polling on fetch error
    }
  }, 15000); // poll every 15 seconds
};


  // Function to close modal
  const handleCloseModal = () => {
    if (!isProcessing) {
      setIsCheckoutModalOpen(false);
      setPhoneNumber('');
    }
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
            <div className="mt-8 bg-linear-to-r from-green-50 to-emerald-50 rounded-xl p-6">
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
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold text-gray-900">Pay with M-Pesa</h3>
                <p className="text-gray-600 text-sm mt-1">Enter your M-Pesa details</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <span className="text-2xl">📱</span>
              </div>
            </div>
          </div>

          {/* Payment Form */}
          <div className="p-6">
            {/* Amount Display */}
            <div className="mb-6 p-4 bg-gray-50 rounded-xl">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Total Amount:</span>
                <span className="text-2xl font-bold text-green-600">
                  KSh {totalPrice.toLocaleString()}
                </span>
              </div>
            </div>

            {/* Phone Input */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                M-Pesa Phone Number
              </label>
              <input
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="0712 345 678"
                className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-200 focus:outline-none transition-colors"
                required
              />
              <p className="text-xs text-gray-500 mt-1">
                Enter your M-Pesa registered phone number
              </p>
            </div>

            {/* Order Summary */}
            <div className="mb-6">
              <h4 className="font-semibold text-gray-900 mb-3">Order Summary</h4>
              <div className="space-y-2 max-h-40 overflow-y-auto">
                {cart.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span className="text-gray-600">
                      {(item.productName || item.name)} × {item.quantity}
                    </span>
                    <span className="font-medium">
                      KSh {(item.price * item.quantity).toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Instructions */}
            <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-100">
              <h4 className="font-semibold text-gray-900 mb-2 text-sm">📝 Payment Instructions:</h4>
              <ol className="text-xs text-gray-600 space-y-1">
                <li>1. Enter your M-Pesa registered phone number</li>
                <li>2. Click "Pay Now" to initiate payment</li>
                <li>3. You'll receive a payment prompt on your phone</li>
                <li>4. Enter your M-Pesa PIN when prompted</li>
                <li>5. Wait for confirmation</li>
              </ol>
            </div>
          </div>

          {/* Footer */}
          <div className="p-6 border-t flex justify-between items-center">
            <button
              onClick={handleCloseModal}
              className="px-6 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors font-medium"
              disabled={isProcessing}
            >
              Cancel
            </button>
            
            <button
              onClick={handleMpesaPayment}
              disabled={isProcessing || !phoneNumber.trim()}
              className="px-8 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
            >
              {isProcessing ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </>
              ) : (
                'Pay Now'
              )}
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