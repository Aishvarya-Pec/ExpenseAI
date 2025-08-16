import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { 
  Play, 
  ArrowRight, 
  Sparkles, 
  Zap, 
  Target, 
  Shield, 
  Globe, 
  Bell, 
  Users, 
  DollarSign, 
  TrendingUp, 
  Clock, 
  Brain, 
  BarChart3, 
  Rocket, 
  Lock, 
  CheckCircle, 
  Lightbulb
} from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import TestimonialSection from '../ui/TestimonialSection';
import InfiniteRunnerGame from '../ui/InfiniteRunnerGame';
import FuturisticText from '../ui/FuturisticText';
import MagneticButton from '../ui/MagneticButton';
import CinematicBackground from '../ui/CinematicBackground';
import { useScrollAnimations, ScrollProgressBar } from '../ui/ScrollAnimations';
import { Logo } from '../ui/Logo';
import { DeviceMockup } from '../ui/DeviceMockup';
import { AppPreview } from '../ui/AppPreview';

interface LandingPageProps {
  onGetStarted: () => void;
  onLearnMore: () => void;
}

const features = [
  {
    icon: <Sparkles className="w-6 h-6" />,
    title: "AI-Powered Categorization",
    description: "Automatically categorize your expenses with 95% accuracy using advanced machine learning algorithms.",
    color: "from-yellow-600/20 to-yellow-500/20",
    borderColor: "border-yellow-500/30"
  },
  {
    icon: <Zap className="w-6 h-6" />,
    title: "Real-time Insights",
    description: "Get instant analytics and spending patterns to make informed financial decisions in real-time.",
    color: "from-blue-600/20 to-blue-500/20",
    borderColor: "border-blue-500/30"
  },
  {
    icon: <Target className="w-6 h-6" />,
    title: "Smart Budgeting",
    description: "Set intelligent budgets that adapt to your spending habits and automatically adjust to your financial goals.",
    color: "from-green-600/20 to-green-500/20",
    borderColor: "border-green-500/30"
  },
  {
    icon: <Shield className="w-6 h-6" />,
    title: "Bank-Level Security",
    description: "Your financial data is protected with enterprise-grade encryption and multi-layer security protocols.",
    color: "from-purple-600/20 to-purple-500/20",
    borderColor: "border-purple-500/30"
  },
  {
    icon: <Globe className="w-6 h-6" />,
    title: "Multi-Currency Support",
    description: "Track expenses in over 150 currencies with real-time exchange rates and automatic conversion.",
    color: "from-orange-600/20 to-orange-500/20",
    borderColor: "border-orange-500/30"
  },
  {
    icon: <Bell className="w-6 h-6" />,
    title: "Smart Notifications",
    description: "Receive intelligent alerts about unusual spending, bill reminders, and budget warnings.",
    color: "from-red-600/20 to-red-500/20",
    borderColor: "border-red-500/30"
  }
];

const stats = [
  { icon: <Users className="w-8 h-8" />, value: "50K+", label: "Active Users", description: "Growing community" },
  { icon: <DollarSign className="w-8 h-8" />, value: "2M+", label: "Money Tracked", description: "Total managed" },
  { icon: <TrendingUp className="w-8 h-8" />, value: "98%", label: "Accuracy Rate", description: "AI precision" },
  { icon: <Clock className="w-8 h-8" />, value: "24/7", label: "Support", description: "Always available" }
];

const benefits = [
  "Track expenses automatically with AI",
  "Get personalized financial insights",
  "Set and achieve savings goals",
  "Secure bank-level data protection",
  "Real-time spending notifications",
  "Multi-currency support worldwide",
  "Smart budget recommendations",
  "Export data in multiple formats"
];

export const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Marketing Director",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
    content: "ExpenseAI has completely transformed how I manage my finances. The AI categorization is incredibly accurate and saves me hours every month.",
    rating: 5
  },
  {
    name: "Michael Chen",
    role: "Software Engineer",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    content: "The real-time insights have helped me identify spending patterns I never noticed before. I've saved over $500 this month alone!",
    rating: 5
  },
  {
    name: "Emily Rodriguez",
    role: "Small Business Owner",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    content: "Perfect for managing both personal and business expenses. The multi-currency support is a game-changer for my international business.",
    rating: 5
  }
];

const advancedFeatures = [
  {
    icon: <Brain className="w-8 h-8" />,
    title: "AI Financial Advisor",
    description: "Get personalized financial advice powered by machine learning algorithms that understand your unique spending patterns.",
    gradient: "from-purple-500 to-pink-500"
  },
  {
    icon: <BarChart3 className="w-8 h-8" />,
    title: "Predictive Analytics",
    description: "Forecast your future expenses and income with 90% accuracy using advanced predictive modeling.",
    gradient: "from-blue-500 to-cyan-500"
  },
  {
    icon: <Rocket className="w-8 h-8" />,
    title: "Goal Acceleration",
    description: "Achieve your financial goals faster with AI-optimized saving strategies and automated investment recommendations.",
    gradient: "from-green-500 to-emerald-500"
  },
  {
    icon: <Lock className="w-8 h-8" />,
    title: "Quantum Security",
    description: "Next-generation encryption and blockchain-based security protocols protect your financial data.",
    gradient: "from-red-500 to-orange-500"
  }
];

export const FloatingCard: React.FC<{ children: React.ReactNode; delay?: number }> = ({ children, delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      whileHover={{ y: -5, scale: 1.02 }}
      className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-yellow-500/30 transition-all duration-300"
    >
      {children}
    </motion.div>
  );
};

const AnimatedCounter: React.FC<{ value: string; duration?: number }> = ({ value, duration = 2 }) => {
  const [count, setCount] = useState(0);
  const numericValue = parseInt(value.replace(/[^0-9]/g, ''));
  
  useEffect(() => {
    const timer = setTimeout(() => {
      const increment = numericValue / (duration * 60);
      const interval = setInterval(() => {
        setCount(prev => {
          if (prev >= numericValue) {
            clearInterval(interval);
            return numericValue;
          }
          return Math.min(prev + increment, numericValue);
        });
      }, 1000 / 60);
      
      return () => clearInterval(interval);
    }, 500);
    
    return () => clearTimeout(timer);
  }, [numericValue, duration]);
  
  const formatValue = (animatedCount: number) => {
    if (value.includes('K+')) {
      return `${Math.floor(animatedCount)}K+`;
    } else if (value.includes('M+')) {
      return `${Math.floor(animatedCount)}M+`;
    } else if (value.includes('%')) {
      return `${Math.floor(animatedCount)}%`;
    } else if (value.includes('/')) {
      return `${Math.floor(animatedCount)}/7`;
    }
    return Math.floor(animatedCount).toLocaleString();
  };
  
  return <span>{formatValue(count)}</span>;
};

export const LandingPage: React.FC<LandingPageProps> = ({ onGetStarted, onLearnMore }) => {
  const heroRef = useRef<HTMLDivElement>(null);
  const containerRef = useScrollAnimations();
  
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    // Hero section animations
    const tl = gsap.timeline();
    tl.from('.hero-content', {
      y: 100,
      opacity: 0,
      duration: 1.2,
      ease: 'power3.out'
    })
    .from('.hero-buttons', {
      y: 50,
      opacity: 0,
      duration: 0.8,
      ease: 'power2.out'
    }, '-=0.4');
    
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);
  
  return (
    <div className="relative min-h-screen text-white overflow-hidden">
      {/* Fixed Background Video */}
      <CinematicBackground 
        videoSrc="/video.mp4"
        className="fixed inset-0 z-0"
        enableParticles={true}
      />
      
      {/* Navigation Header */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-yellow-500/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Logo 
              size="md" 
              showText={true} 
              imagePath="/logo.png" 
              className="" 
            />
            <div className="hidden md:flex items-center gap-8">
              <button 
                onClick={onLearnMore}
                className="text-white hover:text-yellow-400 transition-colors font-medium cursor-pointer"
              >
                How it works
              </button>
              <button 
                onClick={onGetStarted}
                className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-black px-6 py-2 rounded-lg font-semibold hover:from-yellow-400 hover:to-yellow-500 transition-all transform hover:scale-105"
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      </nav>
      
      {/* Scroll Progress Bar */}
      <div className="relative z-50">
        <ScrollProgressBar />
      </div>
      
      {/* Floating Action Buttons - REMOVED */}
      
      {/* Main Content Container */}
      <div ref={containerRef} className="relative z-10 min-h-screen pt-16">
        {/* Hero Section */}
        <section ref={heroRef} className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
          <div className="container mx-auto px-6 text-center hero-content">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="max-w-4xl mx-auto"
            >
              {/* Enhanced Trust Badge */}
              <motion.div
                className="inline-flex items-center gap-3 bg-gradient-to-r from-yellow-500/40 to-yellow-600/40 border-2 border-yellow-400/60 rounded-full px-8 py-3 mb-8 scale-in backdrop-blur-md shadow-lg shadow-yellow-500/25"
                whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(255, 215, 0, 0.4)" }}
              >
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                <Lightbulb className="w-5 h-5 text-yellow-300" />
                <span className="text-yellow-100 font-bold text-lg">Trusted by 50,000+ users worldwide</span>
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-yellow-400 text-sm">⭐</span>
                  ))}
                </div>
              </motion.div>
              
              {/* Enhanced Main Title */}
              <div className="relative mb-8">
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-yellow-600 blur-3xl opacity-30 animate-pulse"></div>
                <FuturisticText 
                  text="ExpenseAI"
                  variant="neon"
                  className="relative text-7xl md:text-9xl font-black mb-4 text-reveal bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-500 bg-clip-text text-transparent drop-shadow-2xl"
                />
                <div className="text-2xl md:text-3xl font-bold text-white mb-2 drop-shadow-lg">
                  🚀 The Future of Finance is Here
                </div>
              </div>
              
              <FuturisticText 
                text="Smart Expense Tracking with AI"
                variant="gradient"
                className="text-2xl md:text-4xl mb-8 text-yellow-200 fade-in font-semibold drop-shadow-lg"
                delay={0.5}
              />
              
              {/* Enhanced Description */}
              <div className="relative mb-12">
                <div className="absolute inset-0 bg-black/60 rounded-2xl blur-xl"></div>
                <p className="relative text-xl md:text-2xl text-gray-100 max-w-3xl mx-auto leading-relaxed fade-in backdrop-blur-sm bg-black/40 rounded-2xl p-8 border border-yellow-500/30 shadow-2xl">
                  💡 Transform your financial management with cutting-edge AI technology. 
                  <span className="text-yellow-300 font-semibold">Track, categorize, and optimize</span> your expenses like never before.
                  <br /><br />
                  <span className="text-green-400 font-medium">✨ Join the financial revolution today!</span>
                </p>
              </div>
              
              {/* Enhanced Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center hero-buttons slide-in-left mb-8">
                <MagneticButton
                  variant="primary"
                  size="lg"
                  className="group bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-400 hover:to-yellow-500 text-black font-bold text-xl px-10 py-4 shadow-2xl shadow-yellow-500/50 border-2 border-yellow-400"
                  onClick={onGetStarted}
                >
                  🚀 Get Started Free
                  <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-2 transition-transform" />
                </MagneticButton>
                
                <MagneticButton
                  variant="secondary"
                  size="lg"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold text-xl px-10 py-4 shadow-2xl shadow-blue-500/50 border-2 border-blue-400"
                  onClick={onLearnMore}
                >
                  🎬 Watch Demo
                  <Play className="ml-3 h-6 w-6" />
                </MagneticButton>
              </div>
              
              {/* Feature Highlights */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                <div className="bg-black/50 backdrop-blur-sm rounded-xl p-6 border border-green-500/30 hover:border-green-400/60 transition-all">
                  <div className="text-3xl mb-2">🤖</div>
                  <div className="text-green-400 font-bold text-lg">AI-Powered</div>
                  <div className="text-gray-300">95% accuracy in categorization</div>
                </div>
                <div className="bg-black/50 backdrop-blur-sm rounded-xl p-6 border border-blue-500/30 hover:border-blue-400/60 transition-all">
                  <div className="text-3xl mb-2">⚡</div>
                  <div className="text-blue-400 font-bold text-lg">Lightning Fast</div>
                  <div className="text-gray-300">Real-time processing</div>
                </div>
                <div className="bg-black/50 backdrop-blur-sm rounded-xl p-6 border border-purple-500/30 hover:border-purple-400/60 transition-all">
                  <div className="text-3xl mb-2">🔒</div>
                  <div className="text-purple-400 font-bold text-lg">Secure</div>
                  <div className="text-gray-300">Bank-level encryption</div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Smart Expense Tracking Section */}
        <section className="relative py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left Section - Text Content */}
              <motion.div 
                className="ml-8 lg:ml-16 space-y-6"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                viewport={{ once: true }}
              >
                {/* Main Heading */}
                <motion.h2 
                  className="text-4xl lg:text-6xl font-black bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-500 bg-clip-text text-transparent drop-shadow-2xl"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  viewport={{ once: true }}
                >
                  Smart Expense Tracking
                </motion.h2>
                
                {/* Description */}
                <motion.p 
                  className="text-xl lg:text-2xl text-gray-100 leading-relaxed max-w-2xl"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  viewport={{ once: true }}
                >
                  Transform your financial life with AI-powered expense tracking. Get intelligent insights, automated categorization, and smart budgeting that adapts to your lifestyle.
                </motion.p>
                
                {/* Feature Highlights */}
                <motion.div 
                  className="space-y-4"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  viewport={{ once: true }}
                >
                  {[
                    { icon: <Brain className="w-6 h-6" />, text: "AI-Powered Categorization", color: "text-purple-400" },
                    { icon: <Zap className="w-6 h-6" />, text: "Real-time Insights", color: "text-blue-400" },
                    { icon: <Target className="w-6 h-6" />, text: "Smart Budget Adaptation", color: "text-green-400" }
                  ].map((feature, index) => (
                    <motion.div 
                      key={index}
                      className="flex items-center space-x-4"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <div className={`${feature.color} bg-black/30 p-2 rounded-lg backdrop-blur-sm border border-current/20`}>
                        {feature.icon}
                      </div>
                      <span className="text-lg text-white font-medium">{feature.text}</span>
                    </motion.div>
                  ))}
                </motion.div>
                
                {/* CTA Button */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1.0 }}
                  viewport={{ once: true }}
                >
                  <MagneticButton
                    variant="primary"
                    size="lg"
                    className="bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-400 hover:to-yellow-500 text-black font-bold text-lg px-8 py-4 shadow-2xl shadow-yellow-500/50 border-2 border-yellow-400"
                    onClick={onGetStarted}
                  >
                    Start Tracking Now
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </MagneticButton>
                </motion.div>
              </motion.div>
              
              {/* Right Section - Phone Component */}
              <motion.div 
                className="mr-8 lg:mr-16 flex justify-center lg:justify-end"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
                viewport={{ once: true }}
              >
                <div className="relative">
                  {/* Glowing Background Effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-yellow-600/20 blur-3xl rounded-full scale-150 animate-pulse" />
                  
                  {/* Phone Component */}
                  <DeviceMockup type="iphone" showSparkles={true}>
                    <AppPreview screen="dashboard" />
                  </DeviceMockup>
                  
                  {/* Floating Elements */}
                  <motion.div 
                    className="absolute -top-4 -right-4 bg-gradient-to-r from-yellow-400 to-yellow-500 text-black px-3 py-1 rounded-full text-sm font-bold shadow-lg"
                    animate={{ 
                      y: [0, -10, 0],
                      rotate: [0, 5, 0]
                    }}
                    transition={{ 
                      duration: 3, 
                      repeat: Infinity, 
                      ease: "easeInOut" 
                    }}
                  >
                    ExpenseAI
                  </motion.div>
                  
                  <motion.div 
                    className="absolute -bottom-6 -left-6 bg-gradient-to-r from-green-400 to-green-500 text-black px-4 py-2 rounded-full text-xs font-semibold shadow-lg"
                    animate={{ 
                      y: [0, 10, 0],
                      rotate: [0, -5, 0]
                    }}
                    transition={{ 
                      duration: 4, 
                      repeat: Infinity, 
                      ease: "easeInOut",
                      delay: 1
                    }}
                  >
                    🤖 AI-Powered
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Content Sections with enhanced visibility */}
        <div className="relative z-20 bg-gradient-to-b from-black/70 via-black/80 to-black/90 backdrop-blur-sm">
          {/* Stats Section */}
          <section className="py-16 px-4 sm:px-6 lg:px-8 fade-in">
            <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 stagger-container">
                {stats.map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="text-center group stagger-item scale-in"
                  >
                    <div className="flex justify-center mb-4">
                      <motion.div 
                        className="p-3 bg-gradient-to-r from-yellow-600/30 to-yellow-500/30 rounded-xl border border-yellow-500/50 group-hover:scale-110 transition-transform duration-300 rotate-in backdrop-blur-sm"
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.6 }}
                      >
                        <div className="text-yellow-300">
                          {stat.icon}
                        </div>
                      </motion.div>
                    </div>
                    <div className="text-3xl font-bold text-white mb-2 drop-shadow-lg">
                      <AnimatedCounter value={stat.value} />
                    </div>
                    <div className="text-yellow-200 font-medium drop-shadow-md">{stat.label}</div>
                    <div className="text-yellow-300/80 text-sm drop-shadow-sm">{stat.description}</div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Advanced Features Section */}
          <section className="py-20 px-4 sm:px-6 lg:px-8 slide-in-right">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-16 fade-in">
                <FuturisticText 
                  text="Next-Generation Features"
                  variant="neon"
                  className="text-4xl md:text-5xl font-bold mb-6 text-reveal"
                />
                <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                  Experience the future of financial management with our cutting-edge AI-powered features
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 stagger-container">
                {advancedFeatures.map((feature, index) => (
                  <motion.div
                    key={index}
                    className="relative group stagger-item"
                    whileHover={{ y: -10 }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/20 to-yellow-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl blur-xl" />
                    <div className="relative bg-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 h-full group-hover:border-gray-600/50 transition-all duration-300">
                      <div className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${feature.gradient} mb-4`}>
                        <div className="text-white">
                          {feature.icon}
                        </div>
                      </div>
                      <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                      <p className="text-gray-400 text-sm leading-relaxed">{feature.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Features Showcase Section */}
          <section className="py-20 px-4 sm:px-6 lg:px-8 overflow-hidden slide-in-left">
            <div className="max-w-7xl mx-auto">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {features.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="relative group"
                  >
                    <div className={`bg-gradient-to-r ${feature.color} rounded-2xl p-6 border ${feature.borderColor} transition-all duration-300 hover:scale-105`}>
                      <div className="text-yellow-400 mb-4">
                        {feature.icon}
                      </div>
                      <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                      <p className="text-gray-300">{feature.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Benefits Section */}
          <section className="py-20 px-4 sm:px-6 lg:px-8 parallax-bg">
            <div className="max-w-7xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                  className="slide-in-left"
                >
                  <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-reveal">
                    <span className="text-white">Why Choose </span>
                    <span className="bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
                      ExpenseAI?
                    </span>
                  </h2>
                  <p className="text-xl text-gray-300 mb-8 fade-in">
                    Join thousands of users who have transformed their financial lives with our intelligent expense tracking platform.
                  </p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 stagger-container">
                    {benefits.map((benefit, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: index * 0.1 }}
                        className="flex items-center gap-3 stagger-item"
                      >
                        <CheckCircle className="w-5 h-5 text-yellow-400 flex-shrink-0" />
                        <span className="text-gray-300">{benefit}</span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                  className="relative slide-in-right"
                >
                  <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/20 scale-in">
                    <div className="text-center mb-6">
                      <div className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-500/20 to-yellow-600/20 border border-yellow-500/30 rounded-full px-4 py-2 mb-4 rotate-in">
                        <Sparkles className="w-4 h-4 text-yellow-400" />
                        <span className="text-yellow-400 font-medium">AI-Powered</span>
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-4 text-reveal">Smart Financial Insights</h3>
                      <p className="text-gray-300 fade-in">Our advanced AI analyzes your spending patterns and provides personalized recommendations to help you save more and spend smarter.</p>
                    </div>
                    
                    <div className="space-y-4 stagger-container">
                      <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg stagger-item">
                        <TrendingUp className="w-5 h-5 text-green-400" />
                        <span className="text-white">Average 23% reduction in unnecessary spending</span>
                      </div>
                      <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg stagger-item">
                        <Target className="w-5 h-5 text-blue-400" />
                        <span className="text-white">95% accuracy in expense categorization</span>
                      </div>
                      <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg stagger-item">
                        <Clock className="w-5 h-5 text-purple-400" />
                        <span className="text-white">Save 5+ hours per month on financial management</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </section>

          {/* Interactive Demo Section - Stone Cash Game */}
          <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-900/50 to-black/50 fade-in relative z-10">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-reveal">
                  <span className="text-white">Stone Cash </span>
                  <span className="bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
                    Game
                  </span>
                </h2>
                <p className="text-xl text-gray-400 max-w-3xl mx-auto fade-in">
                  Watch our features race across the screen at lightning speed! Click to catch them!
                </p>
              </div>
              
              <div className="relative scale-in">
                <InfiniteRunnerGame />
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="text-center mt-8 fade-in"
              >
                <p className="text-gray-400 mb-4">💰 Click on cash, avoid stones! Test your reflexes!</p>
                <div className="flex justify-center gap-4 text-sm text-gray-500">
                  <span>💰 Collect Cash</span>
                  <span>🪨 Avoid Stones</span>
                  <span>🎮 5 Rounds Challenge</span>
                </div>
              </motion.div>
            </div>
          </section>

          {/* Testimonials Section */}
          <TestimonialSection />

          {/* Final CTA Section */}
          <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-black via-gray-900 to-black relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/5 to-yellow-600/5" />
            <div className="max-w-4xl mx-auto text-center relative z-10">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <h2 className="text-4xl lg:text-6xl font-bold mb-6">
                  <span className="text-white">Get Started </span>
                  <span className="bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
                    Today
                  </span>
                </h2>
                <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
                  Join thousands of users who have already transformed their financial lives with ExpenseAI. Start your journey to smarter spending today.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                  <MagneticButton
                    onClick={onGetStarted}
                    className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-black px-8 py-4 rounded-xl font-bold text-lg hover:from-yellow-400 hover:to-yellow-500 transition-all transform hover:scale-105 shadow-lg shadow-yellow-500/25"
                  >
                    <Play className="w-5 h-5 mr-2" />
                    Get Started Free
                  </MagneticButton>
                  
                  <button
                    onClick={onLearnMore}
                    className="group flex items-center gap-2 text-white border border-gray-600 px-8 py-4 rounded-xl font-semibold hover:border-yellow-400 hover:text-yellow-400 transition-all"
                  >
                    How it Works
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
                
                {/* Removed pricing text section since app is free */}
              </motion.div>
            </div>
            
            {/* Floating particles */}
            <div className="absolute inset-0 pointer-events-none">
              {[...Array(20)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-yellow-400 rounded-full"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`
                  }}
                  animate={{
                    y: [-20, 20],
                    opacity: [0, 1, 0]
                  }}
                  transition={{
                    duration: 3 + Math.random() * 2,
                    repeat: Infinity,
                    delay: Math.random() * 2
                  }}
                />
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;