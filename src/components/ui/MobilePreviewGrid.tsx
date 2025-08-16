import React from 'react';
import { motion } from 'framer-motion';
import { DeviceMockup } from './DeviceMockup';
import { AppPreview } from './AppPreview';
import Sparkles from './Sparkles';

interface MobilePreviewGridProps {
  className?: string;
  showTitle?: boolean;
}

export const MobilePreviewGrid: React.FC<MobilePreviewGridProps> = ({ 
  className = '',
  showTitle = true 
}) => {
  const devices = [
    { type: 'iphone' as const, screen: 'dashboard' as const, delay: 0 },
    { type: 'android' as const, screen: 'analytics' as const, delay: 0.2 },
    { type: 'tablet' as const, screen: 'ai-insights' as const, delay: 0.4 }
  ];

  return (
    <div className={`relative ${className}`}>
      {showTitle && (
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gradient-gold mb-4">
            Perfect Mobile Experience
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Experience ExpenseAI on any device with our responsive design and native-like performance
          </p>
        </motion.div>
      )}
      
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <Sparkles className="absolute top-10 left-10 w-6 h-6" color="gold" density={3}>
          <div />
        </Sparkles>
        <Sparkles className="absolute top-32 right-20 w-8 h-8" color="gold" density={4}>
          <div />
        </Sparkles>
        <Sparkles className="absolute bottom-20 left-32 w-6 h-6" color="gold" density={3}>
          <div />
        </Sparkles>
        <Sparkles className="absolute bottom-40 right-10 w-8 h-8" color="gold" density={4}>
          <div />
        </Sparkles>
      </div>
      
      {/* Device Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12 justify-items-center">
        {devices.map((device, index) => (
          <motion.div
            key={`${device.type}-${device.screen}`}
            initial={{ opacity: 0, y: 50, rotateY: -30 }}
            animate={{ opacity: 1, y: 0, rotateY: 0 }}
            transition={{ 
              duration: 0.8, 
              delay: device.delay,
              ease: "easeOut"
            }}
            className="device-scale-mobile md:device-scale-tablet lg:device-scale-desktop"
          >
            <DeviceMockup type={device.type} showSparkles={index === 1}>
              <AppPreview screen={device.screen} />
            </DeviceMockup>
            
            {/* Device Label */}
            <motion.div 
              className="text-center mt-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: device.delay + 0.5 }}
            >
              <h3 className="text-sm font-medium text-yellow-400 capitalize">
                {device.type === 'iphone' ? 'iOS' : device.type === 'android' ? 'Android' : 'Tablet'}
              </h3>
              <p className="text-xs text-gray-500 capitalize">
                {device.screen.replace('-', ' ')}
              </p>
            </motion.div>
          </motion.div>
        ))}
      </div>
      
      {/* Floating Elements */}
      <motion.div 
        className="absolute top-1/2 left-0 w-32 h-32 bg-gradient-to-r from-yellow-400/10 to-transparent rounded-full blur-xl"
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.6, 0.3]
        }}
        transition={{ duration: 4, repeat: Infinity }}
      />
      
      <motion.div 
        className="absolute top-1/4 right-0 w-24 h-24 bg-gradient-to-l from-yellow-600/10 to-transparent rounded-full blur-xl"
        animate={{ 
          scale: [1.2, 1, 1.2],
          opacity: [0.4, 0.2, 0.4]
        }}
        transition={{ duration: 3, repeat: Infinity, delay: 1 }}
      />
    </div>
  );
};