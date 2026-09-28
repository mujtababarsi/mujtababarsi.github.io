import React from 'react';
import { motion } from 'framer-motion';
import { Terminal } from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';
import { summaryFull, GENOMIC_DATA } from '../data/portfolioData';
import { SectionHeading } from './ui/SectionHeading';

const reveal = (delay = 0) => ({
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.3 },
  transition: { duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] as const },
});

export default function About() {
  return (
    <section id="me" className="py-8 md:py-10">
      <div className="max-w-6xl mx-auto px-6 w-full">
        <SectionHeading title="At the intersection of pharmacy and bioinformatics" subtitle="Bridging clinical expertise with computational precision." />

        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          <motion.p
            {...reveal()}
            className="lg:col-span-6 text-base lg:text-[17px] text-body leading-relaxed max-w-[62ch] [&_span]:font-medium [&_span]:text-ink"
          >
            {summaryFull}
          </motion.p>

          <motion.div {...reveal(0.1)} className="lg:col-span-6 bg-white p-6 rounded-3xl ring-1 ring-black/5 shadow-[0_20px_40px_-24px_rgba(29,29,31,0.25)]">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-2">
                <div className="bg-accent p-1.5 rounded-md text-white"><Terminal size={16} /></div>
                <span className="font-semibold text-[15px] text-ink">Sequencing Depth</span>
              </div>
              <span className="text-[12px] font-medium text-muted uppercase tracking-wide">Illustrative</span>
            </div>
            <div className="text-accent" style={{ height: 208, width: '100%' }}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={GENOMIC_DATA}>
                  <defs>
                    <linearGradient id="cMe" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="currentColor" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="currentColor" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgb(var(--c-line) / 0.6)" />
                  <XAxis dataKey="pos" hide />
                  <YAxis hide />
                  <Tooltip
                    contentStyle={{ borderRadius: '16px', border: 'none', backgroundColor: 'rgba(255,255,255,0.9)', boxShadow: '0 10px 30px rgba(0,0,0,0.1)', color: 'rgb(var(--c-ink))', fontSize: '13px', padding: '10px 15px', backdropFilter: 'blur(10px)' }}
                    cursor={{ stroke: 'rgb(var(--c-subtle))', strokeWidth: 1, strokeDasharray: '4 4' }}
                  />
                  <Area type="monotone" dataKey="depth" stroke="currentColor" strokeWidth={3} fillOpacity={1} fill="url(#cMe)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
