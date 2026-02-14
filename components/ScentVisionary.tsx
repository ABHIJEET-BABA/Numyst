import React, { useState } from 'react';
import { Camera, Upload, Sparkles, X, ChevronRight, Loader2 } from 'lucide-react';
import { analyzeMoodAndRecommend, generateScentVisual } from '../services/geminiService';
import { useShop } from '../context/ShopContext';
import { PRODUCTS } from '../constants';

export const ScentVisionary = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [image, setImage] = useState<string | null>(null);
  const [prompt, setPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<{ recommendation: string, productName: string, generatedImg: string } | null>(null);
  const { addToCart } = useShop();

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const processVision = async () => {
    if (!image) return;
    setIsLoading(true);
    try {
      const { recommendation, productName } = await analyzeMoodAndRecommend(image, prompt);
      const generatedImg = await generateScentVisual(productName, recommendation);
      setResult({ recommendation, productName, generatedImg });
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const reset = () => {
    setImage(null);
    setPrompt('');
    setResult(null);
  };

  if (!isOpen) {
    return (
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 left-6 z-40 bg-white text-mysore-900 px-6 py-4 rounded-full shadow-2xl font-serif tracking-widest flex items-center gap-3 hover:scale-105 transition-transform"
      >
        <Sparkles size={18} className="text-gold-600" />
        Scent Visionary
      </button>
    );
  }

  return (
    <div className="fixed inset-0 z-[100] bg-mysore-900/98 backdrop-blur-xl flex flex-col items-center justify-center p-6 animate-fade-in overflow-y-auto">
      <button onClick={() => { setIsOpen(false); reset(); }} className="absolute top-8 right-8 text-stone-500 hover:text-white transition-colors">
        <X size={32} />
      </button>

      <div className="max-w-4xl w-full text-center space-y-12">
        {!result ? (
          <div className="space-y-8">
            <h2 className="text-4xl md:text-6xl font-serif text-gold-200">The Olfactory Mirror</h2>
            <p className="text-stone-400 text-lg max-w-xl mx-auto">Upload a photo of a memory, a place, or a feeling. Our AI will analyze the palette and mood to find your soul-scent.</p>
            
            <div className="flex flex-col md:flex-row gap-8 items-center justify-center">
              <div className="relative group cursor-pointer w-full md:w-80 h-96 border-2 border-dashed border-gold-500/20 rounded-2xl flex items-center justify-center bg-white/5 hover:bg-white/10 transition-all overflow-hidden">
                {image ? (
                  <img src={image} className="w-full h-full object-cover" alt="Upload" />
                ) : (
                  <div className="text-center p-6">
                    <Upload className="mx-auto text-gold-500 mb-4" size={40} />
                    <p className="text-sm text-stone-500 uppercase tracking-widest">Select Image</p>
                  </div>
                )}
                <input type="file" onChange={handleFileUpload} className="absolute inset-0 opacity-0 cursor-pointer" />
              </div>

              <div className="flex-1 w-full space-y-6 text-left">
                <div>
                  <label className="text-xs uppercase tracking-[0.3em] text-gold-500 mb-2 block">Tell us the vibe</label>
                  <textarea 
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="Describe the feeling... 'Rain in a temple', 'A velvet evening in Paris'..."
                    className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-stone-200 focus:outline-none focus:border-gold-500/50 min-h-[120px]"
                  />
                </div>
                <button 
                  onClick={processVision}
                  disabled={!image || isLoading}
                  className="w-full py-5 bg-gold-600 hover:bg-gold-500 text-white font-serif tracking-widest uppercase text-xl flex items-center justify-center gap-3 disabled:opacity-30 transition-all shadow-[0_0_30px_rgba(212,165,35,0.2)]"
                >
                  {isLoading ? <Loader2 className="animate-spin" /> : <Sparkles />}
                  {isLoading ? "Consulting Nura..." : "Awaken the Scent"}
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center text-left animate-slide-up">
            <div className="space-y-6">
              <span className="text-gold-500 uppercase tracking-widest text-sm">Your Vision Refined</span>
              <h2 className="text-5xl font-serif text-white">{result.productName}</h2>
              <p className="text-xl text-stone-300 italic font-light leading-relaxed">"{result.recommendation}"</p>
              
              <div className="pt-8 flex gap-4">
                <button 
                  onClick={() => {
                    const prod = PRODUCTS.find(p => p.name === result.productName);
                    if (prod) addToCart(prod);
                  }}
                  className="bg-gold-600 px-8 py-4 text-white uppercase tracking-widest text-sm font-bold flex items-center gap-2 hover:bg-gold-500 transition-colors"
                >
                  Add to Collection <ChevronRight size={16} />
                </button>
                <button onClick={reset} className="border border-white/10 px-8 py-4 text-stone-400 uppercase tracking-widest text-sm hover:text-white transition-colors">
                  Try Again
                </button>
              </div>
            </div>
            
            <div className="relative">
               <div className="absolute -inset-4 bg-gold-500/10 blur-3xl rounded-full"></div>
               <div className="relative aspect-square rounded-2xl overflow-hidden border border-gold-500/30 shadow-2xl">
                 <img src={result.generatedImg} className="w-full h-full object-cover" alt="AI Generated Vision" />
               </div>
               <p className="text-[10px] text-stone-600 mt-4 tracking-widest uppercase text-center">AI Visionary Interpretation</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
