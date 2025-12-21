import React, { createContext, useContext, useState, useEffect } from 'react';

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
    const fetchProducts = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/products'); // backend endpoint
        const data = await res.json();

        // Normalize products to ensure a Mongo-style `_id` exists.
        // Some fixtures or older data may use `id` instead of `_id`.
        const normalized = data.map(p => ({ ...p, _id: p._id || p.id }));

        setProducts(normalized);

        // Get unique categories (guard against missing category arrays)
        const uniqueCategories = ['all', ...new Set(
          normalized.flatMap(product => product.category || [])
        )];
        setCategories(uniqueCategories);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch products:', error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const getProductById = (id) => {
    return products.find(product => product._id === id);
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
        product._id !== currentProduct._id &&
        product.category.some(cat => currentProduct.category.includes(cat))
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
