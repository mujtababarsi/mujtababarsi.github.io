import React from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Github, MapPin, Globe, Activity } from 'lucide-react';
import { ADDITIONAL_INFO, PROFILE_IMAGE_URL } from '../data/portfolioData';
import { SectionHeading } from './ui/SectionHeading';

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

export default function PersonalDetails() {
    return (
        <section className="min-h-screen pt-28 pb-10 bg-gradient-to-br from-slate-50 to-gray-100 flex items-start justify-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
              <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-blue-100/40 rounded-full blur-3xl opacity-60" />
              <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-indigo-50/40 rounded-full blur-3xl opacity-60" />
        </div>
        
        <div className="max-w-5xl mx-auto px-6 w-full relative z-10 flex flex-col h-full justify-between">
          <div>
            <SectionHeading title="Personal Details" />
            
            <motion.div 
              initial="hidden" whileInView="visible" viewport={{ once: false, amount: 0.2 }} variants={containerVariants}
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
            >
              
              {/* Card 1: Identity & Connect */}
              <motion.div 
                variants={itemVariants}
                whileHover={{ y: -8 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="md:col-span-1 bg-white/80 backdrop-blur-xl rounded-[2.5rem] p-6 flex flex-col items-center justify-center text-center shadow-[0_20px_40px_-12px_rgba(0,0,0,0.05)] border border-white/60 relative overflow-hidden group ring-1 ring-black/5"
              >
                  <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-[#0071e3]/5 to-transparent transition-opacity duration-500 group-hover:opacity-80" />
                  
                  <div className="relative w-24 h-24 rounded-full overflow-hidden ring-4 ring-white shadow-xl mb-6 group-hover:scale-105 transition-transform duration-500">
                      <img src={PROFILE_IMAGE_URL} alt="Profile" onError={(e: any) => e.target.style.display = 'none'} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 flex items-center justify-center bg-gray-100 -z-10">
                        <User size={32} className="text-gray-400" />
                      </div>
                  </div>
                  
                  <h3 className="text-lg font-bold text-[#1d1d1f] tracking-tight">M. Elmugtaba</h3>
                  <p className="text-xs font-medium text-[#0071e3] mt-1 mb-6">Bioinformatician & Pharmacist</p>
                  
                  <div className="flex gap-3 w-full justify-center relative z-10">
                    <a href="mailto:Mujtababarci@gmail.com" className="p-3 rounded-full bg-white text-[#1d1d1f] hover:bg-[#0071e3] hover:text-white transition-all duration-300 shadow-sm border border-black/5">
                      <Mail size={18} strokeWidth={2} />
                    </a>
                    <a href="https://github.com/mujtababarsi" target="_blank" className="p-3 rounded-full bg-white text-[#1d1d1f] hover:bg-[#0071e3] hover:text-white transition-all duration-300 shadow-sm border border-black/5">
                      <Github size={18} strokeWidth={2} />
                    </a>
                  </div>
              </motion.div>

              {/* Card 2: Details Grid */}
              <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
                  
                  {/* Location */}
                  <motion.div 
                    variants={itemVariants}
                    whileHover={{ y: -5 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="bg-white/80 backdrop-blur-xl rounded-[2.5rem] p-6 flex flex-col justify-between shadow-[0_20px_40px_-12px_rgba(0,0,0,0.05)] border border-white/60 ring-1 ring-black/5 group"
                  >
                      <div className="w-10 h-10 rounded-2xl bg-blue-50 text-[#0071e3] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                          <MapPin size={20} strokeWidth={2} />
                      </div>
                      <div>
                          <span className="text-[10px] font-bold text-[#86868b] uppercase tracking-widest">Location</span>
                          <p className="text-lg font-bold text-[#1d1d1f] mt-1 tracking-tight">{ADDITIONAL_INFO.location}</p>
                          <p className="text-[12px] text-[#86868b] font-medium mt-1">Open to Relocation</p>
                      </div>
                  </motion.div>

                  {/* Languages */}
                  <motion.div 
                    variants={itemVariants}
                    whileHover={{ y: -5 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="bg-white/80 backdrop-blur-xl rounded-[2.5rem] p-6 flex flex-col justify-between shadow-[0_20px_40px_-12px_rgba(0,0,0,0.05)] border border-white/60 ring-1 ring-black/5 group"
                  >
                        <div className="w-10 h-10 rounded-2xl bg-indigo-50 text-indigo-500 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                          <Globe size={20} strokeWidth={2} />
                      </div>
                      <div>
                          <span className="text-[10px] font-bold text-[#86868b] uppercase tracking-widest">Languages</span>
                          <p className="text-lg font-bold text-[#1d1d1f] mt-1 tracking-tight">{ADDITIONAL_INFO.languages}</p>
                          <p className="text-[12px] text-[#86868b] font-medium mt-1">Native & Professional</p>
                      </div>
                  </motion.div>

                  {/* Status/Visa - Wide Card */}
                  <motion.div 
                    variants={itemVariants}
                    whileHover={{ y: -5 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="sm:col-span-2 bg-white/80 backdrop-blur-xl rounded-[2.5rem] p-6 flex flex-col sm:flex-row sm:items-center gap-6 sm:gap-8 shadow-[0_20px_40px_-12px_rgba(0,0,0,0.05)] border border-white/60 ring-1 ring-black/5 group"
                  >
                        <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex-shrink-0 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                          <Activity size={24} strokeWidth={2} />
                      </div>
                      <div>
                          <span className="text-[10px] font-bold text-[#86868b] uppercase tracking-widest">Professional Status</span>
                          <div className="flex flex-col sm:flex-row sm:items-center sm:gap-8 mt-2">
                              <div className="flex items-center gap-3">
                                <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.4)]" />
                                <p className="text-[14px] font-semibold text-[#1d1d1f]">Transferable Iqama</p>
                              </div>
                              <div className="hidden sm:block w-px h-5 bg-black/10" />
                              <div className="flex items-center gap-3">
                                <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.4)]" />
                                <p className="text-[14px] font-semibold text-[#1d1d1f]">Valid Driver License</p>
                              </div>
                          </div>
                      </div>
                  </motion.div>

              </div>
            </motion.div>
          </div>
          
          {/* Integrated Footer Content */}
          <div className="mt-12 pt-8 border-t border-black/5 flex flex-col md:flex-row justify-between items-center md:items-end gap-6 pb-4">
            <div className="flex flex-col gap-2 items-center md:items-start text-center md:text-left">
               <p className="text-[11px] text-[#86868b] font-medium tracking-wide">
                  Copyright © {new Date().getFullYear()} Mohamed Elmugtaba. All rights reserved.
               </p>
               <p className="text-[11px] text-[#86868b] font-medium tracking-wide">
                  Designed & Developed by M. Elmugtaba
               </p>
               <div className="flex items-center gap-1.5 opacity-80 hover:opacity-100 transition-opacity mt-1">
                 <MapPin size={14} strokeWidth={1.5} className="text-[#1d1d1f]" />
                 <span className="text-[11px] text-[#424245] font-medium">Riyadh, KSA</span>
               </div>
            </div>
            <div className="flex items-center gap-5">
               <a 
                 href="https://github.com/mujtababarsi" 
                 target="_blank" 
                 rel="noreferrer"
                 className="text-[#86868b] hover:text-[#1d1d1f] transition-colors duration-300"
                 aria-label="GitHub"
               >
                 <Github size={16} strokeWidth={1.5} />
               </a>
               <a 
                 href="mailto:Mujtababarci@gmail.com" 
                 className="text-[#86868b] hover:text-[#1d1d1f] transition-colors duration-300"
                 aria-label="Email"
               >
                 <Mail size={16} strokeWidth={1.5} />
               </a>
            </div>
          </div>
        </div>
      </section>
    );
}