import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface FuturisticTextProps {
  text: string;
  variant?: 'neon' | 'gradient' | 'glitch' | 'typewriter';
  className?: string;
  delay?: number;
}

const FuturisticText: React.FC<FuturisticTextProps> = ({
  text,
  variant = 'neon',
  className = '',
  delay = 0
}) => {
  const textRef = useRef<HTMLDivElement>(null);
  const lettersRef = useRef<HTMLSpanElement[]>([]);

  useEffect(() => {
    if (!textRef.current) return;

    const letters = lettersRef.current;
    
    switch (variant) {
      case 'neon':
        gsap.fromTo(letters, 
          { 
            opacity: 0,
            y: 50,
            rotationX: -90
          },
          {
            opacity: 1,
            y: 0,
            rotationX: 0,
            duration: 0.8,
            stagger: 0.05,
            delay,
            ease: 'back.out(1.7)'
          }
        );
        break;
        
      case 'gradient':
        gsap.fromTo(letters,
          {
            opacity: 0,
            scale: 0,
            rotation: 180
          },
          {
            opacity: 1,
            scale: 1,
            rotation: 0,
            duration: 0.6,
            stagger: 0.03,
            delay,
            ease: 'elastic.out(1, 0.3)'
          }
        );
        break;
        
      case 'glitch':
        gsap.fromTo(letters,
          {
            opacity: 0,
            x: () => Math.random() * 100 - 50,
            y: () => Math.random() * 100 - 50
          },
          {
            opacity: 1,
            x: 0,
            y: 0,
            duration: 0.5,
            stagger: 0.02,
            delay,
            ease: 'power2.out'
          }
        );
        break;
        
      case 'typewriter':
        gsap.fromTo(letters,
          {
            opacity: 0,
            width: 0
          },
          {
            opacity: 1,
            width: 'auto',
            duration: 0.1,
            stagger: 0.05,
            delay,
            ease: 'none'
          }
        );
        break;
    }
  }, [text, variant, delay]);

  const getVariantClasses = () => {
    switch (variant) {
      case 'neon':
        return 'text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 drop-shadow-[0_0_30px_rgba(147,51,234,0.5)]';
      case 'gradient':
        return 'text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500';
      case 'glitch':
        return 'text-white relative glitch-text';
      case 'typewriter':
        return 'text-green-400 font-mono';
      default:
        return 'text-white';
    }
  };

  return (
    <div 
      ref={textRef}
      className={`${getVariantClasses()} ${className} inline-block`}
    >
      {text.split('').map((char, index) => (
        <span
          key={index}
          ref={el => {
            if (el) lettersRef.current[index] = el;
          }}
          className="inline-block"
          style={{ transformOrigin: '50% 50%' }}
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </div>
  );
};

export default FuturisticText;