import React from 'react';
import { motion } from 'framer-motion';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'xxl';
  showText?: boolean;
  className?: string;
  animated?: boolean;
  imagePath?: string;
}

const sizeClasses = {
  sm: 'w-10 h-10',
  md: 'w-14 h-14',
  lg: 'w-16 h-16',
  xl: 'w-20 h-20',
  xxl: 'w-28 h-28'
};

const textSizeClasses = {
  sm: 'text-xl',
  md: 'text-2xl',
  lg: 'text-3xl',
  xl: 'text-4xl',
  xxl: 'text-6xl'
};

export const Logo: React.FC<LogoProps> = ({
  size = 'md',
  showText = true,
  className = '',
  animated = false,
  imagePath = '/logo.png' // Default path for the logo image
}) => {
  const LogoIcon = () => (
    <div className={`${sizeClasses[size]} bg-gradient-to-br from-yellow-500 via-yellow-400 to-yellow-600 rounded-xl flex items-center justify-center shadow-xl relative overflow-hidden ${className} border border-yellow-400/20`}>
      <div className="absolute inset-0 bg-gradient-to-br from-white/30 to-transparent"></div>

      {/* Use the image if provided, otherwise fall back to SVG */}
      {imagePath ? (
        <img
          src={imagePath}
          alt="ExpenseAI Logo"
          className="w-full h-full object-contain relative z-10"
          onError={(e) => {
            // Fallback to SVG if image fails to load
            const target = e.target as HTMLImageElement;
            target.style.display = 'none';
            const svgFallback = target.parentElement?.querySelector('.svg-fallback') as HTMLElement;
            if (svgFallback) {
              svgFallback.style.display = 'block';
            }
          }}
        />
      ) : null}

      {/* SVG Fallback */}
      <svg
        viewBox="0 0 32 32"
        fill="none"
        className={`w-4/5 h-4/5 text-black relative z-10 ${imagePath ? 'svg-fallback hidden' : ''}`}
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Piggy Bank Body - Left Half (Solid Gold) */}
        <path
          d="M6 8C6 6.89543 6.89543 6 8 6H12C13.1046 6 14 6.89543 14 8V24C14 25.1046 13.1046 26 12 26H8C6.89543 26 6 25.1046 6 24V8Z"
          fill="currentColor"
          opacity="0.9"
        />
        
        {/* Piggy Bank Body - Right Half (Circuit Board) */}
        <path
          d="M14 8C14 6.89543 14.8954 6 16 6H20C21.1046 6 22 6.89543 22 8V24C22 25.1046 21.1046 26 20 26H16C14.8954 26 14 25.1046 14 24V8Z"
          fill="currentColor"
          opacity="0.7"
        />
        
        {/* Circuit Board Lines */}
        <path
          d="M15 10H21M15 14H21M15 18H21M15 22H21"
          stroke="currentColor"
          strokeWidth="0.5"
          opacity="0.8"
        />
        
        {/* Circuit Board Connection Points */}
        <circle cx="16" cy="10" r="0.5" fill="currentColor" opacity="0.9" />
        <circle cx="16" cy="14" r="0.5" fill="currentColor" opacity="0.9" />
        <circle cx="16" cy="18" r="0.5" fill="currentColor" opacity="0.9" />
        <circle cx="16" cy="22" r="0.5" fill="currentColor" opacity="0.9" />
        
        {/* AI Letters in Circuit Board */}
        <text x="17" y="12" fontSize="2" fill="currentColor" opacity="0.8" fontWeight="bold">A</text>
        <text x="17" y="16" fontSize="2" fill="currentColor" opacity="0.8" fontWeight="bold">I</text>
        
        {/* AI Glow Effect */}
        <circle cx="18" cy="14" r="1" fill="currentColor" opacity="0.3">
          {animated && (
            <animate
              attributeName="opacity"
              values="0.3;0.8;0.3"
              dur="2s"
              repeatCount="indefinite"
            />
          )}
        </circle>
        
        {/* Piggy Bank Eye */}
        <circle cx="10" cy="12" r="1" fill="currentColor" opacity="0.8" />
        
        {/* Coin Slot */}
        <rect x="9" y="4" width="2" height="1" fill="currentColor" opacity="0.7" />
        
        {/* AI Coin */}
        <circle cx="10" cy="3" r="1.5" fill="currentColor" opacity="0.9" />
        <text x="9.5" y="4" fontSize="1.5" fill="currentColor" opacity="0.8" fontWeight="bold">AI</text>
        
        {/* Connecting Lines from AI Coin */}
        <path
          d="M10 1.5L12 3M10 1.5L14 5M10 1.5L16 7"
          stroke="currentColor"
          strokeWidth="0.3"
          opacity="0.6"
        />
        
        {/* Reflection Effect */}
        <path
          d="M6 28L26 28"
          stroke="currentColor"
          strokeWidth="0.5"
          opacity="0.2"
        />
      </svg>

      {animated && (
        <>
          <motion.div
            className="absolute top-1 right-1 w-1 h-1 bg-black rounded-full"
            animate={{ opacity: [0, 1, 0], scale: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0 }}
          />
          <motion.div
            className="absolute bottom-1 left-1 w-1 h-1 bg-black rounded-full"
            animate={{ opacity: [0, 1, 0], scale: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.7 }}
          />
          <motion.div
            className="absolute top-1/3 right-0 w-0.5 h-0.5 bg-black rounded-full"
            animate={{ opacity: [0, 1, 0], scale: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity, delay: 1.4 }}
          />
        </>
      )}
    </div>
  );

  const content = animated ? (
    <motion.div
      whileHover={{ scale: 1.1, rotate: 2 }}
      transition={{ type: 'spring', stiffness: 300, damping: 10 }}
    >
      <LogoIcon />
    </motion.div>
  ) : (
    <LogoIcon />
  );

  return showText ? (
    <div className={`flex items-center space-x-3 ${className}`}>
      {content}
      <div className="flex flex-col">
        <span className={`font-bold bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 bg-clip-text text-transparent ${textSizeClasses[size]}`}>
          ExpenseAI
        </span>
        {(size === 'lg' || size === 'xl') && (
          <span className="text-xs text-gray-400 font-medium">
            Smart Finance
          </span>
        )}
      </div>
    </div>
  ) : (
    content
  );
};

export const LogoCircular: React.FC<LogoProps> = ({
  size = 'md',
  showText = true,
  className = '',
  animated = false,
  imagePath = '/logo.png'
}) => {
  const CircularIcon = () => (
    <div className={`${sizeClasses[size]} bg-gradient-to-br from-yellow-500 via-yellow-400 to-yellow-600 rounded-full flex items-center justify-center shadow-xl relative overflow-hidden ${className} border-2 border-yellow-400/30`}>
      <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-black/10 rounded-full"></div>

      {/* Use the image if provided, otherwise fall back to SVG */}
      {imagePath ? (
        <img
          src={imagePath}
          alt="ExpenseAI Logo"
          className="w-full h-full object-contain relative z-10"
          onError={(e) => {
            // Fallback to SVG if image fails to load
            const target = e.target as HTMLImageElement;
            target.style.display = 'none';
            const svgFallback = target.parentElement?.querySelector('.svg-fallback') as HTMLElement;
            if (svgFallback) {
              svgFallback.style.display = 'block';
            }
          }}
        />
      ) : null}

      {/* SVG Fallback */}
      <svg
        viewBox="0 0 24 24"
        fill="none"
        className={`w-3/5 h-3/5 text-black relative z-10 ${imagePath ? 'svg-fallback hidden' : ''}`}
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Piggy Bank Body - Left Half */}
        <path
          d="M4 6C4 4.89543 4.89543 4 6 4H10C11.1046 4 12 4.89543 12 6V20C12 21.1046 11.1046 22 10 22H6C4.89543 22 4 21.1046 4 20V6Z"
          fill="currentColor"
          opacity="0.9"
        />
        
        {/* Piggy Bank Body - Right Half (Circuit Board) */}
        <path
          d="M12 6C12 4.89543 12.8954 4 14 4H18C19.1046 4 20 4.89543 20 6V20C20 21.1046 19.1046 22 18 22H14C12.8954 22 12 21.1046 12 20V6Z"
          fill="currentColor"
          opacity="0.7"
        />
        
        {/* Circuit Board Elements */}
        <path
          d="M13 8H19M13 12H19M13 16H19"
          stroke="currentColor"
          strokeWidth="0.5"
          opacity="0.8"
        />
        
        {/* AI Letters */}
        <text x="14.5" y="10" fontSize="1.5" fill="currentColor" opacity="0.8" fontWeight="bold">A</text>
        <text x="14.5" y="14" fontSize="1.5" fill="currentColor" opacity="0.8" fontWeight="bold">I</text>
        
        {/* Piggy Bank Eye */}
        <circle cx="8" cy="10" r="0.8" fill="currentColor" opacity="0.8" />
        
        {/* AI Coin */}
        <circle cx="8" cy="3" r="1" fill="currentColor" opacity="0.9" />
        <text x="7.5" y="4" fontSize="1" fill="currentColor" opacity="0.8" fontWeight="bold">ai</text>
      </svg>

      {animated && (
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-black/30"
          animate={{ rotate: 360 }}
          transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
        />
      )}
    </div>
  );

  const content = animated ? (
    <motion.div
      whileHover={{ scale: 1.1 }}
      transition={{ type: 'spring', stiffness: 300, damping: 10 }}
    >
      <CircularIcon />
    </motion.div>
  ) : (
    <CircularIcon />
  );

  return showText ? (
    <div className={`flex items-center space-x-3 ${className}`}>
      {content}
      <div className="flex flex-col">
        <span className={`font-bold bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 bg-clip-text text-transparent ${textSizeClasses[size]}`}>
          ExpenseAI
        </span>
        {(size === 'lg' || size === 'xl') && (
          <span className="text-xs text-gray-400 font-medium">
            Smart Finance
          </span>
        )}
      </div>
    </div>
  ) : (
    content
  );
};


