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
    if (!category) return;
    if (categories.length === 0) return;

    setLoading(true);

    const normalizedCategory =
      category === 'all' ? 'all' : category.replace(/-/g, ' ').toLowerCase();

    const normalizedCategories = categories.map(c => c.toLowerCase());

    const categoryExists =
      normalizedCategory === 'all' ||
      normalizedCategories.includes(normalizedCategory);

    if (!categoryExists) {
      navigate('/');
      return;
    }

    const actualCategory =
      normalizedCategory === 'all'
        ? 'all'
        : categories.find(
            c => c.toLowerCase() === normalizedCategory
          );

    const categoryProducts = getProductsByCategory(actualCategory);

    setProducts(categoryProducts);
    setLoading(false);
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
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        {/* Category Header */}
        <div className="mb-6">
          <h1 className="text-xl font-bold text-black mb-1 capitalize">
            {categoryName}
          </h1>
          <p className="text-gray-600 text-sm">
            {products.length} products found
          </p>
        </div>

        {/* Filters and Controls */}
        <div className="bg-white rounded-lg border border-gray-200 p-4 mb-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            {/* View Toggle */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded ${viewMode === 'grid' ? 'bg-pink-100 text-pink-600' : 'text-gray-500 hover:bg-gray-100'}`}
              >
                <Grid size={18} />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded ${viewMode === 'list' ? 'bg-pink-100 text-pink-600' : 'text-gray-500 hover:bg-gray-100'}`}
              >
                <List size={18} />
              </button>
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <Filter size={16} className="text-gray-500" />
                <span className="text-gray-700 text-sm">Sort by:</span>
              </div>
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="appearance-none bg-white border border-gray-300 rounded-lg px-3 py-2 pr-8 text-sm focus:outline-none focus:ring-1 focus:ring-pink-500 focus:border-pink-500"
                >
                  <option value="default">Default</option>
                  <option value="name">Name (A-Z)</option>
                  <option value="price-low">Price (Low to High)</option>
                  <option value="price-high">Price (High to Low)</option>
                </select>
                <ChevronDown size={14} className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
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
            <div key={product._id} className="bg-white rounded-lg border border-gray-200 p-4 hover:border-gray-300 transition-colors">
                    <div className="flex items-start gap-4">
                      <div className="w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center border border-gray-200">
                        <div className="text-2xl">🌱</div>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium text-black">{product.name}</h3>
                        <p className="text-gray-600 text-sm mt-1 line-clamp-2">{product.short_description}</p>
                        <div className="flex items-center justify-between mt-4">
                          <div>
                            <span className="text-lg font-bold text-black">{lowestPrice} KES</span>
                            <span className="text-gray-500 text-sm ml-2">from {product.variants[0].weight}</span>
                          </div>
                          <button className="bg-pink-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-pink-700 transition-colors">
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