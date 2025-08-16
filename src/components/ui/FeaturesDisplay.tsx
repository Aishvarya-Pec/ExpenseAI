import React from 'react';
import { motion } from 'framer-motion';

interface Feature {
  icon: string;
  title: string;
  description: string;
  color: string;
  stats?: string;
  gradient: string;
}

const FeaturesDisplay: React.FC = () => {
  const features: Feature[] = [
    {
      icon: '🤖',
      title: 'AI-Powered Categorization',
      description: 'Automatically categorize your expenses with 95% accuracy using advanced machine learning algorithms.',
      color: 'from-cyan-400 to-blue-500',
      gradient: 'from-cyan-500/20 to-blue-600/20',
      stats: '95% Accuracy'
    },
    {
      icon: '📊',
      title: 'Real-time Insights',
      description: 'Get instant analytics and spending patterns to make informed financial decisions in real-time.',
      color: 'from-purple-400 to-pink-500',
      gradient: 'from-purple-500/20 to-pink-600/20',
      stats: 'Live Data'
    },
    {
      icon: '💳',
      title: 'Smart Budgeting',
      description: 'Set intelligent budgets that adapt to your spending habits and automatically adjust to your financial goals.',
      color: 'from-emerald-400 to-green-500',
      gradient: 'from-emerald-500/20 to-green-600/20',
      stats: 'Auto-Adjust'
    },
    {
      icon: '🔔',
      title: 'Smart Notifications',
      description: 'Receive intelligent alerts about unusual spending, bill reminders, and budget warnings.',
      color: 'from-orange-400 to-red-500',
      gradient: 'from-orange-500/20 to-red-600/20',
      stats: 'Instant Alerts'
    },
    {
      icon: '📱',
      title: 'Multi-Platform Sync',
      description: 'Access your financial data seamlessly across all devices with real-time synchronization.',
      color: 'from-indigo-400 to-purple-500',
      gradient: 'from-indigo-500/20 to-purple-600/20',
      stats: 'Cross-Device'
    },
    {
      icon: '🔒',
      title: 'Bank-Level Security',
      description: 'Your financial data is protected with enterprise-grade encryption and multi-layer security protocols.',
      color: 'from-slate-400 to-gray-500',
      gradient: 'from-slate-500/20 to-gray-600/20',
      stats: '256-bit SSL'
    }
  ];

  return (
    <div className="w-full bg-gradient-to-br from-gray-950 via-slate-900 to-black rounded-3xl border border-gray-700/50 p-8 relative overflow-hidden shadow-2xl">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 opacity-30">
        {/* Floating Orbs */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={`orb-${i}`}
            className="absolute w-32 h-32 rounded-full blur-xl"
            style={{
              background: `radial-gradient(circle, ${[
                'rgba(59, 130, 246, 0.3)',
                'rgba(147, 51, 234, 0.3)',
                'rgba(236, 72, 153, 0.3)',
                'rgba(34, 197, 94, 0.3)'
              ][i % 4]} 0%, transparent 70%)`,
              left: `${Math.random() * 80}%`,
              top: `${Math.random() * 80}%`,
            }}
            animate={{
              x: [0, 30, -30, 0],
              y: [0, -30, 30, 0],
              scale: [1, 1.2, 0.8, 1],
            }}
            transition={{
              duration: 8 + Math.random() * 4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.5
            }}
          />
        ))}
        
        {/* Twinkling Stars */}
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={`star-${i}`}
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0.2, 1, 0.2],
              scale: [0.5, 1.5, 0.5],
            }}
            transition={{
              duration: 2 + Math.random() * 3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 2
            }}
          />
        ))}
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-black/10 pointer-events-none" />

      {/* Header */}
      <div className="text-center mb-16 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="inline-block"
        >
          <div className="relative">
            <motion.h2 
              className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 mb-6 relative"
              animate={{
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "linear"
              }}
            >
              ⚡ Powerful Features
              <motion.div
                className="absolute -inset-1 bg-gradient-to-r from-blue-400/20 via-purple-400/20 to-pink-400/20 blur-lg -z-10"
                animate={{
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </motion.h2>
          </div>
        </motion.div>
        
        <motion.p 
          className="text-gray-300 text-xl max-w-3xl mx-auto leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          Everything you need to take control of your finances and build wealth for the future.
        </motion.p>
      </div>

      {/* Features Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10 mb-16">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50, rotateX: 45 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            transition={{ 
              duration: 0.8, 
              delay: index * 0.15,
              type: "spring",
              stiffness: 100
            }}
            whileHover={{ 
              scale: 1.05,
              rotateY: 5,
              z: 50
            }}
            className="group cursor-pointer perspective-1000"
          >
            <div className="relative bg-gradient-to-br from-gray-900/80 to-gray-800/60 backdrop-blur-xl rounded-2xl p-8 border border-gray-700/50 hover:border-gray-500/70 transition-all duration-500 overflow-hidden">
              {/* Card Background Gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
              
              {/* Shine Effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"
                initial={false}
              />

              {/* Feature Icon */}
              <motion.div 
                className={`relative w-20 h-20 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center mb-6 shadow-lg`}
                whileHover={{ 
                  scale: 1.1,
                  rotate: [0, -5, 5, 0],
                  boxShadow: "0 20px 40px rgba(0,0,0,0.3)"
                }}
                transition={{ duration: 0.3 }}
              >
                <span className="text-4xl filter drop-shadow-lg">{feature.icon}</span>
                <div className={`absolute inset-0 bg-gradient-to-r ${feature.color} rounded-2xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-300`} />
              </motion.div>

              {/* Feature Content */}
              <div className="relative space-y-4">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-2xl font-bold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-300 transition-all duration-300">
                    {feature.title}
                  </h3>
                  {feature.stats && (
                    <motion.span 
                      className={`text-xs bg-gradient-to-r ${feature.color} text-white px-3 py-1.5 rounded-full font-semibold shadow-lg`}
                      whileHover={{ scale: 1.1 }}
                    >
                      {feature.stats}
                    </motion.span>
                  )}
                </div>
                <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
                  {feature.description}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Enhanced Bottom Stats */}
      <motion.div 
        className="relative z-10"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1.2 }}
      >
        <div className="bg-gradient-to-r from-gray-900/50 to-gray-800/50 backdrop-blur-xl rounded-2xl border border-gray-700/50 p-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: '50K+', label: 'Active Users', color: 'from-blue-400 to-cyan-400' },
              { value: '$2M+', label: 'Money Tracked', color: 'from-purple-400 to-pink-400' },
              { value: '98%', label: 'Accuracy Rate', color: 'from-green-400 to-emerald-400' },
              { value: '24/7', label: 'Support', color: 'from-orange-400 to-red-400' }
            ].map((stat, index) => (
              <motion.div 
                key={index}
                className="group cursor-pointer"
                whileHover={{ scale: 1.05 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.4 + index * 0.1 }}
              >
                <div className={`text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r ${stat.color} mb-2 group-hover:scale-110 transition-transform duration-300`}>
                  {stat.value}
                </div>
                <div className="text-gray-400 text-sm font-medium group-hover:text-gray-300 transition-colors duration-300">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      <style jsx>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        
        @keyframes glow {
          0%, 100% { box-shadow: 0 0 20px rgba(59, 130, 246, 0.3); }
          50% { box-shadow: 0 0 40px rgba(59, 130, 246, 0.6); }
        }
        
        .animate-glow {
          animation: glow 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default FeaturesDisplay;