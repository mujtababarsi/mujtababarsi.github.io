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

export default function App() {
  const [isAiOpen, setIsAiOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const mainContainerRef = useRef<HTMLDivElement>(null);
  

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
      className="min-h-screen w-full bg-canvas font-sans text-ink selection:bg-accent/20 relative antialiased"
    >
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:bg-white focus:text-ink focus:px-4 focus:py-2 focus:rounded-full focus:shadow-lg">Skip to content</a>
      <Navbar activeSection={activeSection} scrollTo={scrollTo} />

      <main id="main" tabIndex={-1} className="focus:outline-none">
      {/* HERO Section */}
      <Hero scrollTo={scrollTo} />

      {/* ME Section */}
      <About />

      {/* NEW UNIFIED SECTION - Expertise & Skills */}
      <ExpertiseAndSkillsSection />

      {/* PROJECTS */}
      <Projects />

      {/* EXPERIENCE */}
      <Experience />

      {/* EDUCATION */}
      <Education />

      {/* CERTIFICATIONS & PROFESSIONAL DEVELOPMENT */}
      <Certifications />

      {/* ADDITIONAL INFO - VISUALLY ENHANCED BENTO LAYOUT */}
      <PersonalDetails />
      </main>

      {/* Floating Action Button - Apple Style */}
      <motion.button 
        initial={{ opacity: 0, y: 20 }}
        animate={{
          opacity: activeSection === 'home' ? 0 : 1,
          y: activeSection === 'home' ? 20 : 0,
          pointerEvents: activeSection === 'home' ? 'none' : 'auto'
        }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
        onMouseEnter={() => setControlsVisible(true)}
        tabIndex={activeSection === 'home' ? -1 : 0}
        aria-hidden={activeSection === 'home'}
        onClick={() => setIsAiOpen(true)} 
        className="fixed bottom-5 right-5 z-40 bg-black/80 backdrop-blur-md text-white rounded-full shadow-[0_20px_40px_-10px_rgba(0,0,0,0.3)] hover:bg-black active:scale-95 transition-colors flex items-center gap-2 pl-4 pr-5 py-3 border border-white/10"
      >
        <Sparkles size={18} />
        <span className="font-medium text-[14px] whitespace-nowrap">Ask AI</span>
      </motion.button>

      <AICopilotModal isOpen={isAiOpen} onClose={() => setIsAiOpen(false)} />
    </div>
  );
}