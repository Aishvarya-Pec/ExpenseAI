// Performance optimization utilities for 60fps animations
import { gsap } from 'gsap';

class PerformanceOptimizer {
  private static instance: PerformanceOptimizer;
  private animationFrameId: number | null = null;
  private isReducedMotion: boolean = false;
  // Remove line 8:
  // // Removed unused devicePixelRatio property
  private isLowEndDevice: boolean = false;

  constructor() {
    this.detectDeviceCapabilities();
    this.setupReducedMotionDetection();
    this.optimizeGSAP();
  }

  static getInstance(): PerformanceOptimizer {
    if (!PerformanceOptimizer.instance) {
      PerformanceOptimizer.instance = new PerformanceOptimizer();
    }
    return PerformanceOptimizer.instance;
  }

  private detectDeviceCapabilities(): void {
    // Detect low-end devices
    const memory = (navigator as any).deviceMemory;
    const cores = navigator.hardwareConcurrency;
    
    this.isLowEndDevice = (
      memory && memory < 4 ||
      cores && cores < 4 ||
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
    );
  }

  private setupReducedMotionDetection(): void {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    this.isReducedMotion = mediaQuery.matches;
    
    mediaQuery.addEventListener('change', (e) => {
      this.isReducedMotion = e.matches;
      this.updateAnimationSettings();
    });
  }

  private optimizeGSAP(): void {
    // Set GSAP to use GPU acceleration by default
    gsap.set('*', { force3D: true });
    
    // Optimize GSAP ticker for 60fps
    gsap.ticker.fps(60);
    
    // Use lag smoothing for consistent frame rates
    gsap.ticker.lagSmoothing(500, 33);
  }

  private updateAnimationSettings(): void {
    if (this.isReducedMotion) {
      gsap.globalTimeline.timeScale(0.1);
    } else {
      gsap.globalTimeline.timeScale(1);
    }
  }

  // Throttle scroll events for better performance
  throttleScroll(callback: () => void, delay: number = 16): () => void {
    let timeoutId: ReturnType<typeof setTimeout>;
    let lastExecTime = 0;
    
    return () => {
      const currentTime = Date.now();
      
      if (currentTime - lastExecTime > delay) {
        callback();
        lastExecTime = currentTime;
      } else {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
          callback();
          lastExecTime = Date.now();
        }, delay - (currentTime - lastExecTime));
      }
    };
  }

  // Optimize animations based on device capabilities
  getOptimizedAnimationConfig(baseConfig: any): any {
    if (this.isLowEndDevice) {
      return {
        ...baseConfig,
        duration: baseConfig.duration * 0.7, // Faster animations
        ease: 'power2.out', // Simpler easing
        force3D: true,
        transformOrigin: 'center center',
      };
    }
    
    if (this.isReducedMotion) {
      return {
        ...baseConfig,
        duration: 0.1,
        ease: 'none',
      };
    }
    
    return {
      ...baseConfig,
      force3D: true,
      transformOrigin: 'center center',
    };
  }

  // Memory management for animations
  cleanupAnimation(animation: gsap.core.Timeline | gsap.core.Tween): void {
    if (animation) {
      animation.kill();
    }
  }

  // Batch DOM reads and writes
  batchDOMOperations(operations: Array<() => void>): void {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }
    
    this.animationFrameId = requestAnimationFrame(() => {
      operations.forEach(operation => operation());
      this.animationFrameId = null;
    });
  }

  // Intersection Observer for performance
  createIntersectionObserver(
    callback: IntersectionObserverCallback,
    options?: IntersectionObserverInit
  ): IntersectionObserver {
    const defaultOptions = {
      rootMargin: '50px',
      threshold: 0.1,
      ...options
    };
    
    return new IntersectionObserver(callback, defaultOptions);
  }

  // Responsive breakpoint detection
  getBreakpoint(): 'mobile' | 'tablet' | 'desktop' {
    const width = window.innerWidth;
    if (width < 768) return 'mobile';
    if (width < 1024) return 'tablet';
    return 'desktop';
  }

  // Get device-specific animation settings
  getDeviceAnimationSettings(): {
    particleCount: number;
    animationComplexity: 'low' | 'medium' | 'high';
    enableBlur: boolean;
    enableShadows: boolean;
  } {
    const breakpoint = this.getBreakpoint();
    
    if (this.isLowEndDevice || breakpoint === 'mobile') {
      return {
        particleCount: 50,
        animationComplexity: 'low',
        enableBlur: false,
        enableShadows: false,
      };
    }
    
    if (breakpoint === 'tablet') {
      return {
        particleCount: 100,
        animationComplexity: 'medium',
        enableBlur: true,
        enableShadows: false,
      };
    }
    
    return {
      particleCount: 200,
      animationComplexity: 'high',
      enableBlur: true,
      enableShadows: true,
    };
  }
}

export default PerformanceOptimizer;