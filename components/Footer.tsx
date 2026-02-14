import React from 'react';
import { APP_NAME } from '../constants';

export const Footer = () => {
  return (
    <footer className="bg-mysore-900 border-t border-white/10 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          
          {/* Brand */}
          <div className="col-span-1 md:col-span-1">
            <h2 className="text-2xl font-serif text-gold-400 mb-6 tracking-widest">{APP_NAME}</h2>
            <p className="text-stone-400 text-sm leading-relaxed">
              Crafting artisanal Indian fragrances that bridge the ancient heritage of perfumery with modern sophistication. Sourced from the finest ingredients across the subcontinent.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-gold-200 font-medium tracking-widest uppercase text-sm mb-6">Explore</h3>
            <ul className="space-y-4 text-stone-400 text-sm">
              <li><a href="#" className="hover:text-gold-400 transition-colors">Our Collection</a></li>
              <li><a href="#" className="hover:text-gold-400 transition-colors">The Heritage</a></li>
              <li><a href="#" className="hover:text-gold-400 transition-colors">Gift Sets</a></li>
              <li><a href="#" className="hover:text-gold-400 transition-colors">Journal</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-gold-200 font-medium tracking-widest uppercase text-sm mb-6">Support</h3>
            <ul className="space-y-4 text-stone-400 text-sm">
              <li><a href="#" className="hover:text-gold-400 transition-colors">Contact Concierge</a></li>
              <li><a href="#" className="hover:text-gold-400 transition-colors">Shipping & Returns</a></li>
              <li><a href="#" className="hover:text-gold-400 transition-colors">FAQ</a></li>
              <li><a href="#" className="hover:text-gold-400 transition-colors">Track Order</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-gold-200 font-medium tracking-widest uppercase text-sm mb-6">The Scent of News</h3>
            <p className="text-stone-400 text-sm mb-4">Subscribe to receive updates on new harvests and limited editions.</p>
            <div className="flex border-b border-stone-600 pb-2">
              <input type="email" placeholder="Email Address" className="bg-transparent w-full text-stone-200 focus:outline-none placeholder-stone-600 text-sm" />
              <button className="text-gold-500 uppercase text-xs font-bold tracking-widest hover:text-gold-400">Join</button>
            </div>
          </div>
        </div>

        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-stone-600">
          <p>&copy; 2024 {APP_NAME} Perfumery. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <span className="cursor-pointer hover:text-stone-400">Privacy Policy</span>
            <span className="cursor-pointer hover:text-stone-400">Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
