import React from 'react'
import { motion } from 'framer-motion'

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl'
  showText?: boolean
  className?: string
  animated?: boolean
}

const sizeClasses = {
  sm: 'w-8 h-8',
  md: 'w-10 h-10',
  lg: 'w-12 h-12',
  xl: 'w-16 h-16'
}

const textSizeClasses = {
  sm: 'text-lg',
  md: 'text-xl',
  lg: 'text-2xl',
  xl: 'text-3xl'
}

export const Logo: React.FC<LogoProps> = ({ 
  size = 'md', 
  showText = true, 
  className = '',
  animated = false 
}) => {
  const LogoIcon = () => (
    <div className={`${sizeClasses[size]} bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-500 rounded-xl flex items-center justify-center shadow-lg relative overflow-hidden ${className}`}>
      {/* Background pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent"></div>
      
      {/* Main icon */}
      <svg 
        viewBox="0 0 24 24" 
        fill="none" 
        className="w-3/5 h-3/5 text-white relative z-10"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Dollar sign with AI circuit pattern */}
        <path
          d="M12 2C12.5523 2 13 2.44772 13 3V4.1C15.8377 4.56329 18 7.02102 18 10C18 10.5523 17.5523 11 17 11C16.4477 11 16 10.5523 16 10C16 8.34315 14.6569 7 13 7H11C9.34315 7 8 8.34315 8 10C8 11.6569 9.34315 13 11 13H13C16.3137 13 19 15.6863 19 19C19 21.979 16.8377 24.4367 14 24.9V26C14 26.5523 13.5523 27 13 27H11C10.4477 27 10 26.5523 10 26V24.9C7.16229 24.4367 5 21.979 5 19C5 18.4477 5.44772 18 6 18C6.55228 18 7 18.4477 7 19C7 20.6569 8.34315 22 10 22H14C15.6569 22 17 20.6569 17 19C17 17.3431 15.6569 16 14 16H10C6.68629 16 4 13.3137 4 10C4 7.02102 6.16229 4.56329 9 4.1V3C9 2.44772 9.44772 2 10 2H12Z"
          fill="currentColor"
        />
        
        {/* AI neural network dots */}
        <circle cx="6" cy="6" r="1" fill="currentColor" opacity="0.6" />
        <circle cx="18" cy="6" r="1" fill="currentColor" opacity="0.6" />
        <circle cx="6" cy="18" r="1" fill="currentColor" opacity="0.6" />
        <circle cx="18" cy="18" r="1" fill="currentColor" opacity="0.6" />
        
        {/* Connection lines */}
        <path
          d="M6 6L12 12M18 6L12 12M6 18L12 12M18 18L12 12"
          stroke="currentColor"
          strokeWidth="0.5"
          opacity="0.4"
        />
      </svg>
      
      {/* Sparkle effect */}
      {animated && (
        <>
          <motion.div
            className="absolute top-1 right-1 w-1 h-1 bg-white rounded-full"
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0 }}
          />
          <motion.div
            className="absolute bottom-1 left-1 w-1 h-1 bg-white rounded-full"
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
          />
          <motion.div
            className="absolute top-1/2 right-0 w-0.5 h-0.5 bg-white rounded-full"
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 2, repeat: Infinity, delay: 1 }}
          />
        </>
      )}
    </div>
  )

  if (!showText) {
    return animated ? (
      <motion.div
        whileHover={{ scale: 1.1, rotate: 5 }}
        transition={{ type: "spring", stiffness: 300, damping: 10 }}
      >
        <LogoIcon />
      </motion.div>
    ) : (
      <LogoIcon />
    )
  }

  return (
    <div className={`flex items-center space-x-3 ${className}`}>
      {animated ? (
        <motion.div
          whileHover={{ scale: 1.1, rotate: 5 }}
          transition={{ type: "spring", stiffness: 300, damping: 10 }}
        >
          <LogoIcon />
        </motion.div>
      ) : (
        <LogoIcon />
      )}
      
      {showText && (
        <div className="flex flex-col">
          <span className={`font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent ${textSizeClasses[size]}`}>
            ExpenseAI
          </span>
          {size === 'lg' || size === 'xl' ? (
            <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">
              Smart Finance
            </span>
          ) : null}
        </div>
      )}
    </div>
  )
}

// Alternative circular logo
export const LogoCircular: React.FC<LogoProps> = ({ 
  size = 'md', 
  showText = true, 
  className = '',
  animated = false 
}) => {
  const CircularIcon = () => (
    <div className={`${sizeClasses[size]} bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-500 rounded-full flex items-center justify-center shadow-lg relative overflow-hidden ${className}`}>
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-transparent to-black/20 rounded-full"></div>
      
      {/* Main icon */}
      <svg 
        viewBox="0 0 24 24" 
        fill="none" 
        className="w-3/5 h-3/5 text-white relative z-10"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12 1L14.5 8.5L22 9L16 14L18 22L12 18L6 22L8 14L2 9L9.5 8.5L12 1Z"
          fill="currentColor"
          opacity="0.9"
        />
        <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.6" />
        <text x="12" y="16" textAnchor="middle" className="text-xs font-bold" fill="currentColor">AI</text>
      </svg>
      
      {/* Animated ring */}
      {animated && (
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-white/50"
          animate={{ rotate: 360 }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        />
      )}
    </div>
  )

  if (!showText) {
    return animated ? (
      <motion.div
        whileHover={{ scale: 1.1 }}
        transition={{ type: "spring", stiffness: 300, damping: 10 }}
      >
        <CircularIcon />
      </motion.div>
    ) : (
      <CircularIcon />
    )
  }

  return (
    <div className={`flex items-center space-x-3 ${className}`}>
      {animated ? (
        <motion.div
          whileHover={{ scale: 1.1 }}
          transition={{ type: "spring", stiffness: 300, damping: 10 }}
        >
          <CircularIcon />
        </motion.div>
      ) : (
        <CircularIcon />
      )}
      
      {showText && (
        <div className="flex flex-col">
          <span className={`font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent ${textSizeClasses[size]}`}>
            ExpenseAI
          </span>
          {size === 'lg' || size === 'xl' ? (
            <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">
              Smart Finance
            </span>
          ) : null}
        </div>
      )}
    </div>
  )
}