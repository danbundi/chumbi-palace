import React, { createContext, useContext, useState, useEffect } from 'react';
import productsData from '../data/products.json';

const ProductContext = createContext();

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
};

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    setProducts(productsData);
    
    const uniqueCategories = ['all', ...new Set(
      productsData.flatMap(product => product.category)
    )];
    setCategories(uniqueCategories);
    
    setLoading(false);
  }, []);

  const getProductById = (id) => {
    return products.find(product => product.id === id);
  };

  const getProductsByCategory = (category) => {
    if (category === 'all') return products;
    return products.filter(product => 
      product.category.includes(category)
    );
  };

  const getRelatedProducts = (currentProduct, limit = 4) => {
    if (!currentProduct) return [];
    
    return products
      .filter(product => 
        product.id !== currentProduct.id && 
        product.category.some(cat => 
          currentProduct.category.includes(cat)
        )
      )
      .slice(0, limit);
  };

  const value = {
    products,
    categories,
    loading,
    selectedCategory,
    setSelectedCategory,
    getProductById,
    getProductsByCategory,
    getRelatedProducts
  };

  return (
    <ProductContext.Provider value={value}>
      {children}
    </ProductContext.Provider>
  );
};