import React from 'react';
import { motion } from 'framer-motion';

interface WobblyLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

const WobblyLogo: React.FC<WobblyLogoProps> = ({ 
  className = '', 
  size = 'md' 
}) => {
  const sizeClasses = {
    sm: 'w-16 h-16',
    md: 'w-24 h-24',
    lg: 'w-32 h-32',
    xl: 'w-48 h-48'
  };


  return (
    <motion.div
      className={`${sizeClasses[size]} ${className} cursor-pointer`}
      variants={{
        initial: {
          rotate: 0,
          scale: 1,
        },
        hover: {
          rotate: [0, -5, 5, -3, 3, 0],
          scale: [1, 1.05, 0.95, 1.02, 0.98, 1],
          transition: {
            duration: 0.6,
            ease: "easeInOut" as const,
            times: [0, 0.2, 0.4, 0.6, 0.8, 1],
          }
        }
      }}
      initial="initial"
      whileHover="hover"
    >
      <motion.img
        src="/logo2.png"
        alt="ExpenseAI Logo"
        className="w-full h-full object-contain filter drop-shadow-lg"
        whileHover={{
          filter: [
            "drop-shadow(0 0 0px #FFD700)",
            "drop-shadow(0 0 20px #FFD700)",
            "drop-shadow(0 0 10px #FFD700)"
          ]
        }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );
};

export default WobblyLogo;