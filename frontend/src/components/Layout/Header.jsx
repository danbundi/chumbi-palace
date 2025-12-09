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
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="bg-green-600 p-2 rounded-lg">
              <Leaf size={24} className="text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Chumbi Palace</h1>
              <p className="text-xs text-gray-600">Natural & Organic</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <NavLink 
              to="/" 
              end
              className={({ isActive }) => 
                `flex items-center space-x-1 ${isActive ? 'text-green-600 font-semibold' : 'text-gray-700 hover:text-green-600'}`
              }
            >
              <Home size={18} />
              <span>Home</span>
            </NavLink>
            
            {/* Categories Dropdown */}
            <div className="relative group">
              <button className="flex items-center space-x-1 text-gray-700 hover:text-green-600">
                <Package size={18} />
                <span>Categories</span>
              </button>
              <div className="absolute left-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 hidden group-hover:block">
                {categories.map(category => (
                  <Link
                    key={category}
                    to={`/category/${category}`}
                    className="block px-4 py-2 text-gray-700 hover:bg-green-50 hover:text-green-600"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {category === 'all' ? 'All Products' : category}
                  </Link>
                ))}
              </div>
            </div>

            <Link 
              to="/hot-sale" 
              className="text-red-600 hover:text-red-700 font-semibold"
            >
              🔥 Hot Sale
            </Link>
          </nav>

          {/* Search & Cart */}
          <div className="flex items-center space-x-4">
            {/* Search */}
            <div className="hidden md:flex items-center bg-gray-100 rounded-full px-4 py-2">
              <Search size={18} className="text-gray-400" />
              <input
                type="text"
                placeholder="Search products..."
                className="bg-transparent border-none outline-none ml-2 w-48"
              />
            </div>

            {/* Cart Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 hover:bg-gray-100 rounded-full"
            >
              <ShoppingCart size={24} className="text-gray-700" />
              {cart.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {getCartCount()}
                </span>
              )}
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 hover:bg-gray-100 rounded-lg"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t py-4">
            <div className="space-y-2">
              <NavLink
                to="/"
                end
                className={({ isActive }) =>
                  `block px-4 py-2 ${isActive ? 'bg-green-50 text-green-600' : 'text-gray-700 hover:bg-gray-100'}`
                }
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </NavLink>
              
              <div className="px-4 py-2 font-semibold text-gray-900">Categories</div>
              {categories.map(category => (
                <Link
                  key={category}
                  to={`/category/${category}`}
                  className="block px-8 py-2 text-gray-600 hover:bg-gray-100"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {category === 'all' ? 'All Products' : category}
                </Link>
              ))}
              
              <Link
                to="/hot-sale"
                className="block px-4 py-2 text-red-600 hover:bg-red-50 font-semibold"
                onClick={() => setIsMenuOpen(false)}
              >
                🔥 Hot Sale
              </Link>
            </div>
            
            {/* Mobile Search */}
            <div className="mt-4 px-4">
              <div className="flex items-center bg-gray-100 rounded-lg px-4 py-2">
                <Search size={18} className="text-gray-400" />
                <input
                  type="text"
                  placeholder="Search products..."
                  className="bg-transparent border-none outline-none ml-2 flex-1"
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