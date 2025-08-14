import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, CreditCard, Building2, Eye, EyeOff, Edit3, Trash2, Shield, Zap } from 'lucide-react';

interface BankAccount {
  id: string;
  bankName: string;
  accountNumber: string;
  accountType: 'savings' | 'checking' | 'current';
  balance: number;
  currency: 'USD' | 'INR';
  isDefault: boolean;
}

interface Card {
  id: string;
  cardName: string;
  cardNumber: string;
  expiryDate: string;
  cardType: 'credit' | 'debit';
  provider: 'visa' | 'mastercard' | 'amex' | 'rupay';
  bankName: string;
  creditLimit?: number;
  availableBalance?: number;
  currency: 'USD' | 'INR';
  color: string;
}

export const CardsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'cards' | 'accounts'>('cards');
  const [showCardNumbers, setShowCardNumbers] = useState<{ [key: string]: boolean }>({});
  const [showAddModal, setShowAddModal] = useState(false);
  const [modalType, setModalType] = useState<'card' | 'account'>('card');

  const [cards, setCards] = useState<Card[]>([
    {
      id: '1',
      cardName: 'HDFC Regalia Credit Card',
      cardNumber: '4532 1234 5678 9012',
      expiryDate: '12/27',
      cardType: 'credit',
      provider: 'visa',
      bankName: 'HDFC Bank',
      creditLimit: 500000,
      availableBalance: 425000,
      currency: 'INR',
      color: 'bg-gradient-to-r from-blue-600 to-blue-800'
    },
    {
      id: '2',
      cardName: 'SBI Debit Card',
      cardNumber: '5678 9012 3456 7890',
      expiryDate: '08/26',
      cardType: 'debit',
      provider: 'mastercard',
      bankName: 'State Bank of India',
      availableBalance: 85000,
      currency: 'INR',
      color: 'bg-gradient-to-r from-green-600 to-green-800'
    },
    {
      id: '3',
      cardName: 'Chase Sapphire Reserve',
      cardNumber: '3782 822463 10005',
      expiryDate: '03/28',
      cardType: 'credit',
      provider: 'amex',
      bankName: 'Chase Bank',
      creditLimit: 10000,
      availableBalance: 8500,
      currency: 'USD',
      color: 'bg-gradient-to-r from-purple-600 to-purple-800'
    }
  ]);

  const [accounts, setAccounts] = useState<BankAccount[]>([
    {
      id: '1',
      bankName: 'HDFC Bank',
      accountNumber: '12345678901234',
      accountType: 'savings',
      balance: 125000,
      currency: 'INR',
      isDefault: true
    },
    {
      id: '2',
      bankName: 'State Bank of India',
      accountNumber: '98765432109876',
      accountType: 'current',
      balance: 85000,
      currency: 'INR',
      isDefault: false
    },
    {
      id: '3',
      bankName: 'Chase Bank',
      accountNumber: '11223344556677',
      accountType: 'checking',
      balance: 2500,
      currency: 'USD',
      isDefault: false
    }
  ]);

  const [newCard, setNewCard] = useState({
    cardName: '',
    cardNumber: '',
    expiryDate: '',
    cardType: 'credit' as const,
    provider: 'visa' as const,
    bankName: '',
    creditLimit: '',
    currency: 'INR' as const
  });

  const [newAccount, setNewAccount] = useState({
    bankName: '',
    accountNumber: '',
    accountType: 'savings' as const,
    balance: '',
    currency: 'INR' as const
  });

  const toggleCardVisibility = (cardId: string) => {
    setShowCardNumbers(prev => ({
      ...prev,
      [cardId]: !prev[cardId]
    }));
  };

  const maskCardNumber = (cardNumber: string, isVisible: boolean) => {
    if (isVisible) return cardNumber;
    return cardNumber.replace(/\d(?=\d{4})/g, '*');
  };

  const maskAccountNumber = (accountNumber: string) => {
    return accountNumber.replace(/\d(?=\d{4})/g, '*');
  };

  const handleAddCard = () => {
    if (!newCard.cardName || !newCard.cardNumber || !newCard.bankName) return;

    const card: Card = {
      id: Date.now().toString(),
      cardName: newCard.cardName,
      cardNumber: newCard.cardNumber,
      expiryDate: newCard.expiryDate,
      cardType: newCard.cardType,
      provider: newCard.provider,
      bankName: newCard.bankName,
      creditLimit: newCard.creditLimit ? parseFloat(newCard.creditLimit) : undefined,
      availableBalance: newCard.creditLimit ? parseFloat(newCard.creditLimit) : 0,
      currency: newCard.currency,
      color: 'bg-gradient-to-r from-indigo-600 to-indigo-800'
    };

    setCards(prev => [card, ...prev]);
    setNewCard({
      cardName: '',
      cardNumber: '',
      expiryDate: '',
      cardType: 'credit',
      provider: 'visa',
      bankName: '',
      creditLimit: '',
      currency: 'INR'
    });
    setShowAddModal(false);
  };

  const handleAddAccount = () => {
    if (!newAccount.bankName || !newAccount.accountNumber || !newAccount.balance) return;

    const account: BankAccount = {
      id: Date.now().toString(),
      bankName: newAccount.bankName,
      accountNumber: newAccount.accountNumber,
      accountType: newAccount.accountType,
      balance: parseFloat(newAccount.balance),
      currency: newAccount.currency,
      isDefault: false
    };

    setAccounts(prev => [account, ...prev]);
    setNewAccount({
      bankName: '',
      accountNumber: '',
      accountType: 'savings',
      balance: '',
      currency: 'INR'
    });
    setShowAddModal(false);
  };

  const getCurrencySymbol = (currency: string) => {
    return currency === 'INR' ? '₹' : '$';
  };

  const getProviderIcon = (provider: string) => {
    // In a real app, you'd use actual provider logos
    return provider.toUpperCase();
  };

  const totalCardBalance = cards.reduce((acc, card) => {
    const rate = card.currency === 'INR' ? 0.012 : 1;
    return acc + ((card.availableBalance || 0) * rate);
  }, 0);

  const totalAccountBalance = accounts.reduce((acc, account) => {
    const rate = account.currency === 'INR' ? 0.012 : 1;
    return acc + (account.balance * rate);
  }, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Cards & Accounts</h1>
          <p className="text-gray-400">Manage your payment methods and bank accounts</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            setModalType(activeTab === 'cards' ? 'card' : 'account');
            setShowAddModal(true);
          }}
          className="bg-gradient-to-r from-yellow-600 to-yellow-500 text-black px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Add {activeTab === 'cards' ? 'Card' : 'Account'}
        </motion.button>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 bg-gray-900/50 border border-yellow-500/20 rounded-lg p-1">
        <button
          onClick={() => setActiveTab('cards')}
          className={`flex-1 px-4 py-3 rounded-lg font-medium transition-all duration-300 flex items-center justify-center gap-2 ${
            activeTab === 'cards'
              ? 'bg-yellow-500 text-black'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          <CreditCard className="w-5 h-5" />
          Cards
        </button>
        <button
          onClick={() => setActiveTab('accounts')}
          className={`flex-1 px-4 py-3 rounded-lg font-medium transition-all duration-300 flex items-center justify-center gap-2 ${
            activeTab === 'accounts'
              ? 'bg-yellow-500 text-black'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          <Building2 className="w-5 h-5" />
          Accounts
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gray-900/50 border border-yellow-500/20 rounded-xl p-6"
        >
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-yellow-500/20 rounded-lg flex items-center justify-center">
              <CreditCard className="w-6 h-6 text-yellow-400" />
            </div>
            <div>
              <p className="text-gray-400 text-sm">Total Cards</p>
              <p className="text-white text-xl font-bold">{cards.length}</p>
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
            <div className="w-12 h-12 bg-yellow-500/20 rounded-lg flex items-center justify-center">
              <Building2 className="w-6 h-6 text-yellow-400" />
            </div>
            <div>
              <p className="text-gray-400 text-sm">Bank Accounts</p>
              <p className="text-white text-xl font-bold">{accounts.length}</p>
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
              <Zap className="w-6 h-6 text-yellow-400" />
            </div>
            <div>
              <p className="text-gray-400 text-sm">Total Balance</p>
              <p className="text-white text-xl font-bold">
                ${(totalCardBalance + totalAccountBalance).toFixed(0)}
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Cards Tab */}
      {activeTab === 'cards' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cards.map((card, index) => (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="relative"
            >
              {/* Card */}
              <div className={`${card.color} rounded-xl p-6 text-white shadow-2xl transform hover:scale-105 transition-transform duration-300`}>
                <div className="flex justify-between items-start mb-6">
                  <div className="flex items-center gap-2">
                    <Shield className="w-6 h-6" />
                    <span className="text-sm font-medium opacity-90">{card.bankName}</span>
                  </div>
                  <div className="text-right">
                    <div className="text-xs opacity-75">{getProviderIcon(card.provider)}</div>
                    <div className="text-xs opacity-75 capitalize">{card.cardType}</div>
                  </div>
                </div>

                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-lg font-mono tracking-wider">
                      {maskCardNumber(card.cardNumber, showCardNumbers[card.id] || false)}
                    </span>
                    <button
                      onClick={() => toggleCardVisibility(card.id)}
                      className="p-1 hover:bg-white/20 rounded transition-colors"
                    >
                      {showCardNumbers[card.id] ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                  <div className="text-sm opacity-75">Expires {card.expiryDate}</div>
                </div>

                <div className="flex justify-between items-end">
                  <div>
                    <div className="text-xs opacity-75 mb-1">
                      {card.cardType === 'credit' ? 'Available Credit' : 'Balance'}
                    </div>
                    <div className="text-xl font-bold">
                      {getCurrencySymbol(card.currency)}{card.availableBalance?.toLocaleString()}
                    </div>
                    {card.creditLimit && (
                      <div className="text-xs opacity-75">
                        Limit: {getCurrencySymbol(card.currency)}{card.creditLimit.toLocaleString()}
                      </div>
                    )}
                  </div>
                  <div className="text-sm font-medium opacity-90">
                    {card.cardName.split(' ').slice(-2).join(' ')}
                  </div>
                </div>
              </div>

              {/* Card Actions */}
              <div className="absolute top-4 right-4 flex gap-1 opacity-0 hover:opacity-100 transition-opacity">
                <button className="p-2 bg-black/20 backdrop-blur-sm rounded-lg text-white hover:bg-black/40 transition-colors">
                  <Edit3 className="w-4 h-4" />
                </button>
                <button className="p-2 bg-black/20 backdrop-blur-sm rounded-lg text-white hover:bg-black/40 transition-colors">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Accounts Tab */}
      {activeTab === 'accounts' && (
        <div className="space-y-4">
          {accounts.map((account, index) => (
            <motion.div
              key={account.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-gray-900/50 border border-yellow-500/20 rounded-xl p-6 hover:border-yellow-500/40 transition-colors"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-yellow-500/20 rounded-lg flex items-center justify-center">
                    <Building2 className="w-8 h-8 text-yellow-400" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-white font-semibold">{account.bankName}</h3>
                      {account.isDefault && (
                        <span className="text-xs bg-yellow-500 text-black px-2 py-1 rounded-full font-medium">
                          Default
                        </span>
                      )}
                    </div>
                    <p className="text-gray-400 text-sm capitalize">{account.accountType} Account</p>
                    <p className="text-gray-500 text-sm font-mono">
                      {maskAccountNumber(account.accountNumber)}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-yellow-400 mb-1">
                    {getCurrencySymbol(account.currency)}{account.balance.toLocaleString()}
                  </p>
                  <div className="flex gap-2">
                    <button className="p-2 text-gray-400 hover:text-yellow-400 transition-colors">
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-red-400 transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-gray-900 border border-yellow-500/20 rounded-xl p-6 w-full max-w-md max-h-[80vh] overflow-y-auto"
          >
            <h2 className="text-xl font-bold text-white mb-6">
              Add New {modalType === 'card' ? 'Card' : 'Account'}
            </h2>

            {modalType === 'card' ? (
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Card name"
                  value={newCard.cardName}
                  onChange={(e) => setNewCard(prev => ({ ...prev, cardName: e.target.value }))}
                  className="w-full px-4 py-3 bg-black/50 border border-yellow-500/20 rounded-lg text-white placeholder-gray-400 focus:border-yellow-500 focus:outline-none"
                />
                <input
                  type="text"
                  placeholder="Card number"
                  value={newCard.cardNumber}
                  onChange={(e) => setNewCard(prev => ({ ...prev, cardNumber: e.target.value }))}
                  className="w-full px-4 py-3 bg-black/50 border border-yellow-500/20 rounded-lg text-white placeholder-gray-400 focus:border-yellow-500 focus:outline-none"
                />
                <div className="flex gap-3">
                  <input
                    type="text"
                    placeholder="MM/YY"
                    value={newCard.expiryDate}
                    onChange={(e) => setNewCard(prev => ({ ...prev, expiryDate: e.target.value }))}
                    className="flex-1 px-4 py-3 bg-black/50 border border-yellow-500/20 rounded-lg text-white placeholder-gray-400 focus:border-yellow-500 focus:outline-none"
                  />
                  <select
                    value={newCard.cardType}
                    onChange={(e) => setNewCard(prev => ({ ...prev, cardType: e.target.value as any }))}
                    className="px-4 py-3 bg-black/50 border border-yellow-500/20 rounded-lg text-white focus:border-yellow-500 focus:outline-none"
                  >
                    <option value="credit">Credit</option>
                    <option value="debit">Debit</option>
                  </select>
                </div>
                <select
                  value={newCard.provider}
                  onChange={(e) => setNewCard(prev => ({ ...prev, provider: e.target.value as any }))}
                  className="w-full px-4 py-3 bg-black/50 border border-yellow-500/20 rounded-lg text-white focus:border-yellow-500 focus:outline-none"
                >
                  <option value="visa">Visa</option>
                  <option value="mastercard">Mastercard</option>
                  <option value="amex">American Express</option>
                  <option value="rupay">RuPay</option>
                </select>
                <input
                  type="text"
                  placeholder="Bank name"
                  value={newCard.bankName}
                  onChange={(e) => setNewCard(prev => ({ ...prev, bankName: e.target.value }))}
                  className="w-full px-4 py-3 bg-black/50 border border-yellow-500/20 rounded-lg text-white placeholder-gray-400 focus:border-yellow-500 focus:outline-none"
                />
                {newCard.cardType === 'credit' && (
                  <input
                    type="number"
                    placeholder="Credit limit"
                    value={newCard.creditLimit}
                    onChange={(e) => setNewCard(prev => ({ ...prev, creditLimit: e.target.value }))}
                    className="w-full px-4 py-3 bg-black/50 border border-yellow-500/20 rounded-lg text-white placeholder-gray-400 focus:border-yellow-500 focus:outline-none"
                  />
                )}
                <select
                  value={newCard.currency}
                  onChange={(e) => setNewCard(prev => ({ ...prev, currency: e.target.value as any }))}
                  className="w-full px-4 py-3 bg-black/50 border border-yellow-500/20 rounded-lg text-white focus:border-yellow-500 focus:outline-none"
                >
                  <option value="INR">INR</option>
                  <option value="USD">USD</option>
                </select>
              </div>
            ) : (
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Bank name"
                  value={newAccount.bankName}
                  onChange={(e) => setNewAccount(prev => ({ ...prev, bankName: e.target.value }))}
                  className="w-full px-4 py-3 bg-black/50 border border-yellow-500/20 rounded-lg text-white placeholder-gray-400 focus:border-yellow-500 focus:outline-none"
                />
                <input
                  type="text"
                  placeholder="Account number"
                  value={newAccount.accountNumber}
                  onChange={(e) => setNewAccount(prev => ({ ...prev, accountNumber: e.target.value }))}
                  className="w-full px-4 py-3 bg-black/50 border border-yellow-500/20 rounded-lg text-white placeholder-gray-400 focus:border-yellow-500 focus:outline-none"
                />
                <select
                  value={newAccount.accountType}
                  onChange={(e) => setNewAccount(prev => ({ ...prev, accountType: e.target.value as any }))}
                  className="w-full px-4 py-3 bg-black/50 border border-yellow-500/20 rounded-lg text-white focus:border-yellow-500 focus:outline-none"
                >
                  <option value="savings">Savings</option>
                  <option value="checking">Checking</option>
                  <option value="current">Current</option>
                </select>
                <div className="flex gap-3">
                  <input
                    type="number"
                    placeholder="Current balance"
                    value={newAccount.balance}
                    onChange={(e) => setNewAccount(prev => ({ ...prev, balance: e.target.value }))}
                    className="flex-1 px-4 py-3 bg-black/50 border border-yellow-500/20 rounded-lg text-white placeholder-gray-400 focus:border-yellow-500 focus:outline-none"
                  />
                  <select
                    value={newAccount.currency}
                    onChange={(e) => setNewAccount(prev => ({ ...prev, currency: e.target.value as any }))}
                    className="px-4 py-3 bg-black/50 border border-yellow-500/20 rounded-lg text-white focus:border-yellow-500 focus:outline-none"
                  >
                    <option value="INR">INR</option>
                    <option value="USD">USD</option>
                  </select>
                </div>
              </div>
            )}

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowAddModal(false)}
                className="flex-1 px-4 py-3 border border-gray-600 text-gray-400 rounded-lg hover:bg-gray-800 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={modalType === 'card' ? handleAddCard : handleAddAccount}
                className="flex-1 px-4 py-3 bg-gradient-to-r from-yellow-600 to-yellow-500 text-black rounded-lg font-semibold hover:shadow-lg transition-all duration-300"
              >
                Add {modalType === 'card' ? 'Card' : 'Account'}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};