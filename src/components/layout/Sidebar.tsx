import React from 'react'
import { motion } from 'framer-motion'
import { 
  Home, 
  CreditCard, 
  Users, 
  PieChart, 
  Target, 
  Settings, 
  TrendingUp,
  Receipt,
  Calendar
} from 'lucide-react'
import { Logo } from '../ui/Logo'

interface SidebarProps {
  currentPage: string
  onPageChange: (page: string) => void
  isCollapsed?: boolean
}

const navigation = [
  { id: 'dashboard', name: 'Dashboard', icon: Home, color: 'text-blue-600' },
  { id: 'expenses', name: 'Expenses', icon: Receipt, color: 'text-green-600' },
  { id: 'groups', name: 'Group Expenses', icon: Users, color: 'text-purple-600' },
  { id: 'analytics', name: 'Analytics', icon: PieChart, color: 'text-orange-600' },
  { id: 'budgets', name: 'Budgets', icon: Target, color: 'text-red-600' },
  { id: 'cards', name: 'Cards & Accounts', icon: CreditCard, color: 'text-indigo-600' },
  { id: 'calendar', name: 'Calendar', icon: Calendar, color: 'text-teal-600' },
  { id: 'reports', name: 'Reports', icon: TrendingUp, color: 'text-emerald-600' },
]

export const Sidebar: React.FC<SidebarProps> = ({ currentPage, onPageChange, isCollapsed = false }) => {
  return (
    <motion.aside
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      className={`${
        isCollapsed ? 'w-16' : 'w-64'
      } bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 h-screen sticky top-0 transition-all duration-300 overflow-hidden`}
    >
      <div className="p-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-8"
        >
          <Logo size="lg" showText={!isCollapsed} animated={true} />
        </motion.div>
      </div>

      <nav className="px-3 pb-6">
        <div className="space-y-1">
          {navigation.map((item, index) => {
            const isActive = currentPage === item.id
            const Icon = item.icon
            
            return (
              <motion.button
                key={item.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => onPageChange(item.id)}
                className={`w-full flex items-center space-x-3 px-3 py-3 rounded-xl transition-all duration-200 group relative ${
                  isActive
                    ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg'
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-100'
                }`}
              >
                <Icon 
                  className={`h-5 w-5 ${
                    isActive ? 'text-white' : item.color
                  } transition-colors duration-200`} 
                />
                {!isCollapsed && (
                  <span className="font-medium text-sm">{item.name}</span>
                )}
                
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl -z-10"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                
                {isCollapsed && (
                  <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
                    {item.name}
                  </div>
                )}
              </motion.button>
            )
          })}
        </div>
        
        <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
          <motion.button
            onClick={() => onPageChange('settings')}
            className={`w-full flex items-center space-x-3 px-3 py-3 rounded-xl transition-all duration-200 group ${
              currentPage === 'settings'
                ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white'
                : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-100'
            }`}
          >
            <Settings className="h-5 w-5" />
            {!isCollapsed && <span className="font-medium text-sm">Settings</span>}
          </motion.button>
        </div>
      </nav>
    </motion.aside>
  )
}