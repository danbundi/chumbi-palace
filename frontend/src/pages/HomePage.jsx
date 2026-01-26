import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Sparkles, 
  TrendingUp, 
  Star, 
  Award, 
  Truck, 
  Shield, 
  RefreshCw,
  ChevronRight,
  ShoppingBag,
  Flame,
  BookOpen,
  CheckCircle,
  Leaf,
} from 'lucide-react';
import ProductGrid from '../components/Product/ProductGrid';
import { useProducts } from '../contexts/ProductContext';
import { useHotSales } from '../contexts/HotSaleContext';

const HomePage = () => {
  const { products, categories, loading } = useProducts();
  const { hotSales } = useHotSales();
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [hotSaleProducts, setHotSaleProducts] = useState([]);

  useEffect(() => {
    // Get 8 random featured products
    if (products.length > 0) {
      const shuffled = [...products].sort(() => 0.5 - Math.random());
      setFeaturedProducts(shuffled.slice(0, 8));
      
      // Get hot sale products
      const hotSaleIds = hotSales.map(item => item.product_id);
      const hotSaleItems = products.filter(product =>
        hotSaleIds.includes(product._id || product.id)
      );
      setHotSaleProducts(hotSaleItems.slice(0, 4));
    }
  }, [products]);

  const features = [
    {
      icon: <Shield className="text-pink-600" size={20} />,
      title: "Quality Guarantee",
      description: "100% Natural & Fresh"
    },
    {
      icon: <RefreshCw className="text-pink-600" size={20} />,
      title: "Easy Returns",
      description: "7-Day Return Policy"
    },
    {
      icon: <Award className="text-pink-600" size={20} />,
      title: "Premium Quality",
      description: "Carefully Selected"
    }
  ];

  const categoriesToShow = categories
    .filter(cat => cat !== 'all')
    .slice(0, 6);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: 'url("https://images.unsplash.com/photo-1542849187-5ec6ea5e6a27?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80")',
            }}
          >
            {/* Dark Overlay for better text readability */}
            <div className="absolute inset-0 bg-black/60"></div>
            {/* Subtle Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent"></div>
          </div>
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-2xl">
            {/* Tagline */}
            <div className="inline-flex items-center gap-2 mb-6">
              <Sparkles className="text-pink-400" size={20} />
              <span className="text-pink-300 font-medium text-sm tracking-wider">PURE NATURAL COLLECTION</span>
            </div>

            {/* Main Heading */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              Discover
              <span className="text-pink-400 block">Africa's Essence</span>
            </h1>

            {/* Description */}
            <p className="text-gray-300 text-lg md:text-xl mb-8 max-w-lg leading-relaxed">
              Premium seeds, nuts, spices & herbal treasures 
              sourced directly from nature's purest origins.
            </p>

            {/* Buttons Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-xl">
              {/* Products Button */}
              <Link
                to="/category/all"
                className="group bg-pink-600 hover:bg-pink-700 text-white px-6 py-4 rounded-lg font-medium flex items-center justify-center transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-pink-500/20"
              >
                <ShoppingBag size={20} className="mr-3" />
                <span className="font-semibold">All Products</span>
                <ChevronRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>

              {/* Hot Sales Button */}
              <Link
                to="/hot-sale"
                className="group bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white px-6 py-4 rounded-lg font-medium flex items-center justify-center transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-red-500/20"
              >
                <Flame size={20} className="mr-3" />
                <span className="font-semibold">Hot Sales</span>
                <ChevronRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>

              {/* Blogs Button */}
              <Link
                to="/blogs"
                className="group bg-gray-900/80 hover:bg-gray-800/90 backdrop-blur-sm border border-gray-700 hover:border-gray-600 text-white px-6 py-4 rounded-lg font-medium flex items-center justify-center transition-all duration-300 hover:scale-[1.02]"
              >
                <BookOpen size={20} className="mr-3" />
                <span className="font-semibold">Blog & Tips</span>
                <ChevronRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap items-center gap-6 mt-12 pt-8 border-t border-gray-700/50">
              <div className="flex items-center gap-3">
                <CheckCircle className="text-green-400" size={20} />
                <span className="text-gray-300">100% Organic</span>
              </div>
              <div className="flex items-center gap-3">
                <Leaf className="text-green-400" size={20} />
                <span className="text-gray-300">Directly Sourced</span>
              </div>
              <div className="flex items-center gap-3">
                <Truck className="text-pink-400" size={20} />
                <span className="text-gray-300">Free Shipping</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Decorative Element */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent"></div>

        {/* Floating Elements */}
        <div className="absolute top-1/4 right-12 w-16 h-16 rounded-full bg-pink-500/10 blur-xl"></div>
        <div className="absolute bottom-1/3 left-1/4 w-24 h-24 rounded-full bg-orange-500/5 blur-xl"></div>
      </section>

      {/* Features */}
      <section className="py-12 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="bg-white p-5 rounded-lg border border-gray-200"
              >
                <div className="mb-4 bg-pink-50 w-12 h-12 rounded-lg flex items-center justify-center">
                  {feature.icon}
                </div>
                <h3 className="font-medium text-black mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-12 px-4 sm:px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
            <div>
              <h2 className="text-xl font-bold text-black mb-1">Shop by Category</h2>
              <p className="text-gray-600 text-sm">Browse our curated collections</p>
            </div>
            <Link 
              to="/category/all" 
              className="text-gray-700 hover:text-black font-medium text-sm flex items-center"
            >
              View all categories
              <ChevronRight size={16} className="ml-1" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {categoriesToShow.map(category => (
              <Link
                key={category}
                to={`/category/${category.toLowerCase().replace(/ /g, '-')}`}
                className="bg-white rounded-lg border border-gray-200 hover:border-gray-300 transition-colors"
              >
                <div className="p-5">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-medium text-black">
                      {category.replace(/-/g, ' ')}
                    </h3>
                    <ChevronRight className="text-gray-400" size={16} />
                  </div>
                  <div className="h-32 bg-gray-100 rounded-lg flex items-center justify-center border border-gray-200">
                    <div className="text-4xl">
                      {category.includes('Seeds') ? '🌾' : 
                       category.includes('Spices') ? '🧂' : 
                       category.includes('Teas') ? '🍃' : 
                       category.includes('Nuts') ? '🥜' : 
                       category.includes('Herbs') ? '🌿' : '🫒'}
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm mt-4">
                    Explore our premium collection of authentic {category.toLowerCase().replace(/-/g, ' ')}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Hot Sale Section */}
      {hotSaleProducts.length > 0 && (
        <section className="py-12 px-4 sm:px-6 bg-pink-50">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center mb-8">
              <div className="bg-pink-600 text-white px-4 py-2 rounded-full flex items-center mr-4">
                <TrendingUp size={18} className="mr-2" />
                <span className="font-medium text-sm">HOT SALE</span>
              </div>
              <div>
                <h2 className="text-xl font-bold text-black mb-1">Limited Time Offers</h2>
                <p className="text-gray-600 text-sm">Don't miss these amazing deals</p>
              </div>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <ProductGrid products={hotSaleProducts} loading={loading} />
              
              <div className="text-center mt-8">
                <Link
                  to="/hot-sale"
                  className="inline-flex items-center px-6 py-3 bg-pink-600 hover:bg-pink-700 text-white font-medium rounded-lg transition-colors"
                >
                  🔥 View All Hot Deals
                  <ChevronRight size={18} className="ml-2" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Featured Products */}
      <section className="py-12 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
            <div>
              <div className="flex items-center mb-2">
                <Star className="text-pink-600 mr-2" size={18} />
                <span className="text-pink-600 font-medium text-sm">Featured</span>
              </div>
              <h2 className="text-xl font-bold text-black mb-1">Best Selling Products</h2>
              <p className="text-gray-600 text-sm">Customer favorites</p>
            </div>
            <Link 
              to="/category/all" 
              className="text-gray-700 hover:text-black font-medium text-sm flex items-center"
            >
              View all products
              <ChevronRight size={16} className="ml-1" />
            </Link>
          </div>

          <ProductGrid products={featuredProducts} loading={loading} />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 px-4 sm:px-6 bg-black">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-white mb-4">
            Ready to Experience Natural Bounty?
          </h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Join our community of satisfied customers who trust in authentic natural products.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/category/all"
              className="bg-white hover:bg-gray-100 text-black px-8 py-3 rounded-lg font-medium transition-colors"
            >
              Start Shopping
            </Link>
            <Link
              to="/hot-sale"
              className="bg-pink-600 hover:bg-pink-700 text-white px-8 py-3 rounded-lg font-medium transition-colors"
            >
              🔥 Shop Hot Deals
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;