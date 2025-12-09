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
      const existingItem = prevCart.find(item => 
        item.productId === product.id && 
        item.variantName === variant.name
      );

      if (existingItem) {
        return prevCart.map(item =>
          item.id === existingItem.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        const newItem = {
          id: `${product.id}-${variant.name}`,
          productId: product.id,
          productName: product.name,
          variantName: variant.name,
          price: variant.price,
          weight: variant.weight,
          sku: variant.sku,
          quantity,
          image: product.image || '/placeholder.jpg'
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