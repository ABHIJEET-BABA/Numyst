
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import { Calendar, User, ArrowLeft, Share2 } from 'lucide-react';

export const BlogDetail = () => {
  const { id } = useParams();
  const { blogs } = useShop();
  
  const post = blogs.find(b => b.id === id);

  if (!post) return <div className="pt-48 text-center text-gold-500 font-serif text-3xl">Story Lost in Time</div>;

  return (
    <div className="min-h-screen">
      {/* Hero Header */}
      <div className="relative h-[70vh] w-full overflow-hidden">
        <img src={post.image} className="w-full h-full object-cover scale-105" alt="" />
        <div className="absolute inset-0 bg-gradient-to-b from-mysore-900/60 via-transparent to-mysore-900"></div>
        
        <div className="absolute bottom-12 left-0 w-full px-6">
          <div className="max-w-4xl mx-auto space-y-6">
            <Link to="/blog" className="inline-flex items-center gap-2 text-gold-500 text-xs uppercase tracking-widest hover:text-white transition-colors mb-4">
              <ArrowLeft size={16} /> Return to Journal
            </Link>
            <h1 className="text-5xl md:text-7xl font-serif text-white leading-tight animate-slide-up">
              {post.title}
            </h1>
            <div className="flex items-center gap-8 text-[10px] text-stone-300 uppercase tracking-widest font-bold">
              <span className="flex items-center gap-2 border-r border-white/20 pr-8"><Calendar size={14} className="text-gold-500" /> {new Date(post.date).toLocaleDateString()}</span>
              <span className="flex items-center gap-2"><User size={14} className="text-gold-500" /> {post.author}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <article className="max-w-3xl mx-auto px-6 py-24 animate-fade-in">
        <div className="flex gap-4 mb-12">
          {post.tags.map(tag => (
            <span key={tag} className="text-[10px] text-gold-600 border border-gold-600/30 px-3 py-1 rounded-full uppercase tracking-widest">
              #{tag}
            </span>
          ))}
        </div>
        
        <div className="prose prose-invert prose-gold max-w-none">
          <p className="text-2xl text-stone-300 font-light italic leading-relaxed mb-12 first-letter:text-6xl first-letter:font-serif first-letter:text-gold-500 first-letter:mr-3 first-letter:float-left">
            {post.description}
          </p>
          <div className="text-stone-400 text-lg leading-loose space-y-8 font-light">
            {post.content.split('\n').map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>
        </div>

        <div className="mt-24 pt-12 border-t border-white/5 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-gold-600/20 border border-gold-500/20 flex items-center justify-center text-gold-500">
               <User size={20} />
            </div>
            <div>
              <p className="text-[10px] text-stone-500 uppercase tracking-widest">Storyteller</p>
              <p className="text-gold-200 font-serif">{post.author}</p>
            </div>
          </div>
          <button className="p-4 bg-white/5 hover:bg-white/10 rounded-full text-stone-400 transition-colors">
            <Share2 size={20} />
          </button>
        </div>
      </article>
    </div>
  );
};
