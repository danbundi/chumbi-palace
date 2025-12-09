import React from 'react';
import { Link } from 'react-router-dom';
import { Leaf, Phone, Mail, MapPin, Shield, Truck, CreditCard } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Info */}
          <div>
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <div className="bg-green-600 p-2 rounded-lg">
                <Leaf size={24} />
              </div>
              <div>
                <h2 className="text-xl font-bold">Chumbi Palace</h2>
                <p className="text-green-300 text-sm">Natural & Organic</p>
              </div>
            </Link>
            <p className="text-gray-300">
              Your trusted source for premium seeds, nuts, spices, and herbal products in Kenya.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-white">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/category/seeds-and-nuts" className="text-gray-300 hover:text-white">
                  Seeds & Nuts
                </Link>
              </li>
              <li>
                <Link to="/category/spices-salt" className="text-gray-300 hover:text-white">
                  Spices & Salt
                </Link>
              </li>
              <li>
                <Link to="/category/teas-detox" className="text-gray-300 hover:text-white">
                  Teas & Detox
                </Link>
              </li>
              <li>
                <Link to="/hot-sale" className="text-red-300 hover:text-red-400">
                  🔥 Hot Sale
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-center space-x-3">
                <Phone size={18} className="text-green-400" />
                <span className="text-gray-300">+254 759 213019</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail size={18} className="text-green-400" />
                <span className="text-gray-300">chumbipalace@gmail.com</span>
              </li>
              <li className="flex items-start space-x-3">
                <MapPin size={18} className="text-green-400 mt-1" />
                <span className="text-gray-300">
                  Nakuru, Nairobi & Juja<br />
                  Kenya
                </span>
              </li>
            </ul>
          </div>

          {/* Features */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Why Choose Us</h3>
            <ul className="space-y-3">
              <li className="flex items-center space-x-2">
                <Shield size={18} className="text-green-400" />
                <span className="text-gray-300">100% Natural Products</span>
              </li>
              <li className="flex items-center space-x-2">
                <Truck size={18} className="text-green-400" />
                <span className="text-gray-300">Fast Delivery</span>
              </li>
              <li className="flex items-center space-x-2">
                <CreditCard size={18} className="text-green-400" />
                <span className="text-gray-300">Secure Payments</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            © {new Date().getFullYear()} Chumbi Palace. All rights reserved.
          </p>
          <p className="text-gray-500 text-sm mt-2">
            Made with ❤️ in Kenya
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;