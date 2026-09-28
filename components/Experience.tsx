import React from 'react';
import { motion } from 'framer-motion';
import { EXPERIENCE } from '../data/portfolioData';
import { SectionHeading } from './ui/SectionHeading';

export default function Experience() {
  return (
    <section id="experience" className="py-8 md:py-10">
      <div className="max-w-6xl mx-auto px-6 w-full">
        <SectionHeading title="Experience" />

        <ol className="divide-y divide-black/10">
          {EXPERIENCE.map(exp => (
            <motion.li
              key={`${exp.org}-${exp.period}`}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="grid md:grid-cols-12 gap-3 md:gap-8 py-6 md:py-8 first:pt-0"
            >
              <div className="md:col-span-3 flex md:flex-col gap-x-3 gap-y-1 text-sm">
                <span className="font-medium text-ink tabular-nums">{exp.period}</span>
                {exp.location && <span className="text-muted">{exp.location}</span>}
              </div>
              <div className="md:col-span-9">
                <h3 className="text-lg md:text-xl font-semibold tracking-tight text-ink">{exp.role}</h3>
                <p className="mt-1 text-base font-medium text-muted">{exp.org}</p>
                {exp.summary && <p className="mt-4 text-[15px] text-body leading-relaxed max-w-[70ch]">{exp.summary}</p>}
                <ul className="mt-4 space-y-2.5 max-w-[70ch]">
                  {exp.highlights.map(item => (
                    <li key={item} className="flex gap-3 text-[15px] text-body leading-relaxed">
                      <span className="mt-[0.65rem] w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
