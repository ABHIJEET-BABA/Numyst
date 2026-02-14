import React from 'react';
import { X, Plus, Minus, Trash2, ArrowRight } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { CURRENCY_SYMBOL } from '../constants';
import { useNavigate } from 'react-router-dom';

export const CartDrawer = () => {
  const { isCartOpen, toggleCart, cart, removeFromCart, updateQuantity, cartTotal } = useShop();
  const navigate = useNavigate();

  if (!isCartOpen) return null;

  const handleCheckout = () => {
    toggleCart();
    navigate('/checkout');
  };

  return (
    <div className="fixed inset-0 z-[60] overflow-hidden">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" onClick={toggleCart}></div>
      
      <div className="absolute inset-y-0 right-0 max-w-md w-full flex">
        <div className="h-full w-full bg-mysore-900 border-l border-white/10 shadow-2xl flex flex-col animate-slide-up sm:animate-none">
          
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-white/10">
            <h2 className="text-xl font-serif text-gold-300">Your Selection</h2>
            <button onClick={toggleCart} className="text-stone-400 hover:text-white">
              <X size={24} />
            </button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {cart.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-stone-500 space-y-4">
                <p>Your cart is empty.</p>
                <button 
                  onClick={toggleCart}
                  className="text-gold-400 hover:text-gold-300 underline underline-offset-4"
                >
                  Continue Shopping
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div key={item.id} className="flex gap-4">
                  <div className="w-20 h-24 bg-stone-800 rounded overflow-hidden flex-shrink-0">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="font-serif text-stone-200">{item.name}</h3>
                      <p className="text-sm text-stone-500">{item.category}</p>
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center border border-white/10 rounded">
                        <button 
                          onClick={() => item.quantity > 1 ? updateQuantity(item.id, -1) : removeFromCart(item.id)}
                          className="p-1 hover:bg-white/5 text-stone-400"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="px-3 text-sm text-stone-300">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.id, 1)}
                          className="p-1 hover:bg-white/5 text-stone-400"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                      <p className="text-gold-400 font-medium">{CURRENCY_SYMBOL} {item.price * item.quantity}</p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          {cart.length > 0 && (
            <div className="border-t border-white/10 p-6 bg-mysore-800">
              <div className="flex justify-between items-center mb-4">
                <span className="text-stone-400">Subtotal</span>
                <span className="text-xl font-serif text-gold-400">{CURRENCY_SYMBOL} {cartTotal.toLocaleString()}</span>
              </div>
              <p className="text-xs text-stone-500 mb-6">Taxes and shipping calculated at checkout.</p>
              <button 
                onClick={handleCheckout}
                className="w-full py-4 bg-gold-600 hover:bg-gold-500 text-white font-medium tracking-widest uppercase transition-colors flex items-center justify-center gap-2"
              >
                Checkout <ArrowRight size={18} />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
