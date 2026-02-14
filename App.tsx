
import React, { useEffect } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { Shop } from './pages/Shop';
import { ProductDetail } from './pages/ProductDetail';
import { Checkout } from './pages/Checkout';
import { Admin } from './pages/Admin';
import { Login } from './pages/Login';
import { Blog } from './pages/Blog';
import { BlogDetail } from './pages/BlogDetail';
import { CartDrawer } from './components/CartDrawer';
import { AiConsultant } from './components/AiConsultant';
import { ScentVisionary } from './components/ScentVisionary';
import { ShopProvider } from './context/ShopContext';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const App = () => {
  return (
    <Router>
      <ShopProvider>
        <ScrollToTop />
        <div className="min-h-screen flex flex-col relative bg-mysore-900 text-stone-200 selection:bg-gold-500 selection:text-mysore-900">
          <Navbar />
          <CartDrawer />
          
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:id" element={<BlogDetail />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/login" element={<Login />} />
              <Route path="/about" element={
                <div className="pt-48 pb-24 text-center px-4 max-w-4xl mx-auto">
                  <h1 className="text-6xl font-serif text-gold-300 mb-12 italic">Our Story</h1>
                  <p className="text-xl text-stone-400 font-light leading-relaxed mb-12">
                    Founded in the heart of ancient tradition and forged in the vision of modernity, Numyst is an exploration of the sensory landscape of the Indian subcontinent.
                  </p>
                  <div className="w-24 h-px bg-gold-500 mx-auto opacity-30"></div>
                </div>
              } />
            </Routes>
          </main>

          <ScentVisionary />
          <AiConsultant />
          <Footer />
        </div>
      </ShopProvider>
    </Router>
  );
};

export default App;
