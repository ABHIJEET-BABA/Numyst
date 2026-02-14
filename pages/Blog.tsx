
import React from 'react';
import { Link } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import { Calendar, User, ArrowRight } from 'lucide-react';

export const Blog = () => {
  const { blogs } = useShop();

  return (
    <div className="pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto min-h-screen">
      <div className="text-center mb-20 animate-fade-in">
        <h1 className="text-5xl md:text-7xl font-serif text-gold-100 mb-6">The Journal</h1>
        <p className="text-stone-400 max-w-2xl mx-auto text-lg italic">
          Chronicling the olfactory heritage of India, one vibration at a time.
        </p>
        <div className="w-24 h-px bg-gold-500 mx-auto mt-12 opacity-30"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
        {blogs.map((post, idx) => (
          <Link to={`/blog/${post.id}`} key={post.id} className="group block animate-slide-up" style={{ animationDelay: `${idx * 100}ms` }}>
            <div className="relative aspect-[16/10] overflow-hidden rounded-3xl bg-stone-800 mb-8 border border-white/5">
              <img 
                src={post.image} 
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" 
                alt={post.title} 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-mysore-900 via-transparent to-transparent opacity-60"></div>
              <div className="absolute bottom-6 left-6 flex gap-2">
                {post.tags.map(tag => (
                  <span key={tag} className="px-3 py-1 bg-gold-500/20 backdrop-blur-md text-gold-400 text-[10px] uppercase tracking-widest rounded-full border border-gold-500/30">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
            <div className="space-y-4 px-2">
              <div className="flex items-center gap-6 text-[10px] text-stone-500 uppercase tracking-widest font-bold">
                <span className="flex items-center gap-2"><Calendar size={12} className="text-gold-600" /> {new Date(post.date).toLocaleDateString()}</span>
                <span className="flex items-center gap-2"><User size={12} className="text-gold-600" /> {post.author}</span>
              </div>
              <h2 className="text-3xl font-serif text-gold-100 group-hover:text-gold-400 transition-colors leading-tight">
                {post.title}
              </h2>
              <p className="text-stone-400 leading-relaxed line-clamp-2 italic font-light">
                {post.description}
              </p>
              <div className="pt-4 flex items-center gap-2 text-gold-500 text-xs uppercase tracking-[0.2em] font-bold group-hover:gap-4 transition-all">
                Read Story <ArrowRight size={14} />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
