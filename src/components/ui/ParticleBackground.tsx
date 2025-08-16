import React from 'react';
import { motion } from 'framer-motion';

interface ParticleBackgroundProps {
  density?: number;
  color?: 'gold' | 'black' | 'mixed';
  size?: 'small' | 'medium' | 'large';
  speed?: 'slow' | 'medium' | 'fast';
  className?: string;
}

export const ParticleBackground: React.FC<ParticleBackgroundProps> = ({
  density = 30,
  color = 'mixed',
  size = 'medium',
  speed = 'medium',
  className = ''
}) => {
  const particles = Array.from({ length: density }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: getParticleSize(size),
    duration: getParticleDuration(speed),
    delay: Math.random() * 5
  }));

  function getParticleSize(sizeType: string) {
    switch (sizeType) {
      case 'small': return Math.random() * 2 + 1;
      case 'large': return Math.random() * 6 + 3;
      default: return Math.random() * 4 + 2;
    }
  }

  function getParticleDuration(speedType: string) {
    switch (speedType) {
      case 'slow': return Math.random() * 30 + 20;
      case 'fast': return Math.random() * 10 + 5;
      default: return Math.random() * 20 + 10;
    }
  }

  function getParticleColor(index: number) {
    if (color === 'gold') return 'bg-gradient-to-r from-yellow-400/30 to-amber-500/30';
    if (color === 'black') return 'bg-gradient-to-r from-gray-800/40 to-black/40';
    return index % 3 === 0 
      ? 'bg-gradient-to-r from-yellow-400/30 to-amber-500/30'
      : index % 3 === 1
      ? 'bg-gradient-to-r from-amber-500/20 to-yellow-600/20'
      : 'bg-gradient-to-r from-gray-700/30 to-gray-900/30';
  }

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {particles.map(particle => (
        <motion.div
          key={particle.id}
          className={`absolute rounded-full ${getParticleColor(particle.id)}`}
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: particle.size,
            height: particle.size
          }}
          animate={{
            y: [0, -100, 0],
            x: [0, Math.random() * 50 - 25, 0],
            opacity: [0, 1, 0],
            scale: [0, 1, 0.5, 0]
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: particle.delay
          }}
        />
      ))}
    </div>
  );
};