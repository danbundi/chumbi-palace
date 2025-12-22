import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ProductProvider } from './contexts/ProductContext';
import { HotSaleProvider } from './contexts/HotSaleContext';
import { CartProvider } from './contexts/CartContext';
import MainLayout from './layout/MainLayout';
import HomePage from './pages/HomePage';
import ProductPage from './pages/ProductPage';
import CartPage from './pages/CartPage';
import CategoryPage from './pages/CategoryPage';
import HotSalePage from './pages/HotSalePage';
import ScrollToTop from './components/Layout/ScrollToTop';
import AdminDashboard from './admin/AdminDashboard';
import AdminLogin from './admin/AdminLogin';
import AdminRoute from './routes/AdminRoute';
import AdminSetup from './admin/AdminSetup';
import './App.css';

function App() {
  return (
    <Router>
      <ProductProvider>
        <HotSaleProvider>
          <CartProvider>
            <ScrollToTop/>
            <Routes>
              {/* Public routes with header/footer */}
              <Route element={<MainLayout />}>
                <Route path="/" element={<HomePage />} />
                <Route path="/product/:id" element={<ProductPage />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/category/:category" element={<CategoryPage />} />
                <Route path="/hot-sale" element={<HotSalePage />} />
              </Route>

              {/* Admin routes without header/footer */}
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin/setup" element={<AdminSetup />} />
              <Route path="/admin/dashboard" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
            </Routes>
          </CartProvider>
        </HotSaleProvider>
      </ProductProvider>
    </Router>
  );
}

export default App;