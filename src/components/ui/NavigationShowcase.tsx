// Showcase component for the Cuberto-style navigation
import React from 'react';
import CubertoNavigation from './CubertoNavigation';
import { Sparkles } from 'lucide-react';

const NavigationShowcase: React.FC = () => {
  const navigationItems = [
    {
      label: 'Home',
      href: '/',
      description: 'Welcome to our digital experience'
    },
    {
      label: 'About',
      href: '/about',
      description: 'Discover our story and mission'
    },
    {
      label: 'Services',
      href: '/services',
      description: 'Explore what we can do for you'
    },
    {
      label: 'Portfolio',
      href: '/portfolio',
      description: 'See our latest work and projects'
    },
    {
      label: 'Contact',
      href: '/contact',
      description: 'Let\'s start a conversation'
    }
  ];

  const socialLinks = {
    github: 'https://github.com',
    twitter: 'https://twitter.com',
    linkedin: 'https://linkedin.com',
    email: 'hello@example.com'
  };

  const handleItemClick = (item: any) => {
    // Remove line 43:
    console.log('Navigation item clicked:', item);
    // Handle navigation here
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800">
      <CubertoNavigation
        items={navigationItems}
        logo={
          <div className="flex items-center space-x-2">
            <Sparkles className="w-8 h-8 text-cyan-400" />
            <span className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
              ExpenseAI
            </span>
          </div>
        }
        socialLinks={socialLinks}
        onItemClick={handleItemClick}
      />
      
      {/* Demo content */}
      <main className="pt-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-6xl md:text-8xl font-light text-white mb-8">
            Cuberto-Style
            <br />
            <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
              Navigation
            </span>
          </h1>
          
          <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto">
            Experience smooth, fullscreen navigation with elegant animations inspired by Cuberto's design philosophy.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            <div className="p-6 bg-gray-800/50 rounded-xl backdrop-blur-sm border border-gray-700">
              <h3 className="text-xl font-semibold text-white mb-4">Smooth Animations</h3>
              <p className="text-gray-400">
                GSAP-powered transitions with optimized performance for 60fps animations.
              </p>
            </div>
            
            <div className="p-6 bg-gray-800/50 rounded-xl backdrop-blur-sm border border-gray-700">
              <h3 className="text-xl font-semibold text-white mb-4">Fullscreen Experience</h3>
              <p className="text-gray-400">
                Immersive navigation overlay that takes over the entire viewport.
              </p>
            </div>
            
            <div className="p-6 bg-gray-800/50 rounded-xl backdrop-blur-sm border border-gray-700">
              <h3 className="text-xl font-semibold text-white mb-4">Interactive Elements</h3>
              <p className="text-gray-400">
                Hover effects, stagger animations, and smooth state transitions.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default NavigationShowcase;