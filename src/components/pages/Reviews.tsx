import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  ChevronLeft,
  ChevronRight,
  Star,
  Users,
  TrendingUp,
  Award, 
  Shield
} from 'lucide-react'
import Sparkles from '../ui/Sparkles'
import WobblyLogo from '../ui/WobblyLogo'

// Enhanced reviews data with more details
const reviews = [
  {
    id: 1,
    name: "Sarah Chen",
    role: "Financial Analyst",
    company: "TechCorp",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150",
    rating: 5,
    text: "ExpenseAI has revolutionized how I manage my finances. The AI insights are incredibly accurate and have helped me save over $2000 this year!",
    date: "2024-01-15",
    highlight: "Saved $2000+",
    category: "personal"
  },
  {
    id: 2,
    name: "Marcus Johnson",
    role: "Small Business Owner",
    company: "Johnson's Bakery",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
    rating: 5,
    text: "The business expense tracking is phenomenal. I can see exactly where my money goes and make data-driven decisions for my bakery.",
    date: "2024-01-10",
    highlight: "Business Growth",
    category: "business"
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    role: "Freelance Designer",
    company: "Creative Studio",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150",
    rating: 5,
    text: "As a freelancer, tracking expenses was always a nightmare. ExpenseAI makes it effortless and even helps with tax preparation!",
    date: "2024-01-08",
    highlight: "Tax Ready",
    category: "freelance"
  },
  {
    id: 4,
    name: "David Kim",
    role: "Software Engineer",
    company: "StartupXYZ",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150",
    rating: 5,
    text: "The AI categorization is spot-on. It learns my spending patterns and provides insights I never would have discovered myself.",
    date: "2024-01-05",
    highlight: "AI Powered",
    category: "personal"
  },
  {
    id: 5,
    name: "Lisa Thompson",
    role: "Marketing Director",
    company: "Global Inc",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150",
    rating: 5,
    text: "ExpenseAI has streamlined our team's expense reporting. What used to take hours now takes minutes. Absolutely game-changing!",
    date: "2024-01-03",
    highlight: "Time Saver",
    category: "business"
  },
  {
    id: 6,
    name: "Alex Rivera",
    role: "Consultant",
    company: "Rivera Consulting",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150",
    rating: 5,
    text: "The mobile app is fantastic. I can track expenses on the go and the receipt scanning feature is incredibly accurate.",
    date: "2024-01-01",
    highlight: "Mobile First",
    category: "freelance"
  }
];

const stats = [
  { icon: Users, number: "50K+", label: "Active Users", description: "Growing community" },
  { icon: TrendingUp, number: "$2M+", label: "Money Saved", description: "By our users" },
  { icon: Award, number: "4.9★", label: "App Rating", description: "Highly rated" },
  { icon: Shield, number: "99.9%", label: "Uptime", description: "Reliable service" }
];

const categories = ['all', 'personal', 'business', 'freelance'];

export default function Reviews() {
  const [currentReview, setCurrentReview] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredReviews = selectedCategory === 'all' 
    ? reviews 
    : reviews.filter(review => review.category === selectedCategory);

  const nextReview = () => {
    setCurrentReview((prev) => (prev + 1) % filteredReviews.length);
  };

  const prevReview = () => {
    setCurrentReview((prev) => (prev - 1 + filteredReviews.length) % filteredReviews.length);
  };

  useEffect(() => {
    const interval = setInterval(nextReview, 5000);
    return () => clearInterval(interval);
  }, [filteredReviews.length]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white overflow-hidden">
      {/* Hero Section with Sparkles */}
      <Sparkles className="relative" density={25} color="mixed">
        <div className="relative py-32 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
            >
              <h1 className="text-6xl md:text-8xl font-bold mb-8">
                <span className="bg-gradient-to-r from-yellow-400 via-yellow-500 to-amber-500 bg-clip-text text-transparent">
                  Reviews
                </span>
              </h1>
              <motion.p 
                className="text-2xl md:text-3xl text-gray-300 mb-12 leading-relaxed"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 1 }}
              >
                Trusted by thousands of users worldwide
              </motion.p>
            </motion.div>

            {/* Floating Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 + index * 0.1, duration: 0.8 }}
                    whileHover={{ 
                      scale: 1.05,
                      boxShadow: "0 20px 40px rgba(255, 215, 0, 0.3)"
                    }}
                    className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-yellow-500/20 rounded-2xl p-6 hover:border-yellow-500/40 transition-all duration-300"
                  >
                    <Icon className="h-8 w-8 text-yellow-400 mx-auto mb-4" />
                    <div className="text-3xl font-bold text-yellow-400 mb-2">
                      {stat.number}
                    </div>
                    <div className="text-gray-300 text-sm">
                      {stat.label}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </Sparkles>

      {/* Featured Review with Enhanced Design */}
      <div className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-yellow-400 to-amber-500 bg-clip-text text-transparent">
                Featured Stories
              </span>
            </h2>
            <p className="text-xl text-gray-400">
              Real experiences from our community
            </p>
          </motion.div>

          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentReview}
                initial={{ opacity: 0, x: 100, rotateY: 15 }}
                animate={{ opacity: 1, x: 0, rotateY: 0 }}
                exit={{ opacity: 0, x: -100, rotateY: -15 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
                className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-lg border border-yellow-500/20 rounded-3xl p-8 md:p-12 shadow-2xl"
                style={{
                  boxShadow: "0 25px 50px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 215, 0, 0.1)"
                }}
              >
                <div className="flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-8">
                  <motion.div 
                    className="flex-shrink-0"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ duration: 0.3 }}
                  >
                    <img
                      src={filteredReviews[currentReview]?.avatar}
                      alt={filteredReviews[currentReview]?.name}
                      className="w-32 h-32 rounded-full object-cover border-4 border-yellow-500/50 shadow-xl"
                    />
                  </motion.div>
                  
                  <div className="flex-1 text-center md:text-left">
                    <div className="flex justify-center md:justify-start space-x-1 mb-6">
                      {[...Array(5)].map((_, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: i * 0.1, duration: 0.3 }}
                        >
                          <Star className="h-6 w-6 fill-yellow-400 text-yellow-400" />
                        </motion.div>
                      ))}
                    </div>
                    
                    <Quote className="h-12 w-12 text-yellow-400 mb-6 mx-auto md:mx-0 opacity-50" />
                    
                    <p className="text-xl text-gray-300 mb-8 italic leading-relaxed font-light">
                      "{filteredReviews[currentReview]?.text}"
                    </p>
                    
                    <div className="flex flex-col md:flex-row items-center justify-between">
                      <div>
                        <h4 className="text-2xl font-bold text-white mb-2">
                          {filteredReviews[currentReview]?.name}
                        </h4>
                        <p className="text-gray-400 text-lg">
                          {filteredReviews[currentReview]?.role} at {filteredReviews[currentReview]?.company}
                        </p>
                      </div>
                      
                      <motion.div 
                        className="mt-4 md:mt-0 bg-gradient-to-r from-yellow-400 to-amber-500 text-black px-6 py-3 rounded-full text-sm font-bold shadow-lg"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {filteredReviews[currentReview]?.highlight}
                      </motion.div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Enhanced Navigation */}
            <motion.button
              onClick={prevReview}
              whileHover={{ scale: 1.1, x: -5 }}
              whileTap={{ scale: 0.9 }}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-yellow-400 to-amber-500 text-black rounded-full p-4 shadow-xl hover:shadow-2xl transition-all duration-300"
            >
              <ChevronLeft className="h-6 w-6" />
            </motion.button>
            
            <motion.button
              onClick={nextReview}
              whileHover={{ scale: 1.1, x: 5 }}
              whileTap={{ scale: 0.9 }}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-yellow-400 to-amber-500 text-black rounded-full p-4 shadow-xl hover:shadow-2xl transition-all duration-300"
            >
              <ChevronRight className="h-6 w-6" />
            </motion.button>
          </div>

          {/* Enhanced Dots */}
          <div className="flex justify-center space-x-3 mt-12">
            {filteredReviews.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => setCurrentReview(index)}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.8 }}
                className={`h-4 w-4 rounded-full transition-all duration-300 ${
                  index === currentReview
                    ? 'bg-gradient-to-r from-yellow-400 to-amber-500 w-12 shadow-lg'
                    : 'bg-gray-600 hover:bg-gray-500'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Reviews Grid with Enhanced Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold mb-8">
            <span className="bg-gradient-to-r from-yellow-400 to-amber-500 bg-clip-text text-transparent">
              Community Voices
            </span>
          </h2>
          
          {/* Enhanced Category Filters */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((category) => (
              <motion.button
                key={category}
                onClick={() => {
                  setSelectedCategory(category);
                  setCurrentReview(0);
                }}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className={`px-8 py-3 rounded-full font-medium transition-all duration-300 ${
                  selectedCategory === category
                    ? 'bg-gradient-to-r from-yellow-400 to-amber-500 text-black shadow-lg shadow-yellow-500/25'
                    : 'bg-gray-800/50 border border-gray-700 text-gray-300 hover:border-yellow-500/50 hover:text-white backdrop-blur-sm'
                }`}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </motion.button>
            ))}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reviews.slice(0, 6).map((review, index) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ 
                y: -10, 
                scale: 1.02,
                boxShadow: "0 25px 50px rgba(255, 215, 0, 0.2)"
              }}
              className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 shadow-xl hover:border-yellow-500/30 transition-all duration-300"
            >
              <div className="flex items-center space-x-4 mb-4">
                <motion.img
                  src={review.avatar}
                  alt={review.name}
                  className="w-14 h-14 rounded-full object-cover border-2 border-yellow-500/30"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                />
                <div>
                  <h4 className="font-bold text-white text-lg">
                    {review.name}
                  </h4>
                  <p className="text-sm text-gray-400">
                    {review.role}
                  </p>
                </div>
              </div>
              
              <div className="flex space-x-1 mb-4">
                {[...Array(review.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="h-4 w-4 fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>
              
              <p className="text-gray-300 mb-6 leading-relaxed">
                "{review.text}"
              </p>
              
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-500">
                  {review.date}
                </span>
                <span className="bg-gradient-to-r from-green-400 to-emerald-500 text-black px-3 py-1 rounded-full text-xs font-bold">
                  Verified
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* CTA Section with Wobbly Logo */}
      <Sparkles className="relative" density={20} color="gold">
        <div className="bg-gradient-to-r from-black via-gray-900 to-black py-32">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <WobblyLogo size="lg" className="mx-auto mb-8" />
              
              <h2 className="text-5xl font-bold mb-6">
                <span className="bg-gradient-to-r from-yellow-400 to-amber-500 bg-clip-text text-transparent">
                  Join Our Success Story
                </span>
              </h2>
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                Experience the future of financial management with ExpenseAI
              </p>
              <motion.button
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 20px 40px rgba(255, 215, 0, 0.3)"
                }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-yellow-400 to-amber-500 text-black font-bold py-4 px-12 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 text-lg"
              >
                Start Your Journey
              </motion.button>
            </motion.div>
          </div>
        </div>
      </Sparkles>
    </div>
  );
}