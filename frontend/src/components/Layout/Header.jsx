import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { ShoppingCart, Menu, X, Search, Home, Package, Leaf } from 'lucide-react';
import { useCart } from '../../contexts/CartContext';
import { useProducts } from '../../contexts/ProductContext';

const Header = () => {
  const { cart, getCartCount, setIsCartOpen } = useCart();
  const { categories } = useProducts();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <header className="sticky top-0 z-50 bg-linear-to-r from-black to-yellow-800 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="bg-white p-2 rounded-lg group-hover:bg-yellow-500 transition-colors">
              <Leaf size={24} className="text-black group-hover:text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">African Harvest</h1>
              <p className="text-xs text-gray-400">Natural Treasures</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <NavLink 
              to="/" 
              end
              className={({ isActive }) => 
                `flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                  isActive 
                    ? 'bg-yellow-500 text-black' 
                    : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                }`
              }
            >
              <Home size={18} />
              <span>Home</span>
            </NavLink>
            
            {/* Categories Dropdown */}
            <div className="relative group">
              <button className="flex items-center space-x-2 px-4 py-2 rounded-lg text-gray-300 hover:bg-gray-800 hover:text-white transition-colors">
                <Package size={18} />
                <span>Categories</span>
              </button>
              <div className="absolute left-0 mt-2 w-48 bg-black border border-gray-800 rounded-lg shadow-lg py-2 hidden group-hover:block">
                {categories.map(category => (
                  <Link
                    key={category}
                    to={`/category/${category}`}
                    className="block px-4 py-2 text-gray-300 hover:bg-yellow-500 hover:text-black transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {category === 'all' ? 'All Products' : category.replace(/-/g, ' ')}
                  </Link>
                ))}
              </div>
            </div>

            <Link 
              to="/hot-sale" 
              className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors"
            >
              🔥 Hot Sale
            </Link>
          </nav>

          {/* Cart */}
          <div className="flex items-center space-x-4">
            {/* Cart Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 bg-gray-900 hover:bg-yellow-500 rounded-lg transition-colors"
            >
              <ShoppingCart size={22} className="text-white" />
              {cart.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {getCartCount()}
                </span>
              )}
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 bg-gray-900 hover:bg-gray-800 rounded-lg transition-colors"
            >
              {isMenuOpen ? <X size={24} className="text-white" /> : <Menu size={24} className="text-white" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-800 py-4 bg-black">
            <div className="space-y-2">
              <NavLink
                to="/"
                end
                className={({ isActive }) =>
                  `block px-4 py-3 rounded-lg ${isActive ? 'bg-yellow-500 text-black' : 'text-gray-300 hover:bg-gray-800'}`
                }
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </NavLink>
              
              <div className="px-4 py-2 font-medium text-gray-400">Categories</div>
              {categories.map(category => (
                <Link
                  key={category}
                  to={`/category/${category}`}
                  className="block px-8 py-3 text-gray-300 hover:bg-gray-800 hover:text-white rounded-lg transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {category === 'all' ? 'All Products' : category.replace(/-/g, ' ')}
                </Link>
              ))}
              
              <Link
                to="/hot-sale"
                className="block px-4 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors mt-2"
                onClick={() => setIsMenuOpen(false)}
              >
                🔥 Hot Sale
              </Link>
            </div>
            
            {/* Mobile Search */}
            <div className="mt-4 px-4">
              <div className="flex items-center bg-gray-900 rounded-lg px-4 py-3">
                <Search size={18} className="text-gray-400" />
                <input
                  type="text"
                  placeholder="Search products..."
                  className="bg-transparent border-none outline-none ml-2 flex-1 text-white"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;