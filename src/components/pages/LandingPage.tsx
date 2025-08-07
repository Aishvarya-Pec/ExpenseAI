import React from 'react'
import { motion } from 'framer-motion'
import { 
  ArrowRight, 
  Sparkles, 
  Shield, 
  Brain, 
  Users, 
  TrendingUp,
  Camera,
  PieChart,
  Globe,
  CheckCircle,
  Play
} from 'lucide-react'

const features = [
  {
    icon: Brain,
    title: "AI-Powered Categorization",
    description: "Smart algorithms automatically categorize your expenses with 95% accuracy",
    color: "from-purple-500 to-pink-500"
  },
  {
    icon: Camera,
    title: "Receipt Scanning",
    description: "Snap photos of receipts and let OCR extract all the details instantly",
    color: "from-green-500 to-emerald-500"
  },
  {
    icon: Users,
    title: "Group Expenses",
    description: "Split bills and track shared expenses with friends, family, or roommates",
    color: "from-blue-500 to-cyan-500"
  },
  {
    icon: PieChart,
    title: "Smart Analytics",
    description: "Beautiful charts and insights to understand your spending patterns",
    color: "from-orange-500 to-red-500"
  },
  {
    icon: Shield,
    title: "Bank-Level Security",
    description: "256-bit encryption and advanced security measures protect your data",
    color: "from-indigo-500 to-purple-500"
  },
  {
    icon: Globe,
    title: "Multi-Currency",
    description: "Support for 150+ currencies with real-time exchange rates",
    color: "from-teal-500 to-blue-500"
  }
]

const stats = [
  { number: "50K+", label: "Active Users" },
  { number: "1M+", label: "Expenses Tracked" },
  { number: "95%", label: "AI Accuracy" },
  { number: "4.9★", label: "User Rating" }
]

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Marketing Manager",
    text: "ExpenseAI transformed how I manage my finances. I've saved over $500 this month!",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=60&h=60&fit=crop&crop=face"
  },
  {
    name: "Michael Chen",
    role: "Software Engineer",
    text: "The receipt scanning is incredible. It captures everything perfectly every time.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop&crop=face"
  },
  {
    name: "Emily Rodriguez",
    role: "Freelance Designer",
    text: "Perfect for freelancers! Managing business expenses has never been easier.",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=60&h=60&fit=crop&crop=face"
  }
]

interface LandingPageProps {
  onGetStarted: () => void
  onLearnMore: () => void
  onViewReviews: () => void
}

export const LandingPage: React.FC<LandingPageProps> = ({ 
  onGetStarted, 
  onLearnMore, 
  onViewReviews 
}) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-indigo-900">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-indigo-100 to-purple-100 dark:from-indigo-900 dark:to-purple-900 rounded-full px-4 py-2">
                <Sparkles className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                <span className="text-sm font-semibold text-indigo-600 dark:text-indigo-400">
                  AI-Powered Finance Tracking
                </span>
              </div>
              
              <h1 className="text-5xl md:text-6xl font-bold leading-tight">
                <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Smart Expense
                </span>
                <br />
                <span className="text-gray-900 dark:text-gray-100">
                  Tracking Made
                </span>
                <br />
                <span className="bg-gradient-to-r from-green-500 to-blue-500 bg-clip-text text-transparent">
                  Simple
                </span>
              </h1>
              
              <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed max-w-lg">
                Transform how you manage money with AI-powered categorization, 
                smart insights, and effortless expense tracking. Join thousands 
                who've simplified their financial lives.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={onGetStarted}
                  className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 inline-flex items-center justify-center space-x-2"
                >
                  <span>Get Started Free</span>
                  <ArrowRight className="h-5 w-5" />
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={onLearnMore}
                  className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-600 px-8 py-4 rounded-xl font-semibold hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-300 inline-flex items-center justify-center space-x-2"
                >
                  <Play className="h-5 w-5" />
                  <span>How It Works</span>
                </motion.button>
              </div>
              
              <div className="flex items-center space-x-6 pt-4">
                <div className="flex -space-x-2">
                  {testimonials.map((testimonial, index) => (
                    <img
                      key={index}
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      className="w-10 h-10 rounded-full border-2 border-white shadow-sm"
                    />
                  ))}
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                    Trusted by 50,000+ users
                  </p>
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 1 + i * 0.1 }}
                      >
                        <div className="w-4 h-4 bg-yellow-400 rounded-sm transform rotate-45"></div>
                      </motion.div>
                    ))}
                    <span className="text-sm text-gray-600 dark:text-gray-400 ml-2">
                      4.9/5 rating
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
            
            {/* Right Column - Visual */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative">
                {/* Main illustration */}
                <div className="relative w-full max-w-lg mx-auto">
                  {/* Background pattern */}
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-100 to-purple-100 dark:from-indigo-900 dark:to-purple-900 rounded-3xl transform rotate-6 opacity-20"></div>
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900 dark:to-pink-900 rounded-3xl transform -rotate-6 opacity-20"></div>
                  
                  {/* Phone mockup */}
                  <div className="relative w-80 h-[500px] mx-auto bg-gradient-to-br from-gray-900 to-gray-800 rounded-[3rem] p-3 shadow-2xl">
                    <div className="w-full h-full bg-gradient-to-br from-indigo-50 to-purple-50 rounded-[2.5rem] overflow-hidden relative">
                      {/* Status bar */}
                      <div className="flex justify-between items-center p-4 text-xs font-semibold text-gray-700">
                        <span>9:41</span>
                        <div className="flex space-x-1">
                          <div className="w-4 h-2 bg-green-500 rounded-sm"></div>
                          <div className="w-4 h-2 bg-green-500 rounded-sm"></div>
                          <div className="w-4 h-2 bg-green-500 rounded-sm"></div>
                        </div>
                      </div>
                      
                      {/* App header */}
                      <div className="px-6 pb-4">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="text-xl font-bold text-gray-900">Dashboard</h3>
                          <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
                            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z"></path>
                            </svg>
                          </div>
                        </div>
                        <p className="text-sm text-gray-600">Track your expenses with AI</p>
                      </div>
                      
                      {/* Balance card */}
                      <div className="mx-6 mb-4 p-4 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl text-white">
                        <p className="text-sm opacity-90">Total Balance</p>
                        <p className="text-2xl font-bold">$4,250.80</p>
                        <div className="flex justify-between mt-2 text-xs">
                          <span>Income: $5,200</span>
                          <span>Expenses: $949.20</span>
                        </div>
                      </div>
                      
                      {/* Recent transactions */}
                      <div className="px-6 space-y-3">
                        <h4 className="font-semibold text-gray-900 text-sm">Recent Transactions</h4>
                        {[
                          { name: "Starbucks Coffee", amount: "-$5.50", category: "Food", icon: "☕", color: "bg-orange-100 text-orange-600" },
                          { name: "Salary Deposit", amount: "+$3,200", category: "Income", icon: "💰", color: "bg-green-100 text-green-600" },
                          { name: "Uber Ride", amount: "-$15.30", category: "Transport", icon: "🚗", color: "bg-blue-100 text-blue-600" },
                          { name: "Netflix", amount: "-$12.99", category: "Entertainment", icon: "🎬", color: "bg-red-100 text-red-600" }
                        ].map((expense, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 1 + index * 0.15 }}
                            className="flex items-center justify-between p-3 bg-white rounded-xl shadow-sm"
                          >
                            <div className="flex items-center space-x-3">
                              <div className={`w-10 h-10 ${expense.color} rounded-full flex items-center justify-center text-sm`}>
                                {expense.icon}
                              </div>
                              <div>
                                <p className="font-medium text-gray-900 text-sm">{expense.name}</p>
                                <p className="text-xs text-gray-500">{expense.category}</p>
                              </div>
                            </div>
                            <p className={`font-bold text-sm ${expense.amount.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                              {expense.amount}
                            </p>
                          </motion.div>
                        ))}
                      </div>
                      
                      {/* Bottom navigation */}
                      <div className="absolute bottom-4 left-4 right-4 bg-white rounded-2xl p-2 shadow-lg">
                        <div className="flex justify-around">
                          {['🏠', '📊', '➕', '🎯', '👤'].map((icon, index) => (
                            <button
                              key={index}
                              className={`w-10 h-10 rounded-xl flex items-center justify-center ${index === 0 ? 'bg-indigo-100 text-indigo-600' : 'text-gray-400'}`}
                            >
                              {icon}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Floating elements */}
                <motion.div
                  animate={{ y: [0, -15, 0], rotate: [0, 5, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -top-8 -left-8 w-20 h-20 bg-gradient-to-r from-green-400 to-blue-400 rounded-2xl flex items-center justify-center shadow-xl"
                >
                  <Brain className="h-10 w-10 text-white" />
                </motion.div>
                
                <motion.div
                  animate={{ y: [0, 15, 0], rotate: [0, -5, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                  className="absolute -bottom-8 -right-8 w-20 h-20 bg-gradient-to-r from-purple-400 to-pink-400 rounded-2xl flex items-center justify-center shadow-xl"
                >
                  <Camera className="h-10 w-10 text-white" />
                </motion.div>
                
                <motion.div
                  animate={{ x: [0, 10, 0], y: [0, -5, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                  className="absolute top-1/2 -right-4 w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-2xl flex items-center justify-center shadow-lg"
                >
                  <Sparkles className="h-8 w-8 text-white" />
                </motion.div>
                
                <motion.div
                  animate={{ x: [0, -10, 0], y: [0, 5, 0] }}
                  transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                  className="absolute top-1/4 -left-4 w-16 h-16 bg-gradient-to-r from-teal-400 to-cyan-400 rounded-2xl flex items-center justify-center shadow-lg"
                >
                  <TrendingUp className="h-8 w-8 text-white" />
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
        
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 right-1/4 w-72 h-72 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
          <div className="absolute bottom-1/4 left-1/4 w-72 h-72 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
        </div>
      </div>
      
      {/* Stats Section */}
      <div className="bg-white dark:bg-gray-900 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 dark:text-gray-400 font-medium">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Features Section */}
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              Everything You Need to Master Your Finances
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Powerful features designed to make expense tracking effortless and insightful
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-xl border border-gray-200 dark:border-gray-700 hover:shadow-2xl transition-all duration-300 group"
                >
                  <div className={`w-12 h-12 bg-gradient-to-r ${feature.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    {feature.description}
                  </p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
      
      {/* Testimonials Section */}
      <div className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-gray-800 dark:to-gray-700 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              Loved by Thousands
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              See what our users have to say about ExpenseAI
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-xl"
              >
                <p className="text-gray-700 dark:text-gray-300 mb-4 italic">
                  "{testimonial.text}"
                </p>
                <div className="flex items-center space-x-3">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="font-bold text-gray-900 dark:text-gray-100">
                      {testimonial.name}
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onViewReviews}
              className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Read More Reviews
            </motion.button>
          </motion.div>
        </div>
      </div>
      
      {/* CTA Section */}
      <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-white mb-6">
              Ready to Transform Your Financial Life?
            </h2>
            <p className="text-xl text-white/90 mb-8 leading-relaxed">
              Join thousands of users who have already simplified their expense tracking. 
              Start your free trial today and experience the power of AI-driven finance management.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onGetStarted}
                className="bg-white text-indigo-600 font-bold py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 inline-flex items-center justify-center space-x-2"
              >
                <span>Start Free Trial</span>
                <ArrowRight className="h-5 w-5" />
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onLearnMore}
                className="bg-transparent border-2 border-white text-white font-bold py-4 px-8 rounded-xl hover:bg-white hover:text-indigo-600 transition-all duration-300"
              >
                Learn More
              </motion.button>
            </div>
            
            <div className="mt-8 flex items-center justify-center space-x-6 text-white/80">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5" />
                <span>No credit card required</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5" />
                <span>14-day free trial</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5" />
                <span>Cancel anytime</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}