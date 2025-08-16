import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Target, Plus, AlertTriangle, CheckCircle } from 'lucide-react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import Sparkles from '../ui/Sparkles';
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
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <h2 className="text-2xl font-bold bg-gradient-to-r from-amber-400 to-amber-500 bg-clip-text text-transparent">
          Budget Tracker
        </h2>
        <Button
          onClick={() => setShowAddForm(true)}
          className="flex items-center space-x-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-black font-medium shadow-lg shadow-amber-500/25"
        >
          <Plus size={18} />
          <span>Add Budget</span>
        </Button>
      </motion.div>

      {showAddForm && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="relative"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-amber-500/20 to-amber-600/20 rounded-2xl blur-xl" />
          <Card className="relative bg-black/40 backdrop-blur-xl border border-amber-500/20">
            <div className="absolute inset-0 rounded-2xl">
              <Sparkles density={12}>
                <div className="w-full h-full" />
              </Sparkles>
            </div>
            <div className="relative z-10">
              <h3 className="text-lg font-semibold bg-gradient-to-r from-amber-400 to-amber-500 bg-clip-text text-transparent mb-4">
                Create New Budget
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Category
                  </label>
                  <select
                    value={newBudget.category}
                    onChange={(e) => setNewBudget(prev => ({ ...prev, category: e.target.value }))}
                    className="w-full px-3 py-2 rounded-lg border border-amber-500/30 bg-black/60 backdrop-blur-xl text-white focus:border-amber-500/50 focus:ring-2 focus:ring-amber-500/25"
                  >
                    <option value="" className="bg-black">Select category</option>
                    {categories.map(category => (
                      <option key={category} value={category} className="capitalize bg-black">
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
                  className="bg-black/60 backdrop-blur-xl border-amber-500/30 text-white focus:border-amber-500/50"
                />

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Period
                  </label>
                  <select
                    value={newBudget.period}
                    onChange={(e) => setNewBudget(prev => ({ ...prev, period: e.target.value as Period }))}
                    className="w-full px-3 py-2 rounded-lg border border-amber-500/30 bg-black/60 backdrop-blur-xl text-white focus:border-amber-500/50 focus:ring-2 focus:ring-amber-500/25"
                  >
                    <option value="weekly" className="bg-black">Weekly</option>
                    <option value="monthly" className="bg-black">Monthly</option>
                    <option value="yearly" className="bg-black">Yearly</option>
                  </select>
                </div>
              </div>

              <div className="flex space-x-4">
                <Button 
                  onClick={handleAddBudget}
                  className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-black font-medium"
                >
                  Create Budget
                </Button>
                <Button
                  variant="secondary"
                  onClick={() => setShowAddForm(false)}
                  className="bg-gray-700 hover:bg-gray-600 text-white border-gray-600"
                >
                  Cancel
                </Button>
              </div>
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
              whileHover={{ scale: 1.02, y: -5 }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-amber-500/20 to-amber-600/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300" />
              <Card className="relative bg-black/40 backdrop-blur-xl border border-amber-500/20 hover:border-amber-500/40 transition-all duration-300">
                <div className="absolute inset-0 rounded-2xl">
                  <Sparkles density={8}>
                    <div className="w-full h-full" />
                  </Sparkles>
                </div>
                <div className="relative z-10 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Target size={20} className="text-amber-500" />
                      <h3 className="font-semibold text-white capitalize">
                        {budget.category}
                      </h3>
                    </div>
                    <StatusIcon
                      size={20}
                      className={`text-${color}-400`}
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Progress</span>
                      <span className="font-medium text-amber-400">
                        {percentage.toFixed(1)}%
                      </span>
                    </div>

                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${percentage}%` }}
                        transition={{ duration: 1, delay: index * 0.2 }}
                        className={`h-2 rounded-full bg-gradient-to-r ${
                          status === 'exceeded' 
                            ? 'from-red-500 to-red-600'
                            : status === 'warning'
                            ? 'from-yellow-500 to-yellow-600'
                            : 'from-amber-500 to-amber-600'
                        } shadow-lg`}
                        style={{
                          boxShadow: `0 0 10px ${status === 'exceeded' ? '#ef4444' : status === 'warning' ? '#eab308' : '#f59e0b'}40`
                        }}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4 pt-2">
                    <div className="text-center">
                      <div className="font-semibold text-white">
                        ${budget.spent.toFixed(2)}
                      </div>
                      <div className="text-xs text-gray-400">
                        Spent
                      </div>
                    </div>

                    <div className="text-center">
                      <div className="font-semibold text-white">
                        ${remaining.toFixed(2)}
                      </div>
                      <div className="text-xs text-gray-400">
                        Remaining
                      </div>
                    </div>

                    <div className="text-center">
                      <div className="font-semibold text-white">
                        ${budget.amount.toFixed(2)}
                      </div>
                      <div className="text-xs text-gray-400 capitalize">
                        {budget.period}
                      </div>
                    </div>
                  </div>

                  {status === 'exceeded' && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="p-3 bg-red-500/20 backdrop-blur-sm border border-red-500/30 rounded-lg"
                    >
                      <p className="text-sm text-red-300">
                        ⚠️ Budget exceeded by ${(budget.spent - budget.amount).toFixed(2)}
                      </p>
                    </motion.div>
                  )}

                  {status === 'warning' && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="p-3 bg-yellow-500/20 backdrop-blur-sm border border-yellow-500/30 rounded-lg"
                    >
                      <p className="text-sm text-yellow-300">
                        ⚡ You're at 80% of your budget limit
                      </p>
                    </motion.div>
                  )}
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {budgetsWithSpent.length === 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative"
        >
          <Card className="text-center py-12 bg-black/40 backdrop-blur-xl border border-amber-500/20">
            <div className="absolute inset-0 rounded-2xl">
              <Sparkles density={15}>
                <div className="w-full h-full" />
              </Sparkles>
            </div>
            <div className="relative z-10">
              <div className="text-6xl mb-4">🎯</div>
              <h3 className="text-xl font-semibold bg-gradient-to-r from-amber-400 to-amber-500 bg-clip-text text-transparent mb-2">
                No budgets set
              </h3>
              <p className="text-gray-400 mb-4">
                Create your first budget to start tracking your spending goals!
              </p>
              <Button 
                onClick={() => setShowAddForm(true)}
                className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-black font-medium shadow-lg shadow-amber-500/25"
              >
                Create Your First Budget
              </Button>
            </div>
          </Card>
        </motion.div>
      )}
    </div>
  );
};