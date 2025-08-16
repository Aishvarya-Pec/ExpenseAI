import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

export const useScrollAnimations = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Parallax background elements
      gsap.utils.toArray('.parallax-bg').forEach((element: any) => {
        gsap.to(element, {
          yPercent: -50,
          ease: 'none',
          scrollTrigger: {
            trigger: element,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true
          }
        });
      });

      // Fade in animations
      gsap.utils.toArray('.fade-in').forEach((element: any) => {
        gsap.fromTo(element, 
          {
            opacity: 0,
            y: 100
          },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: element,
              start: 'top 80%',
              end: 'bottom 20%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      });

      // Slide in from left
      gsap.utils.toArray('.slide-in-left').forEach((element: any) => {
        gsap.fromTo(element,
          {
            opacity: 0,
            x: -100
          },
          {
            opacity: 1,
            x: 0,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: element,
              start: 'top 80%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      });

      // Slide in from right
      gsap.utils.toArray('.slide-in-right').forEach((element: any) => {
        gsap.fromTo(element,
          {
            opacity: 0,
            x: 100
          },
          {
            opacity: 1,
            x: 0,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: element,
              start: 'top 80%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      });

      // Scale in animations
      gsap.utils.toArray('.scale-in').forEach((element: any) => {
        gsap.fromTo(element,
          {
            opacity: 0,
            scale: 0.8
          },
          {
            opacity: 1,
            scale: 1,
            duration: 1,
            ease: 'back.out(1.7)',
            scrollTrigger: {
              trigger: element,
              start: 'top 80%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      });

      // Stagger animations for lists
      gsap.utils.toArray('.stagger-container').forEach((container: any) => {
        const items = container.querySelectorAll('.stagger-item');
        gsap.fromTo(items,
          {
            opacity: 0,
            y: 50
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
            stagger: 0.1,
            scrollTrigger: {
              trigger: container,
              start: 'top 80%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      });

      // Rotating elements
      gsap.utils.toArray('.rotate-in').forEach((element: any) => {
        gsap.fromTo(element,
          {
            opacity: 0,
            rotation: -180,
            scale: 0.5
          },
          {
            opacity: 1,
            rotation: 0,
            scale: 1,
            duration: 1.2,
            ease: 'back.out(1.7)',
            scrollTrigger: {
              trigger: element,
              start: 'top 80%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      });

      // Text reveal animations
      gsap.utils.toArray('.text-reveal').forEach((element: any) => {
        const text = element.textContent;
        element.innerHTML = text.split('').map((char: string) => 
          `<span class="char" style="display: inline-block; opacity: 0; transform: translateY(100px);">${char === ' ' ? '&nbsp;' : char}</span>`
        ).join('');
        
        const chars = element.querySelectorAll('.char');
        gsap.to(chars, {
          opacity: 1,
          y: 0,
          duration: 0.05,
          stagger: 0.02,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: element,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        });
      });

      // Pinned sections
      gsap.utils.toArray('.pin-section').forEach((section: any) => {
        ScrollTrigger.create({
          trigger: section,
          start: 'top top',
          end: 'bottom top',
          pin: true,
          pinSpacing: false
        });
      });

      // Horizontal scroll sections
      gsap.utils.toArray('.horizontal-scroll').forEach((section: any) => {
        const items = section.querySelectorAll('.horizontal-item');
        const totalWidth = items.length * 100;
        
        gsap.to(items, {
          xPercent: -100 * (items.length - 1),
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            pin: true,
            scrub: 1,
            snap: 1 / (items.length - 1),
            end: () => `+=${totalWidth}%`
          }
        });
      });

      // Progress bar
      gsap.to('.progress-bar', {
        scaleX: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: 'body',
          start: 'top top',
          end: 'bottom bottom',
          scrub: true
        }
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return containerRef;
};

// Progress Bar Component
export const ScrollProgressBar: React.FC = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-1 bg-gray-800 z-50">
      <div 
        className="progress-bar h-full bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 origin-left scale-x-0"
      />
    </div>
  );
};

// Smooth scroll to section
export const scrollToSection = (sectionId: string) => {
  gsap.to(window, {
    duration: 1.5,
    scrollTo: { y: `#${sectionId}`, offsetY: 80 },
    ease: 'power3.inOut'
  });
};