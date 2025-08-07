import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Star, Quote, ChevronLeft, ChevronRight, TrendingUp, Users, Award } from 'lucide-react'

const reviews = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Marketing Manager",
    company: "TechCorp",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=150&h=150&fit=crop&crop=face",
    rating: 5,
    text: "ExpenseAI has completely transformed how I manage my finances. The AI categorization is incredibly accurate, and I love how it automatically tracks my spending patterns. I've saved over $500 this month just by following its recommendations!",
    highlight: "Saved $500 this month",
    date: "2 weeks ago"
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Software Engineer",
    company: "StartupXYZ",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    rating: 5,
    text: "As a developer, I appreciate the clean interface and powerful features. The receipt scanning using OCR is mind-blowing - it captures everything perfectly. The group expense feature is perfect for splitting bills with roommates.",
    highlight: "Perfect OCR scanning",
    date: "1 week ago"
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    role: "Freelance Designer",
    company: "Self-employed",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    rating: 5,
    text: "Managing business expenses used to be a nightmare. ExpenseAI makes it so easy to track everything, categorize business vs personal expenses, and generate reports for tax season. It's a game-changer for freelancers!",
    highlight: "Perfect for freelancers",
    date: "3 days ago"
  },
  {
    id: 4,
    name: "David Thompson",
    role: "Financial Advisor",
    company: "WealthPro",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    rating: 5,
    text: "I recommend ExpenseAI to all my clients. The analytics and insights are incredibly detailed, and the budgeting features help people stay on track with their financial goals. The security measures are top-notch too.",
    highlight: "Recommended by advisor",
    date: "5 days ago"
  },
  {
    id: 5,
    name: "Lisa Park",
    role: "Student",
    company: "Stanford University",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
    rating: 5,
    text: "As a college student on a tight budget, ExpenseAI helps me track every dollar. The spending alerts keep me from overspending, and the goal-setting feature motivated me to save $1,200 for spring break!",
    highlight: "Saved $1,200 for vacation",
    date: "1 day ago"
  },
  {
    id: 6,
    name: "James Wilson",
    role: "Small Business Owner",
    company: "Wilson's Bakery",
    avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop&crop=face",
    rating: 5,
    text: "Running a small business means tracking countless expenses. ExpenseAI's multi-currency support and detailed categorization help me understand where every penny goes. The monthly reports are incredibly detailed.",
    highlight: "Perfect for small business",
    date: "4 days ago"
  },
  {
    id: 7,
    name: "Rachel Green",
    role: "Travel Blogger",
    company: "WanderlustDiary",
    avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop&crop=face",
    rating: 5,
    text: "Traveling constantly makes expense tracking challenging. ExpenseAI's multi-currency support and offline receipt scanning are lifesavers. I can track expenses from 15 different countries seamlessly!",
    highlight: "15 countries tracked",
    date: "6 days ago"
  },
  {
    id: 8,
    name: "Alex Kumar",
    role: "Product Manager",
    company: "InnovateCorp",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face",
    rating: 5,
    text: "The team collaboration features are excellent. We use ExpenseAI for all our project expenses, and the real-time sharing makes reimbursements so much faster. The approval workflow is streamlined and efficient.",
    highlight: "Streamlined team workflow",
    date: "2 weeks ago"
  }
]

const stats = [
  {
    icon: Users,
    number: "50,000+",
    label: "Happy Users",
    description: "Trusted by individuals and businesses worldwide"
  },
  {
    icon: Star,
    number: "4.9/5",
    label: "Average Rating",
    description: "Based on 10,000+ reviews across all platforms"
  },
  {
    icon: TrendingUp,
    number: "$2.5M+",
    label: "Money Saved",
    description: "Total savings by our users this year"
  },
  {
    icon: Award,
    number: "#1",
    label: "Finance App",
    description: "Rated best expense tracker 2024"
  }
]

export const Reviews: React.FC = () => {
  const [currentReview, setCurrentReview] = useState(0)
  const [selectedCategory, setSelectedCategory] = useState('all')

  const categories = ['all', 'business', 'personal', 'students', 'freelancers']

  const filteredReviews = selectedCategory === 'all' 
    ? reviews 
    : reviews.filter(review => {
        switch(selectedCategory) {
          case 'business': return ['Small Business Owner', 'Product Manager', 'Financial Advisor'].includes(review.role)
          case 'personal': return ['Marketing Manager', 'Travel Blogger'].includes(review.role)
          case 'students': return review.role === 'Student'
          case 'freelancers': return review.role === 'Freelance Designer'
          default: return true
        }
      })

  const nextReview = () => {
    setCurrentReview((prev) => (prev + 1) % filteredReviews.length)
  }

  const prevReview = () => {
    setCurrentReview((prev) => (prev - 1 + filteredReviews.length) % filteredReviews.length)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-indigo-900">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-6">
              What Our Users Say
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Don't just take our word for it. Here's what real users have to say about their experience with ExpenseAI.
            </p>
          </motion.div>
        </div>
        
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-r from-green-400 to-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white dark:bg-gray-800 rounded-2xl p-6 text-center shadow-xl border border-gray-200 dark:border-gray-700"
              >
                <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <div className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                  {stat.number}
                </div>
                <div className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  {stat.label}
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  {stat.description}
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>

      {/* Featured Review Carousel */}
      <div className="bg-white dark:bg-gray-900 py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              Featured Reviews
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Hear from our amazing community
            </p>
          </motion.div>

          <div className="relative">
            <motion.div
              key={currentReview}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
              className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-gray-800 dark:to-gray-700 rounded-3xl p-8 md:p-12"
            >
              <div className="flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-8">
                <div className="flex-shrink-0">
                  <img
                    src={filteredReviews[currentReview]?.avatar}
                    alt={filteredReviews[currentReview]?.name}
                    className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg"
                  />
                </div>
                
                <div className="flex-1 text-center md:text-left">
                  <div className="flex justify-center md:justify-start space-x-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-5 w-5 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>
                  
                  <Quote className="h-8 w-8 text-indigo-500 mb-4 mx-auto md:mx-0" />
                  
                  <p className="text-lg text-gray-700 dark:text-gray-300 mb-6 italic leading-relaxed">
                    "{filteredReviews[currentReview]?.text}"
                  </p>
                  
                  <div className="flex flex-col md:flex-row items-center justify-between">
                    <div>
                      <h4 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                        {filteredReviews[currentReview]?.name}
                      </h4>
                      <p className="text-gray-600 dark:text-gray-400">
                        {filteredReviews[currentReview]?.role} at {filteredReviews[currentReview]?.company}
                      </p>
                    </div>
                    
                    <div className="mt-4 md:mt-0 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-4 py-2 rounded-full text-sm font-semibold">
                      {filteredReviews[currentReview]?.highlight}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Navigation buttons */}
            <button
              onClick={prevReview}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white dark:bg-gray-800 rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <ChevronLeft className="h-6 w-6 text-gray-600 dark:text-gray-400" />
            </button>
            
            <button
              onClick={nextReview}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white dark:bg-gray-800 rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <ChevronRight className="h-6 w-6 text-gray-600 dark:text-gray-400" />
            </button>
          </div>

          {/* Dots indicator */}
          <div className="flex justify-center space-x-2 mt-8">
            {filteredReviews.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentReview(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentReview
                    ? 'bg-indigo-600 w-8'
                    : 'bg-gray-300 dark:bg-gray-600'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* All Reviews Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-8">
            All Reviews
          </h2>
          
          {/* Category filters */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => {
                  setSelectedCategory(category)
                  setCurrentReview(0)
                }}
                className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                  selectedCategory === category
                    ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                }`}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
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
              className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-xl border border-gray-200 dark:border-gray-700 hover:shadow-2xl transition-all duration-300"
            >
              <div className="flex items-center space-x-4 mb-4">
                <img
                  src={review.avatar}
                  alt={review.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <h4 className="font-bold text-gray-900 dark:text-gray-100">
                    {review.name}
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
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
              
              <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
                "{review.text}"
              </p>
              
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {review.date}
                </span>
                <span className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-3 py-1 rounded-full text-xs font-semibold">
                  Verified
                </span>
              </div>
            </motion.div>
          ))}
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
              Ready to Join Our Happy Users?
            </h2>
            <p className="text-xl text-white/90 mb-8 leading-relaxed">
              Start your journey to better financial management today and see why thousands trust ExpenseAI
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-indigo-600 font-bold py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Start Free Trial
            </motion.button>
          </motion.div>
        </div>
      </div>
    </div>
  )
}