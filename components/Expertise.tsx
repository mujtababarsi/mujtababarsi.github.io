import React from 'react';
import { motion } from 'framer-motion';
import { Cpu as LucideChip } from 'lucide-react';
import { AREAS_OF_EXPERTISE, SKILLS } from '../data/portfolioData';
import { ParallaxBackground } from './ui/ParallaxBackground';
import { SectionHeading } from './ui/SectionHeading';
import { AreaOfExpertise } from '../types';

function ExpertiseCard({ data, delay }: { data: AreaOfExpertise; delay: number }) {
    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.03, y: -5, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.15)" }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ 
                delay, 
                duration: 0.4,
                type: "spring",
                stiffness: 200,
                damping: 15
            }}
            className="bg-white rounded-[1.25rem] md:rounded-[1.75rem] p-4 md:p-5 relative overflow-hidden group shadow-[0_10px_30px_-10px_rgba(0,0,0,0.05)] border border-white/60 flex flex-col h-full ring-1 ring-black/5 cursor-pointer"
        >
            <div className={`absolute top-0 right-0 w-20 h-20 md:w-28 md:h-28 bg-gradient-to-bl ${data.gradient} opacity-50 rounded-bl-[3rem] transition-all duration-700 group-hover:scale-110`} />
            
            <div className="relative z-10 flex flex-col h-full">
                {/* Header: Icon and Title Side-by-Side for compactness */}
                <div className="flex items-center gap-3 mb-2 md:mb-3">
                    <div className="w-9 h-9 md:w-10 md:h-10 rounded-xl bg-white text-[#1d1d1f] flex items-center justify-center shadow-sm ring-1 ring-black/5 shrink-0 group-hover:scale-110 transition-transform duration-500">
                        {React.cloneElement(data.icon as any, { strokeWidth: 1.5, size: 18, className: data.accent })}
                    </div>
                    <h3 className="text-sm md:text-base font-bold text-[#1d1d1f] tracking-tight leading-tight">{data.title}</h3>
                </div>
                
                <p className="text-[#424245] text-[11px] md:text-[12px] leading-relaxed font-medium mb-3 flex-grow line-clamp-3 md:line-clamp-none">
                    {data.description}
                </p>

                <div className="flex flex-wrap gap-1.5 mt-auto">
                    {data.items.map((item, i) => ( 
                        <div key={i} className="flex items-center gap-1 text-[9px] font-semibold text-[#86868b] bg-[#F5F5F7] px-2 py-0.5 rounded border border-black/5 whitespace-nowrap">
                            <div className={`w-1 h-1 rounded-full ${data.accent.replace('text', 'bg')}`} />
                            {item}
                        </div>
                    ))}
                </div>
            </div>
        </motion.div>
    )
}

export default function ExpertiseAndSkillsSection() {
    return (
        <section id="expertise" className="min-h-screen py-16 md:py-20 bg-[#F5F5F7] flex items-center justify-center relative overflow-hidden">
            <ParallaxBackground />
            
            <div className="max-w-7xl mx-auto px-4 md:px-6 w-full relative z-10 flex flex-col gap-3 md:gap-5 justify-center h-full">
                <SectionHeading 
                    title="Professional Ecosystem" 
                    subtitle="Strategic domain expertise integrated with a robust technical arsenal."
                />

                <div className="flex flex-col gap-3 md:gap-4 h-full">
                    {/* ZONE 1: EXPERTISE - High Level Strategy */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
                        {AREAS_OF_EXPERTISE.map((area, idx) => (
                            <ExpertiseCard key={area.id} data={area} delay={idx * 0.1} />
                        ))}
                    </div>

                    {/* ZONE 2: SKILLS - Technical Tactics - Unified Panel */}
                    <motion.div 
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: false, amount: 0.2 }}
                        transition={{ delay: 0.4, duration: 0.6 }}
                        className="bg-white/80 backdrop-blur-xl rounded-[1.25rem] md:rounded-[1.75rem] p-4 md:p-5 border border-white/50 shadow-lg shadow-black/5 ring-1 ring-black/5"
                    >
                        <div className="flex items-center gap-3 mb-3 pb-2 border-b border-black/5">
                            <div className="bg-[#1d1d1f] p-1.5 rounded-lg text-white">
                                <LucideChip size={16} />
                            </div>
                            <div>
                                <h3 className="text-sm md:text-base font-bold text-[#1d1d1f]">Technical Arsenal</h3>
                                <p className="text-[9px] md:text-[10px] text-[#86868b] font-medium uppercase tracking-wider">Operational Capabilities</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 md:divide-x md:divide-black/5">
                            {SKILLS.map((skill, idx) => (
                                <div key={skill.id} className={`flex flex-col ${idx !== 0 ? 'md:pl-6' : ''}`}>
                                    <div className="flex items-center gap-2 mb-2">
                                        <div className={`w-5 h-5 rounded-full flex items-center justify-center text-white shadow-sm ${skill.color}`}>
                                            {React.cloneElement(skill.icon as any, { size: 12, strokeWidth: 2 })}
                                        </div>
                                        <h4 className="font-bold text-[#1d1d1f] text-[12px] md:text-[13px]">{skill.category}</h4>
                                    </div>
                                    <div className="flex flex-wrap gap-1.5">
                                        {skill.items.map((item, i) => (
                                            <motion.span 
                                                key={i} 
                                                whileHover={{ scale: 1.05, y: -2 }}
                                                className="px-2 py-0.5 rounded-md bg-white border border-black/10 text-[10px] md:text-[11px] font-medium text-[#424245] shadow-sm hover:border-[#0071e3]/30 hover:bg-blue-50/50 hover:text-[#0071e3] hover:shadow-md transition-all cursor-default inline-block"
                                            >
                                                {item}
                                            </motion.span>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}