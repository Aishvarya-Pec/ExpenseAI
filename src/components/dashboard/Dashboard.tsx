import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { PlusCircle, TrendingUp, DollarSign, Target } from 'lucide-react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { ExpenseForm } from '../expense/ExpenseForm';
import { ExpenseList } from '../expense/ExpenseList';
import { Analytics } from './Analytics';
import { BudgetTracker } from './BudgetTracker';
import { getSpendingInsights } from '../../utils/aiCategorization';
import toast from 'react-hot-toast';
import type { Expense } from '../../types';

export const Dashboard: React.FC = () => {
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

  const handleEditExpense = (expense: Expense) => {
    // TODO: Implement edit functionality
    toast.success('Edit functionality coming soon!');
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: DollarSign },
    { id: 'expenses', label: 'Expenses', icon: PlusCircle },
    { id: 'analytics', label: 'Analytics', icon: TrendingUp },
    { id: 'budget', label: 'Budget', icon: Target }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Navigation Tabs */}
      <div className="flex space-x-1 bg-gray-100 dark:bg-gray-800 p-1 rounded-2xl mb-8 overflow-x-auto">
        {tabs.map((tab) => (
          <motion.button
            key={tab.id}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setActiveTab(tab.id as 'overview' | 'expenses' | 'analytics' | 'budget')}
            className={`
              flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-200 whitespace-nowrap
              ${activeTab === tab.id
                ? 'bg-white dark:bg-gray-700 text-indigo-600 dark:text-indigo-400 shadow-lg'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
              }
            `}
          >
            <tab.icon size={18} />
            <span className="font-medium">{tab.label}</span>
          </motion.button>
        ))}
      </div>

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
              <Card gradient>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Total Spent</p>
                    <p className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                      ${totalSpent.toFixed(2)}
                    </p>
                  </div>
                  <div className="p-3 bg-indigo-500 rounded-xl">
                    <DollarSign className="text-white" size={24} />
                  </div>
                </div>
              </Card>

              <Card gradient>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">This Month</p>
                    <p className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                      ${thisMonthSpent.toFixed(2)}
                    </p>
                  </div>
                  <div className="p-3 bg-emerald-500 rounded-xl">
                    <TrendingUp className="text-white" size={24} />
                  </div>
                </div>
              </Card>

              <Card gradient>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Transactions</p>
                    <p className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                      {expenses.length}
                    </p>
                  </div>
                  <div className="p-3 bg-purple-500 rounded-xl">
                    <Target className="text-white" size={24} />
                  </div>
                </div>
              </Card>
            </div>

            {/* AI Insights */}
            {insights.length > 0 && (
              <Card gradient>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                  💡 AI Insights
                </h3>
                <div className="space-y-3">
                  {insights.map((insight, index) => (
                    <div
                      key={index}
                      className={`p-3 rounded-lg ${
                        insight.type === 'warning'
                          ? 'bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800'
                          : 'bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800'
                      }`}
                    >
                      <h4 className="font-medium text-gray-900 dark:text-gray-100">
                        {insight.title}
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {insight.message}
                      </p>
                    </div>
                  ))}
                </div>
              </Card>
            )}

            {/* Quick Actions */}
            <div className="flex justify-center">
              <Button
                onClick={() => setShowAddForm(true)}
                className="flex items-center space-x-2"
                size="lg"
              >
                <PlusCircle size={20} />
                <span>Add New Expense</span>
              </Button>
            </div>
          </div>
        )}

        {activeTab === 'expenses' && (
          <div className="space-y-8">
            {showAddForm ? (
              <ExpenseForm
                onSubmit={handleAddExpense}
                isLoading={isLoading}
              />
            ) : (
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                  Manage Expenses
                </h2>
                <Button
                  onClick={() => setShowAddForm(true)}
                  className="flex items-center space-x-2"
                >
                  <PlusCircle size={18} />
                  <span>Add Expense</span>
                </Button>
              </div>
            )}

            {!showAddForm && (
              <ExpenseList
                expenses={expenses}
                onDelete={handleDeleteExpense}
                onEdit={handleEditExpense}
              />
            )}

            {showAddForm && (
              <div className="flex justify-center">
                <Button
                  variant="secondary"
                  onClick={() => setShowAddForm(false)}
                >
                  Cancel
                </Button>
              </div>
            )}
          </div>
        )}

        {activeTab === 'analytics' && (
          <Analytics expenses={expenses} />
        )}

        {activeTab === 'budget' && (
          <BudgetTracker expenses={expenses} />
        )}
      </motion.div>
    </div>
  );
};