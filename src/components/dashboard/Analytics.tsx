import React from 'react';
import { motion } from 'framer-motion';
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { Card } from '../ui/Card';
import Sparkles from '../ui/Sparkles';
import type { Expense } from '../../types';

interface AnalyticsProps {
  expenses: Expense[];
}

export const Analytics: React.FC<AnalyticsProps> = ({ expenses }) => {
  // Category breakdown
  const categoryData = expenses.reduce((acc, expense) => {
    acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
    return acc;
  }, {} as Record<string, number>);

  const pieData = Object.entries(categoryData).map(([category, amount]) => ({
    name: category.charAt(0).toUpperCase() + category.slice(1),
    value: amount,
  }));

  // Monthly spending trend
  const monthlyData = expenses.reduce((acc, expense) => {
    const month = new Date(expense.date).toLocaleDateString('en-US', { month: 'short' });
    acc[month] = (acc[month] || 0) + expense.amount;
    return acc;
  }, {} as Record<string, number>);

  const barData = Object.entries(monthlyData).map(([month, amount]) => ({
    month,
    amount,
  }));

  const COLORS = ['#F59E0B', '#EF4444', '#10B981', '#6366F1', '#EC4899', '#8B5CF6', '#06B6D4', '#84CC16'];

  // Custom tooltip with enhanced styling
  const CustomTooltip = ({ active, payload, label }: {
    active?: boolean;
    payload?: any[];
    label?: string;
  }) => {
    if (active && payload && payload.length) {
      const val = payload[0]?.value;
      return (
        <div className="bg-black/80 backdrop-blur-xl border border-amber-500/30 p-4 rounded-xl shadow-2xl">
          <p className="font-medium text-amber-400 mb-1">{label}</p>
          <p className="text-white">
            Amount: <span className="text-amber-400 font-bold">${typeof val === 'number' ? val.toFixed(2) : String(val)}</span>
          </p>
        </div>
      );
    }
    return null;
  };

  // Detect small screens to adjust pie chart labels and radius
  const [isSmallScreen, setIsSmallScreen] = React.useState(true);
  React.useEffect(() => {
    const update = () => setIsSmallScreen(typeof window !== 'undefined' && window.innerWidth < 640);
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  if (expenses.length === 0) {
    return (
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
            <div className="text-6xl mb-4">📊</div>
            <h3 className="text-xl font-semibold bg-gradient-to-r from-amber-400 to-amber-500 bg-clip-text text-transparent mb-2">
              No data to analyze
            </h3>
            <p className="text-gray-400">
              Add some expenses to see your spending analytics!
            </p>
          </div>
        </Card>
      </motion.div>
    );
  }

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-1 lg:grid-cols-2 gap-8"
      >
        {/* Category Breakdown */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="relative group"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-amber-500/20 to-amber-600/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300" />
          <Card className="relative bg-black/40 backdrop-blur-xl border border-amber-500/20 hover:border-amber-500/40 transition-all duration-300">
            <div className="absolute inset-0 rounded-2xl">
              <Sparkles density={10}>
                <div className="w-full h-full" />
              </Sparkles>
            </div>
            <div className="relative z-10">
              <h3 className="text-xl font-semibold bg-gradient-to-r from-amber-400 to-amber-500 bg-clip-text text-transparent mb-6">
                Spending by Category
              </h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      outerRadius={isSmallScreen ? 80 : 100}
                      fill="#8884d8"
                      dataKey="value"
                      label={
                        isSmallScreen
                          ? false
                          : (data: any) => {
                              const name = data?.name ?? '';
                              const percent = typeof data?.percent === 'number' ? (data.percent * 100).toFixed(0) : '0';
                              return `${name} ${percent}%`;
                            }
                      }
                      labelLine={isSmallScreen ? false : true}
                    >
                      {pieData.map((_, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip content={<CustomTooltip />} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Monthly Trend */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="relative group"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-amber-500/20 to-amber-600/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300" />
          <Card className="relative bg-black/40 backdrop-blur-xl border border-amber-500/20 hover:border-amber-500/40 transition-all duration-300">
            <div className="absolute inset-0 rounded-2xl">
              <Sparkles density={10}>
                <div className="w-full h-full" />
              </Sparkles>
            </div>
            <div className="relative z-10">
              <h3 className="text-xl font-semibold bg-gradient-to-r from-amber-400 to-amber-500 bg-clip-text text-transparent mb-6">
                Monthly Spending Trend
              </h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={barData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.3} />
                    <XAxis dataKey="month" stroke="#9CA3AF" fontSize={12} />
                    <YAxis stroke="#9CA3AF" fontSize={12} tickFormatter={(value) => `$${value}`} />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar dataKey="amount" fill="url(#colorGradient)" radius={[4, 4, 0, 0]} />
                    <defs>
                      <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#F59E0B" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#F59E0B" stopOpacity={0.3} />
                      </linearGradient>
                    </defs>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </Card>
        </motion.div>
      </motion.div>

      {/* Detailed Breakdown */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="relative"
      >
        <Card className="bg-black/40 backdrop-blur-xl border border-amber-500/20">
          <div className="absolute inset-0 rounded-2xl">
            <Sparkles density={15}>
              <div className="w-full h-full" />
            </Sparkles>
          </div>
          <div className="relative z-10">
            <h3 className="text-xl font-semibold bg-gradient-to-r from-amber-400 to-amber-500 bg-clip-text text-transparent mb-6">
              Category Details
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {Object.entries(categoryData)
                .sort(([, a], [, b]) => b - a)
                .map(([category, amount], index) => {
                  const total = Object.values(categoryData).reduce((a, b) => a + b, 0) || 1;
                  const percentage = (amount / total) * 100;
                  return (
                    <motion.div
                      key={category}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.4 + index * 0.1 }}
                      whileHover={{ scale: 1.05, y: -5 }}
                      className="relative group"
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-amber-500/20 to-amber-600/20 rounded-xl blur-lg group-hover:blur-xl transition-all duration-300" />
                      <div className="relative p-4 bg-black/60 backdrop-blur-xl border border-amber-500/30 rounded-xl hover:border-amber-500/50 transition-all duration-300">
                        <div className="absolute inset-0 rounded-xl">
                          <Sparkles density={5}>
                            <div className="w-full h-full" />
                          </Sparkles>
                        </div>
                        <div className="relative z-10">
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-medium text-white capitalize">
                              {category}
                            </span>
                            <span
                              className="w-3 h-3 rounded-full shadow-lg"
                              style={{ backgroundColor: COLORS[index % COLORS.length] }}
                            />
                          </div>
                          <div className="text-2xl font-bold bg-gradient-to-r from-amber-400 to-amber-500 bg-clip-text text-transparent">
                            ${amount.toFixed(2)}
                          </div>
                          <div className="text-sm text-gray-400">
                            {percentage.toFixed(1)}% of total
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
            </div>
          </div>
        </Card>
      </motion.div>
    </div>
  );
};