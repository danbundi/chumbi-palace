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
    <header className="sticky top-0 z-50 bg-black border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="bg-pink-600 p-2 rounded-lg">
              <Leaf size={20} className="text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-white">Chumbi Palace</h1>
              <p className="text-xs text-gray-400">Natural Treasures</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-4">
            <NavLink 
              to="/" 
              end
              className={({ isActive }) => 
                `flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                  isActive 
                    ? 'bg-pink-600 text-white' 
                    : 'text-gray-300 hover:text-white hover:bg-gray-800'
                }`
              }
            >
              <Home size={16} />
              <span>Home</span>
            </NavLink>
            
            {/* Categories Dropdown */}
            <div className="relative group">
              <button className="flex items-center gap-2 px-4 py-2 rounded-lg text-gray-300 hover:text-white hover:bg-gray-800 transition-colors">
                <Package size={16} />
                <span>Categories</span>
              </button>
              <div className="absolute left-0 mt-2 w-48 bg-black border border-gray-700 rounded-lg py-2 hidden group-hover:block">
                {categories.map(category => (
                  <Link
                    key={category}
                    to={`/category/${category}`}
                    className="block px-4 py-2 text-gray-300 hover:bg-gray-800 hover:text-white transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {category === 'all' ? 'All Products' : category.replace(/-/g, ' ')}
                  </Link>
                ))}
              </div>
            </div>

            <Link 
              to="/hot-sale" 
              className="px-4 py-2 bg-pink-600 hover:bg-pink-700 text-white rounded-lg font-medium transition-colors"
            >
              🔥 Hot Sale
            </Link>
          </nav>

          {/* Cart */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 text-gray-300 hover:text-white hover:bg-gray-800 rounded-lg transition-colors"
            >
              <ShoppingCart size={20} />
              {cart.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-pink-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {getCartCount()}
                </span>
              )}
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-gray-300 hover:text-white hover:bg-gray-800 rounded-lg transition-colors"
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
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
                  `block px-4 py-3 rounded-lg ${isActive ? 'bg-pink-600 text-white' : 'text-gray-300 hover:bg-gray-800'}`
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
                className="block px-4 py-3 bg-pink-600 hover:bg-pink-700 text-white rounded-lg font-medium transition-colors mt-2"
                onClick={() => setIsMenuOpen(false)}
              >
                🔥 Hot Sale
              </Link>
            </div>
            
            {/* Mobile Search */}
            <div className="mt-4 px-4">
              <div className="flex items-center bg-gray-900 rounded-lg px-4 py-3 border border-gray-700">
                <Search size={16} className="text-gray-400" />
                <input
                  type="text"
                  placeholder="Search products..."
                  className="bg-transparent border-none outline-none ml-2 flex-1 text-white text-sm"
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