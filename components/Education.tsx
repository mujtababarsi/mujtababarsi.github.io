import React from 'react';
import { motion } from 'framer-motion';
import { EDUCATION_DATA } from '../data/portfolioData';
import { SectionHeading } from './ui/SectionHeading';

export default function Education() {
  return (
    <section id="education" className="py-8 md:py-10">
      <div className="max-w-6xl mx-auto px-6 w-full">
        <SectionHeading title="Education" />

        <ol className="divide-y divide-black/10">
          {EDUCATION_DATA.map(edu => (
            <motion.li
              key={`${edu.school}-${edu.period}`}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="grid md:grid-cols-12 gap-3 md:gap-8 py-6 md:py-8 first:pt-0"
            >
              <div className="md:col-span-3 flex md:flex-col gap-x-3 gap-y-1 text-sm">
                <span className="font-medium text-ink tabular-nums">{edu.period}</span>
                <span className="text-muted">{edu.location}</span>
              </div>
              <div className="md:col-span-9">
                <h3 className="text-lg md:text-xl font-semibold tracking-tight text-ink">{edu.degree}</h3>
                <p className="mt-1 text-base font-medium text-muted">{edu.school}</p>
                <p className="mt-6 text-sm font-medium text-muted">Core curriculum</p>
                <p className="mt-2 text-[15px] text-body leading-relaxed max-w-[70ch]">{edu.details}</p>
              </div>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
