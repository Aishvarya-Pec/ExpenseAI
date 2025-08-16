import React, { useState, useEffect } from 'react';

interface Feature {
  id: number;
  icon: string;
  title: string;
  description: string;
  color: string;
  x: number;
  speed: number;
}

const FeatureShowcase: React.FC = () => {
  const [features, setFeatures] = useState<Feature[]>([]);
  const [selectedFeature, setSelectedFeature] = useState<Feature | null>(null);
  const [isHovered, setIsHovered] = useState(false);

  const featureData = [
    { icon: '🤖', title: 'AI Categorization', description: 'Smart expense categorization', color: 'from-blue-500 to-cyan-500' },
    { icon: '📊', title: 'Analytics Dashboard', description: 'Real-time expense insights', color: 'from-purple-500 to-pink-500' },
    { icon: '💳', title: 'Multi-Currency', description: 'Global currency support', color: 'from-green-500 to-emerald-500' },
    { icon: '🔔', title: 'Smart Notifications', description: 'Intelligent spending alerts', color: 'from-orange-500 to-red-500' },
    { icon: '📱', title: 'Mobile Sync', description: 'Cross-platform synchronization', color: 'from-indigo-500 to-purple-500' },
    { icon: '🔒', title: 'Secure Storage', description: 'Bank-level security', color: 'from-gray-500 to-slate-600' },
    { icon: '📈', title: 'Budget Tracking', description: 'Advanced budget management', color: 'from-teal-500 to-cyan-500' },
    { icon: '⚡', title: 'Lightning Fast', description: 'Optimized performance', color: 'from-yellow-500 to-orange-500' }
  ];

  useEffect(() => {
    const generateFeatures = () => {
      const newFeatures = featureData.map((feature, index) => ({
        ...feature,
        id: Date.now() + index,
        x: -100,
        speed: 0.5 + Math.random() * 1.5
      }));
      setFeatures(newFeatures);
    };

    generateFeatures();
    const interval = setInterval(generateFeatures, 8000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (isHovered) return;

    const animationFrame = () => {
      setFeatures(prev => 
        prev.map(feature => ({
          ...feature,
          x: feature.x + feature.speed
        })).filter(feature => feature.x < 110)
      );
    };

    const interval = setInterval(animationFrame, 16);
    return () => clearInterval(interval);
  }, [isHovered]);

  const handleFeatureClick = (feature: Feature) => {
    setSelectedFeature(feature);
    setIsHovered(true);
    setTimeout(() => {
      setSelectedFeature(null);
      setIsHovered(false);
    }, 3000);
  };

  return (
    <div className="w-full h-96 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 flex flex-col items-center justify-center text-white overflow-hidden rounded-2xl border border-blue-500/30 relative">
      {/* Header */}
      <div className="absolute top-4 left-4 right-4 text-center z-10">
        <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
          ⚡ Lightning-Fast Features
        </h2>
        <p className="text-sm text-blue-300/80 mt-1">
          Watch our features race across the screen at lightning speed! Click to catch them!
        </p>
      </div>

      {/* Feature Racing Area */}
      <div className="relative w-full h-full flex items-center justify-center">
        {/* Racing Features */}
        {features.map((feature) => (
          <button
            key={feature.id}
            onClick={() => handleFeatureClick(feature)}
            className={`absolute transform -translate-y-1/2 transition-all duration-200 hover:scale-110 cursor-pointer select-none z-20 bg-gradient-to-r ${feature.color} rounded-lg p-3 shadow-lg hover:shadow-xl border border-white/20`}
            style={{
              left: `${feature.x}%`,
              top: `${50 + Math.sin(feature.x * 0.1) * 10}%`,
              transform: `translateY(-50%) ${isHovered ? 'scale(0.8)' : 'scale(1)'}`,
              opacity: isHovered && selectedFeature?.id !== feature.id ? 0.3 : 1
            }}
          >
            <div className="flex items-center gap-2 text-white">
              <span className="text-xl">{feature.icon}</span>
              <div className="text-left hidden sm:block">
                <div className="text-sm font-semibold">{feature.title}</div>
                <div className="text-xs opacity-90">{feature.description}</div>
              </div>
            </div>
          </button>
        ))}

        {/* Selected Feature Display */}
        {selectedFeature && (
          <div className="absolute inset-0 flex items-center justify-center z-30 bg-black/50 backdrop-blur-sm">
            <div className={`bg-gradient-to-r ${selectedFeature.color} rounded-2xl p-8 text-center shadow-2xl border-2 border-white/30 animate-pulse`}>
              <div className="text-6xl mb-4">{selectedFeature.icon}</div>
              <h3 className="text-2xl font-bold text-white mb-2">{selectedFeature.title}</h3>
              <p className="text-white/90 text-lg">{selectedFeature.description}</p>
              <div className="mt-4 text-sm text-white/70">
                Feature captured! ⚡
              </div>
            </div>
          </div>
        )}

        {/* Speed Lines Background */}
        <div className="absolute inset-0 opacity-20">
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className="absolute h-px bg-gradient-to-r from-transparent via-blue-400 to-transparent"
              style={{
                top: `${10 + i * 5}%`,
                left: '0%',
                right: '0%',
                animation: `slide 2s linear infinite`,
                animationDelay: `${i * 0.1}s`
              }}
            />
          ))}
        </div>

        {/* Center Message */}
        {!selectedFeature && (
          <div className="text-center z-10">
            <div className="text-4xl mb-2 animate-bounce">⚡</div>
            <p className="text-blue-300 text-lg font-semibold">
              Click features as they race by!
            </p>
            <p className="text-blue-400/70 text-sm mt-1">
              Experience our lightning-fast capabilities
            </p>
          </div>
        )}
      </div>

      {/* Bottom Stats */}
      <div className="absolute bottom-4 left-4 right-4 flex justify-center gap-6 text-xs text-blue-300/70">
        <span>🚀 Optimized Performance</span>
        <span>⚡ Lightning Speed</span>
        <span>🎯 Interactive Features</span>
      </div>

      <style jsx>{`
        @keyframes slide {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
};

export default FeatureShowcase;