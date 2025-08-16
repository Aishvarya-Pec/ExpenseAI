import React, { useEffect, useRef } from 'react';
import { Particles } from '@tsparticles/react';
import { loadSlim } from '@tsparticles/slim';
import type { Engine } from '@tsparticles/engine';

interface CinematicBackgroundProps {
  videoSrc?: string;
  fallbackImage?: string;
  children?: React.ReactNode;
  className?: string;
  enableParticles?: boolean;
}

const CinematicBackground: React.FC<CinematicBackgroundProps> = ({
  videoSrc = '/video.mp4',
  fallbackImage = 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=1920&h=1080&fit=crop',
  children,
  className = '',
  enableParticles = true
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  const particlesInit = async (engine: Engine) => {
    await loadSlim(engine);
  };

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.playbackRate = 0.8; // Slow motion effect
    }
  }, []);

  const particlesConfig = {
    background: {
      color: {
        value: 'transparent',
      },
    },
    fpsLimit: 120,
    interactivity: {
      events: {
        onClick: {
          enable: true,
          mode: 'push',
        },
        onHover: {
          enable: true,
          mode: 'repulse',
        },
        resize: true,
      },
      modes: {
        push: {
          quantity: 4,
        },
        repulse: {
          distance: 200,
          duration: 0.4,
        },
      },
    },
    particles: {
      color: {
        value: ['#FFD700', '#FFA500', '#FF8C00', '#DAA520', '#B8860B'],
      },
      links: {
        color: '#FFD700',
        distance: 150,
        enable: true,
        opacity: 0.2,
        width: 1,
      },
      move: {
        direction: 'none',
        enable: true,
        outModes: {
          default: 'bounce',
        },
        random: false,
        speed: 1,
        straight: false,
      },
      number: {
        density: {
          enable: true,
          area: 800,
        },
        value: 80,
      },
      opacity: {
        value: 0.4,
        animation: {
          enable: true,
          speed: 1,
          minimumValue: 0.1,
        },
      },
      shape: {
        type: 'circle',
      },
      size: {
        value: { min: 1, max: 3 },
        animation: {
          enable: true,
          speed: 2,
          minimumValue: 0.5,
        },
      },
    },
    detectRetina: true,
  };

  return (
    <div className={`fixed inset-0 z-0 ${className}`}>
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          poster={fallbackImage}
        >
          <source src={videoSrc} type="video/mp4" />
          {/* Fallback for browsers that don't support video */}
          <div 
            className="w-full h-full bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${fallbackImage})` }}
          />
        </video>
        
        {/* Dark overlay for better text readability with gold tint */}
        <div className="absolute inset-0 bg-black/50 backdrop-blur-[1px]" />
        
        {/* Gold gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-900/20 via-transparent to-orange-900/20" />
      </div>

      {/* Particles Overlay */}
      {enableParticles && (
        <div className="absolute inset-0 z-10">
          <Particles
            id="cinematic-particles"
            init={particlesInit}
            options={{
              ...particlesConfig,
              interactivity: {
                ...particlesConfig.interactivity,
                events: {
                  ...particlesConfig.interactivity.events,
                  resize: {
                    enable: true,
                    delay: 500,
                  }
                }
              }
            }}
            className="w-full h-full"
          />
        </div>
      )}

      {/* Content */}
      <div className="relative z-20">
        {children}
      </div>

      {/* Animated border glow with gold colors */}
      <div className="absolute inset-0 z-30 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-yellow-400 to-transparent animate-pulse" />
        <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-orange-400 to-transparent animate-pulse" />
        <div className="absolute left-0 top-0 w-[2px] h-full bg-gradient-to-b from-transparent via-yellow-500 to-transparent animate-pulse" />
        <div className="absolute right-0 top-0 w-[2px] h-full bg-gradient-to-b from-transparent via-gold-400 to-transparent animate-pulse" />
      </div>
    </div>
  );
};

export default CinematicBackground;