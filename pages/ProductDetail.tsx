
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Star, ShoppingBag, Truck, ShieldCheck, Droplet, Wind, Mountain, Send, User, MessageCircle } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { CURRENCY_SYMBOL } from '../constants';

export const ProductDetail = () => {
  const { id } = useParams();
  const { products, addToCart, addProductReview } = useShop();
  
  const product = products.find(p => p.id === id);

  // Review Form State
  const [reviewName, setReviewName] = useState('');
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!product) return <div className="pt-32 text-center text-stone-400">Product not found</div>;

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewName || !reviewComment) return;

    setIsSubmitting(true);
    
    setTimeout(() => {
      addProductReview(product.id, {
        id: Date.now().toString(),
        userName: reviewName,
        rating: reviewRating,
        comment: reviewComment,
        date: new Date().toISOString().split('T')[0]
      });
      setReviewName('');
      setReviewComment('');
      setReviewRating(5);
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <div className="pt-32 pb-24 px-6 sm:px-12 max-w-7xl mx-auto min-h-screen">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 mb-32">
        
        {/* Immersive Gallery */}
        <div className="space-y-6">
          <div className="group relative aspect-[4/5] bg-stone-800 w-full overflow-hidden shadow-2xl">
            <img src={product.image} alt={product.name} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-tr from-mysore-900/40 to-transparent"></div>
          </div>
          {product.heritage && (
            <div className="bg-white/5 p-8 rounded border border-white/5 italic text-stone-400 text-sm leading-relaxed">
              <h4 className="text-gold-400 uppercase tracking-widest text-[10px] mb-4 flex items-center gap-2">
                <ShieldCheck size={12} /> The Heritage Account
              </h4>
              "{product.heritage}"
            </div>
          )}
        </div>

        {/* Details */}
        <div className="flex flex-col">
          <div className="mb-4 flex items-center gap-4">
             <div className="flex text-gold-500">
               {[...Array(5)].map((_, i) => (
                 <Star key={i} size={14} fill={i < Math.floor(product.rating) ? "currentColor" : "none"} />
               ))}
             </div>
             <span className="text-stone-500 text-xs tracking-[0.2em] uppercase">{product.category} COLLECTION</span>
          </div>

          <h1 className="text-5xl md:text-6xl font-serif text-white mb-6 leading-tight">{product.name}</h1>
          <p className="text-2xl text-gold-400 font-light italic mb-8 border-l-2 border-gold-500/40 pl-6">"{product.tagline}"</p>

          <p className="text-stone-300 leading-relaxed text-lg mb-12 font-light">
            {product.description}
          </p>

          {/* Scent Pyramid */}
          <div className="mb-12 space-y-10">
            <h3 className="text-xs uppercase tracking-[0.4em] text-gold-600 font-bold border-b border-white/10 pb-4">Olfactory Architecture</h3>
            
            <div className="grid grid-cols-1 gap-8">
              {product.pyramid?.top?.length > 0 && (
                <div className="flex gap-6 items-start">
                  <div className="w-8 h-8 rounded-full bg-gold-500/10 flex items-center justify-center text-gold-500 flex-shrink-0">
                    <Wind size={16} />
                  </div>
                  <div>
                    <p className="text-stone-500 text-[10px] uppercase tracking-widest mb-1">Top Notes</p>
                    <p className="text-white text-lg font-serif">{product.pyramid.top.join(', ')}</p>
                  </div>
                </div>
              )}

              {product.pyramid?.heart?.length > 0 && (
                <div className="flex gap-6 items-start">
                  <div className="w-8 h-8 rounded-full bg-gold-500/10 flex items-center justify-center text-gold-500 flex-shrink-0">
                    <Droplet size={16} />
                  </div>
                  <div>
                    <p className="text-stone-500 text-[10px] uppercase tracking-widest mb-1">Heart Notes</p>
                    <p className="text-white text-lg font-serif">{product.pyramid.heart.join(', ')}</p>
                  </div>
                </div>
              )}

              {product.pyramid?.base?.length > 0 && (
                <div className="flex gap-6 items-start">
                  <div className="w-8 h-8 rounded-full bg-gold-500/10 flex items-center justify-center text-gold-500 flex-shrink-0">
                    <Mountain size={16} />
                  </div>
                  <div>
                    <p className="text-stone-500 text-[10px] uppercase tracking-widest mb-1">Base Notes</p>
                    <p className="text-white text-lg font-serif">{product.pyramid.base.join(', ')}</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="mt-auto pt-12 border-t border-white/5">
             <div className="flex items-end justify-between mb-8">
               <div>
                 <p className="text-stone-500 text-xs uppercase tracking-widest mb-1">Price Incl. Taxes</p>
                 <p className="text-4xl text-white font-serif">{CURRENCY_SYMBOL} {product.price.toLocaleString()}</p>
               </div>
               <p className="text-gold-500 text-sm font-medium">50ml Eau de Parfum</p>
             </div>

             <button 
               onClick={() => addToCart(product)}
               className="group w-full py-6 bg-gold-600 hover:bg-gold-500 text-white font-bold tracking-[0.3em] uppercase transition-all flex items-center justify-center gap-4 text-sm"
             >
               Add to Collection
               <ShoppingBag size={20} className="group-hover:scale-110 transition-transform" />
             </button>
          </div>
        </div>
      </div>

      {/* Customer Impressions Section */}
      <section className="mt-32 border-t border-white/5 pt-24">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between mb-16 gap-8">
            <div className="text-center md:text-left">
              <h2 className="text-4xl font-serif text-gold-100 mb-2">Customer Impressions</h2>
              <p className="text-stone-500 text-[10px] uppercase tracking-widest italic">The shared frequency of our patrons</p>
            </div>
            <div className="bg-white/5 p-6 rounded-3xl flex items-center gap-6 border border-white/10">
              <div className="text-4xl font-serif text-gold-400">{product.rating}</div>
              <div className="space-y-1">
                <div className="flex text-gold-500">
                   {[...Array(5)].map((_, i) => (
                     <Star key={i} size={14} fill={i < Math.floor(product.rating) ? "currentColor" : "none"} />
                   ))}
                </div>
                <p className="text-[10px] text-stone-500 uppercase tracking-widest">{product.reviews?.length || 0} Chronicles</p>
              </div>
            </div>
          </div>

          {/* New Review Form */}
          <div className="mb-24 bg-mysore-800 p-10 rounded-[2.5rem] border border-gold-500/10 shadow-2xl">
            <h3 className="text-xl font-serif text-gold-300 mb-8">Leave your narrative</h3>
            <form onSubmit={handleSubmitReview} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-[10px] text-stone-500 uppercase tracking-widest">Patron Name</label>
                  <input 
                    type="text" 
                    value={reviewName} 
                    onChange={e => setReviewName(e.target.value)}
                    placeholder="Enter your name" 
                    className="w-full bg-black/40 border border-white/10 p-4 rounded-xl outline-none text-stone-200 focus:border-gold-500 transition-colors" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] text-stone-500 uppercase tracking-widest">Olfactory Resonance</label>
                  <div className="flex gap-2 p-4 bg-black/40 border border-white/10 rounded-xl">
                    {[1, 2, 3, 4, 5].map(star => (
                      <button 
                        key={star} 
                        type="button"
                        onClick={() => setReviewRating(star)}
                        className={`transition-transform hover:scale-125 ${star <= reviewRating ? 'text-gold-500' : 'text-stone-700'}`}
                      >
                        <Star size={20} fill={star <= reviewRating ? "currentColor" : "none"} />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] text-stone-500 uppercase tracking-widest">Your Experience</label>
                <textarea 
                  value={reviewComment}
                  onChange={e => setReviewComment(e.target.value)}
                  placeholder="Describe the vibe of this essence on your skin..." 
                  className="w-full bg-black/40 border border-white/10 p-4 rounded-xl outline-none text-stone-200 h-32 focus:border-gold-500 transition-colors" 
                />
              </div>
              <div className="flex justify-end">
                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-gold-600 hover:bg-gold-500 text-white px-12 py-4 rounded-xl uppercase tracking-[0.2em] text-[10px] font-bold shadow-lg transition-all active:scale-95 flex items-center gap-3 disabled:opacity-50"
                >
                  {isSubmitting ? 'Whispering...' : 'Submit Narrative'}
                  <Send size={14} />
                </button>
              </div>
            </form>
          </div>

          {/* Review List */}
          <div className="space-y-12">
            {product.reviews?.length ? product.reviews.map(review => (
              <div key={review.id} className="animate-fade-in group">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-gold-600/10 flex items-center justify-center text-gold-500 border border-gold-500/20">
                      <User size={20} />
                    </div>
                    <div>
                      <h4 className="font-serif text-lg text-white group-hover:text-gold-400 transition-colors">{review.userName}</h4>
                      <p className="text-[9px] text-stone-600 uppercase tracking-widest flex items-center gap-2">
                        <Calendar size={10} /> {review.date}
                        <span className="text-gold-600 font-bold ml-2">• Verified Essence</span>
                      </p>
                    </div>
                  </div>
                  <div className="flex text-gold-500">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={12} fill={i < review.rating ? "currentColor" : "none"} />
                    ))}
                  </div>
                </div>
                <div className="pl-16">
                  <p className="text-stone-400 leading-relaxed italic font-light">"{review.comment}"</p>
                </div>
                <div className="w-full h-px bg-white/5 mt-12"></div>
              </div>
            )) : (
              <div className="text-center py-20 border border-dashed border-white/10 rounded-[2rem]">
                <MessageCircle className="mx-auto text-stone-600 mb-4" size={32} />
                <p className="text-stone-500 font-serif italic text-lg">The air is silent. Be the first to tell a story.</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

const Calendar = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
);
