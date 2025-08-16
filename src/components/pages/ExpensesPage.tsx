import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Search, Filter, Calendar, DollarSign, Tag, Trash2, Edit3 } from 'lucide-react';
import Sparkles from '../ui/Sparkles';
import { ParticleBackground } from '../ui/ParticleBackground';
import { AnimatedBackground } from '../ui/AnimatedBackground';

interface Expense {
  id: string;
  title: string;
  amount: number;
  currency: 'USD' | 'INR' | 'EUR' | 'GBP';
  category: string;
  date: string;
  description?: string;
  paymentMethod: string;
}

const CURRENCIES = [
  { code: 'USD', symbol: '$', name: 'US Dollar' },
  { code: 'INR', symbol: '₹', name: 'Indian Rupee' },
  { code: 'EUR', symbol: '€', name: 'Euro' },
  { code: 'GBP', symbol: '£', name: 'British Pound' }
];

const CATEGORIES = [
  'Food & Dining', 'Transportation', 'Shopping', 'Entertainment', 
  'Bills & Utilities', 'Healthcare', 'Travel', 'Education', 'Other'
];

const PAYMENT_METHODS = [
  'Cash', 'Credit Card', 'Debit Card', 'Bank Transfer', 'Digital Wallet'
];

export const ExpensesPage: React.FC = () => {
  const [expenses, setExpenses] = useState<Expense[]>([
    {
      id: '1',
      title: 'Grocery Shopping',
      amount: 2500,
      currency: 'INR',
      category: 'Food & Dining',
      date: '2024-01-15',
      description: 'Weekly groceries from supermarket',
      paymentMethod: 'Credit Card'
    },
    {
      id: '2',
      title: 'Coffee',
      amount: 5.50,
      currency: 'USD',
      category: 'Food & Dining',
      date: '2024-01-15',
      description: 'Morning coffee',
      paymentMethod: 'Cash'
    }
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [newExpense, setNewExpense] = useState({
    title: '',
    amount: '',
    currency: 'INR' as const,
    category: 'Food & Dining',
    date: new Date().toISOString().split('T')[0],
    description: '',
    paymentMethod: 'Cash'
  });

  const handleAddExpense = () => {
    if (!newExpense.title || !newExpense.amount) return;

    const expense: Expense = {
      id: Date.now().toString(),
      title: newExpense.title,
      amount: parseFloat(newExpense.amount),
      currency: newExpense.currency,
      category: newExpense.category,
      date: newExpense.date,
      description: newExpense.description,
      paymentMethod: newExpense.paymentMethod
    };

    setExpenses(prev => [expense, ...prev]);
    setNewExpense({
      title: '',
      amount: '',
      currency: 'INR',
      category: 'Food & Dining',
      date: new Date().toISOString().split('T')[0],
      description: '',
      paymentMethod: 'Cash'
    });
    setShowAddModal(false);
  };

  const handleDeleteExpense = (id: string) => {
    setExpenses(prev => prev.filter(expense => expense.id !== id));
  };

  const filteredExpenses = expenses.filter(expense => {
    const matchesSearch = expense.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         expense.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || expense.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getCurrencySymbol = (currency: string) => {
    return CURRENCIES.find(c => c.code === currency)?.symbol || '$';
  };

  const totalExpenses = expenses.reduce((acc, expense) => {
    // Convert to USD for total calculation (simplified)
    const rate = expense.currency === 'INR' ? 0.012 : 1;
    return acc + (expense.amount * rate);
  }, 0);

  return (
    <div className="relative p-6">
      {/* Remove: ParticleBackground, AnimatedBackground, Sparkles */}
      
      <div className="relative z-10 space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-white">Expenses</h1>
            <p className="text-gray-400">Track and manage your expenses</p>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowAddModal(true)}
            className="bg-gradient-to-r from-yellow-600 to-yellow-500 text-black px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Add Expense
          </motion.button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gray-900/50 border border-yellow-500/20 rounded-xl p-6 backdrop-blur-sm"
          >
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-yellow-500/20 rounded-lg flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-yellow-400" />
              </div>
              <div>
                <p className="text-gray-400 text-sm">Total Expenses</p>
                <p className="text-white text-xl font-bold">${totalExpenses.toFixed(2)}</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-gray-900/50 border border-yellow-500/20 rounded-xl p-6 backdrop-blur-sm"
          >
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-yellow-500/20 rounded-lg flex items-center justify-center">
                <Calendar className="w-6 h-6 text-yellow-400" />
              </div>
              <div>
                <p className="text-gray-400 text-sm">This Month</p>
                <p className="text-white text-xl font-bold">${(totalExpenses * 0.6).toFixed(2)}</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-gray-900/50 border border-yellow-500/20 rounded-xl p-6 backdrop-blur-sm"
          >
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-yellow-500/20 rounded-lg flex items-center justify-center">
                <Tag className="w-6 h-6 text-yellow-400" />
              </div>
              <div>
                <p className="text-gray-400 text-sm">Categories</p>
                <p className="text-white text-xl font-bold">{CATEGORIES.length}</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-gray-900/50 border border-yellow-500/20 rounded-xl p-6 backdrop-blur-sm"
          >
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-yellow-500/20 rounded-lg flex items-center justify-center">
                <Filter className="w-6 h-6 text-yellow-400" />
              </div>
              <div>
                <p className="text-gray-400 text-sm">Transactions</p>
                <p className="text-white text-xl font-bold">{expenses.length}</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search expenses..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-gray-900/50 border border-yellow-500/20 rounded-lg text-white placeholder-gray-400 focus:border-yellow-500 focus:outline-none backdrop-blur-sm"
            />
          </div>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-3 bg-gray-900/50 border border-yellow-500/20 rounded-lg text-white focus:border-yellow-500 focus:outline-none backdrop-blur-sm"
          >
            <option value="All">All Categories</option>
            {CATEGORIES.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>

        {/* Expenses List */}
        <div className="space-y-4">
          {filteredExpenses.map((expense, index) => (
            <motion.div
              key={expense.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-gray-900/50 border border-yellow-500/20 rounded-xl p-6 hover:border-yellow-500/40 transition-colors backdrop-blur-sm"
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-white font-semibold">{expense.title}</h3>
                    <span className="text-xs bg-yellow-500/20 text-yellow-400 px-2 py-1 rounded-full">
                      {expense.category}
                    </span>
                  </div>
                  <p className="text-gray-400 text-sm mb-2">{expense.description}</p>
                  <div className="flex items-center gap-4 text-sm text-gray-400">
                    <span>{expense.date}</span>
                    <span>{expense.paymentMethod}</span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-yellow-400 mb-2">
                    {getCurrencySymbol(expense.currency)}{expense.amount.toLocaleString()}
                  </p>
                  <div className="flex items-center gap-2">
                    <button className="p-2 text-gray-400 hover:text-yellow-400 transition-colors">
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => handleDeleteExpense(expense.id)}
                      className="p-2 text-gray-400 hover:text-red-400 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Add Expense Modal */}
        {showAddModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-gray-900/90 border border-yellow-500/20 rounded-xl p-6 w-full max-w-md backdrop-blur-md"
            >
              <h2 className="text-xl font-bold text-white mb-6">Add New Expense</h2>

              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Expense title"
                  value={newExpense.title}
                  onChange={(e) => setNewExpense(prev => ({ ...prev, title: e.target.value }))}
                  className="w-full px-4 py-3 bg-black/50 border border-yellow-500/20 rounded-lg text-white placeholder-gray-400 focus:border-yellow-500 focus:outline-none"
                />

                <div className="flex gap-3">
                  <input
                    type="number"
                    placeholder="Amount"
                    value={newExpense.amount}
                    onChange={(e) => setNewExpense(prev => ({ ...prev, amount: e.target.value }))}
                    className="flex-1 px-4 py-3 bg-black/50 border border-yellow-500/20 rounded-lg text-white placeholder-gray-400 focus:border-yellow-500 focus:outline-none"
                  />
                  <select
                    value={newExpense.currency}
                    onChange={(e) => setNewExpense(prev => ({ ...prev, currency: e.target.value as any }))}
                    className="px-4 py-3 bg-black/50 border border-yellow-500/20 rounded-lg text-white focus:border-yellow-500 focus:outline-none"
                  >
                    {CURRENCIES.map(currency => (
                      <option key={currency.code} value={currency.code}>
                        {currency.code}
                      </option>
                    ))}
                  </select>
                </div>

                <select
                  value={newExpense.category}
                  onChange={(e) => setNewExpense(prev => ({ ...prev, category: e.target.value }))}
                  className="w-full px-4 py-3 bg-black/50 border border-yellow-500/20 rounded-lg text-white focus:border-yellow-500 focus:outline-none"
                >
                  {CATEGORIES.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>

                <input
                  type="date"
                  value={newExpense.date}
                  onChange={(e) => setNewExpense(prev => ({ ...prev, date: e.target.value }))}
                  className="w-full px-4 py-3 bg-black/50 border border-yellow-500/20 rounded-lg text-white focus:border-yellow-500 focus:outline-none"
                />

                <select
                  value={newExpense.paymentMethod}
                  onChange={(e) => setNewExpense(prev => ({ ...prev, paymentMethod: e.target.value }))}
                  className="w-full px-4 py-3 bg-black/50 border border-yellow-500/20 rounded-lg text-white focus:border-yellow-500 focus:outline-none"
                >
                  {PAYMENT_METHODS.map(method => (
                    <option key={method} value={method}>{method}</option>
                  ))}
                </select>

                <textarea
                  placeholder="Description (optional)"
                  value={newExpense.description}
                  onChange={(e) => setNewExpense(prev => ({ ...prev, description: e.target.value }))}
                  rows={3}
                  className="w-full px-4 py-3 bg-black/50 border border-yellow-500/20 rounded-lg text-white placeholder-gray-400 focus:border-yellow-500 focus:outline-none resize-none"
                />
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 px-4 py-3 border border-gray-600 text-gray-400 rounded-lg hover:bg-gray-800 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddExpense}
                  className="flex-1 px-4 py-3 bg-gradient-to-r from-yellow-600 to-yellow-500 text-black rounded-lg font-semibold hover:shadow-lg transition-all duration-300"
                >
                  Add Expense
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
};