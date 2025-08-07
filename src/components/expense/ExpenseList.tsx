import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, Edit, Tag, Calendar } from 'lucide-react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { format } from 'date-fns';
import type { Expense } from '../../types';

interface ExpenseListProps {
  expenses: Expense[];
  onDelete: (id: string) => void;
  onEdit: (expense: Expense) => void;
}

export const ExpenseList: React.FC<ExpenseListProps> = ({ expenses, onDelete, onEdit }) => {
  const getCategoryEmoji = (category: string) => {
    const emojis: Record<string, string> = {
      food: '🍽️',
      transport: '🚗',
      entertainment: '🎬',
      shopping: '🛒',
      utilities: '💡',
      health: '⚕️',
      education: '📚',
      other: '📝'
    };
    return emojis[category] || '📝';
  };

  const getPaymentIcon = (method: string) => {
    const icons: Record<string, string> = {
      card: '💳',
      cash: '💵',
      digital: '📱',
      crypto: '₿'
    };
    return icons[method] || '💳';
  };

  if (expenses.length === 0) {
    return (
      <Card className="text-center py-12">
        <div className="text-6xl mb-4">💸</div>
        <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
          No expenses yet
        </h3>
        <p className="text-gray-600 dark:text-gray-400">
          Add your first expense to start tracking your spending!
        </p>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">
        Recent Expenses
      </h2>
      
      <AnimatePresence>
        {expenses.map((expense, index) => (
          <motion.div
            key={expense.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card hover className="group">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4 flex-1">
                  <div className="text-2xl">
                    {getCategoryEmoji(expense.category)}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                        {expense.title}
                      </h3>
                      {expense.ai_category && (
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200">
                          AI: {Math.round((expense.ai_confidence || 0) * 100)}%
                        </span>
                      )}
                    </div>
                    
                    <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
                      <div className="flex items-center space-x-1">
                        <Tag size={14} />
                        <span className="capitalize">{expense.category}</span>
                      </div>
                      
                      <div className="flex items-center space-x-1">
                        <Calendar size={14} />
                        <span>{format(new Date(expense.date), 'MMM dd, yyyy')}</span>
                      </div>
                      
                      <div className="flex items-center space-x-1">
                        <span>{getPaymentIcon(expense.payment_method)}</span>
                        <span className="capitalize">{expense.payment_method}</span>
                      </div>
                    </div>
                    
                    {expense.description && (
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        {expense.description}
                      </p>
                    )}
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <div className="text-xl font-bold text-gray-900 dark:text-gray-100">
                      ${expense.amount.toFixed(2)}
                    </div>
                    {expense.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-1">
                        {expense.tags.map((tag, tagIndex) => (
                          <span
                            key={tagIndex}
                            className="inline-block px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                  
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onEdit(expense)}
                      className="p-2"
                    >
                      <Edit size={16} />
                    </Button>
                    
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onDelete(expense.id)}
                      className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
                    >
                      <Trash2 size={16} />
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};