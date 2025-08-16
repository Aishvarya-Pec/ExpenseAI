import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import { TrendingUp, TrendingDown, Calendar, DollarSign, Target } from 'lucide-react';
import Sparkles from '../ui/Sparkles';
import { ParticleBackground } from '../ui/ParticleBackground';
import { AnimatedBackground } from '../ui/AnimatedBackground';

const monthlyData = [
  { name: 'Jan', expenses: 2400, income: 3000 },
  { name: 'Feb', expenses: 1398, income: 3000 },
  { name: 'Mar', expenses: 3800, income: 3200 },
  { name: 'Apr', expenses: 3908, income: 3100 },
  { name: 'May', expenses: 4800, income: 3300 },
  { name: 'Jun', expenses: 3800, income: 3400 },
];

const categoryData = [
  { name: 'Food & Dining', value: 35, amount: 1250, color: '#fbbf24' },
  { name: 'Transportation', value: 20, amount: 714, color: '#f59e0b' },
  { name: 'Shopping', value: 15, amount: 535, color: '#d97706' },
  { name: 'Bills & Utilities', value: 12, amount: 428, color: '#b45309' },
  { name: 'Entertainment', value: 10, amount: 357, color: '#92400e' },
  { name: 'Healthcare', value: 5, amount: 178, color: '#78350f' },
  { name: 'Other', value: 3, amount: 107, color: '#451a03' },
];

const weeklyTrend = [
  { name: 'Mon', amount: 120 },
  { name: 'Tue', amount: 85 },
  { name: 'Wed', amount: 200 },
  { name: 'Thu', amount: 150 },
  { name: 'Fri', amount: 300 },
  { name: 'Sat', amount: 250 },
  { name: 'Sun', amount: 180 },
];

const AnalyticsPage: React.FC = () => {
  const [timeRange, setTimeRange] = useState('month');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const totalExpenses = categoryData.reduce((acc, item) => acc + item.amount, 0);
  const avgDaily = totalExpenses / 30;
  const monthlyChange = 12.5;
  
  const [isSmallScreen, setIsSmallScreen] = useState(true);
  React.useEffect(() => {
    const update = () => setIsSmallScreen(typeof window !== 'undefined' && window.innerWidth < 768);
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  return (
    <div className="relative p-6">
      {/* Remove: ParticleBackground, AnimatedBackground, Sparkles */}
      
      <div className="relative z-10 space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-white">Analytics</h1>
            <p className="text-gray-400">Insights and trends for your spending</p>
          </div>
          <div className="flex gap-3">
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="px-4 py-2 bg-gray-900/50 border border-yellow-500/20 rounded-lg text-white focus:border-yellow-500 focus:outline-none"
            >
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="year">This Year</option>
            </select>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 bg-gray-900/50 border border-yellow-500/20 rounded-lg text-white focus:border-yellow-500 focus:outline-none"
            >
              <option value="all">All Categories</option>
              {categoryData.map(category => (
                <option key={category.name} value={category.name}>{category.name}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Key Metrics */}
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
                <p className="text-gray-400 text-sm">Total Spent</p>
                <p className="text-white text-xl font-bold">₹{totalExpenses.toLocaleString()}</p>
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
                <p className="text-gray-400 text-sm">Daily Average</p>
                <p className="text-white text-xl font-bold">₹{avgDaily.toFixed(0)}</p>
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
                {monthlyChange > 0 ? (
                  <TrendingUp className="w-6 h-6 text-amber-400" />
                ) : (
                  <TrendingDown className="w-6 h-6 text-yellow-400" />
                )}
              </div>
              <div>
                <p className="text-gray-400 text-sm">Monthly Change</p>
                <p className={`text-xl font-bold ${monthlyChange > 0 ? 'text-amber-400' : 'text-yellow-400'}`}>
                  {monthlyChange > 0 ? '+' : ''}{monthlyChange}%
                </p>
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
                <Target className="w-6 h-6 text-yellow-400" />
              </div>
              <div>
                <p className="text-gray-400 text-sm">Budget Used</p>
                <p className="text-white text-xl font-bold">73%</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Monthly Expenses vs Income */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gray-900/50 border border-yellow-500/20 rounded-xl p-6 backdrop-blur-sm"
          >
            <h3 className="text-white font-semibold mb-4">Monthly Overview</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="name" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1f2937', 
                    border: '1px solid #374151',
                    borderRadius: '8px',
                    color: '#fff'
                  }}
                />
                <Bar dataKey="expenses" fill="#fbbf24" name="Expenses" />
                <Bar dataKey="income" fill="#f59e0b" name="Income" />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Category Breakdown */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-gray-900/50 border border-yellow-500/20 rounded-xl p-6 backdrop-blur-sm"
          >
            <h3 className="text-white font-semibold mb-4">Spending by Category</h3>
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="w-full md:w-1/2">
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={isSmallScreen ? 80 : 100}
                      paddingAngle={2}
                      dataKey="value"
                      label={false}
                      labelLine={false}
                    >
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#1f2937', 
                        border: '1px solid #374151',
                        borderRadius: '8px',
                        color: '#fff'
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="w-full md:flex-1 space-y-2">
                {categoryData.slice(0, 5).map((category, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: category.color }}
                    ></div>
                    <div className="flex-1">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-300">{category.name}</span>
                        <span className="text-white">₹{category.amount}</span>
                      </div>
                      <div className="flex justify-between text-xs text-gray-400">
                        <span>{category.value}%</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Weekly Trend */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gray-900/50 border border-yellow-500/20 rounded-xl p-6 backdrop-blur-sm"
        >
          <h3 className="text-white font-semibold mb-4">Weekly Spending Trend</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={weeklyTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="name" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1f2937', 
                  border: '1px solid #374151',
                  borderRadius: '8px',
                  color: '#fff'
                }}
              />
              <Line 
                type="monotone" 
                dataKey="amount" 
                stroke="#fbbf24" 
                strokeWidth={3}
                dot={{ fill: '#fbbf24', strokeWidth: 2, r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Insights */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-gray-900/50 border border-yellow-500/20 rounded-xl p-6 backdrop-blur-sm"
        >
          <h3 className="text-white font-semibold mb-4">AI Insights</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4">
              <h4 className="text-yellow-400 font-medium mb-2">💡 Spending Pattern</h4>
              <p className="text-gray-300 text-sm">
                Your food expenses are 23% higher than average. Consider meal planning to reduce costs.
              </p>
            </div>
            <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-4">
              <h4 className="text-amber-400 font-medium mb-2">📈 Good News</h4>
              <p className="text-gray-300 text-sm">
                You've saved ₹1,200 compared to last month by reducing entertainment expenses.
              </p>
            </div>
            <div className="bg-yellow-600/10 border border-yellow-600/20 rounded-lg p-4">
              <h4 className="text-yellow-300 font-medium mb-2">🎯 Goal Progress</h4>
              <p className="text-gray-300 text-sm">
                You're on track to meet your monthly budget goal. Keep up the great work!
              </p>
            </div>
            <div className="bg-amber-600/10 border border-amber-600/20 rounded-lg p-4">
              <h4 className="text-amber-300 font-medium mb-2">📊 Recommendation</h4>
              <p className="text-gray-300 text-sm">
                Consider setting up automatic savings for your transportation category.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AnalyticsPage;