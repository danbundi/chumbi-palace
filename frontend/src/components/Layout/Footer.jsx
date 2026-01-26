import React from 'react';
import { Link } from 'react-router-dom';
import { Leaf, Phone, Mail, MapPin, Shield, Truck, CreditCard } from 'lucide-react';
import { FaPhoneAlt, FaWhatsapp, FaMapMarkerAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

const Footer = () => {
  return (
    <footer className="bg-black text-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Info */}
          <div>
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="bg-pink-600 p-2 rounded-lg">
                <Leaf size={20} />
              </div>
              <div>
                <h2 className="text-lg font-bold">Chumbi Palace</h2>
                <p className="text-gray-400 text-sm">Natural & Organic</p>
              </div>
            </Link>
            <p className="text-gray-400 text-sm">
              Your trusted source for premium seeds, nuts, spices, and herbal products in Kenya.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-medium mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-white text-sm">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/category/seeds-and-nuts" className="text-gray-400 hover:text-white text-sm">
                  Seeds & Nuts
                </Link>
              </li>
              <li>
                <Link to="/category/spices-salt" className="text-gray-400 hover:text-white text-sm">
                  Spices & Salt
                </Link>
              </li>
              <li>
                <Link to="/category/teas-detox" className="text-gray-400 hover:text-white text-sm">
                  Teas & Detox
                </Link>
              </li>
              <li>
                <Link to="/hot-sale" className="text-pink-400 hover:text-pink-300 text-sm">
                  🔥 Hot Sale
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-medium mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-3">
                <FaPhoneAlt size={16} className="text-gray-400" />
                <a
                  href="tel:+254759213019"
                  className="text-gray-400 hover:text-white text-sm"
                >
                  +254 759 213019
                </a>
              </li>
              <li className="flex items-center gap-3">
                <MdEmail size={16} className="text-gray-400" />
                <a
                  href="mailto:chumbipalace@gmail.com"
                  className="text-gray-400 hover:text-white text-sm"
                >
                  chumbipalace@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-3">
                <FaWhatsapp size={16} className="text-gray-400" />
                <a
                  href="https://wa.me/254759213019"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white text-sm"
                >
                  +254 759 213019
                </a>
              </li>
              <li className="flex items-start gap-3">
                <FaMapMarkerAlt size={16} className="text-gray-400 mt-1" />
                <a
                  href="https://www.google.com/maps/search/?api=1&query=Nakuru+Nairobi+Juja+Kenya"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white text-sm"
                >
                  Nakuru, Nairobi & Juja<br />
                  Kenya
                </a>
              </li>
            </ul>
          </div>

          {/* Features */}
          <div>
            <h3 className="font-medium mb-4">Why Choose Us</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2">
                <Shield size={16} className="text-gray-400" />
                <span className="text-gray-400 text-sm">100% Natural Products</span>
              </li>
              <li className="flex items-center gap-2">
                <Truck size={16} className="text-gray-400" />
                <span className="text-gray-400 text-sm">Fast Delivery</span>
              </li>
              <li className="flex items-center gap-2">
                <CreditCard size={16} className="text-gray-400" />
                <span className="text-gray-400 text-sm">Secure Payments</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-6 text-center">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} Chumbi Palace. All rights reserved.
          </p>
          <p className="text-gray-600 text-xs mt-1">
            Made with ❤️ in Kenya
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;