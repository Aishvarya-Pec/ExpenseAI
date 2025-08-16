import React, { useCallback } from 'react';
import { Particles } from '@tsparticles/react'; // ✅ Use named import
import { loadSlim } from '@tsparticles/slim'; // ✅ Use loadSlim instead of loadFull
import type { Engine } from '@tsparticles/engine';

interface ParticlesBackgroundProps {
  className?: string;
  particleCount?: number;
  colors?: string[];
  interactive?: boolean;
}

const ParticlesBackground: React.FC<ParticlesBackgroundProps> = ({ 
  className = '',
  particleCount = 100,
  colors = ['#00f5ff', '#ff00ff', '#ffff00', '#00ff00'],
  interactive = true
}) => {
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadSlim(engine); // ✅ Use loadSlim
  }, []);

  return (
    <Particles
      className={`absolute inset-0 ${className}`}
      init={particlesInit}
      options={{
        background: {
          color: {
            value: 'transparent'
          }
        },
        fpsLimit: 120,
        interactivity: {
          events: {
            onClick: {
              enable: interactive,
              mode: 'push'
            },
            onHover: {
              enable: interactive,
              mode: 'repulse'
            },
            resize: {
              enable: true
            }
          },
          modes: {
            push: {
              quantity: 4
            },
            repulse: {
              distance: 150,
              duration: 0.4
            }
          }
        },
        particles: {
          color: {
            value: colors
          },
          links: {
            color: '#ffffff',
            distance: 150,
            enable: true,
            opacity: 0.1,
            width: 1
          },
          move: {
            direction: 'none',
            enable: true,
            outModes: {
              default: 'bounce'
            },
            random: true,
            speed: 1.5,
            straight: false
          },
          number: {
            density: {
              enable: true,
              value: 1000
            },
            value: particleCount
          },
          opacity: {
            value: { min: 0.1, max: 0.5 },
            animation: {
              enable: true,
              speed: 1,
              sync: false
            }
          },
          shape: {
            type: ['circle', 'triangle']
          },
          size: {
            value: { min: 1, max: 4 },
            animation: {
              enable: true,
              speed: 2,
              sync: false
            }
          }
        },
        detectRetina: true
      }}
    />
  );
};

export default ParticlesBackground;