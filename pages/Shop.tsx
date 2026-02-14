import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Filter } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { CURRENCY_SYMBOL } from '../constants';

export const Shop = () => {
  const { products } = useShop();
  const [filter, setFilter] = useState<'All' | 'Men' | 'Women' | 'Unisex'>('All');

  const filteredProducts = filter === 'All' 
    ? products 
    : products.filter(p => p.category === filter);

  return (
    <div className="pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto min-h-screen">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
        <div>
          <h1 className="text-4xl md:text-5xl font-serif text-gold-100 mb-4">The Collection</h1>
          <p className="text-stone-400 max-w-lg">
            Explore our curated selection of fine fragrances, each telling a unique story of the Indian landscape.
          </p>
        </div>
        
        {/* Filter */}
        <div className="flex items-center gap-4 overflow-x-auto pb-2 md:pb-0">
          <Filter size={18} className="text-stone-500" />
          {['All', 'Men', 'Women', 'Unisex'].map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat as any)}
              className={`px-4 py-2 text-sm uppercase tracking-widest transition-all ${
                filter === cat 
                ? 'bg-gold-600 text-white' 
                : 'bg-stone-800 text-stone-400 hover:bg-stone-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-12 gap-x-8">
        {filteredProducts.map((product) => (
          <Link to={`/product/${product.id}`} key={product.id} className="group block">
            <div className="relative aspect-[3/4] overflow-hidden bg-stone-800 mb-6">
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-90 group-hover:opacity-100"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors"></div>
              {/* Overlay Tag */}
              <div className="absolute bottom-4 left-4">
                 <span className="bg-mysore-900/80 backdrop-blur text-gold-400 text-xs px-3 py-1 uppercase tracking-widest">
                   {product.category}
                 </span>
              </div>
            </div>
            
            <div className="text-center group-hover:-translate-y-2 transition-transform duration-300">
              <h3 className="text-2xl font-serif text-stone-200 group-hover:text-gold-400 transition-colors mb-2">
                {product.name}
              </h3>
              <p className="text-stone-500 text-sm italic mb-3">{product.tagline}</p>
              <p className="text-gold-500 font-medium">
                {CURRENCY_SYMBOL} {product.price.toLocaleString()}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};