import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, AlertCircle, CheckCircle, Edit3, Trash2 } from 'lucide-react';

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
      color: 'bg-indigo-500'
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

  // Removed unused totalSpent variable

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">Budgets</h1>
        <button
          onClick={() => setShowCreateModal(true)}
          className="bg-indigo-500 text-white px-4 py-2 rounded-md flex items-center"
        >
          <Plus className="w-4 h-4 mr-1" /> New Budget
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {budgets.map((budget) => {
          const progress = getProgressPercentage(budget.spent, budget.limit);
          const status = getBudgetStatus(budget.spent, budget.limit);
          return (
            <motion.div key={budget.id} className={`p-4 rounded-lg shadow-md ${budget.color}`}>
              <div className="flex justify-between">
                <h2 className="font-bold text-white">{budget.name}</h2>
                <div className="flex gap-2">
                  <Edit3 className="w-4 h-4 text-white" />
                  <Trash2 className="w-4 h-4 text-white cursor-pointer" onClick={() => handleDeleteBudget(budget.id)} />
                </div>
              </div>
              <p className="text-sm text-white">{budget.category} ({budget.period})</p>
              <div className="h-2 bg-white/30 mt-2 rounded-full">
                <div
                  className={`h-2 rounded-full bg-white`}
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
              <div className="mt-2 text-sm text-white">
                <status.icon className={`inline w-4 h-4 mr-1 ${status.color}`} />
                {getCurrencySymbol(budget.currency)}{budget.spent} spent of {getCurrencySymbol(budget.currency)}{budget.limit}
              </div>
            </motion.div>
          );
        })}
      </div>

      {showCreateModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-md">
            <h2 className="text-lg font-semibold mb-4">Create New Budget</h2>
            <input
              type="text"
              placeholder="Budget Name"
              value={newBudget.name}
              onChange={(e) => setNewBudget(prev => ({ ...prev, name: e.target.value }))}
              className="w-full border p-2 mb-2 rounded"
            />
            <select
              value={newBudget.category}
              onChange={(e) => setNewBudget(prev => ({ ...prev, category: e.target.value }))}
              className="w-full border p-2 mb-2 rounded"
            >
              {categories.map(cat => <option key={cat}>{cat}</option>)}
            </select>
            <input
              type="number"
              placeholder="Limit"
              value={newBudget.limit}
              onChange={(e) => setNewBudget(prev => ({ ...prev, limit: e.target.value }))}
              className="w-full border p-2 mb-2 rounded"
            />
            <select
              value={newBudget.currency}
              onChange={(e) => setNewBudget(prev => ({ ...prev, currency: e.target.value as 'USD' | 'INR' }))}
              className="w-full border p-2 mb-2 rounded"
            >
              <option value="INR">INR (₹)</option>
              <option value="USD">USD ($)</option>
            </select>
            <select
              value={newBudget.period}
              onChange={(e) => setNewBudget(prev => ({ ...prev, period: e.target.value as 'weekly' | 'monthly' | 'yearly' }))}
              className="w-full border p-2 mb-2 rounded"
            >
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
              <option value="yearly">Yearly</option>
            </select>
            <div className="flex justify-end gap-2">
              <button onClick={() => setShowCreateModal(false)} className="text-gray-600">Cancel</button>
              <button onClick={handleCreateBudget} className="bg-indigo-500 text-white px-4 py-2 rounded">Create</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BudgetsPage;


