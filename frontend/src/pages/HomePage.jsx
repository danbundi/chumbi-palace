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
import hotSaleData from '../data/hotSale.json';

const HomePage = () => {
  const { products, categories, loading } = useProducts();
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [hotSaleProducts, setHotSaleProducts] = useState([]);

  useEffect(() => {
    // Get 8 random featured products
    if (products.length > 0) {
      const shuffled = [...products].sort(() => 0.5 - Math.random());
      setFeaturedProducts(shuffled.slice(0, 8));
      
      // Get hot sale products
      const hotSaleIds = hotSaleData.map(item => item.product_id);
      const hotSaleItems = products.filter(product => 
        hotSaleIds.includes(product.id)
      );
      setHotSaleProducts(hotSaleItems.slice(0, 4));
    }
  }, [products]);

  const features = [
    {
      icon: <Truck className="text-green-600" size={24} />,
      title: "Free Delivery",
      description: "Orders above 2000 KES"
    },
    {
      icon: <Shield className="text-green-600" size={24} />,
      title: "Quality Guarantee",
      description: "100% Natural & Fresh"
    },
    {
      icon: <RefreshCw className="text-green-600" size={24} />,
      title: "Easy Returns",
      description: "7-Day Return Policy"
    },
    {
      icon: <Award className="text-green-600" size={24} />,
      title: "Premium Quality",
      description: "Carefully Selected"
    }
  ];

  const categoriesToShow = categories
    .filter(cat => cat !== 'all')
    .slice(0, 6);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-50 to-emerald-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Sparkles className="text-yellow-500" />
                <span className="text-green-700 font-semibold">Natural & Organic Products</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Discover the Best of 
                <span className="text-green-600"> Nature's Bounty</span>
              </h1>
              <p className="text-lg text-gray-600 mb-8">
                Premium quality seeds, nuts, spices, and herbal products sourced directly from nature. 
                Experience purity in every product at Chumbi Palace.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  to="/category/seeds-and-nuts"
                  className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
                >
                  Shop Now
                </Link>
                <Link
                  to="/hot-sale"
                  className="bg-red-500 hover:bg-red-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors flex items-center"
                >
                  🔥 Hot Sale
                  <ChevronRight size={20} className="ml-2" />
                </Link>
              </div>
            </div>
            
            {/* Hero Image Placeholder */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <div className="aspect-square rounded-xl bg-gradient-to-br from-green-100 to-emerald-100 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-8xl mb-4">🌱</div>
                  <p className="text-gray-700 font-semibold text-xl">Chumbi Palace</p>
                  <p className="text-gray-600">Natural Products Collection</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
              >
                <div className="mb-4">{feature.icon}</div>
                <h3 className="font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">Shop by Category</h2>
              <p className="text-gray-600 mt-2">Browse our curated collections</p>
            </div>
            <Link 
              to="/category/all" 
              className="text-green-600 hover:text-green-700 font-semibold flex items-center"
            >
              View all
              <ChevronRight size={20} />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {categoriesToShow.map(category => (
              <Link
                key={category}
                to={`/category/${category.toLowerCase().replace(/ /g, '-')}`}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all group"
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-semibold text-gray-900">
                      {category.replace(/-/g, ' ')}
                    </h3>
                    <ChevronRight className="text-green-600 transform group-hover:translate-x-2 transition-transform" />
                  </div>
                  <div className="h-32 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg flex items-center justify-center">
                    <div className="text-4xl">
                      {category.includes('Seeds') ? '🌱' : 
                       category.includes('Spices') ? '🌶️' : 
                       category.includes('Teas') ? '🍵' : '🥜'}
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm mt-4">
                    Explore our premium collection of {category.toLowerCase().replace(/-/g, ' ')}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Hot Sale Section */}
      {hotSaleProducts.length > 0 && (
        <section className="py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-red-50 to-orange-50">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center mb-8">
              <div className="bg-red-500 text-white px-4 py-2 rounded-full flex items-center mr-4">
                <TrendingUp size={20} className="mr-2" />
                HOT SALE
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-900">Limited Time Offers</h2>
                <p className="text-gray-600">Don't miss these amazing deals!</p>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-6">
              <ProductGrid products={hotSaleProducts} loading={loading} />
              
              <div className="text-center mt-8">
                <Link
                  to="/hot-sale"
                  className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-red-500 to-orange-500 text-white font-semibold rounded-lg hover:shadow-lg transition-all"
                >
                  🔥 View All Hot Deals
                  <ChevronRight size={20} className="ml-2" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Featured Products */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <div>
              <div className="flex items-center mb-2">
                <Star className="text-yellow-500 mr-2" />
                <span className="text-green-600 font-semibold">Featured</span>
              </div>
              <h2 className="text-3xl font-bold text-gray-900">Best Selling Products</h2>
              <p className="text-gray-600 mt-2">Customer favorites</p>
            </div>
            <Link 
              to="/category/all" 
              className="text-green-600 hover:text-green-700 font-semibold flex items-center"
            >
              View all products
              <ChevronRight size={20} />
            </Link>
          </div>

          <ProductGrid products={featuredProducts} loading={loading} />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-green-600 to-emerald-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Experience Nature's Best?
          </h2>
          <p className="text-green-100 text-lg mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied customers who trust Chumbi Palace for their natural product needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/category/all"
              className="bg-white text-green-600 hover:bg-green-50 px-8 py-3 rounded-lg font-semibold transition-colors"
            >
              Start Shopping
            </Link>
            <Link
              to="/hot-sale"
              className="bg-yellow-500 hover:bg-yellow-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
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