// Showcase component demonstrating all button variants
import React from 'react';
import EnhancedMagneticButton from './EnhancedMagneticButton';
import { Play, Download, Star, Zap, Sparkles, Rocket } from 'lucide-react';

const ButtonShowcase: React.FC = () => {
  return (
    <div className="p-8 bg-gray-900 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-8 text-center">
          Enhanced Magnetic Buttons
        </h1>
        
        {/* Size Variations */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-white mb-6">Size Variations</h2>
          <div className="flex flex-wrap gap-4 items-center">
            <EnhancedMagneticButton size="sm" variant="primary">
              Small Button
            </EnhancedMagneticButton>
            <EnhancedMagneticButton size="md" variant="primary">
              Medium Button
            </EnhancedMagneticButton>
            <EnhancedMagneticButton size="lg" variant="primary">
              Large Button
            </EnhancedMagneticButton>
            <EnhancedMagneticButton size="xl" variant="primary">
              Extra Large
            </EnhancedMagneticButton>
          </div>
        </section>
        
        {/* Variant Showcase */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-white mb-6">Button Variants</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="text-center">
              <EnhancedMagneticButton variant="primary" className="mb-2">
                <Play className="w-5 h-5 mr-2 inline" />
                Primary
              </EnhancedMagneticButton>
              <p className="text-gray-400 text-sm">Standard gradient button</p>
            </div>
            
            <div className="text-center">
              <EnhancedMagneticButton variant="secondary" className="mb-2">
                <Download className="w-5 h-5 mr-2 inline" />
                Secondary
              </EnhancedMagneticButton>
              <p className="text-gray-400 text-sm">Subtle gray gradient</p>
            </div>
            
            <div className="text-center">
              <EnhancedMagneticButton variant="ghost" className="mb-2">
                <Star className="w-5 h-5 mr-2 inline" />
                Ghost
              </EnhancedMagneticButton>
              <p className="text-gray-400 text-sm">Transparent with border</p>
            </div>
            
            <div className="text-center">
              <EnhancedMagneticButton variant="neon" className="mb-2">
                <Zap className="w-5 h-5 mr-2 inline" />
                Neon
              </EnhancedMagneticButton>
              <p className="text-gray-400 text-sm">Cyberpunk neon glow</p>
            </div>
            
            <div className="text-center">
              <EnhancedMagneticButton variant="holographic" className="mb-2">
                <Sparkles className="w-5 h-5 mr-2 inline" />
                Holographic
              </EnhancedMagneticButton>
              <p className="text-gray-400 text-sm">Iridescent rainbow</p>
            </div>
            
            <div className="text-center">
              <EnhancedMagneticButton variant="plasma" className="mb-2">
                <Rocket className="w-5 h-5 mr-2 inline" />
                Plasma
              </EnhancedMagneticButton>
              <p className="text-gray-400 text-sm">Fiery plasma effect</p>
            </div>
          </div>
        </section>
        
        {/* Interactive Features */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-white mb-6">Interactive Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="text-center">
              <EnhancedMagneticButton 
                variant="neon" 
                magneticStrength={0.5}
                className="mb-2"
              >
                High Magnetic Strength
              </EnhancedMagneticButton>
              <p className="text-gray-400 text-sm">Stronger magnetic pull effect</p>
            </div>
            
            <div className="text-center">
              <EnhancedMagneticButton 
                variant="holographic" 
                rippleEffect={true}
                glowEffect={true}
                morphEffect={true}
                className="mb-2"
              >
                All Effects Enabled
              </EnhancedMagneticButton>
              <p className="text-gray-400 text-sm">Ripple + Glow + Morph</p>
            </div>
          </div>
        </section>
        
        {/* Call-to-Action Examples */}
        <section>
          <h2 className="text-2xl font-semibold text-white mb-6">Call-to-Action Examples</h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <EnhancedMagneticButton 
              variant="primary" 
              size="lg"
              onClick={() => alert('Get Started clicked!')}
            >
              Get Started Free
            </EnhancedMagneticButton>
            
            <EnhancedMagneticButton 
              variant="ghost" 
              size="lg"
              onClick={() => alert('Learn More clicked!')}
            >
              Learn More
            </EnhancedMagneticButton>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ButtonShowcase;