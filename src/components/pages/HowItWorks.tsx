import React from 'react'
import { motion } from 'framer-motion'
import { 
  Smartphone, 
  Brain, 
  PieChart, 
  Users, 
  Camera, 
  CreditCard, 
  Target, 
  TrendingUp,
  CheckCircle,
  ArrowRight,
  Zap,
  Shield,
  Globe
} from 'lucide-react'

const steps = [
  {
    id: 1,
    title: "Sign Up & Connect",
    description: "Create your account and securely connect your bank accounts, credit cards, and payment methods.",
    icon: CreditCard,
    color: "from-blue-500 to-cyan-500",
    features: ["Bank-level security", "Multiple account types", "Instant sync"]
  },
  {
    id: 2,
    title: "Smart Capture",
    description: "Add expenses instantly by taking photos of receipts or manually entering transactions.",
    icon: Camera,
    color: "from-green-500 to-emerald-500",
    features: ["OCR receipt scanning", "Voice input", "Quick add shortcuts"]
  },
  {
    id: 3,
    title: "AI Categorization",
    description: "Our AI automatically categorizes and tags your expenses with 95% accuracy.",
    icon: Brain,
    color: "from-purple-500 to-pink-500",
    features: ["Machine learning", "Custom categories", "Smart suggestions"]
  },
  {
    id: 4,
    title: "Analytics & Insights",
    description: "Get detailed insights, budgeting recommendations, and spending patterns analysis.",
    icon: PieChart,
    color: "from-orange-500 to-red-500",
    features: ["Real-time analytics", "Budget tracking", "Spending alerts"]
  },
  {
    id: 5,
    title: "Collaborate & Share",
    description: "Share expenses with family, friends, or roommates for seamless group expense management.",
    icon: Users,
    color: "from-indigo-500 to-purple-500",
    features: ["Group expenses", "Bill splitting", "Shared budgets"]
  },
  {
    id: 6,
    title: "Achieve Goals",
    description: "Set financial goals, track progress, and get personalized recommendations to save more.",
    icon: Target,
    color: "from-teal-500 to-blue-500",
    features: ["Goal setting", "Progress tracking", "Savings tips"]
  }
]

const features = [
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Add expenses in seconds with our intuitive interface and smart shortcuts."
  },
  {
    icon: Brain,
    title: "AI-Powered",
    description: "Advanced machine learning algorithms categorize and analyze your spending patterns."
  },
  {
    icon: Shield,
    title: "Bank-Level Security",
    description: "Your data is protected with 256-bit encryption and advanced security measures."
  },
  {
    icon: Globe,
    title: "Multi-Currency",
    description: "Support for 150+ currencies with real-time exchange rates."
  },
  {
    icon: Smartphone,
    title: "Cross-Platform",
    description: "Access your data anywhere with our web, mobile, and desktop applications."
  },
  {
    icon: TrendingUp,
    title: "Smart Analytics",
    description: "Get actionable insights with beautiful charts and detailed reports."
  }
]

export const HowItWorks: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-indigo-900">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center lg:text-left"
            >
              <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-6">
                How ExpenseAI Works
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
                Discover how our AI-powered platform transforms the way you track, analyze, and manage your expenses with cutting-edge technology and intuitive design.
              </p>
            </motion.div>
            
            {/* Hero illustration */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative w-full max-w-md mx-auto">
                {/* Central hub illustration */}
                <div className="relative w-64 h-64 mx-auto">
                  {/* Central AI brain */}
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center shadow-xl"
                  >
                    <Brain className="h-10 w-10 text-white" />
                  </motion.div>
                  
                  {/* Orbiting feature icons */}
                  {[
                    { icon: Camera, color: "from-green-400 to-emerald-500", delay: 0 },
                    { icon: PieChart, color: "from-orange-400 to-red-500", delay: 1 },
                    { icon: Users, color: "from-blue-400 to-cyan-500", delay: 2 },
                    { icon: Target, color: "from-purple-400 to-pink-500", delay: 3 },
                    { icon: Shield, color: "from-yellow-400 to-orange-500", delay: 4 },
                    { icon: Globe, color: "from-teal-400 to-blue-500", delay: 5 }
                  ].map((item, index) => {
                    const angle = (index * 360) / 6
                    const radius = 100
                    const x = Math.cos((angle * Math.PI) / 180) * radius
                    const y = Math.sin((angle * Math.PI) / 180) * radius
                    
                    return (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ 
                          opacity: 1, 
                          scale: 1,
                          rotate: -360
                        }}
                        transition={{ 
                          delay: item.delay * 0.2,
                          rotate: { duration: 20, repeat: Infinity, ease: "linear" }
                        }}
                        className={`absolute w-12 h-12 bg-gradient-to-r ${item.color} rounded-xl flex items-center justify-center shadow-lg`}
                        style={{
                          left: `calc(50% + ${x}px - 24px)`,
                          top: `calc(50% + ${y}px - 24px)`,
                        }}
                      >
                        <item.icon className="h-6 w-6 text-white" />
                      </motion.div>
                    )
                  })}
                  
                  {/* Connection lines */}
                  <svg className="absolute inset-0 w-full h-full pointer-events-none">
                    {[0, 1, 2, 3, 4, 5].map((index) => {
                      const angle = (index * 360) / 6
                      const radius = 100
                      const x1 = 50 + Math.cos((angle * Math.PI) / 180) * 15
                      const y1 = 50 + Math.sin((angle * Math.PI) / 180) * 15
                      const x2 = 50 + Math.cos((angle * Math.PI) / 180) * (radius - 15)
                      const y2 = 50 + Math.sin((angle * Math.PI) / 180) * (radius - 15)
                      
                      return (
                        <motion.line
                          key={index}
                          x1={`${x1}%`}
                          y1={`${y1}%`}
                          x2={`${x2}%`}
                          y2={`${y2}%`}
                          stroke="url(#gradient)"
                          strokeWidth="2"
                          strokeDasharray="5,5"
                          initial={{ pathLength: 0 }}
                          animate={{ pathLength: 1 }}
                          transition={{ delay: index * 0.2, duration: 2 }}
                        />
                      )
                    })}
                    <defs>
                      <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#6366f1" stopOpacity="0.6"/>
                        <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.3"/>
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
        
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
        </div>
      </div>

      {/* Steps Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {steps.map((step, index) => {
            const Icon = step.icon
            const isEven = index % 2 === 0
            
            return (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`flex ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} ${index % 2 === 0 ? '' : 'lg:col-start-2 lg:row-start-' + Math.ceil((index + 1) / 2)}`}
              >
                <div className="w-full">
                  <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl border border-gray-200 dark:border-gray-700 hover:shadow-2xl transition-all duration-300">
                    <div className="flex items-center space-x-4 mb-6">
                      <div className={`w-16 h-16 bg-gradient-to-r ${step.color} rounded-2xl flex items-center justify-center shadow-lg`}>
                        <Icon className="h-8 w-8 text-white" />
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-1">
                          Step {step.id}
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                          {step.title}
                        </h3>
                      </div>
                    </div>
                    
                    <p className="text-gray-600 dark:text-gray-300 text-lg mb-6 leading-relaxed">
                      {step.description}
                    </p>
                    
                    <div className="space-y-3">
                      {step.features.map((feature, featureIndex) => (
                        <motion.div
                          key={featureIndex}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.3 + featureIndex * 0.1 }}
                          className="flex items-center space-x-3"
                        >
                          <CheckCircle className="h-5 w-5 text-green-500" />
                          <span className="text-gray-700 dark:text-gray-300 font-medium">
                            {feature}
                          </span>
                        </motion.div>
                      ))}
                    </div>
                    
                    {index < steps.length - 1 && (
                      <div className="flex justify-center mt-8">
                        <ArrowRight className="h-6 w-6 text-gray-400 animate-pulse" />
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>

      {/* Features Grid */}
      <div className="bg-white dark:bg-gray-900 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              Why Choose ExpenseAI?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Built with cutting-edge technology and designed for the modern user
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
                  className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-6 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300 group"
                >
                  <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
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
              Ready to Transform Your Finance Management?
            </h2>
            <p className="text-xl text-white/90 mb-8 leading-relaxed">
              Join thousands of users who have already simplified their expense tracking with ExpenseAI
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-indigo-600 font-bold py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 inline-flex items-center space-x-2"
            >
              <span>Get Started Today</span>
              <ArrowRight className="h-5 w-5" />
            </motion.button>
          </motion.div>
        </div>
      </div>
    </div>
  )
}