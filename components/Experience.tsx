import React from 'react';
import { motion } from 'framer-motion';
import { EXPERIENCE } from '../data/portfolioData';
import { SectionHeading } from './ui/SectionHeading';

export default function Experience() {
  return (
    <section id="experience" className="py-8 md:py-12">
      <div className="max-w-7xl mx-auto px-6 w-full">
        <SectionHeading title="Experience" />

        <ol className="divide-y divide-black/10">
          {EXPERIENCE.map(exp => (
            <motion.li
              key={`${exp.org}-${exp.period}`}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="grid md:grid-cols-12 gap-3 md:gap-8 py-8 md:py-10 first:pt-0"
            >
              <div className="md:col-span-3 flex md:flex-col gap-x-3 gap-y-1 text-sm">
                <span className="font-medium text-[#1d1d1f] tabular-nums">{exp.period}</span>
                {exp.location && <span className="text-[#6e6e73]">{exp.location}</span>}
              </div>
              <div className="md:col-span-9">
                <h3 className="text-xl md:text-2xl font-semibold tracking-tight text-[#1d1d1f]">{exp.role}</h3>
                <p className="mt-1 text-base font-medium text-[#6e6e73]">{exp.org}</p>
                <p className="mt-4 text-base text-[#424245] leading-relaxed max-w-[70ch]">{exp.description}</p>
              </div>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
