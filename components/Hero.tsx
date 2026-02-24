import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { User, ChevronRight, Github, Mail } from 'lucide-react';
import { PROFILE_IMAGE_URL } from '../data/portfolioData';
import { ParallaxBackground } from './ui/ParallaxBackground';

// Animation Variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { 
      staggerChildren: 0.1,
      delayChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 15, x: -10 },
  visible: { 
    opacity: 1, 
    y: 0, 
    x: 0,
    transition: { type: "spring" as const, stiffness: 100, damping: 20 }
  }
};

function ProfilePicHolder() {
  const [imgError, setImgError] = useState(false);

  return (
    <div className="relative w-48 h-56 md:w-56 md:h-64 shrink-0">
      <motion.div 
        whileHover={{ scale: 1.02 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="relative w-full h-full bg-white rounded-[2rem] shadow-[0_20px_40px_-12px_rgba(0,0,0,0.12)] overflow-hidden p-2 ring-1 ring-black/5"
      >
        <div className="w-full h-full bg-[#F5F5F7] rounded-[1.5rem] overflow-hidden relative">
          {PROFILE_IMAGE_URL && !imgError ? (
            <img 
              src={PROFILE_IMAGE_URL} 
              alt="Mohamed Elmugtaba" 
              onError={() => setImgError(true)}
              className="w-full h-full object-cover grayscale-[10%] hover:grayscale-0 transition-all duration-700 ease-out" 
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-[#86868b]"><User size={50} strokeWidth={1.5} /></div>
          )}
        </div>
      </motion.div>
      <div className="absolute -bottom-1 -right-1 bg-white p-1.5 rounded-full shadow-lg z-20 border border-slate-50">
        <div className="bg-[#34C759] w-3.5 h-3.5 rounded-full ring-2 ring-white animate-pulse" />
      </div>
    </div>
  );
}

function TypewriterText() {
  const segments = [
    { text: '"Bridging ', bold: false },
    { text: "clinical science", bold: true },
    { text: " and ", bold: false },
    { text: "computational data", bold: true },
    { text: ". I aim to redefine the frontier of discovery using ", bold: false },
    { text: "pharmaceutical insight", bold: true },
    { text: " to frame the essential biological questions and ", bold: false },
    { text: "computational innovation", bold: true },
    { text: " to manifest the data-driven answers that make ", bold: false },
    { text: "medicine a reality", bold: true },
    { text: '."', bold: false },
  ];

  const [textState, setTextState] = useState({ segmentIndex: 0, charIndex: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { amount: 0.5 });

  useEffect(() => { if (!isInView) setTextState({ segmentIndex: 0, charIndex: 0 }); }, [isInView]);

  useEffect(() => {
    if (!isInView || textState.segmentIndex >= segments.length) return;
    
    const timeout = setTimeout(() => {
      setTextState((prev) => {
        const currentSegment = segments[prev.segmentIndex];
        if (prev.charIndex < currentSegment.text.length) {
          return { ...prev, charIndex: prev.charIndex + 1 };
        } else {
          return { segmentIndex: prev.segmentIndex + 1, charIndex: 0 };
        }
      });
    }, 15);
    return () => clearTimeout(timeout);
  }, [textState, segments.length, isInView]);

  return (
    <div ref={containerRef} className="relative">
      <div className="invisible pointer-events-none select-none" aria-hidden="true">
        {segments.map((seg, i) => <span key={`ghost-${i}`} className={seg.bold ? "font-semibold" : ""}>{seg.text}</span>)}
      </div>
      <div className="absolute top-0 left-0 w-full h-full">
        {segments.map((seg, i) => {
          if (i < textState.segmentIndex) return <span key={i} className={seg.bold ? "font-semibold text-black" : ""}>{seg.text}</span>;
          if (i === textState.segmentIndex) return <span key={i} className={seg.bold ? "font-semibold text-black" : ""}>{seg.text.slice(0, textState.charIndex)}<span className="animate-pulse inline-block w-0.5 h-5 bg-[#0071e3] align-middle ml-0.5"></span></span>;
          return null;
        })}
      </div>
    </div>
  );
}

interface HeroProps {
    scrollTo: (id: string) => void;
}

export default function Hero({ scrollTo }: HeroProps) {
    return (
        <section id="home" className="min-h-screen relative pt-32 md:pt-40 pb-20 bg-[#F5F5F7] flex items-start justify-center">
            <ParallaxBackground />
            
            <div className="max-w-5xl mx-auto px-6 w-full relative z-10">
            <motion.div 
                initial="hidden" whileInView="visible" viewport={{ once: false, amount: 0.2 }} variants={containerVariants}
                className="grid lg:grid-cols-2 gap-8 items-center"
            >
                
                {/* Left Side */}
                <motion.div variants={itemVariants} className="flex flex-col items-center lg:items-start text-center lg:text-left">
                <ProfilePicHolder />
                
                <div className="mt-6 flex flex-col items-center lg:items-start w-full space-y-3">
                    <h1 className="text-3xl md:text-4xl font-bold text-[#1d1d1f] tracking-tight leading-[1.05]">
                    Mohamed <span className="text-[#86868b]">Elmugtaba</span>
                    </h1>
                    
                    <p className="text-lg md:text-xl font-medium text-[#1d1d1f] tracking-tight">
                    Bioinformatician | Pharmacist
                    </p>
                    
                    <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-full shadow-sm border border-black/5 mt-2">
                    <span className="w-2 h-2 rounded-full bg-[#34C759]" />
                    <span className="text-[12px] font-medium text-[#1d1d1f] tracking-wide">Available for Collaboration</span>
                    </div>
                </div>
                </motion.div>

                {/* Right Side - Justified Brief Content */}
                <motion.div variants={itemVariants} className="flex flex-col items-center lg:items-start text-center lg:text-left">
                <div className="text-lg md:text-xl text-[#1d1d1f] font-normal leading-relaxed tracking-tight max-w-lg mb-8 text-justify hyphens-auto">
                    <TypewriterText />
                </div>
                
                <div className="flex flex-wrap justify-center lg:justify-start gap-4 w-full">
                    <button 
                    onClick={() => scrollTo('me')} 
                    className="bg-[#0071e3] text-white px-8 py-4 rounded-full font-medium text-[16px] hover:bg-[#0077ED] transition-all flex items-center gap-2 active:scale-[0.98]"
                    >
                    Meet Me <ChevronRight size={18} />
                    </button>
                    <div className="flex gap-3">
                    <a href="https://github.com/mujtababarsi" target="_blank" className="w-12 h-12 flex items-center justify-center bg-white rounded-full text-[#1d1d1f] hover:text-[#0071e3] transition-colors border border-black/5 hover:border-[#0071e3]/20 shadow-sm"><Github size={22} /></a>
                    <a href="mailto:Mujtababarsi@mail.com" className="w-12 h-12 flex items-center justify-center bg-white rounded-full text-[#1d1d1f] hover:text-[#0071e3] transition-colors border border-black/5 hover:border-[#0071e3]/20 shadow-sm"><Mail size={22} /></a>
                    </div>
                </div>
                </motion.div>
            </motion.div>
            </div>
        </section>
    );
}