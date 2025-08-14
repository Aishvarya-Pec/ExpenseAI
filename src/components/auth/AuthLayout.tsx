import React from 'react'
import { motion } from 'framer-motion'
import { Logo } from '../ui/Logo'
interface AuthLayoutProps {
  children: React.ReactNode
  title: string
  subtitle: string
}

export const AuthLayout: React.FC<AuthLayoutProps> = ({ children, title, subtitle }) => {
  return (
    
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-yellow-900 flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          {/* Logo */}
          <div className="flex justify-center mb-6">
            <Logo size="xl" showText={false} animated={true} />
          </div>

          
          <h2 className="text-3xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent mb-2">
            {title}
          </h2>
         
          <p className="text-gray-300 text-sm">
            {subtitle}
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
         
          className="bg-gray-900/50 rounded-2xl shadow-2xl border border-yellow-500/20 p-8 backdrop-blur-lg"
        >
          {children}
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        
          className="text-center text-xs text-gray-400"
        >
          Secure authentication powered by Clerk
        </motion.div>
      </div>
    </div>
  )
}
