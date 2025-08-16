import React from 'react';
import { motion } from 'framer-motion';

interface AnimatedBackgroundProps {
  className?: string;
  intensity?: 'low' | 'medium' | 'high';
}

export const AnimatedBackground: React.FC<AnimatedBackgroundProps> = ({
  className = '', 
  intensity = 'medium' 
}) => {
  const particleCount = intensity === 'low' ? 30 : intensity === 'medium' ? 50 : 80;
  
  return (
    <div className={`fixed inset-0 overflow-hidden pointer-events-none ${className}`}>
      {/* Main gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black" />
      
      {/* Enhanced animated gradient overlay with GPU acceleration */}
      <motion.div
        className="absolute inset-0 opacity-70"
        style={{
          background: 'radial-gradient(circle at 20% 50%, rgba(212, 175, 55, 0.15) 0%, transparent 60%), radial-gradient(circle at 80% 20%, rgba(156, 163, 175, 0.12) 0%, transparent 60%), radial-gradient(circle at 40% 80%, rgba(212, 175, 55, 0.1) 0%, transparent 60%)',
          willChange: 'transform, background',
          transform: 'translateZ(0)' // Force GPU layer
        }}
        animate={{
          background: [
            'radial-gradient(circle at 20% 50%, rgba(212, 175, 55, 0.15) 0%, transparent 60%), radial-gradient(circle at 80% 20%, rgba(156, 163, 175, 0.12) 0%, transparent 60%), radial-gradient(circle at 40% 80%, rgba(212, 175, 55, 0.1) 0%, transparent 60%)',
            'radial-gradient(circle at 80% 30%, rgba(212, 175, 55, 0.18) 0%, transparent 60%), radial-gradient(circle at 20% 70%, rgba(156, 163, 175, 0.15) 0%, transparent 60%), radial-gradient(circle at 60% 20%, rgba(212, 175, 55, 0.12) 0%, transparent 60%)',
            'radial-gradient(circle at 40% 70%, rgba(212, 175, 55, 0.15) 0%, transparent 60%), radial-gradient(circle at 70% 40%, rgba(156, 163, 175, 0.12) 0%, transparent 60%), radial-gradient(circle at 30% 30%, rgba(212, 175, 55, 0.1) 0%, transparent 60%)',
            'radial-gradient(circle at 60% 10%, rgba(156, 163, 175, 0.14) 0%, transparent 60%), radial-gradient(circle at 10% 60%, rgba(212, 175, 55, 0.16) 0%, transparent 60%), radial-gradient(circle at 90% 90%, rgba(156, 163, 175, 0.1) 0%, transparent 60%)',
            'radial-gradient(circle at 20% 50%, rgba(212, 175, 55, 0.15) 0%, transparent 60%), radial-gradient(circle at 80% 20%, rgba(156, 163, 175, 0.12) 0%, transparent 60%), radial-gradient(circle at 40% 80%, rgba(212, 175, 55, 0.1) 0%, transparent 60%)'
          ]
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: 'linear'
        }}
      />
      
      {/* Enhanced aurora-style blurred glow blobs with GPU acceleration */}
      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full opacity-25 blur-3xl"
        style={{
          background: 'radial-gradient(circle, rgba(212, 175, 55, 0.6) 0%, rgba(212, 175, 55, 0.3) 30%, rgba(212, 175, 55, 0.1) 50%, transparent 80%)',
          willChange: 'transform',
          transform: 'translateZ(0)'
        }}
        animate={{
          x: ['-25%', '125%', '-25%'],
          y: ['-15%', '115%', '-15%'],
          scale: [0.8, 1.4, 0.9, 0.8],
          rotate: [0, 180, 360]
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
      />
      
      <motion.div
        className="absolute w-[400px] h-[400px] rounded-full opacity-20 blur-3xl"
        style={{
          background: 'radial-gradient(circle, rgba(156, 163, 175, 0.5) 0%, rgba(156, 163, 175, 0.2) 35%, rgba(156, 163, 175, 0.1) 55%, transparent 80%)',
          willChange: 'transform',
          transform: 'translateZ(0)'
        }}
        animate={{
          x: ['125%', '-25%', '125%'],
          y: ['115%', '-15%', '115%'],
          scale: [0.7, 1.3, 1.1, 0.7],
          rotate: [360, 180, 0]
        }}
        transition={{
          duration: 35,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 8
        }}
      />
      
      <motion.div
        className="absolute w-[300px] h-[300px] rounded-full opacity-15 blur-2xl"
        style={{
          background: 'radial-gradient(circle, rgba(212, 175, 55, 0.7) 0%, rgba(212, 175, 55, 0.4) 25%, rgba(212, 175, 55, 0.2) 45%, transparent 70%)',
          willChange: 'transform',
          transform: 'translateZ(0)'
        }}
        animate={{
          x: ['50%', '10%', '90%', '30%', '50%'],
          y: ['20%', '80%', '30%', '70%', '20%'],
          scale: [1, 0.6, 1.5, 0.9, 1],
          rotate: [0, 90, 180, 270, 360]
        }}
        transition={{
          duration: 40,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 15
        }}
      />
      
      {/* Additional smaller aurora blobs for more depth */}
      <motion.div
        className="absolute w-[200px] h-[200px] rounded-full opacity-12 blur-xl"
        style={{
          background: 'radial-gradient(circle, rgba(156, 163, 175, 0.6) 0%, rgba(156, 163, 175, 0.3) 40%, transparent 70%)',
          willChange: 'transform',
          transform: 'translateZ(0)'
        }}
        animate={{
          x: ['80%', '20%', '80%'],
          y: ['60%', '40%', '60%'],
          scale: [0.5, 1.2, 0.5],
          opacity: [0.05, 0.15, 0.05]
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 5
        }}
      />
      
      {/* Enhanced floating particles with better GPU acceleration */}
      {Array.from({ length: particleCount }).map((_, i) => {
        const size = Math.random() * 3 + 1;
        const isGold = Math.random() > 0.3;
        
        return (
          <motion.div
            key={i}
            className={`absolute rounded-full ${
              isGold ? 'bg-yellow-400' : 'bg-gray-300'
            }`}
            style={{
              width: `${size}px`,
              height: `${size}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              willChange: 'transform',
              transform: 'translateZ(0)'
            }}
            animate={{
              y: [0, -40 - Math.random() * 20, 0],
              x: [0, Math.random() * 30 - 15, 0],
              opacity: [0.1, 0.8, 0.1],
              scale: [0.3, 1.2, 0.3]
            }}
            transition={{
              duration: 4 + Math.random() * 6,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: Math.random() * 8
            }}
          />
        );
      })}
      
      {/* Enhanced subtle grid pattern overlay */}
      <motion.div 
        className="absolute inset-0 opacity-8"
        style={{
          backgroundImage: `
            linear-gradient(rgba(212, 175, 55, 0.15) 1px, transparent 1px),
            linear-gradient(90deg, rgba(212, 175, 55, 0.15) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
          willChange: 'transform',
          transform: 'translateZ(0)'
        }}
        animate={{
          backgroundPosition: ['0px 0px', '60px 60px', '0px 0px']
        }}
        transition={{
          duration: 50,
          repeat: Infinity,
          ease: 'linear'
        }}
      />
      
      {/* Subtle noise texture overlay for depth */}
      <div 
        className="absolute inset-0 opacity-5 mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          transform: 'translateZ(0)'
        }}
      />
    </div>
  );
};