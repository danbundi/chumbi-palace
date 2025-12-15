import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Filter, Grid, List, ChevronDown } from 'lucide-react';
import Breadcrumbs from '../components/Layout/Breadcrumbs';
import ProductGrid from '../components/Product/ProductGrid';
import { useProducts } from '../contexts/ProductContext';

const CategoryPage = () => {
  const { category } = useParams();
  const navigate = useNavigate();
  const { getProductsByCategory, categories } = useProducts();
  
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState('default');
  const [viewMode, setViewMode] = useState('grid');

  useEffect(() => {
    setLoading(true);
    
    // Check if category exists
    const categoryExists = categories.includes(category.replace(/-/g, ' ')) || category === 'all';
    
    if (!categoryExists && categories.length > 0) {
      navigate('/');
      return;
    }
    
    setTimeout(() => {
      const categoryProducts = getProductsByCategory(
        category === 'all' ? 'all' : category.replace(/-/g, ' ')
      );
      setProducts(categoryProducts);
      setLoading(false);
    }, 300);
  }, [category, categories, getProductsByCategory, navigate]);

  // Sort products
  const sortedProducts = React.useMemo(() => {
    const sorted = [...products];
    
    switch (sortBy) {
      case 'price-low':
        return sorted.sort((a, b) => {
          const priceA = Math.min(...a.variants.map(v => v.price));
          const priceB = Math.min(...b.variants.map(v => v.price));
          return priceA - priceB;
        });
      case 'price-high':
        return sorted.sort((a, b) => {
          const priceA = Math.min(...a.variants.map(v => v.price));
          const priceB = Math.min(...b.variants.map(v => v.price));
          return priceB - priceA;
        });
      case 'name':
        return sorted.sort((a, b) => a.name.localeCompare(b.name));
      default:
        return sorted;
    }
  }, [products, sortBy]);

  const categoryName = category === 'all' 
    ? 'All Products' 
    : category.replace(/-/g, ' ');

  return (
    <div className="min-h-screen bg-gray-50">
      <Breadcrumbs />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Category Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2 capitalize">
            {categoryName}
          </h1>
          <p className="text-gray-600">
            {products.length} products found
          </p>
        </div>

        {/* Filters and Controls */}
        <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            {/* View Toggle */}
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-green-100 text-green-600' : 'text-gray-500 hover:bg-gray-100'}`}
              >
                <Grid size={20} />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg ${viewMode === 'list' ? 'bg-green-100 text-green-600' : 'text-gray-500 hover:bg-gray-100'}`}
              >
                <List size={20} />
              </button>
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Filter size={18} className="text-gray-500" />
                <span className="text-gray-700">Sort by:</span>
              </div>
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  <option value="default">Default</option>
                  <option value="name">Name (A-Z)</option>
                  <option value="price-low">Price (Low to High)</option>
                  <option value="price-high">Price (High to Low)</option>
                </select>
                <ChevronDown size={16} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>
            </div>
          </div>
        </div>

        {/* Products Grid/List */}
        <div className={viewMode === 'grid' 
          ? '' 
          : 'space-y-4'
        }>
          {viewMode === 'grid' ? (
            <ProductGrid products={sortedProducts} loading={loading} />
          ) : (
            // List View (simplified version)
            <div className="space-y-4">
              {sortedProducts.map(product => {
                const lowestPrice = Math.min(...product.variants.map(v => v.price));
                
                return (
                  <div key={product.id} className="bg-white rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-start space-x-4">
                      <div className="w-24 h-24 bg-gray-200 rounded-lg flex items-center justify-center">
                        <div className="text-3xl">🌱</div>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg text-gray-900">{product.name}</h3>
                        <p className="text-gray-600 text-sm mt-1">{product.short_description}</p>
                        <div className="flex items-center justify-between mt-4">
                          <div>
                            <span className="text-xl font-bold text-gray-900">{lowestPrice} KES</span>
                            <span className="text-gray-500 text-sm ml-2">from {product.variants[0].weight}</span>
                          </div>
                          <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">
                            Add to Cart
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;