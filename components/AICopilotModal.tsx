import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { BrainCircuit, X, Loader2, Send } from 'lucide-react';
import { callGemini } from '../services/gemini';
import { EXPERIENCE, SKILLS } from '../data/portfolioData';

interface AICopilotModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AICopilotModal({ isOpen, onClose }: AICopilotModalProps) {
  const [messages, setMessages] = useState<{ role: string; text: string }[]>([{ role: 'ai', text: "Hello. I'm Mohamed's Digital Assistant. How can I help you understand his work?" }]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => { if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight; }, [messages]);

  async function handleSend() {
    if (!input.trim() || loading) return;
    const userMsg = input;
    setInput("");
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setLoading(true);

    const context = `
      Name: Mohamed Elmugtaba
      Role: Bioinformatics Professional & Pharmacist
      Summary: ${EXPERIENCE.map(e => `${e.role} at ${e.org}`).join(", ")}
      Skills: ${SKILLS.map(s => s.items.join(", ")).join(", ")}
    `;

    const res = await callGemini(userMsg, `You are the Digital Twin of Mohamed Elmugtaba. Answer questions based on this profile: ${context}. Keep answers professional and concise.`);
    
    setMessages(prev => [...prev, { role: 'ai', text: res }]);
    setLoading(false);
  }

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
      <motion.div 
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black/20 backdrop-blur-md" 
        onClick={onClose} 
      />
        
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 10 }} 
        animate={{ opacity: 1, scale: 1, y: 0 }} 
        transition={{ type: "spring", stiffness: 350, damping: 25 }}
        className="bg-white/80 backdrop-blur-xl saturate-150 w-full max-w-lg rounded-[2rem] shadow-[0_40px_80px_-20px_rgba(0,0,0,0.2)] overflow-hidden relative flex flex-col h-[600px] border border-white/40 ring-1 ring-black/5"
      >
        <div className="bg-white/50 border-b border-black/5 p-5 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#0071e3] to-[#40a0ff] flex items-center justify-center text-white shadow-lg shadow-blue-500/30">
              <BrainCircuit size={16} />
            </div>
            <h3 className="font-semibold text-[15px] text-[#1d1d1f]">Research Assistant</h3>
          </div>
          <button onClick={onClose} className="p-2 bg-[#F5F5F7] rounded-full text-[#86868b] hover:bg-[#e8e8ed] transition-colors"><X size={18} /></button>
        </div>
        
        <div ref={scrollRef} className="flex-grow overflow-y-auto p-6 space-y-6">
          {messages.map((m, i) => (
            <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[85%] p-4 rounded-2xl text-[16px] leading-relaxed shadow-sm ${m.role === 'user' ? 'bg-[#0071e3] text-white' : 'bg-white text-[#1d1d1f] rounded-tl-sm border border-black/5'}`}>
                {m.text}
              </div>
            </div>
          ))}
          {loading && (<div className="flex items-center gap-2 text-[#86868b] text-[13px] px-2"><Loader2 size={14} className="animate-spin" /> Thinking...</div>)}
        </div>
        
        <div className="p-5 border-t border-black/5 bg-white/50">
          <div className="relative">
            <input 
              value={input} 
              onChange={(e) => setInput(e.target.value)} 
              onKeyPress={(e) => e.key === 'Enter' && handleSend()} 
              placeholder="Ask about my research..." 
              className="w-full pl-5 pr-12 py-3.5 rounded-full border-none bg-white ring-1 ring-black/10 focus:ring-2 focus:ring-[#0071e3] focus:outline-none text-[16px] text-[#1d1d1f] shadow-sm placeholder:text-[#86868b]" 
            />
            <button 
              onClick={handleSend} 
              disabled={!input.trim()}
              className="absolute right-2 top-2 p-1.5 bg-[#0071e3] text-white rounded-full hover:bg-[#005bb5] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send size={16} className="ml-0.5" />
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}