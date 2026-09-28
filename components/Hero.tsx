import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, ChevronRight, Github, Mail } from 'lucide-react';
import { PROFILE_IMAGE_URL } from '../data/portfolioData';

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
  { text: ': a move I have been working toward since 2015. I now build ' },
  { text: 'reproducible NGS pipelines', emphasis: true },
  { text: ' for genomics and precision medicine.' },
]

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

interface HeroProps {
  scrollTo: (id: string) => void;
}

export default function Hero({ scrollTo }: HeroProps) {
  return (
    <section id="home" className="lg:min-h-[90dvh] flex items-center pt-28 pb-8 lg:pt-28 lg:pb-12">
      <div className="max-w-6xl mx-auto px-6 w-full">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          <div className="lg:col-span-7 flex flex-col items-start">
            <motion.div {...fadeUp(0)} className="flex items-center gap-4 mb-8 lg:mb-6">
              <Portrait className="lg:hidden w-16 h-16 rounded-2xl shrink-0" />
              <div>
                <p className="inline-flex items-center gap-2 text-sm font-medium text-body">
                  <span className="w-2 h-2 rounded-full bg-[#34C759]" />
                  Available for collaboration
                </p>
                <p className="lg:hidden mt-0.5 text-sm text-muted">Riyadh, KSA</p>
              </div>
            </motion.div>

            <motion.h1 {...fadeUp(0.05)} className="text-[3.25rem] sm:text-6xl lg:text-[4rem] font-semibold tracking-tighter leading-[0.95] text-ink">
              Mohamed
              <br />
              <span className="text-subtle">Elmugtaba</span>
            </motion.h1>

            <motion.p {...fadeUp(0.1)} className="mt-5 text-lg md:text-xl font-medium tracking-tight text-ink">
              <span className="block sm:inline">Bioinformatics Practitioner</span><span className="hidden sm:inline text-subtle"> · </span><span className="block sm:inline">Clinical Pharmacist</span>
            </motion.p>

            <motion.p {...fadeUp(0.15)} className="order-1 lg:order-none mt-8 lg:mt-6 text-base lg:text-[17px] text-body leading-relaxed max-w-[54ch]">
              {statement.map((part, i) =>
                part.emphasis
                  ? <span key={i} className="font-medium text-ink">{part.text}</span>
                  : <React.Fragment key={i}>{part.text}</React.Fragment>
              )}
            </motion.p>

            <motion.div {...fadeUp(0.2)} className="mt-8 flex flex-wrap items-center gap-3">
              <button
                onClick={() => scrollTo('me')}
                className="bg-accent text-white pl-5 pr-4 py-2.5 rounded-full font-medium text-[15px] hover:bg-accent-hover transition-colors flex items-center gap-2 active:scale-[0.98]"
              >
                Meet Me <ChevronRight size={16} />
              </button>
              <a href="https://github.com/mujtababarsi" target="_blank" rel="noreferrer" aria-label="GitHub" className="w-11 h-11 flex items-center justify-center bg-surface rounded-full text-ink hover:text-accent transition-colors ring-1 ring-black/10 active:scale-[0.98]"><Github size={18} /></a>
              <a href="mailto:Mujtababarci@gmail.com" aria-label="Email" className="w-11 h-11 flex items-center justify-center bg-surface rounded-full text-ink hover:text-accent transition-colors ring-1 ring-black/10 active:scale-[0.98]"><Mail size={18} /></a>
            </motion.div>
          </div>

          <motion.div {...fadeUp(0.1)} className="hidden lg:flex lg:col-span-5 justify-end">
            <Portrait className="w-full max-w-[300px] aspect-[4/5] rounded-2xl shadow-[0_24px_48px_-28px_rgba(29,29,31,0.35)]" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
