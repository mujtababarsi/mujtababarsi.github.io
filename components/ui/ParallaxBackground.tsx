import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export function ParallaxBackground() {
  const { scrollYProgress } = useScroll();
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 20]);
    
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
       <motion.div style={{ y: y1, rotate }} className="absolute top-[5%] right-[-5%] w-[500px] h-[500px] bg-blue-100/20 rounded-full blur-3xl opacity-50" />
       <motion.div style={{ y: y2, rotate: rotate }} className="absolute bottom-[10%] left-[-10%] w-[600px] h-[600px] bg-indigo-100/20 rounded-full blur-3xl opacity-50" />
    </div>
  );
}