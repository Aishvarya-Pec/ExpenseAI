import React, { useState, useEffect, createContext, useContext } from 'react';
import { Notification } from '../types';

interface NotificationContextType {
  notifications: Notification[];
  unreadCount: number;
  addNotification: (notification: Omit<Notification, 'id' | 'timestamp' | 'read'>) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  deleteNotification: (id: string) => void;
  clearAll: () => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

// Sample notifications for demonstration
const sampleNotifications: Notification[] = [
  {
    id: '1',
    type: 'budget',
    title: 'Budget Alert',
    message: 'You have spent 85% of your monthly grocery budget.',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
    read: false,
    priority: 'high',
    userId: 'user1',
    icon: '⚠️',
    actionUrl: '/budgets'
  },
  {
    id: '2',
    type: 'expense',
    title: 'Large Expense Detected',
    message: 'New expense of $250.00 added for Electronics category.',
    timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(), // 4 hours ago
    read: false,
    priority: 'medium',
    userId: 'user1',
    icon: '💰',
    actionUrl: '/expenses'
  },
  {
    id: '3',
    type: 'achievement',
    title: 'Goal Achieved!',
    message: 'Congratulations! You saved 20% more than last month.',
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
    read: true,
    priority: 'low',
    userId: 'user1',
    icon: '🎉'
  },
  {
    id: '4',
    type: 'reminder',
    title: 'Bill Reminder',
    message: 'Your electricity bill is due in 3 days.',
    timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(), // 6 hours ago
    read: false,
    priority: 'medium',
    userId: 'user1',
    icon: '⏰',
    actionUrl: '/calendar'
  }
];

export const useNotifications = (): NotificationContextType => {
  const [notifications, setNotifications] = useState<Notification[]>(sampleNotifications);

  const unreadCount = notifications.filter(n => !n.read).length;

  const addNotification = (notificationData: Omit<Notification, 'id' | 'timestamp' | 'read'>) => {
    const newNotification: Notification = {
      ...notificationData,
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
      read: false
    };
    setNotifications(prev => [newNotification, ...prev]);
  };

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id 
          ? { ...notification, read: true }
          : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, read: true }))
    );
  };

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  };

  const clearAll = () => {
    setNotifications([]);
  };

  // Auto-generate notifications based on app events
  useEffect(() => {
    // This would typically connect to real-time events
    // For now, we'll add a sample notification every 30 seconds for demo
    const interval = setInterval(() => {
      const randomTypes: Notification['type'][] = ['expense', 'budget', 'reminder', 'system'];
      const randomType = randomTypes[Math.floor(Math.random() * randomTypes.length)];

      const messages = {
        expense: 'New expense recorded successfully.',
        budget: 'Budget threshold reached for this category.',
        reminder: 'Don\'t forget to categorize your recent expenses.',
        system: 'Your monthly report is now available.'
      };

      if (Math.random() > 0.7) { // 30% chance to add notification
        addNotification({
          type: randomType,
          title: `${randomType.charAt(0).toUpperCase() + randomType.slice(1)} Update`,
          message: messages[randomType],
          priority: 'low',
          userId: 'user1',
          icon: randomType === 'expense' ? '💳' : randomType === 'budget' ? '📊' : randomType === 'reminder' ? '🔔' : '📄'
        });
      }
    }, 30000); // Every 30 seconds

    return () => clearInterval(interval);
  }, []);

  return {
    notifications,
    unreadCount,
    addNotification,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    clearAll
  };
};

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [notifications, setNotifications] = useState<Notification[]>(sampleNotifications);

  const unreadCount = notifications.filter(n => !n.read).length;

  const addNotification = (notificationData: Omit<Notification, 'id' | 'timestamp' | 'read'>) => {
    const newNotification: Notification = {
      ...notificationData,
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
      read: false
    };
    setNotifications(prev => [newNotification, ...prev]);
  };

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id 
          ? { ...notification, read: true }
          : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, read: true }))
    );
  };

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  };

  const clearAll = () => {
    setNotifications([]);
  };

  // Auto-generate notifications based on app events
  useEffect(() => {
    // This would typically connect to real-time events
    // For now, we'll add a sample notification every 30 seconds for demo
    const interval = setInterval(() => {
      const randomTypes: Notification['type'][] = ['expense', 'budget', 'reminder', 'system'];
      const randomType = randomTypes[Math.floor(Math.random() * randomTypes.length)];

      const messages = {
        expense: 'New expense recorded successfully.',
        budget: 'Budget threshold reached for this category.',
        reminder: 'Don\'t forget to categorize your recent expenses.',
        system: 'Your monthly report is now available.'
      };

      if (Math.random() > 0.7) { // 30% chance to add notification
        addNotification({
          type: randomType,
          title: `${randomType.charAt(0).toUpperCase() + randomType.slice(1)} Update`,
          message: messages[randomType],
          priority: 'low',
          userId: 'user1',
          icon: randomType === 'expense' ? '💳' : randomType === 'budget' ? '📊' : randomType === 'reminder' ? '🔔' : '📄'
        });
      }
    }, 30000); // Every 30 seconds

    return () => clearInterval(interval);
  }, []);

  const contextValue: NotificationContextType = {
    notifications,
    unreadCount,
    addNotification,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    clearAll
  };

  return (
    <NotificationContext.Provider value={contextValue}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotificationContext = () => {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error('useNotificationContext must be used within a NotificationProvider');
  }
  return context;
};
