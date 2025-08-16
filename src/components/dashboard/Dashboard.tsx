import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { PlusCircle, TrendingUp, DollarSign, Target, Settings } from 'lucide-react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import Sparkles from '../ui/Sparkles';
import ExpenseForm from '../expense/ExpenseForm';
import { ExpenseList } from '../expense/ExpenseList';
import { Analytics } from './Analytics';
import { BudgetTracker } from './BudgetTracker';
import { getSpendingInsights } from '../../utils/aiCategorization';
import toast from 'react-hot-toast';
import type { Expense } from '../../types';

interface DashboardProps {
  onPageChange?: (page: string) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ onPageChange }) => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'expenses' | 'analytics' | 'budget'>('overview');
  // Mock data - in production, this would come from your backend API
  useEffect(() => {
    const mockExpenses: Expense[] = [
      {
        id: '1',
        user_id: 'user1',
        title: 'Starbucks Coffee',
        amount: 5.50,
        category: 'food',
        description: 'Morning coffee',
        date: '2025-01-15',
        payment_method: 'card',
        is_recurring: false,
        tags: ['coffee', 'morning'],
        ai_category: 'food',
        ai_confidence: 0.95,
        created_at: '2025-01-15T10:00:00Z',
        updated_at: '2025-01-15T10:00:00Z'
      },
      {
        id: '2',
        user_id: 'user1',
        title: 'Uber Ride',
        amount: 15.30,
        category: 'transport',
        description: 'To downtown',
        date: '2025-01-14',
        payment_method: 'digital',
        is_recurring: false,
        tags: ['commute'],
        ai_category: 'transport',
        ai_confidence: 0.88,
        created_at: '2025-01-14T18:30:00Z',
        updated_at: '2025-01-14T18:30:00Z'
      }
    ];
    setExpenses(mockExpenses);
  }, []);
  const totalSpent = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  const thisMonthSpent = expenses
    .filter(expense => new Date(expense.date).getMonth() === new Date().getMonth())
    .reduce((sum, expense) => sum + expense.amount, 0);
  const insights = getSpendingInsights(expenses);
  const handleAddExpense = async (expenseData: Omit<Expense, 'id' | 'created_at' | 'updated_at'>) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newExpense: Expense = {
        ...expenseData,
        id: Date.now().toString(),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
      
      setExpenses(prev => [newExpense, ...prev]);
      setShowAddForm(false);
      toast.success('Expense added successfully!');
    } catch {
      toast.error('Failed to add expense');
    } finally {
      setIsLoading(false);
    }
  };
  const handleDeleteExpense = async (id: string) => {
    try {
      setExpenses(prev => prev.filter(expense => expense.id !== id));
      toast.success('Expense deleted successfully!');
    } catch {
      toast.error('Failed to delete expense');
    }
  };
   // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleEditExpense = (id: string) => {
    // Edit functionality will be added in future update
  };
  const tabs = [
    { id: 'overview', label: 'Overview', icon: DollarSign },
    { id: 'expenses', label: 'Expenses', icon: PlusCircle },
    { id: 'analytics', label: 'Analytics', icon: TrendingUp },
    { id: 'budget', label: 'Budget', icon: Target }
  ];
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <Sparkles density={30}>{null}</Sparkles>
        <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 via-transparent to-amber-600/10" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header without Logo */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-8"
        >
          <div className="flex items-center space-x-4">
            {/* Removed WobblyLogo */}
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 bg-clip-text text-transparent">
                Smart Dashboard
              </h1>
              <p className="text-gray-400">AI-Powered Expense Intelligence</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onPageChange?.('settings')}
              className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-gray-700/50 to-gray-600/50 backdrop-blur-xl border border-gray-500/30 rounded-xl text-gray-300 hover:text-amber-400 hover:border-amber-500/50 transition-all duration-300 group"
            >
              <Settings size={18} className="group-hover:rotate-90 transition-transform duration-300" />
              <span className="font-medium">Settings</span>
            </motion.button>
            <div className="text-right">
              <div className="text-sm text-gray-400">Quantum Balance</div>
              <div className="text-2xl font-bold text-amber-400">${totalSpent.toFixed(2)}</div>
            </div>
          </div>
        </motion.div>

        {/* Navigation Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex space-x-1 bg-black/40 backdrop-blur-xl border border-amber-500/20 p-1 rounded-2xl mb-8 overflow-x-auto"
        >
          {tabs.map((tab, index) => (
            <motion.button
              key={tab.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveTab(tab.id as 'overview' | 'expenses' | 'analytics' | 'budget')}
              className={`
                relative flex items-center space-x-2 px-6 py-3 rounded-xl transition-all duration-300 whitespace-nowrap group
                ${activeTab === tab.id
                  ? 'bg-gradient-to-r from-amber-500/20 to-amber-600/20 text-amber-400 shadow-lg shadow-amber-500/25 border border-amber-500/30'
                  : 'text-gray-400 hover:text-amber-300 hover:bg-amber-500/10'
                }
              `}
            >
              {activeTab === tab.id && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-gradient-to-r from-amber-500/10 to-amber-600/10 rounded-xl border border-amber-500/20"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              <tab.icon size={18} className="relative z-10" />
              <span className="font-medium relative z-10">{tab.label}</span>
              {activeTab === tab.id && (
                <div className="absolute inset-0 rounded-xl">
                  <Sparkles density={5}>{null}</Sparkles>
                </div>
              )}
            </motion.button>
          ))}
        </motion.div>

        {/* Tab Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {activeTab === 'overview' && (
            <div className="space-y-8">
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  whileHover={{ scale: 1.02, y: -5 }}
                  className="relative group"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-amber-500/20 to-amber-600/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300" />
                  <Card className="relative bg-black/40 backdrop-blur-xl border border-amber-500/20 hover:border-amber-500/40 transition-all duration-300">
                    <div className="absolute inset-0 rounded-2xl">
                      <Sparkles density={8}>{null}</Sparkles>
                    </div>
                    <div className="relative z-10 flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-400">Total Spent</p>
                        <p className="text-3xl font-bold bg-gradient-to-r from-amber-400 to-amber-500 bg-clip-text text-transparent">
                          ${totalSpent.toFixed(2)}
                        </p>
                      </div>
                      <div className="p-3 bg-gradient-to-r from-amber-500 to-amber-600 rounded-xl shadow-lg shadow-amber-500/25">
                        <DollarSign className="text-black" size={24} />
                      </div>
                    </div>
                  </Card>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  whileHover={{ scale: 1.02, y: -5 }}
                  className="relative group"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-emerald-600/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300" />
                  <Card className="relative bg-black/40 backdrop-blur-xl border border-emerald-500/20 hover:border-emerald-500/40 transition-all duration-300">
                    <div className="absolute inset-0 rounded-2xl">
                      <Sparkles density={8}>{null}</Sparkles>
                    </div>
                    <div className="relative z-10 flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-400">This Month</p>
                        <p className="text-3xl font-bold bg-gradient-to-r from-emerald-400 to-emerald-500 bg-clip-text text-transparent">
                          ${thisMonthSpent.toFixed(2)}
                        </p>
                      </div>
                      <div className="p-3 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-xl shadow-lg shadow-emerald-500/25">
                        <TrendingUp className="text-black" size={24} />
                      </div>
                    </div>
                  </Card>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  whileHover={{ scale: 1.02, y: -5 }}
                  className="relative group"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-purple-600/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300" />
                  <Card className="relative bg-black/40 backdrop-blur-xl border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300">
                    <div className="absolute inset-0 rounded-2xl">
                      <Sparkles density={8}>{null}</Sparkles>
                    </div>
                    <div className="relative z-10 flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-400">Transactions</p>
                        <p className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-purple-500 bg-clip-text text-transparent">
                          {expenses.length}
                        </p>
                      </div>
                      <div className="p-3 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl shadow-lg shadow-purple-500/25">
                        <Target className="text-black" size={24} />
                      </div>
                    </div>
                  </Card>
                </motion.div>
              </div>

              {/* AI Insights */}
              {insights.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="relative"
                >
                  <Card className="bg-black/40 backdrop-blur-xl border border-amber-500/20">
                    <div className="absolute inset-0 rounded-2xl">
                      <Sparkles density={15}>{null}</Sparkles>
                    </div>
                    <div className="relative z-10">
                      <h3 className="text-lg font-semibold bg-gradient-to-r from-amber-400 to-amber-500 bg-clip-text text-transparent mb-4">
                        🧠 Neural Insights
                      </h3>
                      <div className="space-y-3">
                        {insights.map((insight, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.5 + index * 0.1 }}
                            className={`p-4 rounded-xl backdrop-blur-sm border transition-all duration-300 hover:scale-[1.02] ${
                              insight.type === 'warning'
                                ? 'bg-yellow-500/10 border-yellow-500/30 hover:border-yellow-500/50'
                                : 'bg-blue-500/10 border-blue-500/30 hover:border-blue-500/50'
                            }`}
                          >
                            <h4 className="font-medium text-white mb-1">
                              {insight.title}
                            </h4>
                            <p className="text-sm text-gray-300">
                              {insight.message}
                            </p>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </Card>
                </motion.div>
              )}
            </div>
          )}

          {activeTab === 'expenses' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold bg-gradient-to-r from-amber-400 to-amber-500 bg-clip-text text-transparent">
                  Expense Management
                </h2>
                <Button
                  onClick={() => setShowAddForm(true)}
                  className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-black font-medium shadow-lg shadow-amber-500/25"
                >
                  <PlusCircle size={18} className="mr-2" />
                  Add Expense
                </Button>
              </div>

              {showAddForm && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="relative"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-amber-500/10 to-amber-600/10 rounded-2xl blur-xl" />
                  <div className="relative bg-black/40 backdrop-blur-xl border border-amber-500/20 rounded-2xl p-6">
                    <div className="absolute inset-0 rounded-2xl">
                      <Sparkles density={10}>{null}</Sparkles>
                    </div>
                    <div className="relative z-10">
                      <ExpenseForm
                        onSubmit={handleAddExpense}
                        onClose={() => setShowAddForm(false)}
                        isLoading={isLoading}
                      />
                    </div>
                  </div>
                </motion.div>
              )}

              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-amber-500/5 to-amber-600/5 rounded-2xl blur-xl" />
                <div className="relative bg-black/40 backdrop-blur-xl border border-amber-500/20 rounded-2xl">
                  <div className="absolute inset-0 rounded-2xl">
                    <Sparkles density={8}>{null}</Sparkles>
                  </div>
                  <div className="relative z-10">
                    <ExpenseList
                      expenses={expenses}
                      onDelete={handleDeleteExpense}
                      onEdit={handleEditExpense}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'analytics' && (
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-amber-500/5 to-amber-600/5 rounded-2xl blur-xl" />
              <div className="relative bg-black/20 backdrop-blur-xl border border-amber-500/20 rounded-2xl p-6">
                <div className="absolute inset-0 rounded-2xl">
                  <Sparkles density={12}>{null}</Sparkles>
                </div>
                <div className="relative z-10">
                  <Analytics expenses={expenses} />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'budget' && (
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-amber-500/5 to-amber-600/5 rounded-2xl blur-xl" />
              <div className="relative bg-black/20 backdrop-blur-xl border border-amber-500/20 rounded-2xl p-6">
                <div className="absolute inset-0 rounded-2xl">
                  <Sparkles density={12}>{null}</Sparkles>
                </div>
                <div className="relative z-10">
                  <BudgetTracker expenses={expenses} />
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};