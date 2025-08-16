import React, { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { X, Menu, ArrowUpRight, Github, Twitter, Linkedin, Mail } from 'lucide-react';
import PerformanceOptimizer from '../../utils/performanceOptimizer';

interface NavigationItem {
  label: string;
  href: string;
  description?: string;
}

interface CubertoNavigationProps {
  items: NavigationItem[];
  logo?: React.ReactNode;
  socialLinks?: {
    github?: string;
    twitter?: string;
    linkedin?: string;
    email?: string;
  };
  onItemClick?: (item: NavigationItem) => void;
}

const CubertoNavigation: React.FC<CubertoNavigationProps> = ({
  items,
  logo,
  socialLinks,
  onItemClick
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const menuItemsRef = useRef<HTMLDivElement[]>([]);
  const backgroundRef = useRef<HTMLDivElement>(null);
  const socialRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const hamburgerRef = useRef<HTMLButtonElement>(null);
  const optimizer = PerformanceOptimizer.getInstance();

  useEffect(() => {
    const overlay = overlayRef.current;
    const background = backgroundRef.current;
    const social = socialRef.current;
    const closeButton = closeButtonRef.current;
    
    if (!overlay || !background) return;

    if (isOpen) {
      // Open animation sequence
      const tl = gsap.timeline();
      
      // Set initial states
      gsap.set(overlay, { display: 'flex' });
      gsap.set(background, { scaleY: 0, transformOrigin: 'top' });
      gsap.set(menuItemsRef.current, { y: 100, opacity: 0 });
      gsap.set(social, { y: 50, opacity: 0 });
      gsap.set(closeButton, { rotation: -90, opacity: 0 });
      
      // Background expansion
      tl.to(background, optimizer.getOptimizedAnimationConfig({
        scaleY: 1,
        duration: 0.8,
        ease: 'power4.out'
      }))
      
      // Menu items stagger animation
      .to(menuItemsRef.current, optimizer.getOptimizedAnimationConfig({
        y: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power3.out'
      }), '-=0.4')
      
      // Social links and close button
      .to([social, closeButton], optimizer.getOptimizedAnimationConfig({
        y: 0,
        opacity: 1,
        rotation: 0,
        duration: 0.5,
        ease: 'power2.out'
      }), '-=0.3');
      
      // Disable body scroll
      document.body.style.overflow = 'hidden';
      
    } else {
      // Close animation sequence
      const tl = gsap.timeline({
        onComplete: () => {
          gsap.set(overlay, { display: 'none' });
          document.body.style.overflow = 'auto';
        }
      });
      
      tl.to([social, closeButton], optimizer.getOptimizedAnimationConfig({
        y: -50,
        opacity: 0,
        rotation: -90,
        duration: 0.3,
        ease: 'power2.in'
      }))
      
      .to(menuItemsRef.current, optimizer.getOptimizedAnimationConfig({
        y: -100,
        opacity: 0,
        duration: 0.4,
        stagger: 0.05,
        ease: 'power3.in'
      }), '-=0.2')
      
      .to(background, optimizer.getOptimizedAnimationConfig({
        scaleY: 0,
        duration: 0.6,
        ease: 'power4.in',
        transformOrigin: 'bottom'
      }), '-=0.3');
    }
  }, [isOpen, optimizer]);

  const handleItemHover = (index: number) => {
    setHoveredIndex(index);
    const item = menuItemsRef.current[index];
    if (item) {
      gsap.to(item, optimizer.getOptimizedAnimationConfig({
        x: 20,
        duration: 0.3,
        ease: 'power2.out'
      }));
    }
  };

  const handleItemLeave = (index: number) => {
    setHoveredIndex(null);
    const item = menuItemsRef.current[index];
    if (item) {
      gsap.to(item, optimizer.getOptimizedAnimationConfig({
        x: 0,
        duration: 0.3,
        ease: 'power2.out'
      }));
    }
  };

  const handleItemClick = (item: NavigationItem) => {
    // Click animation
    const clickedItem = menuItemsRef.current[items.indexOf(item)];
    if (clickedItem) {
      gsap.to(clickedItem, optimizer.getOptimizedAnimationConfig({
        scale: 0.95,
        duration: 0.1,
        yoyo: true,
        repeat: 1,
        ease: 'power2.out'
      }));
    }
    
    setTimeout(() => {
      setIsOpen(false);
      if (onItemClick) onItemClick(item);
    }, 200);
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Header with hamburger menu */}
      <header className="fixed top-0 left-0 right-0 z-50 p-6 flex justify-between items-center">
        <div className="text-2xl font-bold text-white">
          {logo || 'ExpenseAI'}
        </div>
        
        <button
          ref={hamburgerRef}
          onClick={toggleMenu}
          className="relative w-12 h-12 flex flex-col justify-center items-center space-y-1 group"
          aria-label="Toggle menu"
        >
          <span className={`w-6 h-0.5 bg-white transition-all duration-300 ${
            isOpen ? 'rotate-45 translate-y-1.5' : ''
          }`} />
          <span className={`w-6 h-0.5 bg-white transition-all duration-300 ${
            isOpen ? 'opacity-0' : ''
          }`} />
          <span className={`w-6 h-0.5 bg-white transition-all duration-300 ${
            isOpen ? '-rotate-45 -translate-y-1.5' : ''
          }`} />
        </button>
      </header>

      {/* Fullscreen Navigation Overlay */}
      <div
        ref={overlayRef}
        className="fixed inset-0 z-40 hidden flex-col justify-center items-center"
        style={{ display: 'none' }}
      >
        {/* Animated Background */}
        <div
          ref={backgroundRef}
          className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-800"
        >
          {/* Animated particles */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-cyan-400/30 rounded-full animate-pulse"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 2}s`,
                  animationDuration: `${2 + Math.random() * 3}s`
                }}
              />
            ))}
          </div>
          
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        </div>

        {/* Close Button */}
        <button
          ref={closeButtonRef}
          onClick={toggleMenu}
          className="absolute top-6 right-6 w-12 h-12 flex items-center justify-center text-white hover:text-cyan-400 transition-colors duration-300"
          aria-label="Close menu"
        >
          <X size={24} />
        </button>

        {/* Navigation Items */}
        <nav className="relative z-10 text-center">
          <ul className="space-y-8">
            {items.map((item, index) => (
              <li key={index}>
                <div
                  ref={(el) => {
                    if (el) menuItemsRef.current[index] = el;
                  }}
                  className="group cursor-pointer"
                  onMouseEnter={() => handleItemHover(index)}
                  onMouseLeave={() => handleItemLeave(index)}
                  onClick={() => handleItemClick(item)}
                >
                  <div className="flex items-center justify-center space-x-4">
                    <span className="text-6xl md:text-8xl font-light text-white group-hover:text-cyan-400 transition-colors duration-500">
                      {item.label}
                    </span>
                    <ArrowUpRight 
                      className={`w-8 h-8 text-cyan-400 transition-all duration-300 ${
                        hoveredIndex === index ? 'opacity-100 translate-x-2 -translate-y-2' : 'opacity-0'
                      }`}
                    />
                  </div>
                  {item.description && (
                    <p className={`text-gray-400 text-lg mt-2 transition-all duration-300 ${
                      hoveredIndex === index ? 'opacity-100' : 'opacity-60'
                    }`}>
                      {item.description}
                    </p>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </nav>

        {/* Social Links */}
        {socialLinks && (
          <div
            ref={socialRef}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          >
            <div className="flex space-x-6">
              {socialLinks.github && (
                <a
                  href={socialLinks.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors duration-300"
                >
                  <Github size={24} />
                </a>
              )}
              {socialLinks.twitter && (
                <a
                  href={socialLinks.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors duration-300"
                >
                  <Twitter size={24} />
                </a>
              )}
              {socialLinks.linkedin && (
                <a
                  href={socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors duration-300"
                >
                  <Linkedin size={24} />
                </a>
              )}
              {socialLinks.email && (
                <a
                  href={`mailto:${socialLinks.email}`}
                  className="text-gray-400 hover:text-white transition-colors duration-300"
                >
                  <Mail size={24} />
                </a>
              )}
            </div>
          </div>
        )}

        {/* Navigation Progress Indicator */}
        <div className="absolute bottom-4 right-6 text-gray-500 text-sm">
          <span className="font-mono">
            {String(hoveredIndex !== null ? hoveredIndex + 1 : 0).padStart(2, '0')} / {String(items.length).padStart(2, '0')}
          </span>
        </div>
      </div>
    </>
  );
};

export default CubertoNavigation;