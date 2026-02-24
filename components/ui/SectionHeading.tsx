import React from 'react';
import { motion } from 'framer-motion';

// --- ANIMATION VARIANTS (Stable) ---
const sectionVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const } 
  }
};

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
}

export function SectionHeading({ title, subtitle }: SectionHeadingProps) {
  return (
    <motion.div 
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.5 }}
      variants={sectionVariants}
      className="mb-6 text-center px-4"
    >
      <h2 className="text-xl md:text-2xl font-bold text-[#1d1d1f] tracking-tight">
        {title}
      </h2>
      <div className="w-12 h-1 bg-[#0071e3]/20 mx-auto rounded-full my-3" />
      {subtitle && (
        <p className="text-[#86868b] max-w-lg mx-auto text-xs md:text-sm font-medium leading-relaxed">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}