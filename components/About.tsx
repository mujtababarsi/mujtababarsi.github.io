import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Terminal } from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';
import { summaryFull, GENOMIC_DATA } from '../data/portfolioData';
import { ParallaxBackground } from './ui/ParallaxBackground';
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

export default function About() {
    return (
        <section id="me" className="min-h-screen pt-28 pb-16 bg-gradient-to-br from-white via-indigo-50/10 to-blue-50/10 flex items-start justify-center relative overflow-hidden">
            <ParallaxBackground />
            
            <div className="max-w-7xl mx-auto px-6 w-full relative z-10">
            <SectionHeading title="At the Intersection of Pharmacy & Bioinformatics" subtitle="Bridging clinical expertise with computational precision." />

            <motion.div 
                initial="hidden" whileInView="visible" viewport={{ once: false, amount: 0.2 }} variants={containerVariants}
                className="grid lg:grid-cols-2 gap-10 items-start"
            >
                
                <motion.div variants={itemVariants} className="space-y-5 bg-white/60 backdrop-blur-sm p-8 rounded-[2rem] border border-white/50 shadow-sm">
                <div className="flex items-center gap-2 text-[#0071e3]">
                    <FileText size={22} strokeWidth={1.5} />
                    <span className="text-[12px] font-semibold uppercase tracking-widest">Bio</span>
                </div>
                <p className="text-[15px] md:text-base text-[#1d1d1f] leading-relaxed text-justify hyphens-auto font-normal">
                    {summaryFull}
                </p>
                </motion.div>

                {/* Apple Health-style Chart Card - ENHANCED */}
                <motion.div variants={itemVariants} className="bg-white/60 backdrop-blur-xl border border-white/50 p-6 rounded-[2.5rem] relative overflow-hidden shadow-xl ring-1 ring-black/5">
                <div className="flex justify-between items-center mb-6">
                    <div className="flex items-center gap-2">
                    <div className="bg-[#0071e3] p-1.5 rounded-md text-white"><Terminal size={16} /></div>
                    <span className="font-semibold text-[15px] text-[#1d1d1f]">Sequencing Depth</span>
                    </div>
                    <span className="text-[12px] font-medium text-[#86868b] uppercase tracking-wide">Real-time</span>
                </div>
                <div className="h-52" style={{ height: 208, width: '100%' }}>
                    <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={GENOMIC_DATA}>
                        <defs>
                        <linearGradient id="cMe" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#0071e3" stopOpacity={0.3}/>
                            <stop offset="95%" stopColor="#0071e3" stopOpacity={0}/>
                        </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E5EA" />
                        <XAxis dataKey="pos" hide />
                        <YAxis hide />
                        <Tooltip 
                        contentStyle={{ borderRadius: '16px', border: 'none', backgroundColor: 'rgba(255,255,255,0.9)', boxShadow: '0 10px 30px rgba(0,0,0,0.1)', color: '#1d1d1f', fontSize: '13px', padding: '10px 15px', backdropFilter: 'blur(10px)' }} 
                        cursor={{ stroke: '#86868b', strokeWidth: 1, strokeDasharray: '4 4' }}
                        />
                        <Area type="monotone" dataKey="depth" stroke="#0071e3" strokeWidth={3} fillOpacity={1} fill="url(#cMe)" />
                    </AreaChart>
                    </ResponsiveContainer>
                </div>
                </motion.div>
            </motion.div>
            </div>
        </section>
    );
}