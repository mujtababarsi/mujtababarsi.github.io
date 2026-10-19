import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, ChevronRight, Github, Mail, ArrowUpRight, FileDown } from 'lucide-react';
import { PROFILE_IMAGE_URL, PROJECTS } from '../data/portfolioData';
import { ProjectCover } from './ui/ProjectCover';

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] as const },
});

const statement: { text: string; emphasis?: boolean }[] = [
  { text: 'From ' },
  { text: 'dispensing medications', emphasis: true },
  { text: ' to ' },
  { text: 'analysing genomes', emphasis: true },
  { text: '. I build ' },
  { text: 'reproducible NGS pipelines', emphasis: true },
  { text: ' in Nextflow DSL2 and analyse single-cell and spatial transcriptomics data.' },
];

// Counts come from PROJECTS so the row stays true as projects are added.
const facts = [
  { value: String(PROJECTS.filter(p => p.kind === 'pipeline').length), label: 'Nextflow pipelines' },
  { value: String(PROJECTS.filter(p => p.kind === 'analysis').length), label: 'analysis projects' },
  { value: '6+', label: 'years in pharma' },
];

const featured = PROJECTS[0];

function Portrait({ className }: { className: string }) {
  const [imgError, setImgError] = useState(false);

  return (
    <div className={`${className} overflow-hidden bg-surface ring-1 ring-black/5`}>
      {PROFILE_IMAGE_URL && !imgError ? (
        <img
          src={PROFILE_IMAGE_URL}
          alt="Mohamed Elmugtaba"
          onError={() => setImgError(true)}
          className="w-full h-full object-cover"
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center text-subtle"><User size={32} /></div>
      )}
    </div>
  );
}

function FeaturedProject({ scrollTo }: { scrollTo: (id: string) => void }) {
  return (
    <article className="bg-surface rounded-2xl ring-1 ring-black/5 overflow-hidden shadow-[0_24px_48px_-28px_rgba(29,29,31,0.35)]">
      <ProjectCover kind={featured.cover} className="block w-full aspect-[16/9] short:aspect-[16/8]" />
      <div className="p-5">
        <p className="text-[12px] font-medium text-muted uppercase tracking-wide">Featured pipeline</p>
        <h2 className="mt-1.5 text-base font-semibold tracking-tight text-ink leading-snug">{featured.title}</h2>
        <ul className="mt-3 flex flex-wrap gap-1.5">
          {featured.stats.map(item => (
            <li key={item} className="px-2 py-0.5 rounded-md bg-canvas text-[12px] font-medium text-body tabular-nums">{item}</li>
          ))}
        </ul>
        <div className="mt-4 flex items-center gap-4 text-sm font-medium">
          <a
            href={featured.link}
            target="_blank"
            rel="noreferrer"
            aria-label={`Source code for ${featured.title} on GitHub`}
            className="inline-flex items-center gap-1.5 py-1 text-accent hover:text-accent-hover transition-colors"
          >
            <Github size={15} /> View code
          </a>
          <button onClick={() => scrollTo('projects')} className="inline-flex items-center gap-1 py-1 text-muted hover:text-ink transition-colors">
            All projects <ArrowUpRight size={15} />
          </button>
        </div>
      </div>
    </article>
  );
}

interface HeroProps {
  scrollTo: (id: string) => void;
}

export default function Hero({ scrollTo }: HeroProps) {
  return (
    <section id="home" className="lg:min-h-[90dvh] flex items-center pt-28 pb-8 lg:pt-28 lg:pb-12 short:min-h-0 short:pt-[5.5rem] short:pb-8">
      <div className="max-w-6xl mx-auto px-6 w-full">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          <div className="lg:col-span-7 flex flex-col items-start">
            <motion.div {...fadeUp(0)} className="flex items-center gap-4 mb-8 lg:mb-6 short:mb-4">
              <Portrait className="w-16 h-16 short:w-12 short:h-12 rounded-2xl short:rounded-xl shrink-0" />
              <div>
                <p className="inline-flex items-center gap-2 text-sm font-medium text-body">
                  <span className="w-2 h-2 rounded-full bg-success" />
                  Available for collaboration
                </p>
                <p className="mt-0.5 text-sm text-muted">Riyadh, KSA</p>
              </div>
            </motion.div>

            <motion.h1 {...fadeUp(0.05)} className="text-[3.25rem] sm:text-6xl lg:text-[4rem] short:text-[3.25rem] font-semibold tracking-tighter leading-[0.95] text-ink">
              Mohamed
              <br />
              <span className="text-subtle">Elmugtaba</span>
            </motion.h1>

            <motion.p {...fadeUp(0.1)} className="mt-5 short:mt-3 text-lg md:text-xl short:text-lg font-medium tracking-tight text-ink">
              <span className="block sm:inline">Bioinformatics Practitioner</span><span className="hidden sm:inline text-subtle"> · </span><span className="block sm:inline">Pharmacist</span>
            </motion.p>

            <motion.p {...fadeUp(0.15)} className="mt-6 short:mt-4 text-base lg:text-[17px] short:text-base text-body leading-relaxed max-w-[54ch]">
              {statement.map((part, i) =>
                part.emphasis
                  ? <span key={i} className="font-medium text-ink">{part.text}</span>
                  : <React.Fragment key={i}>{part.text}</React.Fragment>
              )}
            </motion.p>

            <motion.dl {...fadeUp(0.2)} className="mt-7 short:mt-5 grid grid-cols-3 gap-x-6 sm:flex sm:gap-x-8">
              {facts.map(f => (
                <div key={f.label} className="flex flex-col-reverse">
                  <dt className="text-sm text-muted">{f.label}</dt>
                  <dd className="font-display text-2xl font-semibold tracking-tight text-ink tabular-nums">{f.value}</dd>
                </div>
              ))}
            </motion.dl>

            <motion.div {...fadeUp(0.25)} className="mt-8 short:mt-6 flex flex-wrap items-center gap-3">
              <button
                onClick={() => scrollTo('projects')}
                className="bg-accent text-white pl-5 pr-4 py-3 rounded-full font-medium text-[15px] hover:bg-accent-hover transition-colors flex items-center gap-2 active:scale-[0.98]"
              >
                View projects <ChevronRight size={16} />
              </button>
              <a
                href="/Mohamed_Elmugtaba_Bioinformatics_CV.pdf"
                download
                className="bg-surface text-ink pl-4 pr-5 py-3 rounded-full font-medium text-[15px] ring-1 ring-black/10 hover:text-accent transition-colors flex items-center gap-2 active:scale-[0.98]"
              >
                <FileDown size={16} /> Download CV
              </a>
              <a href="https://github.com/mujtababarsi" target="_blank" rel="noreferrer" aria-label="GitHub" className="w-11 h-11 flex items-center justify-center bg-surface rounded-full text-ink hover:text-accent transition-colors ring-1 ring-black/10 active:scale-[0.98]"><Github size={18} /></a>
              <a href="mailto:Mujtababarci@gmail.com" aria-label="Email" className="w-11 h-11 flex items-center justify-center bg-surface rounded-full text-ink hover:text-accent transition-colors ring-1 ring-black/10 active:scale-[0.98]"><Mail size={18} /></a>
            </motion.div>
          </div>

          <motion.div {...fadeUp(0.1)} className="hidden lg:block lg:col-span-5">
            <FeaturedProject scrollTo={scrollTo} />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
