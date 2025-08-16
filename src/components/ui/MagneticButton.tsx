import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

interface MagneticButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
}

const MagneticButton: React.FC<MagneticButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  onClick,
  disabled = false
}) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const rippleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const button = buttonRef.current;
    if (!button || disabled) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = button.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      
      gsap.to(button, {
        x: x * 0.3,
        y: y * 0.3,
        duration: 0.3,
        ease: 'power2.out'
      });
    };

    const handleMouseLeave = () => {
      gsap.to(button, {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: 'elastic.out(1, 0.3)'
      });
    };

    const handleClick = (e: MouseEvent) => {
      if (rippleRef.current) {
        const rect = button.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        gsap.set(rippleRef.current, {
          x: x - 50,
          y: y - 50,
          scale: 0,
          opacity: 1
        });
        
        gsap.to(rippleRef.current, {
          scale: 4,
          opacity: 0,
          duration: 0.6,
          ease: 'power2.out'
        });
      }
      
      if (onClick) onClick();
    };

    button.addEventListener('mousemove', handleMouseMove);
    button.addEventListener('mouseleave', handleMouseLeave);
    button.addEventListener('click', handleClick);

    return () => {
      button.removeEventListener('mousemove', handleMouseMove);
      button.removeEventListener('mouseleave', handleMouseLeave);
      button.removeEventListener('click', handleClick);
    };
  }, [disabled, onClick]);

  const getVariantClasses = () => {
    switch (variant) {
      case 'primary':
        return 'bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white shadow-lg hover:shadow-cyan-500/25';
      case 'secondary':
        return 'bg-gradient-to-r from-gray-700 to-gray-600 hover:from-gray-600 hover:to-gray-500 text-white border border-gray-500';
      case 'ghost':
        return 'bg-transparent border-2 border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-black';
      default:
        return '';
    }
  };

  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return 'px-4 py-2 text-sm';
      case 'md':
        return 'px-6 py-3 text-base';
      case 'lg':
        return 'px-8 py-4 text-lg';
      default:
        return '';
    }
  };

  return (
    <button
      ref={buttonRef}
      className={`
        relative overflow-hidden rounded-xl font-semibold transition-all duration-200 
        transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed
        ${getVariantClasses()} ${getSizeClasses()} ${className}
      `}
      disabled={disabled}
    >
      <div className="relative z-10">
        {children}
      </div>
      <div
        ref={rippleRef}
        className="absolute w-24 h-24 bg-white/30 rounded-full pointer-events-none"
        style={{ transform: 'translate(-50%, -50%)' }}
      />
    </button>
  );
};

export default MagneticButton;