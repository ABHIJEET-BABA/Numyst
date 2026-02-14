
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Product, CartItem, BlogPost, Review } from '../types';
import { PRODUCTS as INITIAL_PRODUCTS, BLOG_POSTS as INITIAL_BLOGS } from '../constants';

const DEFAULT_HERITAGE_IMG = "https://images.unsplash.com/photo-1590736704728-f4730bb3c3af?q=80&w=1000&auto=format&fit=crop";
const DEFAULT_HERO_VIDEO = "https://assets.mixkit.co/videos/preview/mixkit-smoke-and-perfume-bottle-40436-large.mp4";

interface SiteSettings {
  heroVideo: string;
  heroTitle: string;
  heroSubtitle: string;
  heritageImage: string;
}

interface ShopContextType {
  products: Product[];
  blogs: BlogPost[];
  cart: CartItem[];
  siteSettings: SiteSettings;
  isCartOpen: boolean;
  isAdminAuthenticated: boolean;
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, delta: number) => void;
  toggleCart: () => void;
  clearCart: () => void;
  cartTotal: number;
  cartCount: number;
  // Admin Operations
  addProduct: (product: Product) => void;
  updateProduct: (product: Product) => void;
  deleteProduct: (id: string) => void;
  addBlog: (blog: BlogPost) => void;
  updateBlog: (blog: BlogPost) => void;
  deleteBlog: (id: string) => void;
  updateSiteSettings: (settings: Partial<SiteSettings>) => void;
  addProductReview: (productId: string, review: Review) => void;
  loginAdmin: (id: string, pass: string) => boolean;
  logoutAdmin: () => void;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

export const ShopProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [siteSettings, setSiteSettings] = useState<SiteSettings>({
    heroVideo: DEFAULT_HERO_VIDEO,
    heroTitle: "Essence of Unseen India",
    heroSubtitle: "Heritage • Purity • Modernity",
    heritageImage: DEFAULT_HERITAGE_IMG
  });
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);

  useEffect(() => {
    const auth = sessionStorage.getItem('numyst_admin_auth');
    if (auth === 'true') setIsAdminAuthenticated(true);

    const savedProducts = localStorage.getItem('numyst_products');
    setProducts(savedProducts ? JSON.parse(savedProducts) : INITIAL_PRODUCTS);

    const savedBlogs = localStorage.getItem('numyst_blogs');
    setBlogs(savedBlogs ? JSON.parse(savedBlogs) : INITIAL_BLOGS);

    const savedSettings = localStorage.getItem('numyst_site_settings');
    if (savedSettings) setSiteSettings(JSON.parse(savedSettings));

    const savedCart = localStorage.getItem('numyst_cart');
    if (savedCart) setCart(JSON.parse(savedCart));
  }, []);

  useEffect(() => {
    localStorage.setItem('numyst_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('numyst_blogs', JSON.stringify(blogs));
  }, [blogs]);

  useEffect(() => {
    localStorage.setItem('numyst_site_settings', JSON.stringify(siteSettings));
  }, [siteSettings]);

  useEffect(() => {
    localStorage.setItem('numyst_cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (productId: string) => setCart(prev => prev.filter(item => item.id !== productId));
  const updateQuantity = (productId: string, delta: number) => {
    setCart(prev => prev.map(item => item.id === productId ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item));
  };
  const toggleCart = () => setIsCartOpen(!isCartOpen);
  const clearCart = () => setCart([]);
  
  const loginAdmin = (id: string, pass: string) => {
    if (id === 'numystadmin.com' && pass === 'Numyst@123') {
      setIsAdminAuthenticated(true);
      sessionStorage.setItem('numyst_admin_auth', 'true');
      return true;
    }
    return false;
  };
  const logoutAdmin = () => {
    setIsAdminAuthenticated(false);
    sessionStorage.removeItem('numyst_admin_auth');
  };

  const addProduct = (product: Product) => setProducts(prev => [product, ...prev]);
  const updateProduct = (updated: Product) => setProducts(prev => prev.map(p => p.id === updated.id ? updated : p));
  const deleteProduct = (id: string) => setProducts(prev => prev.filter(p => p.id !== id));
  const addBlog = (blog: BlogPost) => setBlogs(prev => [blog, ...prev]);
  const updateBlog = (updated: BlogPost) => setBlogs(prev => prev.map(b => b.id === updated.id ? updated : b));
  const deleteBlog = (id: string) => setBlogs(prev => prev.filter(b => b.id !== id));
  const updateSiteSettings = (newSettings: Partial<SiteSettings>) => setSiteSettings(prev => ({ ...prev, ...newSettings }));

  const addProductReview = (productId: string, review: Review) => {
    setProducts(prev => prev.map(p => {
      if (p.id === productId) {
        const reviews = p.reviews ? [review, ...p.reviews] : [review];
        // Recalculate average rating
        const newRating = reviews.reduce((acc, curr) => acc + curr.rating, 0) / reviews.length;
        return { ...p, reviews, rating: Number(newRating.toFixed(1)) };
      }
      return p;
    }));
  };

  const cartTotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <ShopContext.Provider value={{
      products, blogs, cart, siteSettings, isCartOpen, isAdminAuthenticated,
      addToCart, removeFromCart, updateQuantity, toggleCart, clearCart, cartTotal, cartCount,
      addProduct, updateProduct, deleteProduct, addBlog, updateBlog, deleteBlog, updateSiteSettings, addProductReview, loginAdmin, logoutAdmin
    }}>
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) throw new Error("useShop must be used within ShopProvider");
  return context;
};
