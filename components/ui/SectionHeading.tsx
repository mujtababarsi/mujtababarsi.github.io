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
      className="mb-8 md:mb-10"
    >
      <h2 className="text-2xl md:text-3xl font-semibold text-[#1d1d1f] tracking-tight leading-tight [text-wrap:balance]">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-2 text-[#6e6e73] max-w-[60ch] text-sm md:text-base leading-relaxed">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}