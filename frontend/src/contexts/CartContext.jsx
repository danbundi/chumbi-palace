import React, { createContext, useContext, useState, useEffect } from 'react';
import CartSidebar from '../components/Cart/CartSidebar';
import { useLocalStorage } from '../components/hooks/useLocalStorage';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useLocalStorage('chumbi-palace-cart', []);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const addToCart = (product, variant, quantity = 1) => {
    setCart(prevCart => {
      // Match by canonical productId (Mongo `_id`) and variant name
      const existingItem = prevCart.find(item => 
        item.productId === product._id && 
        item.variant?.name === variant.name
      );

      if (existingItem) {
        return prevCart.map(item =>
          item.id === existingItem.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        const newItem = {
          // cart-row id (unique per product+variant)
          id: `${product._id}-${variant.name}`,
          // canonical product identifier (from backend)
          productId: product._id,
          // keep itemId for backward-compat if other code relies on it
          itemId: product._id,
          productName: product.name,
          name: product.name,
          category: product.category || [],
          image: product.image || '/placeholder.jpg',
          variant: variant,
          variantName: variant.name,
          weight: variant.weight,
          sku: variant.sku,
          price: variant.price,
          quantity
        };

        return [...prevCart, newItem];
      }
    });
};


  const removeFromCart = (itemId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== itemId));
  };

  const updateQuantity = (itemId, quantity) => {
    if (quantity < 1) {
      removeFromCart(itemId);
      return;
    }
    
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === itemId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getCartCount = () => {
    return cart.reduce((count, item) => count + item.quantity, 0);
  };

  const value = {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartTotal,
    getCartCount,
    isCartOpen,
    setIsCartOpen
  };

  return (
    <CartContext.Provider value={value}>
      {children}
      {isCartOpen && <CartSidebar />}
    </CartContext.Provider>
  );
};