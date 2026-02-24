import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Sparkles } from 'lucide-react';

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import ExpertiseAndSkillsSection from './components/Expertise';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Education from './components/Education';
import Certifications from './components/Certifications';
import PersonalDetails from './components/PersonalDetails';
import AICopilotModal from './components/AICopilotModal';

function SectionProgress({ activeSection, scrollTo }: { activeSection: string; scrollTo: (id: string) => void }) {
  const sections = ['home', 'me', 'expertise', 'projects', 'experience', 'education'];

  return (
    <div className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col gap-4">
      {sections.map((id) => (
        <button key={id} onClick={() => scrollTo(id)} className="group relative flex items-center justify-center w-3 h-3">
          <div className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${activeSection === id ? 'bg-[#0071e3] scale-150' : 'bg-[#d2d2d7] group-hover:bg-[#86868b]'}`} />
        </button>
      ))}
    </div>
  );
}

export default function App() {
  const [isAiOpen, setIsAiOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const mainContainerRef = useRef<HTMLDivElement>(null);
  
  // Track specific interaction states to manage auto-slide intelligently
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);

  // Smart Toggle Logic
  const [controlsVisible, setControlsVisible] = useState(true);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Scroll Animations hooks - use window scroll by default
  const { scrollYProgress } = useScroll();
  // Parallax transform for blobs
  const blobY = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const blobRotate = useTransform(scrollYProgress, [0, 1], [0, 45]);

  // Helper function to handle visibility
  const showDockTemporarily = () => {
    setControlsVisible(true);
    if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    scrollTimeoutRef.current = setTimeout(() => {
      setControlsVisible(false);
    }, 1000);
  };

  // Add global event listeners for interactions
  useEffect(() => {
    const handleActivity = (e: any) => {
      if (e.type === 'mousemove') {
        showDockTemporarily();
      } else if (e.type === 'keydown') {
        if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Space', 'PageUp', 'PageDown'].includes(e.code)) {
          showDockTemporarily();
        }
      }
    };

    const handleScroll = () => {
      showDockTemporarily();
    };

    window.addEventListener('mousemove', handleActivity);
    window.addEventListener('keydown', handleActivity);
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleActivity);
      window.removeEventListener('keydown', handleActivity);
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    };
  }, []);

  // Intersection Observer for Active Section
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.2, rootMargin: "-20% 0px -20% 0px" } 
    );

    const sections = ['home', 'me', 'expertise', 'projects', 'experience', 'education'];
    sections.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -80; // Offset for fixed navbar
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <div 
      ref={mainContainerRef}
      className="min-h-screen w-full bg-white font-sans text-[#1d1d1f] selection:bg-[#0071e3]/20 relative antialiased"
    >
      <Navbar activeSection={activeSection} scrollTo={scrollTo} />
      <SectionProgress activeSection={activeSection} scrollTo={scrollTo} />

      {/* HERO Section */}
      <Hero scrollTo={scrollTo} />

      {/* ME Section */}
      <About />

      {/* NEW UNIFIED SECTION - Expertise & Skills */}
      <ExpertiseAndSkillsSection />

      {/* PROJECTS */}
      <Projects onOpenAi={setIsAiModalOpen} />

      {/* EXPERIENCE */}
      <Experience />

      {/* EDUCATION */}
      <Education />

      {/* CERTIFICATIONS & PROFESSIONAL DEVELOPMENT */}
      <Certifications />

      {/* ADDITIONAL INFO - VISUALLY ENHANCED BENTO LAYOUT */}
      <PersonalDetails />

      {/* Floating Action Button - Apple Style */}
      <motion.button 
        initial={{ opacity: 0, y: 20 }}
        animate={{ 
          opacity: 1, 
          y: 0,
          pointerEvents: 'auto'
        }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
        onMouseEnter={() => setControlsVisible(true)}
        onClick={() => setIsAiOpen(true)} 
        className="fixed bottom-5 right-5 z-40 bg-black/80 backdrop-blur-md text-white p-4 rounded-full shadow-[0_20px_40px_-10px_rgba(0,0,0,0.3)] hover:scale-105 active:scale-95 transition-all group flex items-center gap-0 overflow-hidden hover:pr-6 border border-white/10"
      >
        <Sparkles size={22} />
        <span className="max-w-0 group-hover:max-w-xs transition-all duration-300 overflow-hidden whitespace-nowrap font-medium text-[15px] pl-0 group-hover:pl-3">Ask AI</span>
      </motion.button>

      <AICopilotModal isOpen={isAiOpen} onClose={() => setIsAiOpen(false)} />
    </div>
  );
}