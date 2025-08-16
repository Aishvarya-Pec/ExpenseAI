import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import PerformanceOptimizer from '../../utils/performanceOptimizer';

interface EnhancedMagneticButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost' | 'neon' | 'holographic' | 'plasma';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  magneticStrength?: number;
  rippleEffect?: boolean;
  glowEffect?: boolean;
  morphEffect?: boolean;
  soundEffect?: boolean;
}

const EnhancedMagneticButton: React.FC<EnhancedMagneticButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  onClick,
  disabled = false,
  magneticStrength = 0.3,
  rippleEffect = true,
  glowEffect = true,
  morphEffect = true,
  soundEffect = false
}) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const rippleRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const borderRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [, setIsPressed] = useState(false);
  const optimizer = PerformanceOptimizer.getInstance();

  useEffect(() => {
    const button = buttonRef.current;
    const glow = glowRef.current;
    const text = textRef.current;
    const border = borderRef.current;
    
    if (!button || disabled) return;

    // Enhanced magnetic effect with momentum
    const handleMouseMove = (e: MouseEvent) => {
      const rect = button.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const deltaX = e.clientX - centerX;
      const deltaY = e.clientY - centerY;
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
      const maxDistance = Math.max(rect.width, rect.height);
      const strength = Math.min(distance / maxDistance, 1) * magneticStrength;
      
      const x = deltaX * strength;
      const y = deltaY * strength;
      
      // Button movement with momentum
      gsap.to(button, optimizer.getOptimizedAnimationConfig({
        x: x,
        y: y,
        rotation: x * 0.1,
        duration: 0.4,
        ease: 'power2.out'
      }));
      
      // Text counter-movement for depth effect
      if (text && morphEffect) {
        gsap.to(text, optimizer.getOptimizedAnimationConfig({
          x: -x * 0.2,
          y: -y * 0.2,
          duration: 0.4,
          ease: 'power2.out'
        }));
      }
      
      // Dynamic glow following cursor
      if (glow && glowEffect) {
        gsap.to(glow, optimizer.getOptimizedAnimationConfig({
          x: deltaX * 0.1,
          y: deltaY * 0.1,
          duration: 0.3,
          ease: 'power2.out'
        }));
      }
    };

    const handleMouseEnter = () => {
      setIsHovered(true);
      
      // Enhanced hover animations
      gsap.to(button, optimizer.getOptimizedAnimationConfig({
        scale: 1.05,
        duration: 0.3,
        ease: 'back.out(1.7)'
      }));
      
      if (glowEffect && glow) {
        gsap.to(glow, optimizer.getOptimizedAnimationConfig({
          opacity: 1,
          scale: 1.2,
          duration: 0.3,
          ease: 'power2.out'
        }));
      }
      
      if (morphEffect && border) {
        gsap.to(border, optimizer.getOptimizedAnimationConfig({
          scale: 1.1,
          opacity: 0.8,
          duration: 0.3,
          ease: 'power2.out'
        }));
      }
      
      // Text animation
      if (text) {
        gsap.to(text, optimizer.getOptimizedAnimationConfig({
          scale: 1.02,
          duration: 0.3,
          ease: 'back.out(1.7)'
        }));
      }
    };

    const handleMouseLeave = () => {
      setIsHovered(false);
      
      // Return to original state with elastic animation
      gsap.to(button, optimizer.getOptimizedAnimationConfig({
        x: 0,
        y: 0,
        rotation: 0,
        scale: 1,
        duration: 0.6,
        ease: 'elastic.out(1, 0.3)'
      }));
      
      if (text) {
        gsap.to(text, optimizer.getOptimizedAnimationConfig({
          x: 0,
          y: 0,
          scale: 1,
          duration: 0.6,
          ease: 'elastic.out(1, 0.3)'
        }));
      }
      
      if (glow && glowEffect) {
        gsap.to(glow, optimizer.getOptimizedAnimationConfig({
          opacity: 0,
          scale: 1,
          x: 0,
          y: 0,
          duration: 0.4,
          ease: 'power2.out'
        }));
      }
      
      if (border && morphEffect) {
        gsap.to(border, optimizer.getOptimizedAnimationConfig({
          scale: 1,
          opacity: 0,
          duration: 0.4,
          ease: 'power2.out'
        }));
      }
    };

    const handleMouseDown = () => {
      setIsPressed(true);
      
      gsap.to(button, optimizer.getOptimizedAnimationConfig({
        scale: 0.95,
        duration: 0.1,
        ease: 'power2.out'
      }));
    };

    const handleMouseUp = () => {
      setIsPressed(false);
      
      gsap.to(button, optimizer.getOptimizedAnimationConfig({
        scale: isHovered ? 1.05 : 1,
        duration: 0.2,
        ease: 'back.out(1.7)'
      }));
    };

    const handleClick = (e: MouseEvent) => {
      // Enhanced ripple effect
      if (rippleEffect && rippleRef.current) {
        const rect = button.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        gsap.set(rippleRef.current, {
          x: x - 75,
          y: y - 75,
          scale: 0,
          opacity: 0.8
        });
        
        gsap.to(rippleRef.current, optimizer.getOptimizedAnimationConfig({
          scale: 6,
          opacity: 0,
          duration: 0.8,
          ease: 'power2.out'
        }));
      }
      
      // Button press animation
      gsap.to(button, optimizer.getOptimizedAnimationConfig({
        scale: 0.9,
        duration: 0.1,
        ease: 'power2.out',
        yoyo: true,
        repeat: 1
      }));
      
      // Sound effect (if enabled)
      if (soundEffect) {
        // You can add Web Audio API sound here
      }
      
      if (onClick) onClick();
    };

    button.addEventListener('mousemove', handleMouseMove);
    button.addEventListener('mouseenter', handleMouseEnter);
    button.addEventListener('mouseleave', handleMouseLeave);
    button.addEventListener('mousedown', handleMouseDown);
    button.addEventListener('mouseup', handleMouseUp);
    button.addEventListener('click', handleClick);

    return () => {
      button.removeEventListener('mousemove', handleMouseMove);
      button.removeEventListener('mouseenter', handleMouseEnter);
      button.removeEventListener('mouseleave', handleMouseLeave);
      button.removeEventListener('mousedown', handleMouseDown);
      button.removeEventListener('mouseup', handleMouseUp);
      button.removeEventListener('click', handleClick);
    };
  }, [disabled, onClick, magneticStrength, rippleEffect, glowEffect, morphEffect, soundEffect, isHovered]);

  const getVariantClasses = () => {
    switch (variant) {
      case 'primary':
        return 'bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 hover:from-cyan-400 hover:via-blue-500 hover:to-purple-500 text-white shadow-lg';
      case 'secondary':
        return 'bg-gradient-to-r from-gray-700 via-gray-600 to-gray-500 hover:from-gray-600 hover:via-gray-500 hover:to-gray-400 text-white border border-gray-400';
      case 'ghost':
        return 'bg-transparent border-2 border-cyan-400 text-cyan-400 hover:bg-cyan-400/10 hover:border-cyan-300';
      case 'neon':
        return 'bg-black border-2 border-cyan-400 text-cyan-400 shadow-lg shadow-cyan-400/50 hover:shadow-cyan-400/80';
      case 'holographic':
        return 'bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 hover:from-pink-400 hover:via-purple-400 hover:to-cyan-400 text-white';
      case 'plasma':
        return 'bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 hover:from-orange-400 hover:via-red-400 hover:to-pink-400 text-white';
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
      case 'xl':
        return 'px-10 py-5 text-xl';
      default:
        return '';
    }
  };

  const getGlowClasses = () => {
    switch (variant) {
      case 'neon':
        return 'shadow-cyan-400/50';
      case 'holographic':
        return 'shadow-purple-500/50';
      case 'plasma':
        return 'shadow-red-500/50';
      default:
        return 'shadow-cyan-500/30';
    }
  };

  return (
    <button
      ref={buttonRef}
      className={`
        relative overflow-hidden rounded-xl font-semibold transition-all duration-200 
        transform disabled:opacity-50 disabled:cursor-not-allowed
        ${getVariantClasses()} ${getSizeClasses()} ${className}
      `}
      disabled={disabled}
    >
      {/* Animated border */}
      {morphEffect && (
        <div
          ref={borderRef}
          className="absolute inset-0 rounded-xl border-2 border-white/30 opacity-0"
        />
      )}
      
      {/* Dynamic glow effect */}
      {glowEffect && (
        <div
          ref={glowRef}
          className={`absolute inset-0 rounded-xl blur-xl opacity-0 ${getGlowClasses()}`}
        />
      )}
      
      {/* Text content with counter-animation */}
      <div ref={textRef} className="relative z-10">
        {children}
      </div>
      
      {/* Enhanced ripple effect */}
      {rippleEffect && (
        <div
          ref={rippleRef}
          className="absolute w-32 h-32 bg-white/20 rounded-full pointer-events-none"
          style={{ transform: 'translate(-50%, -50%)' }}
        />
      )}
      
      {/* Particle effects for special variants */}
      {(variant === 'neon' || variant === 'holographic') && (
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-2 left-2 w-1 h-1 bg-white/60 rounded-full animate-pulse" />
          <div className="absolute top-4 right-3 w-1 h-1 bg-white/40 rounded-full animate-pulse delay-300" />
          <div className="absolute bottom-3 left-4 w-1 h-1 bg-white/50 rounded-full animate-pulse delay-700" />
        </div>
      )}
    </button>
  );
};

export default EnhancedMagneticButton;