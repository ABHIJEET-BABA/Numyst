
import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { CURRENCY_SYMBOL } from '../constants';
import { CheckCircle, CreditCard, Smartphone, Wallet, ShieldCheck, ArrowRight, Apple } from 'lucide-react';
import { Link } from 'react-router-dom';

type PaymentMethod = 'visa' | 'razorpay' | 'paypal' | 'applepay';

export const Checkout = () => {
  const { cart, cartTotal, clearCart } = useShop();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('visa');

  const handlePayment = () => {
    setLoading(true);
    // Simulate Gateway Handshake
    setTimeout(() => {
      setLoading(false);
      setStep(3);
      clearCart();
    }, 2500);
  };

  if (cart.length === 0 && step !== 3) {
    return (
      <div className="pt-32 text-center min-h-screen flex flex-col items-center justify-center">
        <h2 className="text-3xl font-serif text-stone-300 mb-6">Your collection is empty</h2>
        <Link to="/shop" className="px-8 py-3 border border-gold-500 text-gold-500 hover:bg-gold-500 hover:text-white transition-all uppercase tracking-widest text-xs">
          Return to Gallery
        </Link>
      </div>
    );
  }

  if (step === 3) {
    return (
      <div className="pt-32 min-h-screen flex items-center justify-center px-4 bg-mysore-900">
        <div className="text-center max-w-lg bg-mysore-800 p-16 rounded-[3rem] border border-gold-500/20 shadow-2xl animate-fade-in relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gold-500 to-transparent"></div>
          <div className="w-24 h-24 bg-gold-500/10 rounded-full flex items-center justify-center mx-auto mb-8 border border-gold-500/20">
            <CheckCircle size={48} className="text-gold-500" />
          </div>
          <h2 className="text-4xl font-serif text-gold-100 mb-6">Order Manifested</h2>
          <p className="text-stone-400 mb-10 leading-relaxed">
            Your selection is being curated. An olfactory journey will arrive at your doorstep soon.
          </p>
          <Link 
            to="/" 
            className="inline-block px-12 py-4 bg-gold-600 text-white uppercase tracking-[0.2em] text-xs font-bold hover:bg-gold-500 transition-all shadow-xl"
          >
            Continue Journey
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto min-h-screen">
      <div className="text-center mb-16">
        <h1 className="text-5xl font-serif text-gold-100 mb-4">Checkout</h1>
        <p className="text-stone-500 uppercase tracking-widest text-[10px]">Secure Aristocratic Transaction</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
        {/* Form */}
        <div className="lg:col-span-7 space-y-12">
          
          {/* Section 1: Contact */}
          <section className="bg-mysore-800 p-10 rounded-[2rem] border border-white/5 shadow-xl">
            <div className="flex items-center gap-4 mb-8">
              <span className="w-8 h-8 rounded-full bg-gold-500/10 border border-gold-500/30 flex items-center justify-center text-gold-500 text-xs font-bold">01</span>
              <h2 className="text-2xl font-serif text-gold-300">Shipping Essence</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] text-stone-500 uppercase tracking-widest ml-1">First Name</label>
                <input type="text" className="w-full bg-stone-900/50 border border-white/10 p-4 rounded-xl text-stone-200 focus:border-gold-500 outline-none transition-all" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] text-stone-500 uppercase tracking-widest ml-1">Last Name</label>
                <input type="text" className="w-full bg-stone-900/50 border border-white/10 p-4 rounded-xl text-stone-200 focus:border-gold-500 outline-none transition-all" />
              </div>
              <div className="md:col-span-2 space-y-2">
                <label className="text-[10px] text-stone-500 uppercase tracking-widest ml-1">Email Address</label>
                <input type="email" className="w-full bg-stone-900/50 border border-white/10 p-4 rounded-xl text-stone-200 focus:border-gold-500 outline-none transition-all" />
              </div>
              <div className="md:col-span-2 space-y-2">
                <label className="text-[10px] text-stone-500 uppercase tracking-widest ml-1">Street Address</label>
                <input type="text" className="w-full bg-stone-900/50 border border-white/10 p-4 rounded-xl text-stone-200 focus:border-gold-500 outline-none transition-all" />
              </div>
            </div>
          </section>

          {/* Section 2: Payment Gateways */}
          <section className="bg-mysore-800 p-10 rounded-[2rem] border border-white/5 shadow-xl">
             <div className="flex items-center gap-4 mb-8">
              <span className="w-8 h-8 rounded-full bg-gold-500/10 border border-gold-500/30 flex items-center justify-center text-gold-500 text-xs font-bold">02</span>
              <h2 className="text-2xl font-serif text-gold-300">Secure Payment Gateway</h2>
            </div>

             <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
               {[
                 { id: 'visa', icon: <CreditCard size={20} />, label: 'Visa' },
                 { id: 'razorpay', icon: <Smartphone size={20} />, label: 'Razorpay' },
                 { id: 'paypal', icon: <Wallet size={20} />, label: 'PayPal' },
                 { id: 'applepay', icon: <Apple size={20} />, label: 'Apple Pay' },
               ].map((method) => (
                 <button 
                   key={method.id}
                   onClick={() => setPaymentMethod(method.id as PaymentMethod)}
                   className={`p-6 rounded-2xl border-2 flex flex-col items-center gap-3 transition-all ${
                     paymentMethod === method.id 
                     ? 'border-gold-500 bg-gold-500/10 text-gold-100' 
                     : 'border-white/5 bg-black/20 text-stone-500 hover:border-white/10 hover:text-stone-300'
                   }`}
                 >
                   {method.icon}
                   <span className="text-[10px] uppercase tracking-widest font-bold">{method.label}</span>
                 </button>
               ))}
             </div>

             {/* Dynamic Form Area */}
             <div className="p-8 bg-black/20 rounded-3xl border border-white/5 animate-fade-in">
                {paymentMethod === 'visa' && (
                  <div className="space-y-6">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-[10px] text-stone-500 uppercase tracking-widest">Credit / Debit Card Details</span>
                      <div className="flex gap-2">
                        <div className="w-8 h-5 bg-stone-700 rounded-sm"></div>
                        <div className="w-8 h-5 bg-stone-700 rounded-sm"></div>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <input type="text" placeholder="Card Number" className="w-full bg-transparent border-b border-white/10 py-3 text-stone-300 focus:border-gold-500 outline-none font-mono tracking-widest" />
                      <div className="grid grid-cols-2 gap-8">
                        <input type="text" placeholder="MM / YY" className="bg-transparent border-b border-white/10 py-3 text-stone-300 focus:border-gold-500 outline-none" />
                        <input type="text" placeholder="CVV" className="bg-transparent border-b border-white/10 py-3 text-stone-300 focus:border-gold-500 outline-none" />
                      </div>
                    </div>
                  </div>
                )}

                {paymentMethod === 'razorpay' && (
                  <div className="text-center py-4">
                    <p className="text-stone-400 text-sm mb-4">Pay securely via Razorpay with UPI, Net Banking, or Wallets.</p>
                    <div className="flex justify-center gap-4 grayscale opacity-50">
                      <span className="text-[10px] font-bold border border-white/20 px-2 py-1 rounded">UPI</span>
                      <span className="text-[10px] font-bold border border-white/20 px-2 py-1 rounded">BANK</span>
                    </div>
                  </div>
                )}

                {paymentMethod === 'paypal' && (
                  <div className="text-center py-4">
                    <p className="text-stone-400 text-sm mb-4">You will be redirected to PayPal to complete your purchase securely.</p>
                    <div className="h-10 w-32 bg-gold-100/10 rounded-full mx-auto flex items-center justify-center text-blue-400 font-bold italic">PayPal</div>
                  </div>
                )}

                {paymentMethod === 'applepay' && (
                  <div className="text-center py-4">
                    <button className="bg-white text-black w-full py-4 rounded-xl flex items-center justify-center gap-2 font-bold hover:bg-stone-200 transition-colors">
                      <Apple size={20} fill="black" /> Pay
                    </button>
                    <p className="text-stone-500 text-[9px] mt-4 uppercase tracking-widest">Touch ID or Face ID required</p>
                  </div>
                )}
             </div>
          </section>
        </div>

        {/* Summary */}
        <div className="lg:col-span-5">
          <div className="bg-mysore-800 p-10 rounded-[2rem] border border-gold-500/10 sticky top-32 shadow-2xl">
            <h2 className="text-2xl font-serif text-gold-300 mb-8">Summary</h2>
            <div className="space-y-6 mb-10 max-h-[300px] overflow-y-auto pr-2 scrollbar-hide">
              {cart.map(item => (
                <div key={item.id} className="flex justify-between items-center group">
                  <div className="flex gap-4 items-center">
                    <div className="w-12 h-16 bg-stone-900 rounded overflow-hidden border border-white/5">
                      <img src={item.image} className="w-full h-full object-cover" alt="" />
                    </div>
                    <div>
                      <p className="text-stone-200 text-sm font-medium">{item.name}</p>
                      <p className="text-[10px] text-stone-500 uppercase tracking-widest">Qty: {item.quantity}</p>
                    </div>
                  </div>
                  <div className="text-gold-400 text-sm font-serif">{CURRENCY_SYMBOL} {(item.price * item.quantity).toLocaleString()}</div>
                </div>
              ))}
            </div>
            
            <div className="border-t border-white/5 pt-8 space-y-4 mb-10">
              <div className="flex justify-between text-stone-500 text-xs uppercase tracking-widest">
                <span>Subtotal</span>
                <span>{CURRENCY_SYMBOL} {cartTotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-stone-500 text-xs uppercase tracking-widest">
                <span>Shipping & Concierge</span>
                <span className="text-gold-500">Complimentary</span>
              </div>
              <div className="flex justify-between text-white font-serif text-2xl pt-4 border-t border-white/5">
                <span>Total</span>
                <span className="text-gold-400">{CURRENCY_SYMBOL} {cartTotal.toLocaleString()}</span>
              </div>
            </div>

            <button 
              onClick={handlePayment}
              disabled={loading}
              className="group w-full py-6 bg-gold-600 hover:bg-gold-500 text-white font-bold tracking-[0.3em] uppercase transition-all disabled:opacity-50 flex items-center justify-center gap-4 rounded-2xl shadow-xl active:scale-95"
            >
              {loading ? (
                <div className="flex items-center gap-3">
                  <span className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin"></span>
                  <span className="text-[10px]">Securing...</span>
                </div>
              ) : (
                <>Complete Purchase <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" /></>
              )}
            </button>
            
            <div className="mt-8 pt-8 border-t border-white/5 flex items-center justify-center gap-3 text-stone-500">
              <ShieldCheck size={16} className="text-gold-500/50" />
              <p className="text-[9px] uppercase tracking-[0.2em]">SSL Encrypted • Vault Protection</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
