import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Target, Plus, AlertTriangle, CheckCircle } from 'lucide-react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import type { Expense, Budget } from '../../types';

interface BudgetTrackerProps {
  expenses: Expense[];
}

type Period = 'weekly' | 'monthly' | 'yearly';

interface NewBudgetDraft {
  category: string;
  amount: string;
  period: Period;
}

export const BudgetTracker: React.FC<BudgetTrackerProps> = ({ expenses }) => {
  const [budgets, setBudgets] = useState<Budget[]>([
    {
      id: '1',
      user_id: 'user1',
      category: 'food',
      amount: 300,
      period: 'monthly',
      spent: 0,
      created_at: '2025-01-01T00:00:00Z'
    },
    {
      id: '2',
      user_id: 'user1',
      category: 'transport',
      amount: 150,
      period: 'monthly',
      spent: 0,
      created_at: '2025-01-01T00:00:00Z'
    }
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [newBudget, setNewBudget] = useState<NewBudgetDraft>({
    category: '',
    amount: '',
    period: 'monthly'
  });

  // Calculate spent amounts for each budget
  const budgetsWithSpent = budgets.map(budget => {
    const categoryExpenses = expenses.filter(expense => expense.category === budget.category);
    const spent = categoryExpenses.reduce((sum, expense) => sum + expense.amount, 0);
    return { ...budget, spent };
  });

  const handleAddBudget = () => {
    if (!newBudget.category || !newBudget.amount) return;

    const budget: Budget = {
      id: Date.now().toString(),
      user_id: 'user1',
      category: newBudget.category,
      amount: parseFloat(newBudget.amount),
      period: newBudget.period,
      spent: 0,
      created_at: new Date().toISOString()
    };

    setBudgets(prev => [...prev, budget]);
    setNewBudget({ category: '', amount: '', period: 'monthly' });
    setShowAddForm(false);
  };

  const getBudgetStatus = (budget: Budget & { spent: number }) => {
    const percentage = (budget.spent / budget.amount) * 100;

    if (percentage >= 100) return { status: 'exceeded' as const, color: 'red', icon: AlertTriangle };
    if (percentage >= 80) return { status: 'warning' as const, color: 'yellow', icon: AlertTriangle };
    return { status: 'good' as const, color: 'green', icon: CheckCircle };
  };

  const categories = ['food', 'transport', 'entertainment', 'shopping', 'utilities', 'health', 'education', 'other'];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
          Budget Tracker
        </h2>
        <Button
          onClick={() => setShowAddForm(true)}
          className="flex items-center space-x-2"
        >
          <Plus size={18} />
          <span>Add Budget</span>
        </Button>
      </div>

      {showAddForm && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
        >
          <Card>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
              Create New Budget
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Category
                </label>
                <select
                  value={newBudget.category}
                  onChange={(e) => setNewBudget(prev => ({ ...prev, category: e.target.value }))}
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                >
                  <option value="">Select category</option>
                  {categories.map(category => (
                    <option key={category} value={category} className="capitalize">
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              <Input
                label="Budget Amount"
                type="number"
                value={newBudget.amount}
                onChange={(e) => setNewBudget(prev => ({ ...prev, amount: e.target.value }))}
                placeholder="0.00"
              />

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Period
                </label>
                <select
                  value={newBudget.period}
                  onChange={(e) => setNewBudget(prev => ({ ...prev, period: e.target.value as Period }))}
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                >
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                  <option value="yearly">Yearly</option>
                </select>
              </div>
            </div>

            <div className="flex space-x-4">
              <Button onClick={handleAddBudget}>
                Create Budget
              </Button>
              <Button
                variant="secondary"
                onClick={() => setShowAddForm(false)}
              >
                Cancel
              </Button>
            </div>
          </Card>
        </motion.div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {budgetsWithSpent.map((budget, index) => {
          const { status, color, icon: StatusIcon } = getBudgetStatus(budget);
          const percentage = Math.min((budget.spent / budget.amount) * 100, 100);
          const remaining = Math.max(budget.amount - budget.spent, 0);

          return (
            <motion.div
              key={budget.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card hover>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Target size={20} className="text-indigo-500" />
                      <h3 className="font-semibold text-gray-900 dark:text-gray-100 capitalize">
                        {budget.category}
                      </h3>
                    </div>
                    <StatusIcon
                      size={20}
                      className={`text-${color}-500`}
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-400">Progress</span>
                      <span className="font-medium text-gray-900 dark:text-gray-100">
                        {percentage.toFixed(1)}%
                      </span>
                    </div>

                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${percentage}%` }}
                        transition={{ duration: 1, delay: index * 0.2 }}
                        className={`h-2 rounded-full bg-gradient-to-r ${
                          status === 'exceeded' 
                            ? 'from-red-500 to-red-600'
                            : status === 'warning'
                            ? 'from-yellow-500 to-yellow-600'
                            : 'from-green-500 to-green-600'
                        }`}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4 pt-2">
                    <div className="text-center">
                      <div className="font-semibold text-gray-900 dark:text-gray-100">
                        ${budget.spent.toFixed(2)}
                      </div>
                      <div className="text-xs text-gray-600 dark:text-gray-400">
                        Spent
                      </div>
                    </div>

                    <div className="text-center">
                      <div className="font-semibold text-gray-900 dark:text-gray-100">
                        ${remaining.toFixed(2)}
                      </div>
                      <div className="text-xs text-gray-600 dark:text-gray-400">
                        Remaining
                      </div>
                    </div>

                    <div className="text-center">
                      <div className="font-semibold text-gray-900 dark:text-gray-100">
                        ${budget.amount.toFixed(2)}
                      </div>
                      <div className="text-xs text-gray-600 dark:text-gray-400 capitalize">
                        {budget.period}
                      </div>
                    </div>
                  </div>

                  {status === 'exceeded' && (
                    <div className="p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
                      <p className="text-sm text-red-800 dark:text-red-200">
                        ⚠️ Budget exceeded by ${(budget.spent - budget.amount).toFixed(2)}
                      </p>
                    </div>
                  )}

                  {status === 'warning' && (
                    <div className="p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                      <p className="text-sm text-yellow-800 dark:text-yellow-200">
                        ⚡ You're at 80% of your budget limit
                      </p>
                    </div>
                  )}
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {budgetsWithSpent.length === 0 && (
        <Card className="text-center py-12">
          <div className="text-6xl mb-4">🎯</div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
            No budgets set
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Create your first budget to start tracking your spending goals!
          </p>
          <Button onClick={() => setShowAddForm(true)}>
            Create Your First Budget
          </Button>
        </Card>
      )}
    </div>
  );
};