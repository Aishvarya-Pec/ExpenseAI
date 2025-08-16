
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
  { id: 'dashboard', name: 'Dashboard', icon: Home, color: 'text-yellow-400' },
  { id: 'expenses', name: 'Expenses', icon: Receipt, color: 'text-yellow-400' },
  { id: 'groups', name: 'Group Expenses', icon: Users, color: 'text-yellow-400' },
  { id: 'analytics', name: 'Analytics', icon: PieChart, color: 'text-yellow-400' },
  { id: 'budgets', name: 'Budgets', icon: Target, color: 'text-yellow-400' },
  { id: 'cards', name: 'Cards & Accounts', icon: CreditCard, color: 'text-yellow-400' },
  { id: 'calendar', name: 'Calendar', icon: Calendar, color: 'text-yellow-400' },
  { id: 'reports', name: 'Reports', icon: TrendingUp, color: 'text-yellow-400' },
]

export const Sidebar: React.FC<SidebarProps> = ({ currentPage, onPageChange, isCollapsed = false }) => {
  return (
    <motion.aside
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      
className={`hidden md:block ${
        isCollapsed ? 'md:w-16' : 'md:w-64'
      }} bg-black border-r border-yellow-500/20 md:h-screen md:sticky md:top-0 transition-all duration-300 overflow-x-clip overflow-y-auto`}
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

    
      <nav className="px-3 space-y-1">
        {navigation.map((item, index) => {
          const isActive = currentPage === item.id
          const Icon = item.icon

          return (
            <motion.button
              key={item.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => onPageChange(item.id)}
              className={`
                w-full flex items-center px-3 py-3 text-sm font-medium rounded-xl transition-all duration-200 group relative
                ${isActive 
                  ? 'bg-gradient-to-r from-yellow-500 to-yellow-600 text-black shadow-lg shadow-yellow-500/25' 
                  : 'text-gray-400 hover:text-yellow-400 hover:bg-yellow-500/10'
                }
              `}
            >
              {/* Active indicator */}
              {isActive && (
                <motion.div
                  layoutId="activeIndicator"
                  className="absolute left-0 top-0 bottom-0 w-1 bg-yellow-400 rounded-r-full"
                  initial={false}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
           )}

              <Icon 
                className={`
                  ${isCollapsed ? 'mx-auto' : 'mr-3'} 
                  h-5 w-5 transition-colors duration-200
                  ${isActive ? 'text-black' : item.color}
                `} 
              />

              {!isCollapsed && (
                <span className={`truncate ${isActive ? 'text-black' : 'text-gray-300'}`}>
                  {item.name}
                </span>
              )}

              {/* Hover effect */}
              {!isActive && (
                <motion.div
                  className="absolute inset-0 bg-yellow-500/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                  initial={false}
                />
               )}
            </motion.button>
          )
        })}
      </nav>

      {/* Settings at bottom */}
      <div className="absolute bottom-0 left-0 right-0 p-3">
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          onClick={() => onPageChange('settings')}
          className={`
            w-full flex items-center px-3 py-3 text-sm font-medium rounded-xl transition-all duration-200 group
            ${currentPage === 'settings' 
              ? 'bg-gradient-to-r from-yellow-500 to-yellow-600 text-black shadow-lg shadow-yellow-500/25' 
              : 'text-gray-400 hover:text-yellow-400 hover:bg-yellow-500/10'
            }
          `}
        >
          <Settings 
            className={`
              ${isCollapsed ? 'mx-auto' : 'mr-3'} 
              h-5 w-5 transition-colors duration-200
              ${currentPage === 'settings' ? 'text-black' : 'text-gray-400'}
            `} 
          />

          {!isCollapsed && (
            <span className={`truncate ${currentPage === 'settings' ? 'text-black' : 'text-gray-300'}`}>
              Settings
            </span>
          )}
        </motion.button>
      </div>
    </motion.aside>
  )
}
       