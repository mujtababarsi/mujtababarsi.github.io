import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Briefcase, Calendar, MapPin } from 'lucide-react';
import { EXPERIENCE } from '../data/portfolioData';
import { ParallaxBackground } from './ui/ParallaxBackground';
import { SectionHeading } from './ui/SectionHeading';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { 
      staggerChildren: 0.1,
      delayChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 15, x: -10 },
  visible: { 
    opacity: 1, 
    y: 0, 
    x: 0,
    transition: { type: "spring" as const, stiffness: 100, damping: 20 }
  }
};

export default function Experience() {
    const [selectedExpIndex, setSelectedExpIndex] = useState(0);

    return (
        <section id="experience" className="min-h-screen pt-20 pb-16 bg-white flex items-start justify-center relative">
        <ParallaxBackground />

        <div className="max-w-6xl mx-auto px-6 w-full relative z-10">
          <SectionHeading title="Professional Experience" />

          {/* MOBILE VIEW: Vertical Stack of Detail Cards */}
          <div className="md:hidden flex flex-col gap-6">
            {EXPERIENCE.map((exp, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                className="bg-white border border-black/5 rounded-[2rem] p-6 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.05)] relative overflow-hidden"
              >
                 {/* Decorative Icon */}
                 <div className="absolute -top-2 -right-2 text-gray-50 opacity-50 transform rotate-12 pointer-events-none">
                    <Briefcase size={80} strokeWidth={0.5} />
                 </div>
                 
                 <div className="relative z-10">
                    <div className="flex flex-col gap-1 mb-4">
                        <div className="flex items-center justify-between mb-2">
                             <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F5F5F7] text-[#0071e3] text-[10px] font-bold uppercase tracking-wider border border-black/5">
                                <Calendar size={10} /> {exp.period}
                             </span>
                        </div>
                        <h3 className="text-xl font-bold text-[#1d1d1f] leading-tight">{exp.role}</h3>
                        <p className="text-[#0071e3] font-medium text-[15px]">{exp.org}</p>
                    </div>
                    
                    <div className="w-full h-px bg-gradient-to-r from-black/5 to-transparent my-4" />
                    
                    <p className="text-[14px] text-[#424245] leading-relaxed font-medium">
                        {exp.description}
                    </p>
                    
                     <div className="mt-5 pt-4 border-t border-dashed border-black/5 flex items-center gap-2 text-[#86868b] text-xs font-medium">
                        <MapPin size={12} />
                        <span>Khartoum, Sudan</span>
                     </div>
                 </div>
              </motion.div>
            ))}
          </div>

          {/* DESKTOP VIEW: Split View (Interactive Tabs) */}
          <motion.div 
             initial="hidden" whileInView="visible" viewport={{ once: false, amount: 0.2 }} variants={containerVariants}
             className="hidden md:grid grid-cols-[1fr_2fr] gap-8 h-[26rem]"
          >
            {/* LEFT: TIMELINE LIST */}
            <motion.div variants={itemVariants} className="flex flex-col gap-3 overflow-y-auto pr-2 custom-scrollbar">
              {EXPERIENCE.map((exp, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedExpIndex(idx)}
                  className={`text-left p-4 rounded-[1.5rem] transition-all duration-300 border group ${
                    selectedExpIndex === idx 
                      ? 'bg-[#F5F5F7] border-[#0071e3]/20 shadow-inner' 
                      : 'bg-white border-transparent hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center gap-3 mb-1.5">
                    <div className={`w-2 h-2 rounded-full transition-colors ${selectedExpIndex === idx ? 'bg-[#0071e3] ring-4 ring-[#0071e3]/20' : 'bg-[#d2d2d7] group-hover:bg-[#86868b]'}`} />
                    <span className={`text-[10px] font-bold uppercase tracking-wider ${selectedExpIndex === idx ? 'text-[#0071e3]' : 'text-[#86868b]'}`}>
                      {exp.period}
                    </span>
                  </div>
                  <h4 className={`text-[15px] font-bold ${selectedExpIndex === idx ? 'text-[#1d1d1f]' : 'text-[#424245]'}`}>
                    {exp.role}
                  </h4>
                  <p className="text-[11px] text-[#86868b] truncate font-medium">{exp.org}</p>
                </button>
              ))}
            </motion.div>

            {/* RIGHT: DETAIL CARD */}
            <div className="relative h-full">
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedExpIndex}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="h-full bg-gradient-to-br from-[#F9F9FB] to-white border border-black/5 rounded-[2.5rem] p-8 shadow-[0_20px_40px_-12px_rgba(0,0,0,0.08)] flex flex-col justify-center relative overflow-hidden"
                >
                  {/* Decorative Background Icon */}
                  <div className="absolute -bottom-10 -right-10 text-gray-50 opacity-50 transform rotate-12 pointer-events-none">
                      <Briefcase size={200} strokeWidth={0.5} />
                  </div>

                  <div className="flex items-center gap-4 mb-6 relative z-10">
                    <div className="p-3.5 bg-white rounded-2xl text-[#0071e3] shadow-sm border border-black/5">
                      <Briefcase size={24} strokeWidth={1.5} />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-[#1d1d1f] tracking-tight">{EXPERIENCE[selectedExpIndex].role}</h3>
                      <p className="text-[#0071e3] font-semibold text-base">{EXPERIENCE[selectedExpIndex].org}</p>
                    </div>
                  </div>
                  
                  <div className="w-full h-[1px] bg-gradient-to-r from-black/5 to-transparent mb-6 relative z-10" />
                  
                  <p className="text-[15px] text-[#424245] leading-relaxed font-medium relative z-10">
                    {EXPERIENCE[selectedExpIndex].description}
                  </p>

                  <div className="mt-8 flex gap-3 relative z-10">
                      <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white text-[#1d1d1f] text-xs font-semibold border border-black/5 shadow-sm">
                         <Calendar size={14} className="text-[#86868b]" /> {EXPERIENCE[selectedExpIndex].period}
                      </span>
                      <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white text-[#1d1d1f] text-xs font-semibold border border-black/5 shadow-sm">
                         <MapPin size={14} className="text-[#86868b]" /> Khartoum, Sudan
                      </span>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </section>
    );
}