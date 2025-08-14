import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, RefreshCw } from 'lucide-react';
import { useCurrencyContext } from '../../hooks/useCurrency';
import { Button } from './Button';

interface CurrencySelectorProps {
  value: string;
  onChange: (currency: string) => void;
  showRefresh?: boolean;
  showSecondary?: boolean;
  className?: string;
}

export const CurrencySelector: React.FC<CurrencySelectorProps> = ({
  value,
  onChange,
  showRefresh = false,
  showSecondary = false,
  className = ''
}) => {
  const { currencies, refreshRates, lastUpdated, secondaryCurrency, convertAmount } = useCurrencyContext();
  const [isOpen, setIsOpen] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const selectedCurrency = currencies.find(c => c.code === value);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await refreshRates();
    setIsRefreshing(false);
  };

  const formatLastUpdated = (timestamp: string | null) => {
    if (!timestamp) return 'Never';
    const date = new Date(timestamp);
    return date.toLocaleTimeString('en-IN', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <div className={`relative ${className}`}>
      {/* Main Selector */}
      <Button
        variant="ghost"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800"
      >
        <div className="flex items-center space-x-3">
          <span className="text-2xl">{selectedCurrency?.symbol}</span>
          <div className="text-left">
            <div className="font-semibold text-gray-900 dark:text-white">
              {selectedCurrency?.code}
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400">
              {selectedCurrency?.name}
            </div>
          </div>
        </div>
        <ChevronDown 
          size={16} 
          className={`text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
        />
      </Button>

      {/* Secondary Currency Display */}
      {showSecondary && value !== secondaryCurrency && (
        <div className="mt-2 p-2 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
          <div className="text-xs text-gray-600 dark:text-gray-400 mb-1">
            Also showing in {secondaryCurrency}
          </div>
          <div className="text-sm font-medium text-yellow-700 dark:text-yellow-300">
            1 {value} = {convertAmount(1, value, secondaryCurrency).toFixed(4)} {secondaryCurrency}
          </div>
        </div>
      )}

      {/* Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg shadow-xl z-50 max-h-64 overflow-y-auto"
          >
            {/* Header with Refresh */}
            {showRefresh && (
              <div className="p-3 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 rounded-t-lg">
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Last updated: {formatLastUpdated(lastUpdated)}
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleRefresh}
                    disabled={isRefreshing}
                    className="text-yellow-600 hover:text-yellow-700 dark:text-yellow-400 dark:hover:text-yellow-300"
                  >
                    <RefreshCw size={14} className={isRefreshing ? 'animate-spin' : ''} />
                  </Button>
                </div>
              </div>
            )}

            {/* Currency List */}
            <div className="py-2">
              {currencies.map((currency) => (
                <button
                  key={currency.code}
                  onClick={() => {
                    onChange(currency.code);
                    setIsOpen(false);
                  }}
                  className={`w-full text-left px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-150 flex items-center justify-between ${
                    value === currency.code ? 'bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-500' : ''
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-xl">{currency.symbol}</span>
                    <div>
                      <div className={`font-medium ${value === currency.code ? 'text-yellow-700 dark:text-yellow-300' : 'text-gray-900 dark:text-white'}`}>
                        {currency.code}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {currency.name}
                      </div>
                    </div>
                  </div>

                  {/* Exchange Rate */}
                  {value !== currency.code && (
                    <div className="text-right">
                      <div className="text-sm font-medium text-gray-600 dark:text-gray-300">
                        {convertAmount(1, value, currency.code).toFixed(4)}
                      </div>
                      <div className="text-xs text-gray-400">
                        per {value}
                      </div>
                    </div>
                  )}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Backdrop */}
      {isOpen && <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />}
    </div>
  );
};

// Quick Currency Converter Component
export const CurrencyConverter: React.FC = () => {
  const { convertAmount, formatAmount, primaryCurrency, secondaryCurrency } = useCurrencyContext();
  const [amount, setAmount] = useState<number>(1000);
  const [fromCurrency, setFromCurrency] = useState<string>(primaryCurrency);
  const [toCurrency, setToCurrency] = useState<string>(secondaryCurrency);

  const convertedAmount = convertAmount(amount, fromCurrency, toCurrency);

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-700 shadow-lg">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        Currency Converter
      </h3>

      <div className="space-y-4">
        {/* Amount Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Amount
          </label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value) || 0)}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
            placeholder="Enter amount"
          />
        </div>

        {/* From Currency */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            From
          </label>
          <CurrencySelector value={fromCurrency} onChange={setFromCurrency} showRefresh={true} />
        </div>

        {/* To Currency */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            To
          </label>
          <CurrencySelector value={toCurrency} onChange={setToCurrency} />
        </div>

        {/* Result */}
        <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 dark:from-yellow-900/20 dark:to-yellow-800/20 rounded-lg p-4">
          <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">
            {formatAmount(amount, fromCurrency)} equals
          </div>
          <div className="text-2xl font-bold text-yellow-700 dark:text-yellow-300">
            {formatAmount(convertedAmount, toCurrency)}
          </div>
        </div>
      </div>
    </div>
  );
};