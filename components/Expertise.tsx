import React from 'react';
import { motion } from 'framer-motion';
import { AREAS_OF_EXPERTISE, SKILLS } from '../data/portfolioData';
import { SectionHeading } from './ui/SectionHeading';
import { AreaOfExpertise } from '../types';

const reveal = (delay = 0) => ({
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.3 },
  transition: { duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] as const },
});

function Chips({ items, lead = false }: { items: string[]; lead?: boolean }) {
  return (
    <ul className="flex flex-wrap gap-2">
      {items.map(item => (
        <li key={item} className={`px-2.5 py-1 rounded-md ${lead ? 'bg-canvas' : 'bg-white'} ring-1 ring-black/10 text-[13px] font-medium text-body`}>
          {item}
        </li>
      ))}
    </ul>
  );
}

function Icon({ data, size, className }: { data: AreaOfExpertise; size: number; className: string }) {
  return (
    <div className={`${className} rounded-xl text-accent flex items-center justify-center`}>
      {React.cloneElement(data.icon as React.ReactElement<{ size?: number; className?: string }>, { size, className: '' })}
    </div>
  );
}

function LeadArea({ data }: { data: AreaOfExpertise }) {
  return (
    <div className="bg-white rounded-3xl ring-1 ring-black/5 p-8 md:p-12 grid lg:grid-cols-12 gap-8 lg:gap-16 items-end">
      <div className="lg:col-span-7">
        <Icon data={data} size={22} className="w-11 h-11 bg-accent-soft mb-6" />
        <h3 className="text-xl md:text-2xl font-semibold tracking-tight text-ink">{data.title}</h3>
        <p className="mt-3 text-base lg:text-[17px] text-body leading-relaxed max-w-[52ch]">{data.description}</p>
      </div>
      <div className="lg:col-span-5">
        <Chips items={data.items} lead />
      </div>
    </div>
  );
}

function Area({ data }: { data: AreaOfExpertise }) {
  return (
    <div>
      <Icon data={data} size={18} className="w-9 h-9 bg-white ring-1 ring-black/5 mb-5" />
      <h3 className="text-lg font-semibold tracking-tight text-ink">{data.title}</h3>
      <p className="mt-3 text-base text-body leading-relaxed max-w-[52ch]">{data.description}</p>
      <div className="mt-5">
        <Chips items={data.items} />
      </div>
    </div>
  );
}

export default function ExpertiseAndSkillsSection() {
  const [lead, ...others] = AREAS_OF_EXPERTISE;

  return (
    <section id="expertise" className="py-8 md:py-10">
      <div className="max-w-6xl mx-auto px-6 w-full">
        <SectionHeading title="Expertise" subtitle="Research areas and the tools I work with." />

        <motion.div {...reveal()}>
          <LeadArea data={lead} />
        </motion.div>
        <motion.div {...reveal(0.1)} className="mt-12 md:mt-16 grid md:grid-cols-2 gap-12 md:gap-16 md:px-12">
          {others.map(area => (
            <div key={area.id}><Area data={area} /></div>
          ))}
        </motion.div>

        <motion.div {...reveal()} className="mt-16 border-t border-black/10 pt-10">
          <div className="mb-8">
            <h3 className="text-lg font-semibold tracking-tight text-ink">Tools</h3>
            <p className="mt-1 text-base text-muted">Languages, software and platforms.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {SKILLS.map(skill => (
              <div key={skill.id}>
                <div className="flex items-center gap-2.5 mb-4">
                  <div className="w-7 h-7 rounded-lg bg-white ring-1 ring-black/5 text-accent flex items-center justify-center">
                    {React.cloneElement(skill.icon as React.ReactElement<{ size?: number; className?: string }>, { size: 15, className: '' })}
                  </div>
                  <h4 className="font-semibold text-[15px] text-ink">{skill.category}</h4>
                </div>
                <Chips items={skill.items} />
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
