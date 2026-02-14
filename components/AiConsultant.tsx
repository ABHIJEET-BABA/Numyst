
import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, X, Send, User, MessageCircle, Image as ImageIcon, Camera } from 'lucide-react';
import { getPerfumeRecommendation } from '../services/geminiService';

interface Message {
  role: 'user' | 'bot';
  text: string;
  image?: string;
}

// Exactly matching the visual provided: Indian woman with voluminous dark curly hair, professional look.
const ORA_AVATAR = "https://images.unsplash.com/photo-1610031520113-177265261763?q=80&w=256&auto=format&fit=crop";

export const AiConsultant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'bot', text: 'Namaste. I am Ora, your vibe-visionary. I don’t just suggest perfumes; I read the energy you carry. You can even send me a photo of your mood or surroundings for a deeper connection.' }
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

    const userMessage = input.trim() || (selectedImage ? "Analyze this vibe for me..." : "");
    const currentImage = selectedImage;

    setMessages(prev => [...prev, { 
      role: 'user', 
      text: userMessage,
      image: currentImage || undefined
    }]);

    setInput('');
    setSelectedImage(null);
    setIsLoading(true);

    const response = await getPerfumeRecommendation(userMessage, currentImage || undefined);

    setMessages(prev => [...prev, { role: 'bot', text: response }]);
    setIsLoading(false);
  };

  return (
    <>
      {/* Floating Button */}
      <button 
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 z-40 group transition-all transform hover:scale-110 ${isOpen ? 'hidden' : 'block'}`}
      >
        <div className="relative">
          <div className="absolute -inset-2 bg-gold-500 rounded-full blur opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
          <div className="relative bg-mysore-900 rounded-full p-1 border-2 border-gold-500 shadow-2xl overflow-hidden">
            <img src={ORA_AVATAR} className="w-14 h-14 rounded-full object-cover" alt="Ora" />
            <div className="absolute -bottom-1 -right-1 bg-gold-600 rounded-full p-1.5 border-2 border-mysore-900 shadow-lg">
               <Sparkles size={12} className="text-white" />
            </div>
          </div>
        </div>
      </button>

      {/* Chat Interface */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 w-[400px] h-[650px] z-50 bg-mysore-800 border border-gold-500/30 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex flex-col overflow-hidden animate-slide-up">
          {/* Header */}
          <div className="bg-gradient-to-r from-gold-900 via-mysore-900 to-gold-900 p-6 flex justify-between items-center border-b border-white/5">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="w-12 h-12 rounded-full border-2 border-gold-500/40 p-0.5">
                  <img src={ORA_AVATAR} className="w-full h-full rounded-full object-cover" alt="Ora" />
                </div>
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-mysore-800"></div>
              </div>
              <div>
                <h3 className="font-serif text-gold-100 text-lg leading-none">Ora</h3>
                <span className="text-[10px] text-gold-500 uppercase tracking-[0.3em] font-bold">Vibe Architect</span>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-stone-400 hover:text-white p-2 transition-colors">
              <X size={24} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-8 bg-mysore-900/40 scrollbar-hide">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                <div className={`w-10 h-10 rounded-full flex-shrink-0 overflow-hidden border-2 ${msg.role === 'user' ? 'bg-stone-800 border-white/10' : 'bg-gold-900/50 border-gold-500/20'}`}>
                  {msg.role === 'user' ? (
                    <div className="w-full h-full flex items-center justify-center text-stone-500 font-bold">U</div>
                  ) : (
                    <img src={ORA_AVATAR} className="w-full h-full object-cover" alt="Ora" />
                  )}
                </div>
                <div className={`max-w-[80%] space-y-3`}>
                  {msg.image && (
                    <div className="rounded-2xl overflow-hidden border border-white/10 shadow-lg max-w-full">
                      <img src={msg.image} className="w-full h-auto object-cover" alt="User upload" />
                    </div>
                  )}
                  <div className={`p-5 rounded-3xl text-sm leading-relaxed ${
                    msg.role === 'user' 
                    ? 'bg-gold-600/10 text-stone-200 rounded-tr-none border border-white/5' 
                    : 'bg-gold-900/30 text-gold-100 border border-gold-500/10 rounded-tl-none shadow-xl'
                  }`}>
                    {msg.text}
                  </div>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full border-2 border-gold-500/20 overflow-hidden">
                  <img src={ORA_AVATAR} className="w-full h-full object-cover" alt="Ora" />
                </div>
                <div className="p-5 bg-gold-900/20 rounded-3xl rounded-tl-none text-xs text-gold-400 animate-pulse border border-gold-500/5 italic flex items-center gap-2">
                  <MessageCircle size={14} className="animate-bounce" />
                  Ora is interpreting your visual energy...
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-6 bg-mysore-800 border-t border-white/5">
            {selectedImage && (
              <div className="mb-4 relative inline-block">
                <img src={selectedImage} className="w-20 h-20 rounded-xl object-cover border border-gold-500/50" />
                <button 
                  onClick={() => setSelectedImage(null)}
                  className="absolute -top-2 -right-2 bg-black text-white rounded-full p-1 border border-white/10"
                >
                  <X size={12} />
                </button>
              </div>
            )}
            
            <div className="flex gap-3 relative group">
              <input 
                type="file" 
                ref={fileInputRef}
                onChange={handleImageSelect}
                accept="image/*"
                className="hidden"
              />
              <button 
                onClick={() => fileInputRef.current?.click()}
                className="bg-black/40 border border-white/5 rounded-2xl px-4 text-stone-500 hover:text-gold-500 transition-colors"
                title="Upload Vibe"
              >
                <ImageIcon size={20} />
              </button>
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Talk to me, or send a vibe..."
                className="flex-1 bg-black/40 border border-white/5 rounded-2xl pl-4 pr-14 py-5 text-sm text-stone-200 focus:outline-none focus:border-gold-500/50 transition-all placeholder-stone-600 shadow-inner"
              />
              <button 
                onClick={handleSend}
                disabled={isLoading}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-gold-600 hover:bg-gold-500 text-white p-3 rounded-xl disabled:opacity-50 transition-all active:scale-95 shadow-lg group-focus-within:shadow-gold-500/20"
              >
                <Send size={20} />
              </button>
            </div>
            <p className="mt-4 text-center text-[9px] text-stone-600 uppercase tracking-[0.2em]">Multimodal Vibe Reading • Powered by Ora</p>
          </div>
        </div>
      )}
    </>
  );
};
