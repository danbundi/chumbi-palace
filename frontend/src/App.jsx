import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ProductProvider } from './contexts/ProductContext';
import { CartProvider } from './contexts/CartContext';
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import HomePage from './pages/HomePage';
import ProductPage from './pages/ProductPage';
import CartPage from './pages/CartPage';
import CategoryPage from './pages/CategoryPage';
import HotSalePage from './pages/HotSalePage';
import ScrollToTop from './components/Layout/ScrollToTop';
import './App.css';

function App() {
  return (
    <Router>
      <ProductProvider>
        <CartProvider>
          <ScrollToTop/>
          <div className="min-h-screen flex flex-col">
            <Header />
            <main className="grow">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/product/:id" element={<ProductPage />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/category/:category" element={<CategoryPage />} />
                <Route path="/hot-sale" element={<HotSalePage />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </CartProvider>
      </ProductProvider>
    </Router>
  );
}

export default App;