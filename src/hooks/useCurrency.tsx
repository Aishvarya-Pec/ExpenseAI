import React, { useState, useEffect, createContext, useContext } from 'react';

interface CurrencyInfo {
  code: string;
  name: string;
  symbol: string;
  rate: number;
}

interface CurrencyContextType {
  primaryCurrency: string;
  secondaryCurrency: string;
  currencies: CurrencyInfo[];
  exchangeRates: Record<string, number>;
  setPrimaryCurrency: (currency: string) => void;
  setSecondaryCurrency: (currency: string) => void;
  convertAmount: (amount: number, fromCurrency: string, toCurrency: string) => number;
  formatAmount: (amount: number, currency: string) => string;
  refreshRates: () => Promise<void>;
  lastUpdated: string | null;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

// Supported currencies with INR and USD as primary
const SUPPORTED_CURRENCIES: CurrencyInfo[] = [
  { code: 'INR', name: 'Indian Rupee', symbol: '₹', rate: 1 },
  { code: 'USD', name: 'US Dollar', symbol: '$', rate: 0.012 },
  { code: 'EUR', name: 'Euro', symbol: '€', rate: 0.011 },
  { code: 'GBP', name: 'British Pound', symbol: '£', rate: 0.0095 },
  { code: 'JPY', name: 'Japanese Yen', symbol: '¥', rate: 1.8 },
  { code: 'CAD', name: 'Canadian Dollar', symbol: 'C$', rate: 0.017 },
  { code: 'AUD', name: 'Australian Dollar', symbol: 'A$', rate: 0.018 },
  { code: 'CNY', name: 'Chinese Yuan', symbol: '¥', rate: 0.087 },
];

const fetchExchangeRates = async (): Promise<Record<string, number>> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  const rates: Record<string, number> = {
    INR: 1,
    USD: 0.012 + (Math.random() - 0.5) * 0.001,
    EUR: 0.011 + (Math.random() - 0.5) * 0.001,
    GBP: 0.0095 + (Math.random() - 0.5) * 0.0005,
    JPY: 1.8 + (Math.random() - 0.5) * 0.1,
    CAD: 0.017 + (Math.random() - 0.5) * 0.001,
    AUD: 0.018 + (Math.random() - 0.5) * 0.001,
    CNY: 0.087 + (Math.random() - 0.5) * 0.005,
  };
  return rates;
};

export const CurrencyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [primaryCurrency, setPrimaryCurrency] = useState<string>('INR');
  const [secondaryCurrency, setSecondaryCurrency] = useState<string>('USD');
  const [exchangeRates, setExchangeRates] = useState<Record<string, number>>({});
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);

  useEffect(() => {
    const defaultRates: Record<string, number> = {};
    SUPPORTED_CURRENCIES.forEach(currency => {
      defaultRates[currency.code] = currency.rate;
    });
    setExchangeRates(defaultRates);
  }, []);

  const refreshRates = async () => {
    try {
      const newRates = await fetchExchangeRates();
      setExchangeRates(newRates);
      setLastUpdated(new Date().toISOString());
      SUPPORTED_CURRENCIES.forEach(currency => {
        if (newRates[currency.code]) {
          currency.rate = newRates[currency.code];
        }
      });
    } catch (error) {
      console.error('Failed to fetch exchange rates:', error);
    }
  };

  useEffect(() => {
    refreshRates();
    const interval = setInterval(refreshRates, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const convertAmount = (amount: number, fromCurrency: string, toCurrency: string): number => {
    if (fromCurrency === toCurrency) return amount;
    const fromRate = exchangeRates[fromCurrency] || 1;
    const toRate = exchangeRates[toCurrency] || 1;
    const inrAmount = fromCurrency === 'INR' ? amount : amount / fromRate;
    const convertedAmount = toCurrency === 'INR' ? inrAmount : inrAmount * toRate;
    return Math.round(convertedAmount * 100) / 100;
  };

  const formatAmount = (amount: number, currency: string): string => {
    try {
      return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency,
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(amount);
    } catch {
      return `${amount.toFixed(2)} ${currency}`;
    }
  };

  const contextValue: CurrencyContextType = {
    primaryCurrency,
    secondaryCurrency,
    currencies: SUPPORTED_CURRENCIES,
    exchangeRates,
    setPrimaryCurrency,
    setSecondaryCurrency,
    convertAmount,
    formatAmount,
    refreshRates,
    lastUpdated,
  };

  return (
    <CurrencyContext.Provider value={contextValue}>
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrencyContext = (): CurrencyContextType => {
  const context = useContext(CurrencyContext);
  if (context === undefined) {
    throw new Error('useCurrencyContext must be used within a CurrencyProvider');
  }
  return context;
};

// Optional helper hook with same API for convenience
export const useCurrency = useCurrencyContext;
