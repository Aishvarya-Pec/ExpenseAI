import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Calendar, Plus, DollarSign, TrendingUp, X, Save, Bell, Receipt, Wallet } from 'lucide-react';
import { ParticleBackground } from '../ui/ParticleBackground';
import { AnimatedBackground } from '../ui/AnimatedBackground';
import Sparkles from '../ui/Sparkles';
import toast from 'react-hot-toast';

interface CalendarEvent {
  id: string;
  title: string;
  amount?: number;
  currency: 'USD' | 'INR';
  type: 'expense' | 'income' | 'event' | 'reminder';
  date: string;
  category: string;
  color: string;
  description?: string;
  reminderTime?: string;
}

interface AddEventForm {
  title: string;
  amount: string;
  type: 'expense' | 'income' | 'event' | 'reminder';
  category: string;
  description: string;
  reminderTime: string;
}

export const CalendarPage: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [events] = useState<CalendarEvent[]>([
    {
      id: '1',
      title: 'Salary Credit',
      amount: 75000,
      currency: 'INR',
      type: 'income',
      date: '2024-01-01',
      category: 'Salary',
      color: 'bg-green-500'
    },
    {
      id: '2',
      title: 'Rent Payment',
      amount: 25000,
      currency: 'INR',
      type: 'expense',
      date: '2024-01-05',
      category: 'Housing',
      color: 'bg-red-500'
    },
    {
      id: '3',
      title: 'Grocery Shopping',
      amount: 3500,
      currency: 'INR',
      type: 'expense',
      date: '2024-01-15',
      category: 'Food',
      color: 'bg-yellow-500'
    },
    {
      id: '4',
      title: 'Credit Card Bill',
      amount: 15000,
      currency: 'INR',
      type: 'expense',
      date: '2024-01-20',
      category: 'Credit Card',
      color: 'bg-red-500'
    }
  ]);

  const [formData, setFormData] = useState<AddEventForm>({
    title: '',
    amount: '',
    type: 'expense',
    category: '',
    description: '',
    reminderTime: ''
  });

  const categories = {
    expense: ['Food & Dining', 'Transportation', 'Shopping', 'Entertainment', 'Bills & Utilities', 'Healthcare', 'Education', 'Travel', 'Housing', 'Credit Card', 'Other'],
    income: ['Salary', 'Freelance', 'Investment', 'Business', 'Gift', 'Bonus', 'Other'],
    event: ['Meeting', 'Appointment', 'Social', 'Work', 'Personal', 'Other'],
    reminder: ['Payment Due', 'Bill Reminder', 'Meeting', 'Task', 'Other']
  };

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      if (direction === 'prev') {
        newDate.setMonth(prev.getMonth() - 1);
      } else {
        newDate.setMonth(prev.getMonth() + 1);
      }
      return newDate;
    });
  };

  const formatDate = (year: number, month: number, day: number) => {
    return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
  };

  const getEventsForDate = (dateString: string) => {
    return events.filter(event => event.date === dateString);
  };

  const getCurrencySymbol = (currency: string) => {
    return currency === 'INR' ? '₹' : '$';
  };

  const getColorForType = (type: string) => {
    switch (type) {
      case 'income': return 'bg-green-500';
      case 'expense': return 'bg-red-500';
      case 'event': return 'bg-blue-500';
      case 'reminder': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  const handleAddEvent = (type: 'expense' | 'income' | 'event' | 'reminder') => {
    setFormData({
      title: '',
      amount: '',
      type,
      category: '',
      description: '',
      reminderTime: ''
    });
    setShowAddForm(true);
  };

  const handleSubmitEvent = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title.trim()) {
      toast.error('Please enter a title');
      return;
    }

    if ((formData.type === 'expense' || formData.type === 'income') && !formData.amount) {
      toast.error('Please enter an amount');
      return;
    }

    const newEvent: CalendarEvent = {
      id: Date.now().toString(),
      title: formData.title,
      amount: formData.amount ? parseFloat(formData.amount) : undefined,
      currency: 'INR',
      type: formData.type,
      date: selectedDate || new Date().toISOString().split('T')[0],
      category: formData.category || 'Other',
      color: getColorForType(formData.type),
      description: formData.description,
      reminderTime: formData.reminderTime
    };

events.push(newEvent); // Add new event to existing events array
    setShowAddForm(false);
    
    toast.success(`${formData.type.charAt(0).toUpperCase() + formData.type.slice(1)} added successfully!`);
    
    // Reset form
    setFormData({
      title: '',
      amount: '',
      type: 'expense',
      category: '',
      description: '',
      reminderTime: ''
    });
  };

  const handleQuickAdd = (type: 'expense' | 'income' | 'reminder') => {
    if (!selectedDate) {
      toast.error('Please select a date first');
      return;
    }
    handleAddEvent(type);
  };

  const renderCalendarDays = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);
    const days = [];

    // Empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-32"></div>);
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const dateString = formatDate(currentDate.getFullYear(), currentDate.getMonth(), day);
      const dayEvents = getEventsForDate(dateString);
      const isSelected = selectedDate === dateString;
      const isToday = dateString === new Date().toISOString().split('T')[0];

      days.push(
        <motion.div
          key={day}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: day * 0.01 }}
          className={`h-32 border border-gray-700 p-2 cursor-pointer hover:bg-gray-800/50 transition-colors ${
            isSelected ? 'bg-yellow-500/20 border-yellow-500' : ''
          } ${isToday ? 'ring-2 ring-yellow-400' : ''}`}
          onClick={() => setSelectedDate(selectedDate === dateString ? null : dateString)}
        >
          <div className="flex justify-between items-start mb-2">
            <span className={`text-sm font-medium ${isToday ? 'text-yellow-400' : 'text-white'}`}>
              {day}
            </span>
            {dayEvents.length > 0 && (
              <span className="text-xs bg-yellow-500 text-black px-1 rounded-full">
                {dayEvents.length}
              </span>
            )}
          </div>

          <div className="space-y-1">
            {dayEvents.slice(0, 3).map(event => (
              <div
                key={event.id}
                className={`text-xs p-1 rounded text-white truncate ${event.color}`}
              >
                {event.title}
              </div>
            ))}
            {dayEvents.length > 3 && (
              <div className="text-xs text-gray-400">
                +{dayEvents.length - 3} more
              </div>
            )}
          </div>
        </motion.div>
      );
    }

    return days;
  };

  const selectedDateEvents = selectedDate ? getEventsForDate(selectedDate) : [];
  const totalIncome = events.filter(e => e.type === 'income').reduce((acc, e) => acc + (e.amount || 0), 0);
  const totalExpenses = events.filter(e => e.type === 'expense').reduce((acc, e) => acc + (e.amount || 0), 0);

  return (
    <div className="relative p-6">
      {/* Remove: ParticleBackground, AnimatedBackground, Sparkles */}
      
      <div className="relative z-10 space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-white">Calendar</h1>
            <p className="text-gray-400">Track your financial events and expenses by date</p>
          </div>
          <div className="flex gap-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleAddEvent('expense')}
              className="bg-gradient-to-r from-red-600 to-red-500 text-white px-4 py-2 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 flex items-center gap-2"
            >
              <Receipt className="w-4 h-4" />
              Add Expense
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleAddEvent('income')}
              className="bg-gradient-to-r from-green-600 to-green-500 text-white px-4 py-2 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 flex items-center gap-2"
            >
              <Wallet className="w-4 h-4" />
              Add Income
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleAddEvent('event')}
              className="bg-gradient-to-r from-blue-600 to-blue-500 text-white px-4 py-2 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 flex items-center gap-2"
            >
              <Calendar className="w-4 h-4" />
              Add Event
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleAddEvent('reminder')}
              className="bg-gradient-to-r from-yellow-600 to-yellow-500 text-black px-4 py-2 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 flex items-center gap-2"
            >
              <Bell className="w-4 h-4" />
              Add Reminder
            </motion.button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gray-900/50 border border-yellow-500/20 rounded-xl p-6"
          >
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-green-400" />
              </div>
              <div>
                <p className="text-gray-400 text-sm">Monthly Income</p>
                <p className="text-white text-xl font-bold">₹{totalIncome.toLocaleString()}</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-gray-900/50 border border-yellow-500/20 rounded-xl p-6"
          >
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-red-500/20 rounded-lg flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-red-400" />
              </div>
              <div>
                <p className="text-gray-400 text-sm">Monthly Expenses</p>
                <p className="text-white text-xl font-bold">₹{totalExpenses.toLocaleString()}</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-gray-900/50 border border-yellow-500/20 rounded-xl p-6"
          >
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-yellow-500/20 rounded-lg flex items-center justify-center">
                <Calendar className="w-6 h-6 text-yellow-400" />
              </div>
              <div>
                <p className="text-gray-400 text-sm">Total Events</p>
                <p className="text-white text-xl font-bold">{events.length}</p>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Calendar */}
          <div className="lg:col-span-3">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gray-900/50 border border-yellow-500/20 rounded-xl p-6"
            >
              {/* Calendar Header */}
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-white">
                  {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
                </h2>
                <div className="flex gap-2">
                  <button
                    onClick={() => navigateMonth('prev')}
                    className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
                  >
                    <ChevronLeft className="w-5 h-5 text-gray-400" />
                  </button>
                  <button
                    onClick={() => navigateMonth('next')}
                    className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
                  >
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                  </button>
                </div>
              </div>

              {/* Day Headers */}
              <div className="grid grid-cols-7 gap-1 mb-2">
                {dayNames.map(day => (
                  <div key={day} className="h-10 flex items-center justify-center">
                    <span className="text-sm font-medium text-gray-400">{day}</span>
                  </div>
                ))}
              </div>

              {/* Calendar Grid */}
              <div className="grid grid-cols-7 gap-1">
                {renderCalendarDays()}
              </div>
            </motion.div>
          </div>

          {/* Event Details */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-gray-900/50 border border-yellow-500/20 rounded-xl p-6"
            >
              <h3 className="text-lg font-bold text-white mb-4">
                {selectedDate ? `Events for ${selectedDate}` : 'Select a Date'}
              </h3>

              {selectedDate ? (
                <div className="space-y-3">
                  {selectedDateEvents.length > 0 ? (
                    selectedDateEvents.map(event => (
                      <div
                        key={event.id}
                        className={`p-3 rounded-lg border border-gray-700 ${event.color.replace('bg-', 'bg-').replace('-500', '-500/20')}`}
                      >
                        <div className="flex items-center gap-2 mb-2">
                          <div className={`w-3 h-3 rounded-full ${event.color}`}></div>
                          <span className="text-white font-medium">{event.title}</span>
                        </div>
                        <div className="text-sm text-gray-400 mb-1">
                          {event.category}
                        </div>
                        {event.amount && (
                          <div className="text-lg font-bold text-yellow-400">
                            {event.type === 'income' ? '+' : '-'}
                            {getCurrencySymbol(event.currency)}{event.amount.toLocaleString()}
                          </div>
                        )}
                        {event.description && (
                          <div className="text-sm text-gray-300 mt-2">
                            {event.description}
                          </div>
                        )}
                        {event.reminderTime && (
                          <div className="text-sm text-yellow-400 mt-2">
                            ⏰ {event.reminderTime}
                          </div>
                        )}
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-400 text-sm">No events for this date</p>
                  )}
                </div>
              ) : (
                <p className="text-gray-400 text-sm">Click on a date to view events</p>
              )}
            </motion.div>

            {/* Quick Add */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-gray-900/50 border border-yellow-500/20 rounded-xl p-6 mt-6"
            >
              <h3 className="text-lg font-bold text-white mb-4">Quick Add</h3>
              <div className="space-y-3">
                <button 
                  onClick={() => handleQuickAdd('income')}
                  className="w-full p-3 bg-green-500/20 border border-green-500/30 rounded-lg text-green-400 hover:bg-green-500/30 transition-colors flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Add Income
                </button>
                <button 
                  onClick={() => handleQuickAdd('expense')}
                  className="w-full p-3 bg-red-500/20 border border-red-500/30 rounded-lg text-red-400 hover:bg-red-500/30 transition-colors flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Add Expense
                </button>
                <button 
                  onClick={() => handleQuickAdd('reminder')}
                  className="w-full p-3 bg-yellow-500/20 border border-yellow-500/30 rounded-lg text-yellow-400 hover:bg-yellow-500/30 transition-colors flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Add Reminder
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Add Event Modal */}
      <AnimatePresence>
        {showAddForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowAddForm(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-gray-900 border border-yellow-500/20 rounded-xl p-6 w-full max-w-md"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-white">
                  Add {formData.type.charAt(0).toUpperCase() + formData.type.slice(1)}
                </h3>
                <button
                  onClick={() => setShowAddForm(false)}
                  className="p-2 text-gray-400 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSubmitEvent} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Title *
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-yellow-500"
                    placeholder={`Enter ${formData.type} title`}
                    required
                  />
                </div>

                {(formData.type === 'expense' || formData.type === 'income') && (
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Amount (₹)
                    </label>
                    <input
                      type="number"
                      value={formData.amount}
                      onChange={(e) => setFormData(prev => ({ ...prev, amount: e.target.value }))}
                      className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-yellow-500"
                      placeholder="0.00"
                      min="0"
                      step="0.01"
                    />
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Category
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-yellow-500"
                  >
                    <option value="">Select category</option>
                    {categories[formData.type].map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Description
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-yellow-500 resize-none"
                    rows={3}
                    placeholder="Optional description"
                  />
                </div>

                {formData.type === 'reminder' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Reminder Time
                    </label>
                    <input
                      type="time"
                      value={formData.reminderTime}
                      onChange={(e) => setFormData(prev => ({ ...prev, reminderTime: e.target.value }))}
                      className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-yellow-500"
                    />
                  </div>
                )}

                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowAddForm(false)}
                    className="flex-1 px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-4 py-2 bg-gradient-to-r from-yellow-600 to-yellow-500 text-black rounded-lg font-semibold hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <Save className="w-4 h-4" />
                    Save
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CalendarPage;