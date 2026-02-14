
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, History, Leaf, Droplets, Flame, MapPin, Quote, Send } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const Home = () => {
  const { products, siteSettings } = useShop();
  const featuredScents = products.slice(0, 3);

  return (
    <div className="min-h-screen selection:bg-gold-500 selection:text-mysore-900">
      {/* Immersive Hero */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <video 
            autoPlay loop muted playsInline
            className="w-full h-full object-cover opacity-50 scale-105"
            src={siteSettings.heroVideo}
            key={siteSettings.heroVideo} 
          ></video>
          <div className="absolute inset-0 bg-gradient-to-b from-mysore-900/60 via-mysore-900/40 to-mysore-900"></div>
        </div>

        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto animate-fade-in">
          <div className="w-px h-24 bg-gold-500 mx-auto mb-12 opacity-50"></div>
          <p className="text-gold-400 uppercase tracking-[0.4em] mb-6 text-xs md:text-sm font-light">{siteSettings.heroSubtitle}</p>
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-serif text-white mb-10 leading-none tracking-tighter">
            {siteSettings.heroTitle.split(' ').map((word, i) => 
              word.toLowerCase() === 'india' || word.toLowerCase() === 'unseen' 
              ? <React.Fragment key={i}><br/><span className="italic font-normal text-gold-500">{word} </span></React.Fragment>
              : <React.Fragment key={i}>{word} </React.Fragment>
            )}
          </h1>
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 mt-12">
            <Link 
              to="/shop" 
              className="group relative inline-flex items-center gap-4 bg-gold-600 text-white px-12 py-6 uppercase tracking-widest text-sm transition-all hover:bg-gold-500 shadow-2xl"
            >
              Enter The Collection
              <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* The Craft Section */}
      <section className="py-32 bg-mysore-900 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <div className="order-2 lg:order-1 space-y-8">
              <h2 className="text-5xl md:text-7xl font-serif text-gold-100 leading-tight">Beyond Fragrance, <br/>A Living Heritage.</h2>
              <p className="text-stone-400 text-xl font-light leading-relaxed">
                Every bottle of Numyst is a chronicle. We partner with multi-generational distillers who treat perfumery as a sacred conversation between earth and spirit.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-12 pt-8">
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-full border border-gold-500/30 flex items-center justify-center text-gold-500">
                    <Leaf size={20} />
                  </div>
                  <h4 className="text-gold-300 font-serif text-xl">Wild Harvested</h4>
                  <p className="text-stone-500 text-sm">Ethically sourced rare ingredients from their natural habitats.</p>
                </div>
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-full border border-gold-500/30 flex items-center justify-center text-gold-500">
                    <History size={20} />
                  </div>
                  <h4 className="text-gold-300 font-serif text-xl">Ancient Alchemy</h4>
                  <p className="text-stone-500 text-sm">Steam distillation in traditional copper Deg-Bhapka stills.</p>
                </div>
              </div>
            </div>
            <div className="order-1 lg:order-2 relative">
               <div className="absolute -inset-10 border border-gold-500/10 rotate-3"></div>
               <img 
                 src={siteSettings.heritageImage} 
                 className="w-full h-[700px] object-cover rounded shadow-2xl relative z-10"
                 alt="Perfume Bottle Editorial"
               />
            </div>
          </div>
        </div>
      </section>

      {/* NEW: The Trinity of Craft */}
      <section className="py-32 bg-black/20 border-y border-white/5 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-24">
            <p className="text-gold-500 uppercase tracking-widest text-xs mb-4">The Process</p>
            <h2 className="text-4xl md:text-6xl font-serif text-white">The Trinity of Craft</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            <div className="group space-y-8 text-center animate-slide-up">
              <div className="relative mx-auto w-24 h-24 rounded-full border border-gold-500/20 flex items-center justify-center text-gold-500 group-hover:bg-gold-500 group-hover:text-mysore-900 transition-all duration-700">
                 <Leaf size={32} />
                 <div className="absolute -top-2 -right-2 text-[10px] font-bold text-gold-600 bg-mysore-800 border border-gold-500/30 w-8 h-8 rounded-full flex items-center justify-center">01</div>
              </div>
              <div className="space-y-4">
                <h3 className="text-2xl font-serif text-gold-100">The Harvest</h3>
                <p className="text-stone-500 text-sm leading-relaxed px-4">Gathering rare resins and blossoms at dawn, when the olfactory potential is at its absolute peak.</p>
              </div>
            </div>

            <div className="group space-y-8 text-center animate-slide-up" style={{ animationDelay: '200ms' }}>
              <div className="relative mx-auto w-24 h-24 rounded-full border border-gold-500/20 flex items-center justify-center text-gold-500 group-hover:bg-gold-500 group-hover:text-mysore-900 transition-all duration-700">
                 <Flame size={32} />
                 <div className="absolute -top-2 -right-2 text-[10px] font-bold text-gold-600 bg-mysore-800 border border-gold-500/30 w-8 h-8 rounded-full flex items-center justify-center">02</div>
              </div>
              <div className="space-y-4">
                <h3 className="text-2xl font-serif text-gold-100">The Fire</h3>
                <p className="text-stone-500 text-sm leading-relaxed px-4">Copper Deg-Bhapka distillation, using artisanal fire to extract the soul without scorching the essence.</p>
              </div>
            </div>

            <div className="group space-y-8 text-center animate-slide-up" style={{ animationDelay: '400ms' }}>
              <div className="relative mx-auto w-24 h-24 rounded-full border border-gold-500/20 flex items-center justify-center text-gold-500 group-hover:bg-gold-500 group-hover:text-mysore-900 transition-all duration-700">
                 <Droplets size={32} />
                 <div className="absolute -top-2 -right-2 text-[10px] font-bold text-gold-600 bg-mysore-800 border border-gold-500/30 w-8 h-8 rounded-full flex items-center justify-center">03</div>
              </div>
              <div className="space-y-4">
                <h3 className="text-2xl font-serif text-gold-100">The Curing</h3>
                <p className="text-stone-500 text-sm leading-relaxed px-4">Resting in teakwood barrels for 12 moons to allow the vibrations of India’s soil to settle into a symphony.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Scent Gallery */}
      <section className="py-32 bg-black/40">
        <div className="max-w-7xl mx-auto px-6 text-center mb-24">
          <p className="text-gold-500 uppercase tracking-widest text-xs mb-4">Maison Numyst</p>
          <h2 className="text-4xl md:text-6xl font-serif text-white">The Signature Edit</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
          {featuredScents.map((p) => (
            <Link to={`/product/${p.id}`} key={p.id} className="group relative aspect-[3/4] overflow-hidden">
               <img src={p.image} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 grayscale-[30%] group-hover:grayscale-0" alt={p.name} />
               <div className="absolute inset-0 bg-gradient-to-t from-mysore-900 via-transparent to-transparent opacity-80 group-hover:opacity-40 transition-opacity"></div>
               <div className="absolute bottom-12 left-12 right-12 text-center transform group-hover:-translate-y-4 transition-transform duration-500">
                  <h3 className="text-3xl font-serif text-white mb-2">{p.name}</h3>
                  <p className="text-gold-400 uppercase tracking-widest text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-700">Explore Scent</p>
               </div>
               <div className="absolute top-8 right-8 w-12 h-12 border border-white/20 rounded-full flex items-center justify-center text-white/40 group-hover:text-gold-400 group-hover:border-gold-500 transition-all">
                  <ArrowRight size={20} />
               </div>
            </Link>
          ))}
        </div>
      </section>

      {/* NEW: Regional Roots */}
      <section className="py-32 bg-mysore-900">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
            <div className="max-w-2xl">
              <h2 className="text-4xl md:text-6xl font-serif text-gold-100 mb-6">Regional Roots</h2>
              <p className="text-stone-400 text-lg font-light">The Indian landscape is our laboratory. We source the most elusive botanicals from their native coordinates.</p>
            </div>
            <Link to="/about" className="text-gold-500 flex items-center gap-3 uppercase tracking-widest text-xs border-b border-gold-500/30 pb-2 hover:border-gold-500 transition-all">Explore Scent Map</Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { loc: 'Ladakh', ing: 'Wild Juniper', desc: 'Sourced from 14,000ft alpine deserts.' },
              { loc: 'Kannauj', ing: 'Mitti Attar', desc: 'The scent of rain-soaked earth, distilled for centuries.' },
              { loc: 'Mysore', ing: 'Sandalwood', desc: 'Authentic royal Vandan, aged for creaminess.' },
              { loc: 'Kashmir', ing: 'Saffron', desc: 'The golden stigmata of the Pampore plateaus.' },
            ].map((item, i) => (
              <div key={i} className="group p-8 border border-white/5 rounded-2xl hover:bg-white/5 transition-all">
                <MapPin size={20} className="text-gold-600 mb-6 group-hover:scale-125 transition-transform" />
                <h4 className="text-stone-500 text-[10px] uppercase tracking-widest mb-1">{item.loc}</h4>
                <h3 className="text-xl font-serif text-gold-100 mb-3">{item.ing}</h3>
                <p className="text-stone-500 text-xs leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* NEW: Patrons of the Unseen (Testimonials) */}
      <section className="py-40 bg-black/20 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 opacity-5 pointer-events-none">
          <Quote size={400} className="text-gold-500" />
        </div>
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <p className="text-gold-500 uppercase tracking-widest text-xs mb-12 italic">Whispers of the Patrons</p>
          <div className="space-y-12">
            <h2 className="text-3xl md:text-5xl font-serif text-white leading-relaxed italic font-light">
              "Numyst isn't just a fragrance; it's a sensory portal. I wear it and I am immediately transported to a monsoon evening in a Kerala forest."
            </h2>
            <div className="space-y-2">
              <p className="text-gold-400 font-serif text-xl">— Aria Malhotra</p>
              <p className="text-stone-600 uppercase tracking-widest text-[9px]">Verified Collector • Mumbai</p>
            </div>
          </div>
        </div>
      </section>

      {/* NEW: The Inner Circle (Newsletter) */}
      <section className="py-32 bg-mysore-900 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-gradient-to-br from-mysore-800 to-black p-12 md:p-24 rounded-[3rem] border border-gold-500/10 text-center relative overflow-hidden group">
            <div className="absolute inset-0 bg-gold-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
            <div className="relative z-10 max-w-2xl mx-auto space-y-10">
              <h2 className="text-4xl md:text-6xl font-serif text-gold-100">The Inner Circle</h2>
              <p className="text-stone-400 text-lg font-light leading-relaxed italic">
                Join our scent-visionaries to receive invitations to private harvest releases and limited edition attar drops.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input 
                  type="email" 
                  placeholder="Your essence address" 
                  className="flex-1 bg-black/40 border border-white/10 px-8 py-5 rounded-2xl text-stone-300 outline-none focus:border-gold-500 transition-all placeholder-stone-700"
                />
                <button className="bg-gold-600 hover:bg-gold-500 text-white px-10 py-5 rounded-2xl uppercase tracking-widest text-xs font-bold flex items-center justify-center gap-3 transition-all active:scale-95 shadow-lg">
                  Subscribe <Send size={16} />
                </button>
              </div>
              <p className="text-[10px] text-stone-600 uppercase tracking-[0.3em]">Privacy Guaranteed • Unsubscribe with a whisper</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
