import React, { useState } from 'react';

import { motion, AnimatePresence } from 'framer-motion';
import { Moon, Sun, User, Bell, Settings, LogOut, X, Check, Clock, DollarSign } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';
import { Button } from '../ui/Button';
import { Logo } from '../ui/Logo';

interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'expense' | 'budget' | 'payment' | 'achievement';
  timestamp: string;
  read: boolean;
}

interface HeaderProps {
  user?: {
    full_name?: string;
    email?: string;
    user_metadata?: {
      full_name?: string;
    };
  };
  onProfileClick: () => void;
  onSignOut: () => void;
  // Add navigation prop
  onPageChange?: (page: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ user, onProfileClick, onSignOut, onPageChange }) => {
  const { theme, toggleTheme } = useTheme();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      title: 'Budget Alert',
      message: 'You have exceeded 80% of your Food & Dining budget',
      type: 'budget',
      timestamp: '2 hours ago',
      read: false
    },
    {
      id: '2',
      title: 'Large Expense',
      message: 'New expense of ₹5,000 added to Shopping category',
      type: 'expense',
      timestamp: '5 hours ago',
      read: false
    },
    {
      id: '3',
      title: 'Payment Reminder',
      message: 'Credit card payment due in 2 days',
      type: 'payment',
      timestamp: '1 day ago',
      read: true
    },
    {
      id: '4',
      title: 'Achievement Unlocked',
      message: 'You saved ₹10,000 this month! 🎉',
      type: 'achievement',
      timestamp: '2 days ago',
      read: true
    }
  ]);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (id: string) => {
    setNotifications((prev: Notification[]) => 
      prev.map((notification: Notification) => 
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev: Notification[]) => 
      prev.map((notification: Notification) => ({ ...notification, read: true }))
    );
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'expense':
        return <DollarSign className="w-4 h-4 text-red-400" />;
      case 'budget':
        return <Clock className="w-4 h-4 text-yellow-400" />;
      case 'payment':
        return <Bell className="w-4 h-4 text-blue-400" />;
      case 'achievement':
        return <Check className="w-4 h-4 text-green-400" />;
      default:
        return <Bell className="w-4 h-4 text-gray-400" />;
    }
  };

  return (
    <motion.header 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="sticky top-0 z-50 bg-black/90 backdrop-blur-lg border-b border-yellow-500/20"
    >
       <div className="w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex items-center justify-between h-16">
          {/* Logo - Made smaller */}
          <Logo size="md" animated={true} key={Date.now()} />

          {/* User Info & Actions */}
          
          <div className="flex items-center space-x-2 sm:space-x-4">
            {user && (
             
              <div className="hidden md:flex items-center space-x-3">
                <span className="text-sm text-gray-400">
                  Welcome back, <span className="font-semibold text-yellow-400">{user.full_name || 'User'}</span>
                </span>
              </div>
            )}

            
            <div className="flex items-center space-x-1 sm:space-x-2">
              {/* Theme Toggle */}
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleTheme}
               
                className="p-2 text-gray-400 hover:text-yellow-400 hover:bg-yellow-500/10"
              >
                {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
              </Button>

             
              {/* Notifications */}
              <div className="relative">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="p-2 text-gray-400 hover:text-yellow-400 hover:bg-yellow-500/10 relative"
                >
                  <Bell size={18} />
                  {unreadCount > 0 && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-1 -right-1 w-5 h-5 bg-yellow-500 rounded-full text-xs flex items-center justify-center text-black font-semibold"
                    >
                      {unreadCount}
                    </motion.span>
                  )}
                </Button>

                <AnimatePresence>
                  {showNotifications && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95, y: -10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95, y: -10 }}
                      className="absolute right-0 mt-2 w-80 sm:w-96 bg-gray-900 border border-yellow-500/20 rounded-xl shadow-2xl py-2 z-50 max-h-96 overflow-y-auto"
                    >
                      <div className="px-4 py-3 border-b border-gray-700 flex items-center justify-between">
                        <h3 className="text-lg font-semibold text-white">Notifications</h3>
                        <div className="flex items-center gap-2">
                          {unreadCount > 0 && (
                            <button
                              onClick={markAllAsRead}
                              className="text-xs text-yellow-400 hover:text-yellow-300"
                            >
                              Mark all read
                            </button>
                          )}
                          <button
                            onClick={() => setShowNotifications(false)}
                            className="p-1 text-gray-400 hover:text-white"
                          >
                            <X size={16} />
                          </button>
                        </div>
                      </div>

                      <div className="max-h-64 overflow-y-auto">
                        {notifications.length > 0 ? (
                          notifications.map((notification: Notification) => (
                            <motion.div
                              key={notification.id}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              className={`px-4 py-3 border-b border-gray-800 last:border-b-0 hover:bg-gray-800/50 cursor-pointer transition-colors ${
                                !notification.read ? 'bg-yellow-500/5' : ''
                              }`}
                              onClick={() => markAsRead(notification.id)}
                            >
                              <div className="flex items-start gap-3">
                                <div className="flex-shrink-0 mt-1">
                                  {getNotificationIcon(notification.type)}
                                </div>
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center justify-between">
                                    <p className={`text-sm font-medium ${
                                      !notification.read ? 'text-white' : 'text-gray-300'
                                    }`}>
                                      {notification.title}
                                    </p>
                                    {!notification.read && (
                                      <div className="w-2 h-2 bg-yellow-500 rounded-full flex-shrink-0"></div>
                                    )}
                                  </div>
                                  <p className="text-sm text-gray-400 mt-1">
                                    {notification.message}
                                  </p>
                                  <p className="text-xs text-gray-500 mt-2">
                                    {notification.timestamp}
                                  </p>
                                </div>
                              </div>
                            </motion.div>
                          ))
                        ) : (
                          <div className="px-4 py-8 text-center text-gray-400">
                            <Bell className="w-8 h-8 mx-auto mb-2 opacity-50" />
                            <p>No notifications</p>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* User Menu */}
              <div className="relative">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowUserMenu(!showUserMenu)}
                
                  className="p-2 text-gray-400 hover:text-yellow-400 hover:bg-yellow-500/10 relative"
                >
                  <User size={18} />
                </Button>

               
                <AnimatePresence>
                  {showUserMenu && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95, y: -10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95, y: -10 }}
                      className="absolute right-0 mt-2 w-48 bg-gray-900 border border-yellow-500/20 rounded-xl shadow-2xl py-1 z-50"
                    >
                    
                      <div className="px-4 py-3 border-b border-gray-700">
                        <p className="text-sm font-medium text-white truncate">
                          {user?.user_metadata?.full_name || user?.email || 'User'}
                        </p>
                        <p className="text-xs text-gray-400 truncate">
                          {user?.email}
                        </p>
                      </div>

                      <button
                        onClick={() => {
                          if (onPageChange) {
                            onPageChange('settings');
                          } else {
                            onProfileClick();
                          }
                          setShowUserMenu(false);
                        }}
                        className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-yellow-500/10 hover:text-yellow-400 flex items-center space-x-2 transition-colors"
                      >
                        <Settings size={16} />
                        <span>Settings</span>
                      </button>

                      <button
                        onClick={() => {
                          onSignOut();
                          setShowUserMenu(false);
                        }}
                        className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-red-500/10 hover:text-red-300 flex items-center space-x-2 transition-colors"
                      >
                        <LogOut size={16} />
                        <span>Sign out</span>
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.header>
  );
};