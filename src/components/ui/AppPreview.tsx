import React from 'react';
import { motion } from 'framer-motion';
import { 
  BarChart3, 
  PieChart, 
  TrendingUp, 
  Wallet, 
  CreditCard,
  Target,
  Brain,
  Sparkles as SparklesIcon
} from 'lucide-react';

interface AppPreviewProps {
  screen: 'dashboard' | 'analytics' | 'budget' | 'ai-insights';
  className?: string;
}

export const AppPreview: React.FC<AppPreviewProps> = ({ screen, className = '' }) => {
  const renderDashboard = () => (
    <div className="p-4 space-y-4 bg-gradient-to-br from-gray-900 to-black text-white h-full">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-bold text-gradient-gold">ExpenseAI</h1>
        <div className="w-8 h-8 bg-yellow-500 rounded-full" />
      </div>
      
      {/* Balance Card */}
      <motion.div 
        className="glass p-4 rounded-xl"
        animate={{ scale: [1, 1.02, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <p className="text-sm text-gray-400">Total Balance</p>
        <p className="text-2xl font-bold text-yellow-400">$4,250.00</p>
        <div className="flex items-center mt-2">
          <TrendingUp size={16} className="text-green-400 mr-1" />
          <span className="text-sm text-green-400">+12.5%</span>
        </div>
      </motion.div>
      
      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-3">
        <div className="glass p-3 rounded-lg flex items-center space-x-2">
          <Wallet size={16} className="text-yellow-400" />
          <span className="text-sm">Add Expense</span>
        </div>
        <div className="glass p-3 rounded-lg flex items-center space-x-2">
          <BarChart3 size={16} className="text-yellow-400" />
          <span className="text-sm">Analytics</span>
        </div>
      </div>
      
      {/* Recent Transactions */}
      <div className="space-y-2">
        <h3 className="text-sm font-medium text-gray-300">Recent</h3>
        {[1, 2, 3].map((i) => (
          <motion.div 
            key={i}
            className="flex items-center justify-between p-2 glass rounded-lg"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <div className="flex items-center space-x-2">
              <CreditCard size={14} className="text-yellow-400" />
              <span className="text-xs">Coffee Shop</span>
            </div>
            <span className="text-xs text-yellow-400">-$4.50</span>
          </motion.div>
        ))}
      </div>
    </div>
  );

  const renderAnalytics = () => (
    <div className="p-4 space-y-4 bg-gradient-to-br from-gray-900 to-black text-white h-full">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-bold text-gradient-gold">Analytics</h1>
        <PieChart size={20} className="text-yellow-400" />
      </div>
      
      {/* Chart Placeholder */}
      <div className="glass p-4 rounded-xl h-32 flex items-center justify-center">
        <motion.div 
          className="w-20 h-20 border-4 border-yellow-400 border-t-transparent rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        />
      </div>
      
      {/* Categories */}
      <div className="space-y-2">
        {['Food', 'Transport', 'Shopping'].map((category, i) => (
          <div key={category} className="flex items-center justify-between glass p-2 rounded-lg">
            <span className="text-sm">{category}</span>
            <div className="flex items-center space-x-2">
              <div className="w-16 h-2 bg-gray-700 rounded-full overflow-hidden">
                <motion.div 
                  className="h-full bg-yellow-400 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${(i + 1) * 30}%` }}
                  transition={{ delay: i * 0.2, duration: 0.8 }}
                />
              </div>
              <span className="text-xs text-yellow-400">${(i + 1) * 150}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderBudget = () => (
    <div className="p-4 space-y-4 bg-gradient-to-br from-gray-900 to-black text-white h-full">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-bold text-gradient-gold">Budget</h1>
        <Target size={20} className="text-yellow-400" />
      </div>
      
      {/* Budget Overview */}
      <div className="glass p-4 rounded-xl">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-gray-400">Monthly Budget</span>
          <span className="text-sm text-yellow-400">75% used</span>
        </div>
        <div className="w-full h-3 bg-gray-700 rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: '75%' }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          />
        </div>
        <div className="flex justify-between mt-2">
          <span className="text-xs text-gray-400">$1,875 spent</span>
          <span className="text-xs text-gray-400">$2,500 total</span>
        </div>
      </div>
      
      {/* Budget Categories */}
      <div className="space-y-2">
        {['Groceries', 'Entertainment', 'Utilities'].map((category, i) => (
          <div key={category} className="glass p-3 rounded-lg">
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm">{category}</span>
              <span className="text-xs text-yellow-400">${(i + 1) * 200}</span>
            </div>
            <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-yellow-400 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${(i + 1) * 25}%` }}
                transition={{ delay: i * 0.3, duration: 0.8 }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderAIInsights = () => (
    <div className="p-4 space-y-4 bg-gradient-to-br from-gray-900 to-black text-white h-full">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-bold text-gradient-gold">AI Insights</h1>
        <Brain size={20} className="text-yellow-400" />
      </div>
      
      {/* AI Suggestion Card */}
      <motion.div 
        className="glass p-4 rounded-xl border border-yellow-400/30"
        animate={{ 
          boxShadow: [
            '0 0 20px rgba(251, 191, 36, 0.3)',
            '0 0 30px rgba(251, 191, 36, 0.5)',
            '0 0 20px rgba(251, 191, 36, 0.3)'
          ]
        }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="flex items-center space-x-2 mb-2">
          <SparklesIcon size={16} className="text-yellow-400" />
          <span className="text-sm font-medium">Smart Suggestion</span>
        </div>
        <p className="text-xs text-gray-300 mb-2">
          You're spending 23% more on dining out this month. Consider setting a $300 limit.
        </p>
        <div className="flex space-x-2">
          <button className="px-3 py-1 bg-yellow-400 text-black text-xs rounded-full">
            Apply
          </button>
          <button className="px-3 py-1 border border-gray-600 text-xs rounded-full">
            Dismiss
          </button>
        </div>
      </motion.div>
      
      {/* Insights List */}
      <div className="space-y-2">
        {[
          { icon: TrendingUp, text: 'Spending trend: +15% vs last month', color: 'text-red-400' },
          { icon: Target, text: 'Budget goal: 85% achieved', color: 'text-green-400' },
          { icon: Wallet, text: 'Top category: Food & Dining', color: 'text-yellow-400' }
        ].map((insight, i) => (
          <motion.div 
            key={i}
            className="flex items-center space-x-3 glass p-2 rounded-lg"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.2 }}
          >
            <insight.icon size={14} className={insight.color} />
            <span className="text-xs text-gray-300">{insight.text}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );

  const renderScreen = () => {
    switch (screen) {
      case 'dashboard':
        return renderDashboard();
      case 'analytics':
        return renderAnalytics();
      case 'budget':
        return renderBudget();
      case 'ai-insights':
        return renderAIInsights();
      default:
        return renderDashboard();
    }
  };

  return (
    <div className={`w-full h-full ${className}`}>
      {renderScreen()}
    </div>
  );
};