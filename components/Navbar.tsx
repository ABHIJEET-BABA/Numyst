
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, Menu, X, Search, Settings } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { APP_NAME } from '../constants';

export const Navbar = () => {
  const { toggleCart, cartCount } = useShop();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const navClass = `fixed top-0 w-full z-50 transition-all duration-300 border-b border-white/10 ${
    isScrolled ? 'bg-mysore-900/95 backdrop-blur-md py-3 shadow-lg' : 'bg-transparent py-6'
  }`;

  return (
    <nav className={navClass}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-stone-300 hover:text-gold-400"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Logo */}
        <div className="flex-shrink-0 flex items-center">
          <Link to="/" className="text-2xl font-serif tracking-widest text-gold-400 hover:text-gold-300 transition-colors">
            {APP_NAME}
          </Link>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex space-x-12 items-center">
          <Link to="/" className="text-sm uppercase tracking-widest text-stone-300 hover:text-gold-400 transition-colors">Home</Link>
          <Link to="/shop" className="text-sm uppercase tracking-widest text-stone-300 hover:text-gold-400 transition-colors">Collection</Link>
          <Link to="/blog" className="text-sm uppercase tracking-widest text-stone-300 hover:text-gold-400 transition-colors">Journal</Link>
          <Link to="/about" className="text-sm uppercase tracking-widest text-stone-300 hover:text-gold-400 transition-colors">Our Story</Link>
        </div>

        {/* Icons */}
        <div className="flex items-center space-x-6">
          <Link to="/admin" className="text-stone-500 hover:text-gold-400 transition-colors hidden sm:block" title="Admin Panel">
            <Settings size={20} />
          </Link>
          <button className="text-stone-300 hover:text-gold-400 transition-colors hidden sm:block">
            <Search size={20} />
          </button>
          <button 
            className="text-stone-300 hover:text-gold-400 transition-colors relative"
            onClick={toggleCart}
          >
            <ShoppingBag size={20} />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-gold-600 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-mysore-800 border-b border-white/10 animate-fade-in">
          <div className="px-4 pt-2 pb-6 space-y-2">
            <Link to="/" className="block px-3 py-3 text-base font-medium text-stone-300 hover:text-gold-400 hover:bg-white/5 rounded-md">Home</Link>
            <Link to="/shop" className="block px-3 py-3 text-base font-medium text-stone-300 hover:text-gold-400 hover:bg-white/5 rounded-md">Collection</Link>
            <Link to="/blog" className="block px-3 py-3 text-base font-medium text-stone-300 hover:text-gold-400 hover:bg-white/5 rounded-md">Journal</Link>
            <Link to="/admin" className="block px-3 py-3 text-base font-medium text-stone-300 hover:text-gold-400 hover:bg-white/5 rounded-md">Admin Panel</Link>
          </div>
        </div>
      )}
    </nav>
  );
};
