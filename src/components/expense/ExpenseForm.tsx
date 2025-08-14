import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { DollarSign, Calendar, Tag, CreditCard, Mic, Sparkles } from 'lucide-react';
import { Card } from '../ui/Card';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { categorizeExpense } from '../../utils/aiCategorization';
import toast from 'react-hot-toast';
import type { Expense } from '../../types';

interface ExpenseFormProps {
  onSubmit?: (expense: Omit<Expense, 'id' | 'created_at' | 'updated_at'>) => void | Promise<void>;
  onSumbit?: (expense: Omit<Expense, 'id' | 'created_at' | 'updated_at'>) => void | Promise<void>;
  isLoading?: boolean;
}

type PaymentMethod = 'card' | 'cash' | 'digital' | 'crypto';

interface ExpenseFormState {
  title: string;
  amount: string;
  category: string;
  description: string;
  date: string;
  payment_method: PaymentMethod;
  tags: string[];
}

const ExpenseForm: React.FC<ExpenseFormProps> = ({ onSubmit, onSumbit, isLoading }) => {
  const [formData, setFormData] = useState<ExpenseFormState>({
    title: '',
    amount: '',
    category: '',
    description: '',
    date: new Date().toISOString().split('T')[0],
    payment_method: 'card',
    tags: [],
  });

  const [aiSuggestion, setAiSuggestion] = useState<{
    category: string;
    confidence: number;
    suggestions?: string[];
  } | null>(null);

  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const categories = [
    'food', 'transport', 'entertainment', 'shopping', 'utilities',
    'health', 'education', 'other'
  ];

  const paymentMethods: { value: PaymentMethod; label: string; icon: React.ElementType }[] = [
    { value: 'card', label: '💳 Card', icon: CreditCard },
    { value: 'cash', label: '💵 Cash', icon: DollarSign },
    { value: 'digital', label: '📱 Digital', icon: Tag },
    { value: 'crypto', label: '₿ Crypto', icon: Sparkles },
  ];

  const handleTitleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    setFormData(prev => ({ ...prev, title }));

    if (title.length > 3 && formData.amount) {
      setIsAnalyzing(true);
      try {
        const suggestion = await categorizeExpense(title, parseFloat(formData.amount));
        setAiSuggestion(suggestion as { category: string; confidence: number; suggestions?: string[] });
        setFormData(prev => ({ ...prev, category: suggestion.category }));
      } catch (error) {
        console.error('AI categorization failed:', error);
      } finally {
        setIsAnalyzing(false);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title || !formData.amount) {
      toast.error('Please fill in all required fields');
      return;
    }

    const expense = {
      ...formData,
      amount: parseFloat(formData.amount),
      ai_category: aiSuggestion?.category,
      ai_confidence: aiSuggestion?.confidence,
      is_recurring: false,
      currency: 'USD', // or get from context/user settings
      user_id: 'temp-user-id', // use snake_case as per Expense type
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const submitHandler = onSubmit ?? onSumbit;
    if (!submitHandler) {
      toast.error('No submit handler provided');
      return;
    }
    await submitHandler(expense);
  };

  return (
    <Card gradient className="max-w-2xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            Add New Expense
          </h2>
          {aiSuggestion && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="flex items-center space-x-2 text-sm text-indigo-600 dark:text-indigo-400"
            >
              <Sparkles size={16} />
              <span>AI: {Math.round(aiSuggestion.confidence * 100)}% confident</span>
            </motion.div>
          )}
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              label="Expense Title"
              value={formData.title}
              onChange={handleTitleChange}
              placeholder="What did you spend on?"
              icon={<Tag size={18} className="text-gray-400" />}
              required
            />

            <Input
              label="Amount"
              type="number"
              step="0.01"
              value={formData.amount}
              onChange={(e) => setFormData(prev => ({ ...prev, amount: e.target.value }))}
              placeholder="0.00"
              icon={<DollarSign size={18} className="text-gray-400" />}
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Category
              </label>
              <div className="grid grid-cols-2 gap-2">
                {categories.map((category) => (
                  <motion.button
                    key={category}
                    type="button"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setFormData(prev => ({ ...prev, category }))}
                    className={`
                      p-3 rounded-lg text-sm font-medium transition-all duration-200 capitalize
                      ${formData.category === category
                        ? 'bg-indigo-500 text-white shadow-lg'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                      }
                    `}
                  >
                    {category}
                  </motion.button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Payment Method
              </label>
              <div className="space-y-2">
                {paymentMethods.map((method) => (
                  <motion.button
                    key={method.value}
                    type="button"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setFormData(prev => ({ ...prev, payment_method: method.value }))}
                    className={`
                      w-full p-3 rounded-lg text-left transition-all duration-200 flex items-center space-x-3
                      ${formData.payment_method === method.value
                        ? 'bg-indigo-500 text-white shadow-lg'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                      }
                    `}
                  >
                    <method.icon size={18} />
                    <span>{method.label}</span>
                  </motion.button>
                ))}
              </div>
            </div>
          </div>

          <Input
            label="Date"
            type="date"
            value={formData.date}
            onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
            icon={<Calendar size={18} className="text-gray-400" />}
          />

          <Input
            label="Description (Optional)"
            value={formData.description}
            onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
            placeholder="Any additional notes..."
          />

          {aiSuggestion?.suggestions && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 p-4 rounded-xl"
            >
              <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-2 flex items-center">
                <Sparkles size={16} className="mr-2 text-indigo-500" />
                AI Insights
              </h4>
              <ul className="space-y-1">
                {aiSuggestion?.suggestions?.map((suggestion: string, index: number) => (
                  <li key={index} className="text-sm text-gray-600 dark:text-gray-400">
                    • {suggestion}
                  </li>
                ))}
              </ul>
            </motion.div>
          )}

          <div className="flex space-x-4">
            <Button
              type="submit"
              className="flex-1"
              isLoading={isLoading || isAnalyzing}
            >
              {isAnalyzing ? 'Analyzing...' : 'Add Expense'}
            </Button>

            <Button
              type="button"
              variant="secondary"
              className="flex items-center space-x-2"
            >
              <Mic size={18} />
              <span>Voice</span>
            </Button>
          </div>
        </form>
      </motion.div>
    </Card>
  );
};

export default ExpenseForm;
