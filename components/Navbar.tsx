import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Dna, Menu, X } from 'lucide-react';

interface NavbarProps {
  activeSection: string;
  scrollTo: (id: string) => void;
}

export default function Navbar({ activeSection, scrollTo }: NavbarProps) {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const links = [
    { id: 'home', label: 'Home' },
    { id: 'me', label: 'Bio' },
    { id: 'expertise', label: 'Expertise' },
    { id: 'projects', label: 'Projects' },
    { id: 'experience', label: 'Experience' },
    { id: 'education', label: 'Education' },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 transition-all duration-300 border-b border-black/5 bg-[rgba(255,255,255,0.72)] backdrop-blur-xl saturate-[180%] supports-[backdrop-filter]:bg-[rgba(255,255,255,0.6)]">
      <div className="max-w-7xl mx-auto px-6 h-14 md:h-16 flex items-center justify-between">
        {/* Brand */}
        <div 
          onClick={() => scrollTo('home')}
          className="flex items-center gap-2 cursor-pointer group"
        >
          <div className="bg-[#0071e3] p-1.5 rounded-lg text-white group-hover:scale-105 transition-transform">
             <Dna size={18} strokeWidth={2.5} />
          </div>
          <span className="font-semibold text-[13px] tracking-wide uppercase text-[#1d1d1f]">M. Elmugtaba</span>
        </div>

        {/* Desktop Navigation - Apple Style Tabs */}
        <div className="hidden md:flex items-center bg-[#1d1d1f]/5 p-1 rounded-full backdrop-blur-md">
          {links.map((link) => (
            <button
              key={link.id}
              onClick={() => scrollTo(link.id)}
              className={`relative px-4 py-1.5 rounded-full text-[13px] font-medium transition-all duration-500 ease-out ${
                activeSection === link.id
                  ? 'text-black shadow-sm bg-white'
                  : 'text-[#86868b] hover:text-[#1d1d1f]'
              }`}
            >
              {link.label}
            </button>
          ))}
        </div>

        {/* Contact Action */}
        <div className="hidden md:flex items-center">
            <a 
              href="mailto:Mujtababarci@gmail.com"
              className="px-4 py-1.5 bg-[#1d1d1f] text-white text-[12px] font-medium rounded-full hover:bg-[#0071e3] transition-colors shadow-sm"
            >
              Contact
            </a>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden p-2 text-[#1d1d1f]"
          onClick={() => setIsMobileOpen(!isMobileOpen)}
        >
          {isMobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden overflow-hidden bg-white/95 backdrop-blur-xl border-b border-black/5"
          >
            <div className="flex flex-col p-4 space-y-1">
              {links.map((link) => (
                <button
                  key={link.id}
                  onClick={() => {
                    scrollTo(link.id);
                    setIsMobileOpen(false);
                  }}
                  className={`p-3 text-left rounded-xl text-[14px] font-medium transition-colors ${
                    activeSection === link.id
                      ? 'bg-[#F5F5F7] text-[#0071e3]'
                      : 'text-[#1d1d1f] hover:bg-[#F5F5F7]'
                  }`}
                >
                  {link.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}