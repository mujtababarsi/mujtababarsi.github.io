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
  { text: 'Bridging ' },
  { text: 'clinical science', emphasis: true },
  { text: ' and ' },
  { text: 'computational data', emphasis: true },
  { text: '. I aim to redefine the frontier of discovery using ' },
  { text: 'pharmaceutical insight', emphasis: true },
  { text: ' to frame the essential biological questions and ' },
  { text: 'computational innovation', emphasis: true },
  { text: ' to manifest the data-driven answers that make ' },
  { text: 'medicine a reality', emphasis: true },
  { text: '.' },
];

function Portrait() {
  const [imgError, setImgError] = useState(false);

  return (
    <div className="w-40 sm:w-52 lg:w-full lg:max-w-sm aspect-[4/5] rounded-3xl overflow-hidden bg-white ring-1 ring-black/5 shadow-[0_30px_60px_-30px_rgba(29,29,31,0.35)]">
      {PROFILE_IMAGE_URL && !imgError ? (
        <img
          src={PROFILE_IMAGE_URL}
          alt="Mohamed Elmugtaba"
          onError={() => setImgError(true)}
          className="w-full h-full object-cover"
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center text-[#86868b]"><User size={50} /></div>
      )}
    </div>
  );
}

interface HeroProps {
  scrollTo: (id: string) => void;
}

export default function Hero({ scrollTo }: HeroProps) {
  return (
    <section id="home" className="min-h-[100dvh] flex items-center pt-24 pb-16 md:pt-32">
      <div className="max-w-7xl mx-auto px-6 w-full">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          <div className="lg:col-span-7 order-2 lg:order-1 flex flex-col items-start">
            <motion.div {...fadeUp(0)} className="inline-flex items-center gap-2 text-sm font-medium text-[#424245] mb-6">
              <span className="w-2 h-2 rounded-full bg-[#34C759]" />
              Available for collaboration
            </motion.div>

            <motion.h1 {...fadeUp(0.05)} className="text-5xl sm:text-6xl lg:text-7xl font-semibold tracking-tighter leading-[0.95] text-[#1d1d1f]">
              Mohamed
              <br />
              <span className="text-[#86868b]">Elmugtaba</span>
            </motion.h1>

            <motion.p {...fadeUp(0.1)} className="mt-5 text-xl md:text-2xl font-medium tracking-tight text-[#1d1d1f]">
              Bioinformatician <span className="text-[#86868b]">·</span> Pharmacist
            </motion.p>

            <motion.p {...fadeUp(0.15)} className="order-1 lg:order-none mt-8 lg:mt-6 text-base sm:text-lg text-[#424245] leading-relaxed max-w-[56ch]">
              {statement.map((part, i) =>
                part.emphasis
                  ? <span key={i} className="font-medium text-[#1d1d1f]">{part.text}</span>
                  : <React.Fragment key={i}>{part.text}</React.Fragment>
              )}
            </motion.p>

            <motion.div {...fadeUp(0.2)} className="mt-8 lg:mt-10 flex flex-wrap items-center gap-3">
              <button
                onClick={() => scrollTo('me')}
                className="bg-[#0071e3] text-white pl-7 pr-6 py-3.5 rounded-full font-medium text-base hover:bg-[#0077ED] transition-colors flex items-center gap-2 active:scale-[0.98]"
              >
                Meet Me <ChevronRight size={18} />
              </button>
              <a href="https://github.com/mujtababarsi" target="_blank" rel="noreferrer" aria-label="GitHub" className="w-12 h-12 flex items-center justify-center bg-white rounded-full text-[#1d1d1f] hover:text-[#0071e3] transition-colors ring-1 ring-black/10 active:scale-[0.98]"><Github size={20} /></a>
              <a href="mailto:Mujtababarci@gmail.com" aria-label="Email" className="w-12 h-12 flex items-center justify-center bg-white rounded-full text-[#1d1d1f] hover:text-[#0071e3] transition-colors ring-1 ring-black/10 active:scale-[0.98]"><Mail size={20} /></a>
            </motion.div>
          </div>

          <motion.div {...fadeUp(0.1)} className="lg:col-span-5 order-1 lg:order-2 flex lg:justify-end">
            <Portrait />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
