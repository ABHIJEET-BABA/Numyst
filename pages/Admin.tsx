
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Edit2, Trash2, X, Upload, Save, LogOut, Package, BookOpen, ImageIcon, RotateCcw, Settings as SettingsIcon, Monitor, Film } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { Product, BlogPost } from '../types';
import { CURRENCY_SYMBOL } from '../constants';

export const Admin = () => {
  const { 
    products, addProduct, updateProduct, deleteProduct,
    blogs, addBlog, updateBlog, deleteBlog,
    siteSettings, updateSiteSettings,
    isAdminAuthenticated, logoutAdmin 
  } = useShop();
  
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'products' | 'blogs' | 'settings'>('products');
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [isBlogModalOpen, setIsBlogModalOpen] = useState(false);
  
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [editingBlog, setEditingBlog] = useState<BlogPost | null>(null);

  const productFileRef = useRef<HTMLInputElement>(null);
  const blogFileRef = useRef<HTMLInputElement>(null);
  const heritageFileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!isAdminAuthenticated) navigate('/login');
  }, [isAdminAuthenticated, navigate]);

  // Form states
  const [productData, setProductData] = useState<Partial<Product>>({
    name: '', tagline: '', description: '', price: 0, category: 'Unisex', notes: [], pyramid: { top: [], heart: [], base: [] }, image: '', rating: 5, heritage: ''
  });
  const [blogData, setBlogData] = useState<Partial<BlogPost>>({
    title: '', description: '', content: '', image: '', tags: [], author: 'Ora', date: new Date().toISOString().split('T')[0]
  });

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, type: 'product' | 'blog' | 'heritage') => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        if (type === 'product') setProductData(prev => ({ ...prev, image: base64String }));
        else if (type === 'blog') setBlogData(prev => ({ ...prev, image: base64String }));
        else if (type === 'heritage') updateSiteSettings({ heritageImage: base64String });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEditProduct = (p: Product) => { setEditingProduct(p); setProductData(p); setIsProductModalOpen(true); };
  const handleEditBlog = (b: BlogPost) => { setEditingBlog(b); setBlogData(b); setIsBlogModalOpen(true); };

  const handleSaveProduct = () => {
    if (editingProduct) updateProduct(productData as Product);
    else addProduct({ ...productData, id: `p${Date.now()}` } as Product);
    setIsProductModalOpen(false);
    resetProductForm();
  };

  const handleSaveBlog = () => {
    if (editingBlog) updateBlog(blogData as BlogPost);
    else addBlog({ ...blogData, id: `b${Date.now()}` } as BlogPost);
    setIsBlogModalOpen(false);
    resetBlogForm();
  };

  const resetProductForm = () => {
    setEditingProduct(null);
    setProductData({ name: '', tagline: '', description: '', price: 0, category: 'Unisex', notes: [], pyramid: { top: [], heart: [], base: [] }, image: '', rating: 5, heritage: '' });
  };

  const resetBlogForm = () => {
    setEditingBlog(null);
    setBlogData({ title: '', description: '', content: '', image: '', tags: [], author: 'Ora', date: new Date().toISOString().split('T')[0] });
  };

  if (!isAdminAuthenticated) return null;

  return (
    <div className="pt-32 pb-24 px-6 sm:px-12 max-w-7xl mx-auto min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-start mb-12 gap-8">
        <div>
          <h1 className="text-4xl font-serif text-gold-200">Management Vault</h1>
          <div className="flex gap-8 mt-6">
             <button onClick={() => setActiveTab('products')} className={`flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] font-bold pb-2 border-b-2 transition-all ${activeTab === 'products' ? 'border-gold-500 text-gold-100' : 'border-transparent text-stone-500 hover:text-stone-300'}`}><Package size={14} /> Products</button>
             <button onClick={() => setActiveTab('blogs')} className={`flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] font-bold pb-2 border-b-2 transition-all ${activeTab === 'blogs' ? 'border-gold-500 text-gold-100' : 'border-transparent text-stone-500 hover:text-stone-300'}`}><BookOpen size={14} /> Journal</button>
             <button onClick={() => setActiveTab('settings')} className={`flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] font-bold pb-2 border-b-2 transition-all ${activeTab === 'settings' ? 'border-gold-500 text-gold-100' : 'border-transparent text-stone-500 hover:text-stone-300'}`}><SettingsIcon size={14} /> Site Content</button>
          </div>
        </div>
        <div className="flex gap-4">
          {activeTab !== 'settings' && (
            <button onClick={() => { activeTab === 'products' ? (resetProductForm(), setIsProductModalOpen(true)) : (resetBlogForm(), setIsBlogModalOpen(true)) }} className="bg-gold-600 hover:bg-gold-500 text-white px-8 py-4 rounded-2xl flex items-center gap-2 transition-all shadow-lg text-[10px] uppercase tracking-widest font-bold"><Plus size={18} /> New {activeTab === 'products' ? 'Scent' : 'Story'}</button>
          )}
          <button onClick={() => { logoutAdmin(); navigate('/login'); }} className="border border-white/10 hover:bg-white/5 text-stone-400 px-6 py-4 rounded-2xl flex items-center gap-2 transition-all text-[10px] uppercase tracking-widest"><LogOut size={18} /> Exit</button>
        </div>
      </div>

      {activeTab === 'products' ? (
        <div className="bg-mysore-800 rounded-3xl border border-white/5 overflow-hidden shadow-2xl">
          <table className="w-full text-left">
            <thead className="bg-white/5 text-stone-400 text-[9px] uppercase tracking-[0.3em]">
              <tr><th className="px-8 py-6">Identity</th><th className="px-8 py-6">Genre</th><th className="px-8 py-6">Value</th><th className="px-8 py-6 text-right">Actions</th></tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {products.map(p => (
                <tr key={p.id} className="hover:bg-white/5 transition-colors">
                  <td className="px-8 py-6 flex items-center gap-4 font-serif text-lg text-stone-100"><img src={p.image} className="w-10 h-14 object-cover rounded bg-stone-900" alt="" />{p.name}</td>
                  <td className="px-8 py-6 text-[10px] uppercase tracking-widest text-stone-500">{p.category}</td>
                  <td className="px-8 py-6 font-serif text-gold-400">{CURRENCY_SYMBOL} {p.price.toLocaleString()}</td>
                  <td className="px-8 py-6 text-right"><div className="flex justify-end gap-3"><button onClick={() => handleEditProduct(p)} className="p-3 text-stone-500 hover:text-gold-400 hover:bg-white/5 rounded-xl transition-colors"><Edit2 size={16} /></button><button onClick={() => deleteProduct(p.id)} className="p-3 text-stone-500 hover:text-red-400 hover:bg-white/5 rounded-xl transition-colors"><Trash2 size={16} /></button></div></td>
                </tr>
              ))}
            </tbody>
          </table>
          {products.length === 0 && <div className="p-12 text-center text-stone-500 font-serif italic">The vault is currently empty.</div>}
        </div>
      ) : activeTab === 'blogs' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map(blog => (
            <div key={blog.id} className="bg-mysore-800 border border-white/5 rounded-3xl overflow-hidden group hover:border-gold-500/30 transition-all shadow-xl">
               <div className="aspect-video relative overflow-hidden">
                 <img src={blog.image} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" alt="" />
                 <div className="absolute top-4 right-4 flex gap-2">
                    <button onClick={() => handleEditBlog(blog)} className="p-2 bg-mysore-900/80 text-gold-500 rounded-lg backdrop-blur-sm hover:scale-110 transition-transform"><Edit2 size={14} /></button>
                    <button onClick={() => deleteBlog(blog.id)} className="p-2 bg-mysore-900/80 text-red-500 rounded-lg backdrop-blur-sm hover:scale-110 transition-transform"><Trash2 size={14} /></button>
                 </div>
               </div>
               <div className="p-6 space-y-4">
                  <h3 className="font-serif text-xl text-gold-100 group-hover:text-gold-400 transition-colors">{blog.title}</h3>
                  <div className="flex flex-wrap gap-2">{blog.tags.map(t => <span key={t} className="text-[9px] uppercase tracking-widest text-stone-500 border border-white/10 px-2 py-0.5 rounded-full">#{t}</span>)}</div>
               </div>
            </div>
          ))}
          {blogs.length === 0 && <div className="col-span-full p-12 text-center text-stone-500 font-serif italic border border-dashed border-white/10 rounded-3xl">No stories told.</div>}
        </div>
      ) : (
        /* Expanded Settings Tab */
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Hero Branding */}
          <div className="bg-mysore-800 rounded-3xl border border-white/5 p-10 shadow-2xl space-y-8">
            <div className="flex items-center gap-3 mb-2">
              <Monitor className="text-gold-500" size={20} />
              <h2 className="text-2xl font-serif text-gold-100">Hero Experience</h2>
            </div>
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] text-stone-500 uppercase tracking-widest">Hero Title</label>
                <input type="text" value={siteSettings.heroTitle} onChange={e => updateSiteSettings({ heroTitle: e.target.value })} className="w-full bg-black/40 border border-white/10 p-4 rounded-xl outline-none text-stone-200 focus:border-gold-500 transition-colors" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] text-stone-500 uppercase tracking-widest">Sub-Headline</label>
                <input type="text" value={siteSettings.heroSubtitle} onChange={e => updateSiteSettings({ heroSubtitle: e.target.value })} className="w-full bg-black/40 border border-white/10 p-4 rounded-xl outline-none text-stone-200 focus:border-gold-500 transition-colors" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] text-stone-500 uppercase tracking-widest">Cinematic Video URL</label>
                <div className="flex gap-2">
                  <input type="text" value={siteSettings.heroVideo} onChange={e => updateSiteSettings({ heroVideo: e.target.value })} className="flex-1 bg-black/40 border border-white/10 p-4 rounded-xl outline-none text-stone-400 text-xs focus:border-gold-500 transition-colors" />
                  <div className="bg-gold-500/10 p-4 rounded-xl text-gold-500"><Film size={18} /></div>
                </div>
              </div>
            </div>
          </div>

          {/* Heritage Visual */}
          <div className="bg-mysore-800 rounded-3xl border border-white/5 p-10 shadow-2xl space-y-8">
            <div className="flex items-center gap-3 mb-2">
              <ImageIcon className="text-gold-500" size={20} />
              <h2 className="text-2xl font-serif text-gold-100">Heritage Visual</h2>
            </div>
            <div className="space-y-6 text-center">
              <div 
                onClick={() => heritageFileRef.current?.click()}
                className="group relative aspect-[16/9] bg-black/40 border-2 border-dashed border-white/10 rounded-2xl flex flex-col items-center justify-center cursor-pointer hover:border-gold-500/50 transition-all overflow-hidden"
              >
                <img src={siteSettings.heritageImage} className="w-full h-full object-cover" alt="Heritage Preview" />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center transition-opacity">
                  <RotateCcw className="text-gold-500 mb-2" size={24} />
                  <span className="text-[10px] uppercase tracking-widest text-white">Upload New Asset</span>
                </div>
                <input type="file" ref={heritageFileRef} onChange={(e) => handleImageUpload(e, 'heritage')} accept="image/*" className="hidden" />
              </div>
              <p className="text-[10px] text-stone-500 uppercase tracking-widest italic">This visual defines the "Beyond Fragrance" narrative block.</p>
            </div>
          </div>
        </div>
      )}

      {/* Product Modal (Existing but with image upload trigger) */}
      {isProductModalOpen && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-6 overflow-y-auto">
          <div className="absolute inset-0 bg-black/90 backdrop-blur-sm" onClick={() => setIsProductModalOpen(false)}></div>
          <div className="relative bg-mysore-800 border border-gold-500/20 w-full max-w-4xl p-10 rounded-[2.5rem] animate-slide-up">
            <button onClick={() => setIsProductModalOpen(false)} className="absolute top-8 right-8 text-stone-500 hover:text-white"><X size={24} /></button>
            <h2 className="text-3xl font-serif text-gold-100 mb-8">{editingProduct ? 'Refine Essence' : 'Manifest Fragrance'}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               <div className="space-y-6">
                 <input type="text" placeholder="Name" value={productData.name} onChange={e => setProductData({...productData, name: e.target.value})} className="w-full bg-black/40 border border-white/10 p-4 rounded-xl outline-none text-stone-200" />
                 <input type="number" placeholder="Price" value={productData.price} onChange={e => setProductData({...productData, price: Number(e.target.value)})} className="w-full bg-black/40 border border-white/10 p-4 rounded-xl outline-none text-stone-200" />
                 <textarea placeholder="Tagline" value={productData.tagline} onChange={e => setProductData({...productData, tagline: e.target.value})} className="w-full bg-black/40 border border-white/10 p-4 rounded-xl outline-none text-stone-200 h-24" />
               </div>
               <div className="space-y-4">
                 <div onClick={() => productFileRef.current?.click()} className="aspect-[4/5] bg-black/40 border-2 border-dashed border-white/10 rounded-2xl flex items-center justify-center cursor-pointer hover:border-gold-500/50 transition-all overflow-hidden relative group">
                   {productData.image ? <img src={productData.image} className="w-full h-full object-cover" alt="" /> : <Upload className="text-stone-600" size={32} />}
                   <input type="file" ref={productFileRef} onChange={e => handleImageUpload(e, 'product')} accept="image/*" className="hidden" />
                 </div>
               </div>
               <textarea placeholder="Description" value={productData.description} onChange={e => setProductData({...productData, description: e.target.value})} className="md:col-span-2 w-full bg-black/40 border border-white/10 p-4 rounded-xl outline-none text-stone-200 h-32" />
            </div>
            <div className="mt-8 flex justify-end gap-6">
              <button onClick={() => setIsProductModalOpen(false)} className="text-stone-500 uppercase tracking-widest text-[10px]">Cancel</button>
              <button onClick={handleSaveProduct} className="bg-gold-600 px-10 py-4 rounded-xl text-[10px] uppercase tracking-widest font-bold text-white">Save</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
