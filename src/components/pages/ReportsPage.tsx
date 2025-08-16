import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Download, FileText, TrendingUp, TrendingDown, BarChart3 } from 'lucide-react';

interface ReportData {
  period: string;
  income: number;
  expenses: number;
  savings: number;
  categories: { name: string; amount: number; percentage: number }[];
}

export const ReportsPage: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('monthly');

  const reportData: ReportData = {
    period: 'January 2024',
    income: 125000,
    expenses: 87500,
    savings: 37500,
    categories: [
      { name: 'Food & Dining', amount: 28000, percentage: 32 },
      { name: 'Transportation', amount: 15000, percentage: 17 },
      { name: 'Shopping', amount: 12000, percentage: 14 },
      { name: 'Bills & Utilities', amount: 10000, percentage: 11 },
      { name: 'Entertainment', amount: 8500, percentage: 10 },
      { name: 'Healthcare', amount: 7000, percentage: 8 },
      { name: 'Other', amount: 7000, percentage: 8 }
    ]
  };

  const monthlyTrends = [
    { month: 'Jul', income: 120000, expenses: 85000 },
    { month: 'Aug', income: 125000, expenses: 92000 },
    { month: 'Sep', income: 122000, expenses: 78000 },
    { month: 'Oct', income: 128000, expenses: 95000 },
    { month: 'Nov', income: 125000, expenses: 82000 },
    { month: 'Dec', income: 130000, expenses: 98000 },
    { month: 'Jan', income: 125000, expenses: 87500 }
  ];

  const savingsRate = (reportData.savings / reportData.income) * 100;
  const expenseRatio = (reportData.expenses / reportData.income) * 100;

  const handleExport = () => {
    // In a real app, this would trigger actual export
    // Export functionality would be implemented here
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Reports</h1>
          <p className="text-gray-400">Comprehensive financial reports and insights</p>
        </div>
        <div className="flex gap-3">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="px-4 py-2 bg-gray-900/50 border border-yellow-500/20 rounded-lg text-white focus:border-yellow-500 focus:outline-none"
          >
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
            <option value="quarterly">Quarterly</option>
            <option value="yearly">Yearly</option>
          </select>
          <div className="flex gap-1 bg-gray-900/50 border border-yellow-500/20 rounded-lg p-1">
            <button
                                    onClick={handleExport}
              className="px-3 py-2 hover:bg-yellow-500/20 rounded text-yellow-400 transition-colors flex items-center gap-1"
            >
              <Download className="w-4 h-4" />
              PDF
            </button>
            <button
                                    onClick={handleExport}
              className="px-3 py-2 hover:bg-yellow-500/20 rounded text-yellow-400 transition-colors flex items-center gap-1"
            >
              <Download className="w-4 h-4" />
              CSV
            </button>
            <button
                                    onClick={handleExport}
              className="px-3 py-2 hover:bg-yellow-500/20 rounded text-yellow-400 transition-colors flex items-center gap-1"
            >
              <Download className="w-4 h-4" />
              Excel
            </button>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gray-900/50 border border-yellow-500/20 rounded-xl p-6"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-green-400" />
            </div>
            <div>
              <p className="text-gray-400 text-sm">Total Income</p>
              <p className="text-white text-xl font-bold">₹{reportData.income.toLocaleString()}</p>
            </div>
          </div>
          <div className="text-sm text-green-400">+12% from last month</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gray-900/50 border border-yellow-500/20 rounded-xl p-6"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 bg-red-500/20 rounded-lg flex items-center justify-center">
              <TrendingDown className="w-6 h-6 text-red-400" />
            </div>
            <div>
              <p className="text-gray-400 text-sm">Total Expenses</p>
              <p className="text-white text-xl font-bold">₹{reportData.expenses.toLocaleString()}</p>
            </div>
          </div>
          <div className="text-sm text-red-400">+5% from last month</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gray-900/50 border border-yellow-500/20 rounded-xl p-6"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 bg-yellow-500/20 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-yellow-400" />
            </div>
            <div>
              <p className="text-gray-400 text-sm">Net Savings</p>
              <p className="text-white text-xl font-bold">₹{reportData.savings.toLocaleString()}</p>
            </div>
          </div>
          <div className="text-sm text-yellow-400">{savingsRate.toFixed(1)}% of income</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-gray-900/50 border border-yellow-500/20 rounded-xl p-6"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
              <BarChart3 className="w-6 h-6 text-blue-400" />
            </div>
            <div>
              <p className="text-gray-400 text-sm">Expense Ratio</p>
              <p className="text-white text-xl font-bold">{expenseRatio.toFixed(1)}%</p>
            </div>
          </div>
          <div className="text-sm text-blue-400">of total income</div>
        </motion.div>
      </div>

      {/* Main Report Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Monthly Trends */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:col-span-2 bg-gray-900/50 border border-yellow-500/20 rounded-xl p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-white">Monthly Trends</h3>
            <div className="flex gap-2">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-sm text-gray-400">Income</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <span className="text-sm text-gray-400">Expenses</span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            {monthlyTrends.map((trend) => (
              <div key={trend.month} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400 text-sm font-medium">{trend.month}</span>
                  <div className="flex gap-4 text-sm">
                    <span className="text-green-400">₹{trend.income.toLocaleString()}</span>
                    <span className="text-red-400">₹{trend.expenses.toLocaleString()}</span>
                    <span className="text-yellow-400">₹{(trend.income - trend.expenses).toLocaleString()}</span>
                  </div>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div className="flex h-2 rounded-full overflow-hidden">
                    <div 
                      className="bg-green-500"
                      style={{ width: `${(trend.income / 150000) * 60}%` }}
                    ></div>
                    <div 
                      className="bg-red-500"
                      style={{ width: `${(trend.expenses / 150000) * 60}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Category Breakdown */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gray-900/50 border border-yellow-500/20 rounded-xl p-6"
        >
          <h3 className="text-xl font-bold text-white mb-6">Expense Breakdown</h3>
          <div className="space-y-4">
            {reportData.categories.map((category) => (
              <div key={category.name} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-gray-300 text-sm">{category.name}</span>
                  <div className="text-right">
                    <div className="text-white font-semibold">₹{category.amount.toLocaleString()}</div>
                    <div className="text-xs text-gray-400">{category.percentage}%</div>
                  </div>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div 
                    className="bg-yellow-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${category.percentage}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Detailed Analysis */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-gray-900/50 border border-yellow-500/20 rounded-xl p-6"
      >
        <h3 className="text-xl font-bold text-white mb-6">Financial Health Analysis</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Savings Analysis */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-yellow-400">Savings Performance</h4>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
                <span className="text-green-400">Excellent Savings Rate</span>
                <span className="text-green-400 font-bold">{savingsRate.toFixed(1)}%</span>
              </div>
              <div className="text-sm text-gray-400">
                You're saving {savingsRate.toFixed(1)}% of your income, which is above the recommended 20% threshold. Keep up the great work!
              </div>
            </div>
          </div>

          {/* Spending Analysis */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-yellow-400">Spending Insights</h4>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                <span className="text-yellow-400">Food & Dining</span>
                <span className="text-yellow-400 font-bold">32%</span>
              </div>
              <div className="text-sm text-gray-400">
                Your largest expense category. Consider meal planning to optimize this spending.
              </div>
            </div>
          </div>
        </div>

        {/* Recommendations */}
        <div className="mt-6 p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
          <h4 className="text-lg font-semibold text-blue-400 mb-3">Recommendations</h4>
          <ul className="space-y-2 text-sm text-gray-300">
            <li className="flex items-start gap-2">
              <span className="text-blue-400 mt-1">•</span>
              <span>Continue maintaining your excellent savings rate of {savingsRate.toFixed(1)}%</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-400 mt-1">•</span>
              <span>Consider reducing food expenses by 10% through meal planning</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-400 mt-1">•</span>
              <span>Your transportation costs are well-controlled at 17% of expenses</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-400 mt-1">•</span>
              <span>Emergency fund target: ₹{(reportData.expenses * 6).toLocaleString()} (6 months of expenses)</span>
            </li>
          </ul>
        </div>
      </motion.div>

      {/* Report Summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-gray-900/50 border border-yellow-500/20 rounded-xl p-6"
      >
        <div className="flex items-center gap-3 mb-4">
          <FileText className="w-6 h-6 text-yellow-400" />
          <h3 className="text-xl font-bold text-white">Report Summary</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wide">Period</h4>
            <p className="text-white">{reportData.period}</p>
          </div>
          <div className="space-y-2">
            <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wide">Net Worth Change</h4>
            <p className="text-green-400 font-bold">+₹{reportData.savings.toLocaleString()}</p>
          </div>
          <div className="space-y-2">
            <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wide">Financial Health</h4>
            <p className="text-green-400 font-bold">Excellent</p>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-gray-700">
          <p className="text-sm text-gray-400 mb-4">
            This report was generated on {new Date().toLocaleDateString()} and includes all transactions 
            recorded in your ExpenseAI account for the selected period.
          </p>
          <div className="flex gap-3">
            <button className="px-4 py-2 bg-yellow-500/20 border border-yellow-500/30 rounded-lg text-yellow-400 hover:bg-yellow-500/30 transition-colors">
              Schedule Monthly Report
            </button>
            <button className="px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-gray-300 hover:bg-gray-600 transition-colors">
              Share Report
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ReportsPage;
