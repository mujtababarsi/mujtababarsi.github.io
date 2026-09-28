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
      className="border-t border-black/10 pt-8 md:pt-10 mb-8 md:mb-10"
    >
      <h2 className="text-2xl md:text-[1.875rem] font-semibold text-ink tracking-tight leading-tight [text-wrap:balance]">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-2 text-muted max-w-[60ch] text-[15px] leading-relaxed">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
