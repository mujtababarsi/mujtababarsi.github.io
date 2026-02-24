import React from 'react';
import { motion } from 'framer-motion';
import { EDUCATION_DATA } from '../data/portfolioData';
import { ParallaxBackground } from './ui/ParallaxBackground';
import { SectionHeading } from './ui/SectionHeading';

const sectionVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const } 
  }
};

export default function Education() {
    return (
        <section id="education" className="min-h-screen pt-28 pb-16 bg-gradient-to-tr from-blue-50/50 via-white to-blue-50/50 flex items-start justify-center">
        <ParallaxBackground />
        
        <div className="max-w-4xl mx-auto px-6 w-full relative z-10">
          <SectionHeading title="Education" />
          
          {EDUCATION_DATA.map((edu, idx) => (
            <motion.div 
               key={idx} 
               initial="hidden" whileInView="visible" viewport={{ once: false, amount: 0.2 }} variants={sectionVariants}
               className="bg-white/80 backdrop-blur-xl p-10 rounded-[3rem] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] border border-white/50 text-center md:text-left relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-blue-50/50 to-transparent rounded-bl-full pointer-events-none" />
              
              <div className="flex flex-col md:flex-row justify-between mb-8 items-center md:items-start gap-4 relative z-10">
                <div>
                  <h3 className="text-2xl font-bold text-[#1d1d1f] tracking-tight">{edu.degree}</h3>
                  <p className="text-[#0071e3] font-semibold mt-1.5 text-lg">{edu.school} | {edu.location}</p>
                </div>
                <span className="text-xs font-bold text-[#86868b] bg-[#F5F5F7] px-5 py-2 rounded-full border border-black/5 tracking-wide">{edu.period}</span>
              </div>
              
              <div className="pt-8 border-t border-black/5 relative z-10">
                <p className="text-[11px] font-bold text-[#86868b] uppercase tracking-widest mb-4 flex items-center gap-2">
                    <span className="w-1 h-4 bg-[#0071e3] rounded-full" />
                    Core Curriculum
                </p>
                <p className="text-[#1d1d1f] rendering-relaxed text-[15px] font-medium">{edu.details}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    );
}