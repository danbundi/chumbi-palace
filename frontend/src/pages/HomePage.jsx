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
  ChevronRight
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
      icon: <Truck className="text-amber-600" size={24} />,
      title: "Free Delivery",
      description: "Orders above 2000 KES"
    },
    {
      icon: <Shield className="text-amber-600" size={24} />,
      title: "Quality Guarantee",
      description: "100% Natural & Fresh"
    },
    {
      icon: <RefreshCw className="text-amber-600" size={24} />,
      title: "Easy Returns",
      description: "7-Day Return Policy"
    },
    {
      icon: <Award className="text-amber-600" size={24} />,
      title: "Premium Quality",
      description: "Carefully Selected"
    }
  ];

  const categoriesToShow = categories
    .filter(cat => cat !== 'all')
    .slice(0, 6);

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-yellow-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-amber-900/90 to-yellow-900/90 py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/basket-weave.png')] opacity-10"></div>
        <div className="max-w-7xl mx-auto relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Sparkles className="text-amber-300" />
                <span className="text-amber-200 font-semibold tracking-wide">Natural & Organic Products</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-amber-50 mb-6 font-display">
                Discover Africa's 
                <span className="text-amber-300 block">Natural Treasures</span>
              </h1>
              <p className="text-lg text-amber-100/90 mb-8 leading-relaxed">
                Premium quality seeds, nuts, spices, and herbal products sourced directly from nature's heart. 
                Experience authentic purity in every product.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  to="/category/seeds-and-nuts"
                  className="bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl flex items-center"
                >
                  Shop Now
                  <ChevronRight size={20} className="ml-2" />
                </Link>
                <Link
                  to="/hot-sale"
                  className="bg-gradient-to-r from-red-700 to-red-800 hover:from-red-800 hover:to-red-900 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl flex items-center"
                >
                  🔥 Hot Sale
                  <ChevronRight size={20} className="ml-2" />
                </Link>
              </div>
            </div>
            
            {/* Hero Image Placeholder */}
            <div className="bg-gradient-to-br from-amber-800/30 to-yellow-900/30 rounded-2xl shadow-2xl p-8 backdrop-blur-sm border border-amber-500/30">
              <div className="aspect-square rounded-2xl bg-gradient-to-br from-amber-900/40 to-yellow-900/40 flex items-center justify-center border-2 border-amber-700/30">
                <div className="text-center p-8">
                  <div className="text-9xl mb-6">🌿</div>
                  <p className="text-amber-100 font-bold text-2xl mb-2">African Harvest</p>
                  <p className="text-amber-200/80">Pure Natural Collection</p>
                  <div className="flex justify-center mt-6 space-x-2">
                    <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                    <div className="w-3 h-3 rounded-full bg-emerald-700"></div>
                    <div className="w-3 h-3 rounded-full bg-orange-600"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 -mt-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="bg-gradient-to-br from-amber-50 to-yellow-100 p-8 rounded-2xl shadow-lg border border-amber-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="mb-5 bg-amber-100 w-14 h-14 rounded-full flex items-center justify-center">
                  {feature.icon}
                </div>
                <h3 className="font-bold text-stone-800 text-xl mb-3">{feature.title}</h3>
                <p className="text-stone-700">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-stone-50 to-amber-50/50">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-10">
            <div>
              <h2 className="text-3xl font-bold text-stone-900 mb-2 font-display">Shop by Category</h2>
              <p className="text-stone-700">Browse our curated African collections</p>
            </div>
            <Link 
              to="/category/all" 
              className="text-amber-800 hover:text-amber-900 font-semibold flex items-center group"
            >
              View all categories
              <ChevronRight size={20} className="ml-1 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {categoriesToShow.map(category => (
              <Link
                key={category}
                to={`/category/${category.toLowerCase().replace(/ /g, '-')}`}
                className="bg-gradient-to-br from-white to-amber-50 rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 group border border-amber-100"
              >
                <div className="p-8">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-bold text-stone-900">
                      {category.replace(/-/g, ' ')}
                    </h3>
                    <ChevronRight className="text-amber-600 transform group-hover:translate-x-2 transition-transform" />
                  </div>
                  <div className="h-40 bg-gradient-to-r from-amber-100 to-orange-100 rounded-xl flex items-center justify-center border border-amber-200">
                    <div className="text-6xl">
                      {category.includes('Seeds') ? '🌾' : 
                       category.includes('Spices') ? '🧂' : 
                       category.includes('Teas') ? '🍃' : 
                       category.includes('Nuts') ? '🥜' : 
                       category.includes('Herbs') ? '🌿' : '🫒'}
                    </div>
                  </div>
                  <p className="text-stone-700 mt-6">
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
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-amber-900/10 to-red-900/10">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center mb-10">
              <div className="bg-gradient-to-r from-red-700 to-orange-700 text-white px-6 py-3 rounded-full flex items-center mr-6 shadow-lg">
                <TrendingUp size={22} className="mr-3" />
                <span className="font-bold">HOT SALE</span>
              </div>
              <div>
                <h2 className="text-3xl font-bold text-stone-900 mb-2 font-display">Limited Time Offers</h2>
                <p className="text-stone-700">Don't miss these amazing African treasures!</p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-white to-amber-50 rounded-2xl shadow-2xl p-8 border border-amber-200">
              <ProductGrid products={hotSaleProducts} loading={loading} />
              
              <div className="text-center mt-10">
                <Link
                  to="/hot-sale"
                  className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-red-700 to-orange-700 hover:from-red-800 hover:to-orange-800 text-white font-bold rounded-xl hover:shadow-xl transition-all duration-300 shadow-lg"
                >
                  🔥 View All Hot Deals
                  <ChevronRight size={20} className="ml-3" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Featured Products */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-10">
            <div>
              <div className="flex items-center mb-3">
                <Star className="text-amber-500 mr-3" size={24} />
                <span className="text-amber-700 font-bold text-lg">Featured</span>
              </div>
              <h2 className="text-3xl font-bold text-stone-900 mb-2 font-display">Best Selling Products</h2>
              <p className="text-stone-700">Customer favorites from across Africa</p>
            </div>
            <Link 
              to="/category/all" 
              className="text-amber-800 hover:text-amber-900 font-semibold flex items-center group"
            >
              View all products
              <ChevronRight size={20} className="ml-1 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <ProductGrid products={featuredProducts} loading={loading} />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-amber-900 to-yellow-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/basket-weave.png')] opacity-20"></div>
        <div className="max-w-4xl mx-auto text-center relative">
          <h2 className="text-3xl md:text-4xl font-bold text-amber-50 mb-6 font-display">
            Ready to Experience Africa's Natural Bounty?
          </h2>
          <p className="text-amber-100/90 text-lg mb-10 max-w-2xl mx-auto leading-relaxed">
            Join our community of satisfied customers who trust in authentic African natural products.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link
              to="/category/all"
              className="bg-gradient-to-r from-amber-50 to-yellow-100 text-amber-900 hover:from-amber-100 hover:to-yellow-200 px-10 py-4 rounded-xl font-bold transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Start Shopping
            </Link>
            <Link
              to="/hot-sale"
              className="bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white px-10 py-4 rounded-xl font-bold transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center"
            >
              🔥 Shop Hot Deals
            </Link>
          </div>
          <div className="mt-12 flex justify-center space-x-4">
            <div className="w-4 h-4 rounded-full bg-amber-500"></div>
            <div className="w-4 h-4 rounded-full bg-emerald-700"></div>
            <div className="w-4 h-4 rounded-full bg-orange-600"></div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;