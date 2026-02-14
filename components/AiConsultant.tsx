
import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, X, Send, User, MessageCircle, Image as ImageIcon } from 'lucide-react';
import { getPerfumeRecommendation } from '../services/geminiService';

interface Message {
  role: 'user' | 'bot';
  text: string;
  image?: string;
}

const ORA_AVATAR = "https://images.unsplash.com/photo-1610031520113-177265261763?q=80&w=256&auto=format&fit=crop";

export const AiConsultant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'bot', text: 'Namaste. I am Ora. Tell me your vibe, or share a photo to find your soul-scent.' }
  ]);
  const [input, setInput] = useState('');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setSelectedImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleSend = async () => {
    if ((!input.trim() && !selectedImage) || isLoading) return;

    const userMessage = input.trim() || "Analyzing my vibe...";
    const currentImage = selectedImage;

    setMessages(prev => [...prev, { role: 'user', text: userMessage, image: currentImage || undefined }]);
    setInput('');
    setSelectedImage(null);
    setIsLoading(true);

    const response = await getPerfumeRecommendation(userMessage, currentImage || undefined);
    setMessages(prev => [...prev, { role: 'bot', text: response }]);
    setIsLoading(false);
  };

  return (
    <>
      <button onClick={() => setIsOpen(true)} className={`fixed bottom-6 right-6 z-40 group transform hover:scale-110 ${isOpen ? 'hidden' : 'block'}`}>
        <div className="relative bg-mysore-900 rounded-full p-1 border-2 border-gold-500 shadow-2xl overflow-hidden">
          <img src={ORA_AVATAR} className="w-14 h-14 rounded-full object-cover" alt="Ora" />
          <div className="absolute -bottom-1 -right-1 bg-gold-600 rounded-full p-1.5 border-2 border-mysore-900 shadow-lg">
             <Sparkles size={12} className="text-white" />
          </div>
        </div>
      </button>

      {isOpen && (
        <div className="fixed bottom-6 right-6 w-[350px] sm:w-[400px] h-[550px] sm:h-[650px] z-50 bg-mysore-800 border border-gold-500/30 rounded-[2rem] shadow-2xl flex flex-col overflow-hidden animate-slide-up">
          <div className="bg-gradient-to-r from-gold-900 via-mysore-900 to-gold-900 p-5 flex justify-between items-center border-b border-white/5">
            <div className="flex items-center gap-3">
              <img src={ORA_AVATAR} className="w-10 h-10 rounded-full object-cover border border-gold-500/30" alt="Ora" />
              <div>
                <h3 className="font-serif text-gold-100 text-base leading-none">Ora</h3>
                <span className="text-[8px] text-gold-500 uppercase tracking-widest font-bold">Visionary</span>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-stone-400 hover:text-white p-2">
              <X size={20} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-5 space-y-6 bg-mysore-900/40 scrollbar-hide">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                <div className={`w-8 h-8 rounded-full flex-shrink-0 overflow-hidden border ${msg.role === 'user' ? 'bg-stone-800 border-white/10' : 'bg-gold-900 border-gold-500/20'}`}>
                  {msg.role === 'user' ? <div className="w-full h-full flex items-center justify-center text-[10px] text-stone-500">U</div> : <img src={ORA_AVATAR} className="w-full h-full object-cover" alt="Ora" />}
                </div>
                <div className={`max-w-[85%] space-y-2`}>
                  {msg.image && <img src={msg.image} className="rounded-xl border border-white/10 w-full" alt="Vibe" />}
                  <div className={`p-4 rounded-2xl text-xs sm:text-sm whitespace-pre-line ${msg.role === 'user' ? 'bg-gold-600/10 text-stone-200 rounded-tr-none border border-white/5' : 'bg-gold-900/30 text-gold-100 border border-gold-500/10 rounded-tl-none shadow-lg'}`}>
                    {msg.text}
                  </div>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full border border-gold-500/20 overflow-hidden animate-pulse">
                  <img src={ORA_AVATAR} className="w-full h-full object-cover" alt="Ora" />
                </div>
                <div className="p-4 bg-gold-900/20 rounded-2xl rounded-tl-none text-[10px] text-gold-400 animate-pulse italic">
                  Ora is seeing your frequency...
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-5 bg-mysore-800 border-t border-white/5">
            {selectedImage && (
              <div className="mb-3 relative inline-block">
                <img src={selectedImage} className="w-16 h-16 rounded-lg object-cover border border-gold-500/50" />
                <button onClick={() => setSelectedImage(null)} className="absolute -top-2 -right-2 bg-black text-white rounded-full p-1"><X size={10} /></button>
              </div>
            )}
            <div className="flex gap-2 relative">
              <input type="file" ref={fileInputRef} onChange={handleImageSelect} accept="image/*" className="hidden" />
              <button onClick={() => fileInputRef.current?.click()} className="bg-black/40 border border-white/5 rounded-xl px-3 text-stone-500 hover:text-gold-500"><ImageIcon size={18} /></button>
              <input type="text" value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleSend()} placeholder="Your vibe..." className="flex-1 bg-black/40 border border-white/5 rounded-xl px-4 py-4 text-xs text-stone-200 outline-none focus:border-gold-500/50" />
              <button onClick={handleSend} disabled={isLoading} className="bg-gold-600 hover:bg-gold-500 text-white p-3 rounded-xl disabled:opacity-50"><Send size={18} /></button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
