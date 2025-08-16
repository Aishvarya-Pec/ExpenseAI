import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Sparkle {
  id: string;
  x: number;
  y: number;
  size: number;
  delay: number;
}

interface SparklesProps {
  children: React.ReactNode;
  className?: string;
  density?: number;
  color?: 'gold' | 'black' | 'mixed';
}

const Sparkles: React.FC<SparklesProps> = ({ 
  children, 
  className = '', 
  density = 15,
  color = 'mixed'
}) => {
  const [sparkles, setSparkles] = useState<Sparkle[]>([]);

  const generateSparkle = (): Sparkle => {
    return {
      id: Math.random().toString(36).substr(2, 9),
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 8 + 4,
      delay: Math.random() * 2
    };
  };

  useEffect(() => {
    const initialSparkles = Array.from({ length: density }, generateSparkle);
    setSparkles(initialSparkles);

    const interval = setInterval(() => {
      setSparkles(current => {
        const newSparkles = [...current];
        const indexToReplace = Math.floor(Math.random() * newSparkles.length);
        newSparkles[indexToReplace] = generateSparkle();
        return newSparkles;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [density]);

  const getSparkleColor = (index: number) => {
    if (color === 'gold') return '#FFD700';
    if (color === 'black') return '#000000';
    return index % 2 === 0 ? '#FFD700' : '#1a1a1a';
  };

  return (
    <div className={`relative ${className}`}>
      {children}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <AnimatePresence>
          {sparkles.map((sparkle, index) => (
            <motion.div
              key={sparkle.id}
              initial={{ opacity: 0, scale: 0, rotate: 0 }}
              animate={{ 
                opacity: [0, 1, 0], 
                scale: [0, 1, 0],
                rotate: [0, 180, 360]
              }}
              exit={{ opacity: 0, scale: 0 }}
              transition={{
                duration: 2,
                delay: sparkle.delay,
                repeat: Infinity,
                repeatDelay: Math.random() * 3 + 1
              }}
              style={{
                position: 'absolute',
                left: `${sparkle.x}%`,
                top: `${sparkle.y}%`,
                width: sparkle.size,
                height: sparkle.size,
              }}
            >
              <div
                className="w-full h-full"
                style={{
                  background: `radial-gradient(circle, ${getSparkleColor(index)} 0%, transparent 70%)`,
                  borderRadius: '50%',
                  boxShadow: `0 0 ${sparkle.size}px ${getSparkleColor(index)}40`
                }}
              />
              {/* Star shape */}
              <div
                className="absolute inset-0 flex items-center justify-center"
                style={{
                  color: getSparkleColor(index),
                  fontSize: sparkle.size * 0.8
                }}
              >
                ✦
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Sparkles;