import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, AlertCircle, CheckCircle, Edit3, Trash2 } from 'lucide-react';
import { ParticleBackground } from '../ui/ParticleBackground';
import { AnimatedBackground } from '../ui/AnimatedBackground';
import Sparkles from '../ui/Sparkles';

interface Budget {
  id: string;
  name: string;
  category: string;
  limit: number;
  spent: number;
  currency: 'USD' | 'INR';
  period: 'weekly' | 'monthly' | 'yearly';
  color: string;
}

export const BudgetsPage: React.FC = () => {
  const [budgets, setBudgets] = useState<Budget[]>([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newBudget, setNewBudget] = useState({
    name: '',
    category: 'Food & Dining',
    limit: '',
    currency: 'INR' as 'USD' | 'INR',
    period: 'monthly' as 'weekly' | 'monthly' | 'yearly'
  });

  const categories = [
    'Food & Dining', 'Transportation', 'Shopping', 'Entertainment',
    'Bills & Utilities', 'Healthcare', 'Travel', 'Education', 'Other'
  ];

  useEffect(() => {
    const stored = localStorage.getItem('budgets');
    if (stored) setBudgets(JSON.parse(stored));
  }, []);

  useEffect(() => {
    localStorage.setItem('budgets', JSON.stringify(budgets));
  }, [budgets]);

  const handleCreateBudget = () => {
    if (!newBudget.name || isNaN(Number(newBudget.limit)) || Number(newBudget.limit) <= 0) return;

    const budget: Budget = {
      id: Date.now().toString(),
      name: newBudget.name,
      category: newBudget.category,
      limit: parseFloat(newBudget.limit),
      spent: 0,
      currency: newBudget.currency,
      period: newBudget.period,
      color: 'bg-gradient-to-br from-yellow-600 to-yellow-500'
    };

    setBudgets(prev => [budget, ...prev]);
    setNewBudget({
      name: '',
      category: 'Food & Dining',
      limit: '',
      currency: 'INR',
      period: 'monthly'
    });
    setShowCreateModal(false);
  };

  const handleDeleteBudget = (id: string) => {
    setBudgets(prev => prev.filter(budget => budget.id !== id));
  };

  const getProgressPercentage = (spent: number, limit: number) => {
    return Math.min((spent / limit) * 100, 100);
  };

  const getBudgetStatus = (spent: number, limit: number) => {
    const percentage = getProgressPercentage(spent, limit);
    if (percentage >= 100) return { status: 'over', color: 'text-red-400', icon: AlertCircle };
    if (percentage >= 80) return { status: 'warning', color: 'text-yellow-400', icon: AlertCircle };
    return { status: 'good', color: 'text-green-400', icon: CheckCircle };
  };

  const getCurrencySymbol = (currency: string) => {
    return currency === 'INR' ? '₹' : '$';
  };

  return (
    <div className="relative p-6">
      {/* Remove ParticleBackground, AnimatedBackground, and Sparkles */}
      
      <div className="relative z-10 space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-white">Budgets</h1>
            <p className="text-gray-400">Track and manage your spending limits</p>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowCreateModal(true)}
            className="bg-gradient-to-r from-yellow-600 to-yellow-500 text-black px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            New Budget
          </motion.button>
        </div>

        {/* Budgets Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {budgets.map((budget, index) => {
            const progress = getProgressPercentage(budget.spent, budget.limit);
            const status = getBudgetStatus(budget.spent, budget.limit);
            return (
              <motion.div
                key={budget.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-gray-900/50 border border-yellow-500/20 rounded-xl p-6 hover:border-yellow-500/40 transition-all duration-300"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h2 className="text-lg font-bold text-white">{budget.name}</h2>
                    <p className="text-sm text-gray-400">{budget.category} • {budget.period}</p>
                  </div>
                  <div className="flex gap-2">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
                    >
                      <Edit3 className="w-4 h-4 text-gray-400 hover:text-yellow-400" />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleDeleteBudget(budget.id)}
                      className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-4 h-4 text-gray-400 hover:text-red-400" />
                    </motion.button>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-400">Progress</span>
                    <span className="text-sm font-medium text-white">{progress.toFixed(1)}%</span>
                  </div>
                  <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${progress}%` }}
                      transition={{ duration: 1, delay: index * 0.1 }}
                      className={`h-full rounded-full ${
                        progress >= 100 ? 'bg-red-500' :
                        progress >= 80 ? 'bg-yellow-500' :
                        'bg-gradient-to-r from-yellow-600 to-yellow-500'
                      }`}
                    />
                  </div>
                </div>

                {/* Amount Info */}
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-400">Spent</p>
                    <p className="text-lg font-bold text-white">
                      {getCurrencySymbol(budget.currency)}{budget.spent.toLocaleString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-400">Limit</p>
                    <p className="text-lg font-bold text-yellow-400">
                      {getCurrencySymbol(budget.currency)}{budget.limit.toLocaleString()}
                    </p>
                  </div>
                </div>

                {/* Status */}
                <div className="flex items-center gap-2 mt-4 pt-4 border-t border-gray-700">
                  <status.icon className={`w-4 h-4 ${status.color}`} />
                  <span className={`text-sm font-medium ${status.color}`}>
                    {status.status === 'over' ? 'Over Budget' :
                     status.status === 'warning' ? 'Near Limit' : 'On Track'}
                  </span>
                </div>
              </motion.div>
            );
          })}

          {/* Empty State */}
          {budgets.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="col-span-full bg-gray-900/50 border border-yellow-500/20 rounded-xl p-12 text-center"
            >
              <div className="w-16 h-16 bg-yellow-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Plus className="w-8 h-8 text-yellow-400" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">No Budgets Yet</h3>
              <p className="text-gray-400 mb-4">Create your first budget to start tracking your spending</p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowCreateModal(true)}
                className="bg-gradient-to-r from-yellow-600 to-yellow-500 text-black px-6 py-3 rounded-lg font-semibold"
              >
                Create Budget
              </motion.button>
            </motion.div>
          )}
        </div>
      </div>

      {/* Create Budget Modal */}
      {showCreateModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={() => setShowCreateModal(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-gray-900 border border-yellow-500/20 rounded-xl p-6 w-full max-w-md"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl font-bold text-white mb-6">Create New Budget</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Budget Name</label>
                <input
                  type="text"
                  placeholder="e.g., Monthly Groceries"
                  value={newBudget.name}
                  onChange={(e) => setNewBudget(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:border-yellow-500 focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Category</label>
                <select
                  value={newBudget.category}
                  onChange={(e) => setNewBudget(prev => ({ ...prev, category: e.target.value }))}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-yellow-500 focus:outline-none transition-colors"
                >
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Budget Limit</label>
                <input
                  type="number"
                  placeholder="Enter amount"
                  value={newBudget.limit}
                  onChange={(e) => setNewBudget(prev => ({ ...prev, limit: e.target.value }))}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:border-yellow-500 focus:outline-none transition-colors"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Currency</label>
                  <select
                    value={newBudget.currency}
                    onChange={(e) => setNewBudget(prev => ({ ...prev, currency: e.target.value as 'USD' | 'INR' }))}
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-yellow-500 focus:outline-none transition-colors"
                  >
                    <option value="INR">INR (₹)</option>
                    <option value="USD">USD ($)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Period</label>
                  <select
                    value={newBudget.period}
                    onChange={(e) => setNewBudget(prev => ({ ...prev, period: e.target.value as 'weekly' | 'monthly' | 'yearly' }))}
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-yellow-500 focus:outline-none transition-colors"
                  >
                    <option value="weekly">Weekly</option>
                    <option value="monthly">Monthly</option>
                    <option value="yearly">Yearly</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowCreateModal(false)}
                className="px-4 py-2 text-gray-400 hover:text-white transition-colors"
              >
                Cancel
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleCreateBudget}
                className="bg-gradient-to-r from-yellow-600 to-yellow-500 text-black px-6 py-3 rounded-lg font-semibold"
              >
                Create Budget
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default BudgetsPage;


