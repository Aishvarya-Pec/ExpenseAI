// Optimized scroll animations with performance enhancements
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import PerformanceOptimizer from '../../utils/performanceOptimizer';

gsap.registerPlugin(ScrollTrigger);

const OptimizedScrollAnimations: React.FC = () => {
  const optimizer = PerformanceOptimizer.getInstance();
  const animationsRef = useRef<(gsap.core.Timeline | gsap.core.Tween)[]>([]);

  useEffect(() => {
    const deviceSettings = optimizer.getDeviceAnimationSettings();
    const breakpoint = optimizer.getBreakpoint();
    
    // Clear existing animations
    animationsRef.current.forEach(animation => {
      optimizer.cleanupAnimation(animation);
    });
    animationsRef.current = [];

    // Optimized fade-in animations
    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach((element, index) => {
      const animation = gsap.fromTo(element, 
        { opacity: 0, y: 50 },
        optimizer.getOptimizedAnimationConfig({
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: index * 0.1,
          scrollTrigger: {
            trigger: element,
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse',
            once: breakpoint === 'mobile', // Only play once on mobile
          }
        })
      );
      animationsRef.current.push(animation);
    });

    // Optimized slide animations
    const slideLeftElements = document.querySelectorAll('.slide-in-left');
    slideLeftElements.forEach((element, index) => {
      const animation = gsap.fromTo(element,
        { opacity: 0, x: -100 },
        optimizer.getOptimizedAnimationConfig({
          opacity: 1,
          x: 0,
          duration: 0.8,
          delay: index * 0.15,
          scrollTrigger: {
            trigger: element,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
            once: breakpoint === 'mobile',
          }
        })
      );
      animationsRef.current.push(animation);
    });

    // Optimized parallax (disabled on mobile for performance)
    if (breakpoint !== 'mobile' && deviceSettings.animationComplexity !== 'low') {
      const parallaxElements = document.querySelectorAll('.parallax-bg');
      parallaxElements.forEach(element => {
        const animation = gsap.to(element, {
          yPercent: -50,
          ease: 'none',
          scrollTrigger: {
            trigger: element,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1,
          }
        });
        animationsRef.current.push(animation);
      });
    }

    // Optimized stagger animations
    const staggerContainers = document.querySelectorAll('.stagger-container');
    staggerContainers.forEach(container => {
      const items = container.querySelectorAll('.stagger-item');
      const animation = gsap.fromTo(items,
        { opacity: 0, y: 30 },
        optimizer.getOptimizedAnimationConfig({
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: deviceSettings.animationComplexity === 'low' ? 0.05 : 0.1,
          scrollTrigger: {
            trigger: container,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
            once: breakpoint === 'mobile',
          }
        })
      );
      animationsRef.current.push(animation);
    });

    // Performance monitoring
    const performanceObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      entries.forEach((entry) => {
        if (entry.entryType === 'measure' && entry.duration > 16.67) {
          // Performance monitoring for optimization
        }
      });
    });
    
    if ('PerformanceObserver' in window) {
      performanceObserver.observe({ entryTypes: ['measure'] });
    }

    return () => {
      // Cleanup
      animationsRef.current.forEach(animation => {
        optimizer.cleanupAnimation(animation);
      });
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      if ('PerformanceObserver' in window) {
        performanceObserver.disconnect();
      }
    };
  }, []);

  return null;
};

export default OptimizedScrollAnimations;