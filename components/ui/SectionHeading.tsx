import React from 'react';
import { motion } from 'framer-motion';

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
}

export function SectionHeading({ title, subtitle }: SectionHeadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.6 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="border-t border-black/10 pt-10 md:pt-12 mb-8 md:mb-12"
    >
      <h2 className="text-3xl md:text-4xl font-semibold text-[#1d1d1f] tracking-tight leading-tight [text-wrap:balance]">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-3 text-[#6e6e73] max-w-[60ch] text-base leading-relaxed">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
