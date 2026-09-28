import React from 'react';
import { motion } from 'framer-motion';
import { CERTIFICATES_PARTS } from '../data/portfolioData';
import { SectionHeading } from './ui/SectionHeading';

export default function Certifications() {
  return (
    <section className="py-8 md:py-12">
      <div className="max-w-7xl mx-auto px-6 w-full">
        <SectionHeading title="Certifications and training" />

        <div className="divide-y divide-black/10">
          {CERTIFICATES_PARTS.map(part => (
            <motion.div
              key={part.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="grid md:grid-cols-12 gap-4 md:gap-8 py-8 md:py-10 first:pt-0"
            >
              <h3 className="md:col-span-3 text-base font-semibold text-[#1d1d1f] leading-snug">{part.title}</h3>
              <ul className="md:col-span-9 grid sm:grid-cols-2 gap-x-10 gap-y-4">
                {part.items.map(cert => (
                  <li key={cert} className="flex gap-3 text-base text-[#424245] leading-snug">
                    <span className="mt-[0.55rem] w-1.5 h-1.5 rounded-full bg-[#0071e3] shrink-0" />
                    {cert}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
