import React from 'react';
import { motion } from 'framer-motion';
import { Cpu, Award } from 'lucide-react';
import { CERTIFICATES_PARTS } from '../data/portfolioData';
import { ParallaxBackground } from './ui/ParallaxBackground';
import { SectionHeading } from './ui/SectionHeading';

const stableContainerVariants = {
  hidden: { opacity: 1 },
  visible: { 
    opacity: 1,
    transition: { 
      staggerChildren: 0.08,
      delayChildren: 0.05
    }
  }
};

const cardStaggerVariants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05
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

export default function Certifications() {
    return (
        <section className="min-h-screen pt-16 pb-32 bg-white relative flex items-start justify-center overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:20px_20px] opacity-40 pointer-events-none" />
        <ParallaxBackground />
          
        <div className="max-w-7xl mx-auto px-6 w-full relative z-10">
          <SectionHeading title="Certifications & Professional Development" />
          
          <motion.div 
            variants={stableContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.2 }}
            className="grid md:grid-cols-2 gap-5"
          >
            {CERTIFICATES_PARTS.map((part, idx) => (
              <motion.div 
                key={idx} 
                variants={cardStaggerVariants}
                className="bg-white/80 backdrop-blur-sm rounded-[2.5rem] p-6 border border-black/5 shadow-sm hover:shadow-lg transition-all duration-500 group flex flex-col h-full"
              >
                <div className="mb-4 pb-3 border-b border-gray-100 flex items-center gap-4">
                  <div className="p-3 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl text-[#0071e3] shadow-inner">
                    {idx === 0 ? <Cpu size={24} strokeWidth={1.5} /> : <Award size={24} strokeWidth={1.5} />}
                  </div>
                  <h3 className="text-xl font-bold text-[#1d1d1f] tracking-tight group-hover:text-[#0071e3] transition-colors">
                    {part.title}
                  </h3>
                </div>

                <div className="space-y-2 flex-grow">
                  {part.items.map((cert, i) => (
                    <motion.div 
                      key={i} 
                      variants={itemVariants}
                      className="group/item p-3 rounded-2xl border border-transparent hover:border-blue-100 bg-transparent hover:shadow-sm cursor-default flex items-start gap-3 hover:bg-gray-50"
                    >
                      <div className="mt-1.5 w-1.5 h-4 rounded-full bg-gray-200 group-hover/item:bg-[#0071e3] group-hover/item:scale-y-110 transition-all shrink-0" />
                      <p className="text-[14px] font-medium text-[#424245] group-hover/item:text-[#1d1d1f] leading-snug transition-colors">
                        {cert}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    );
}