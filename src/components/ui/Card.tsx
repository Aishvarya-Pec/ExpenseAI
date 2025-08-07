import React from 'react';
import { motion } from 'framer-motion';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  gradient?: boolean;
}

export const Card: React.FC<CardProps> = ({ 
  children, 
  className = '', 
  hover = false,
  gradient = false 
}) => {
  const baseClasses = 'rounded-2xl p-6 transition-all duration-300';
  const backgroundClasses = gradient 
    ? 'bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg border border-white/20 dark:from-gray-800/50 dark:to-gray-900/50 dark:border-gray-700/50'
    : 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-lg';
  
  return (
    <motion.div
      whileHover={hover ? { y: -4, scale: 1.02 } : undefined}
      className={`${baseClasses} ${backgroundClasses} ${className}`}
    >
      {children}
    </motion.div>
  );
};