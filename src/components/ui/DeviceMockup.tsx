import React from 'react';
import { motion } from 'framer-motion';
import Sparkles from './Sparkles';

interface DeviceMockupProps {
  type: 'iphone' | 'android' | 'tablet';
  children: React.ReactNode;
  showSparkles?: boolean;
  className?: string;
}

export const DeviceMockup: React.FC<DeviceMockupProps> = ({ 
  type, 
  children, 
  showSparkles = false, 
  className = '' 
}) => {
  const getDeviceStyles = () => {
    switch (type) {
      case 'iphone':
        return {
          container: 'w-64 h-[520px] bg-gradient-to-b from-gray-800 to-gray-900 rounded-[3rem] p-2 shadow-2xl border-4 border-gray-700',
          screen: 'w-full h-full bg-black rounded-[2.5rem] overflow-hidden relative',
          notch: 'absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-6 bg-black rounded-b-2xl z-10',
          homeIndicator: 'absolute bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-white/30 rounded-full'
        };
      case 'android':
        return {
          container: 'w-64 h-[520px] bg-gradient-to-b from-gray-700 to-gray-800 rounded-[2rem] p-1 shadow-2xl border-2 border-gray-600',
          screen: 'w-full h-full bg-black rounded-[1.5rem] overflow-hidden relative',
          notch: '',
          homeIndicator: 'absolute bottom-1 left-1/2 transform -translate-x-1/2 w-8 h-8 border-2 border-white/20 rounded-full'
        };
      case 'tablet':
        return {
          container: 'w-80 h-[500px] bg-gradient-to-b from-gray-800 to-gray-900 rounded-[2rem] p-3 shadow-2xl border-3 border-gray-700',
          screen: 'w-full h-full bg-black rounded-[1.5rem] overflow-hidden relative',
          notch: '',
          homeIndicator: 'absolute bottom-2 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-white/30 rounded-full'
        };
      default:
        return {
          container: 'w-64 h-[520px] bg-gradient-to-b from-gray-800 to-gray-900 rounded-[3rem] p-2 shadow-2xl',
          screen: 'w-full h-full bg-black rounded-[2.5rem] overflow-hidden relative',
          notch: '',
          homeIndicator: ''
        };
    }
  };

  const styles = getDeviceStyles();

  return (
    <motion.div
      className={`relative ${className}`}
      whileHover={{ scale: 1.05, rotateY: 5 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      {/* Sparkles Effect */}
      {showSparkles && (
        <div className="absolute inset-0 pointer-events-none z-20">
          <Sparkles density={8} color="gold">
            <div />
          </Sparkles>
        </div>
      )}
      
      {/* Device Frame */}
      <div className={styles.container}>
        {/* Screen */}
        <div className={styles.screen}>
          {/* iPhone Notch */}
          {type === 'iphone' && (
            <div className={styles.notch} />
          )}
          
          {/* Screen Content */}
          <div className="w-full h-full relative">
            {children}
          </div>
          
          {/* Home Indicator */}
          {styles.homeIndicator && (
            <div className={styles.homeIndicator} />
          )}
        </div>
      </div>
      
      {/* Device Reflection */}
      <div className="absolute inset-0 bg-gradient-to-t from-white/5 to-transparent rounded-[3rem] pointer-events-none" />
      
      {/* Device Shadow */}
      <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-48 h-8 bg-black/20 rounded-full blur-xl" />
    </motion.div>
  );
};

export default DeviceMockup;