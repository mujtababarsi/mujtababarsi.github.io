import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Github } from 'lucide-react';
import { ADDITIONAL_INFO } from '../data/portfolioData';
import { SectionHeading } from './ui/SectionHeading';

const facts = [
  { label: 'Location', value: ADDITIONAL_INFO.location, note: 'Open to relocation' },
  { label: 'Languages', value: ADDITIONAL_INFO.languages, note: 'Native · fluent' },
  { label: 'Status', value: 'Transferable Iqama', note: 'Available immediately · Valid driver license' },
];

export default function PersonalDetails() {
  return (
    <section className="pt-8 md:pt-12 pb-10">
      <div className="max-w-7xl mx-auto px-6 w-full">
        <SectionHeading title="Personal details" />

        <motion.dl
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-10"
        >
          {facts.map(fact => (
            <div key={fact.label}>
              <dt className="text-sm font-medium text-[#6e6e73]">{fact.label}</dt>
              <dd className="mt-2 text-xl font-semibold tracking-tight text-[#1d1d1f]">{fact.value}</dd>
              <dd className="mt-1 text-sm text-[#6e6e73]">{fact.note}</dd>
            </div>
          ))}
          <div>
            <dt className="text-sm font-medium text-[#6e6e73]">Contact</dt>
            <dd className="mt-2 flex flex-col gap-2 text-base font-medium">
              <a href="mailto:Mujtababarci@gmail.com" className="inline-flex items-center gap-2 text-[#0071e3] hover:underline underline-offset-4">
                <Mail size={16} /> Mujtababarci@gmail.com
              </a>
              <a href="https://github.com/mujtababarsi" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-[#0071e3] hover:underline underline-offset-4">
                <Github size={16} /> github.com/mujtababarsi
              </a>
            </dd>
          </div>
        </motion.dl>

        <footer className="mt-20 pt-8 border-t border-black/10 flex flex-col sm:flex-row justify-between gap-2 text-[13px] text-[#6e6e73]">
          <p>© {new Date().getFullYear()} Mohamed Elmugtaba. All rights reserved.</p>
          <p>Designed and developed by M. Elmugtaba · Riyadh, KSA</p>
        </footer>
      </div>
    </section>
  );
}
