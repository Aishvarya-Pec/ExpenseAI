import React, { useState, useEffect } from 'react';
import { Header } from './components/layout/Header';
import { Sidebar } from './components/layout/Sidebar';
import { Dashboard } from './components/dashboard/Dashboard';
import { AuthPage } from './components/auth/AuthPage';
import { LandingPage } from './components/pages/LandingPage';
import { HowItWorks } from './components/pages/HowItWorks';
import { Reviews } from './components/pages/Reviews';
import { ExpensesPage } from './components/pages/ExpensesPage';
import GroupExpensesPage from './components/pages/GroupExpensesPage';
import AnalyticsPage from './components/pages/AnalyticsPage';
import BudgetsPage from './components/pages/BudgetsPage';
import { CardsPage } from './components/pages/CardsPage';
import CalendarPage from './components/pages/CalendarPage';
import ReportsPage from './components/pages/ReportsPage';
import SettingsPage from './components/pages/SettingsPage';  // fixed import: default import instead of named
import { Logo } from './components/ui/Logo';

import { useAuth } from './hooks/useAuth';
import { Toaster } from 'react-hot-toast'; // <- Added missing import for Toaster

function App() {
  const { user, loading, signOut } = useAuth();

  const [currentPage, setCurrentPage] = useState<string>(() => {
    const hash = window.location.hash.slice(1);
    return hash || 'landing';
  });

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1);
      if (hash) {
        setCurrentPage(hash);
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  useEffect(() => {
    if (user && (currentPage === 'auth' || currentPage === 'signin' || currentPage === 'signup')) {
      setCurrentPage('dashboard');
    }
  }, [user, currentPage]);

  const handleProfileClick = () => {
    // Implement profile click behavior here if needed
  };

  const handlePageChange = (page: string) => {
    setCurrentPage(page);
  };

  const handleGetStarted = () => {
    if (user) {
      setCurrentPage('dashboard');
    } else {
      setCurrentPage('signin');
    }
  };

  const handleLearnMore = () => {
    setCurrentPage('how-it-works');
  };

  const handleViewReviews = () => {
    setCurrentPage('reviews');
  };

  const handleAuthSuccess = () => {
    setCurrentPage('dashboard');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center transition-colors duration-300 bg-gradient-to-br from-black via-gray-900 to-yellow-900">
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <Logo size="xl" showText={false} animated className="animate-pulse" />
          </div>
          <div className="space-y-2">
            <div className="w-8 h-8 border-4 border-yellow-200 border-t-yellow-500 rounded-full animate-spin mx-auto"></div>
            <p className="text-yellow-100 font-medium">Loading ExpenseAI...</p>
          </div>
        </div>
      </div>
    );
  }

  if (currentPage === 'signin' || currentPage === 'signup' || currentPage === 'auth') {
    return <AuthPage onSuccess={handleAuthSuccess} mode={currentPage === 'signup' ? 'register' : 'login'} />;
  }

  if (
    !user &&
    ['dashboard', 'expenses', 'groups', 'analytics', 'budgets', 'cards', 'calendar', 'reports', 'settings'].includes(currentPage)
  ) {
    return <AuthPage onSuccess={handleAuthSuccess} mode="login" />;
  }

  const renderPageContent = () => {
    switch (currentPage) {
      case 'landing':
        return (
          <LandingPage onGetStarted={handleGetStarted} onLearnMore={handleLearnMore} onViewReviews={handleViewReviews} />
        );
      case 'how-it-works':
        return <HowItWorks />;
      case 'reviews':
        return <Reviews />;
      case 'dashboard':
      case 'expenses':
      case 'groups':
      case 'analytics':
      case 'budgets':
      case 'cards':
      case 'calendar':
      case 'reports':
      case 'settings':
        if (!user) return <AuthPage onSuccess={handleAuthSuccess} mode="login" />;

        return (
 <div className="flex min-h-screen bg-black w-full">
            <Sidebar currentPage={currentPage} onPageChange={handlePageChange} />
            <div className="flex-1">
              <Header user={user} onProfileClick={handleProfileClick} onSignOut={signOut} />
              <main className="p-6">
                {currentPage === 'dashboard' && <Dashboard />}
                {currentPage === 'expenses' && <ExpensesPage />}
                {currentPage === 'groups' && <GroupExpensesPage />}
                {currentPage === 'analytics' && <AnalyticsPage />}
                {currentPage === 'budgets' && <BudgetsPage />}
                {currentPage === 'cards' && <CardsPage />}
                {currentPage === 'calendar' && <CalendarPage />}
                {currentPage === 'reports' && <ReportsPage />}
                {currentPage === 'settings' && <SettingsPage />}
              </main>
            </div>
          </div>
        );
      default:
        return (
          <LandingPage onGetStarted={handleGetStarted} onLearnMore={handleLearnMore} onViewReviews={handleViewReviews} />
        );
    }
  };

  const isPublicPage = ['landing', 'how-it-works', 'reviews'].includes(currentPage);

  return (
    <div className="min-h-screen transition-colors duration-300 bg-gradient-to-br from-black via-gray-900 to-yellow-900">
      {isPublicPage && (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-lg border-b border-yellow-500/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
            <div onClick={() => setCurrentPage('landing')} className="cursor-pointer">
              <Logo size="md" animated />
            </div>

            <div className="flex items-center space-x-6">
              <button
                onClick={() => setCurrentPage('how-it-works')}
                className="text-gray-300 hover:text-yellow-400 font-medium transition-colors"
                type="button"
              >
                How it Works
              </button>

              <button
                onClick={() => setCurrentPage('reviews')}
                className="text-gray-300 hover:text-yellow-400 font-medium transition-colors"
                type="button"
              >
                Reviews
              </button>

              <button
                onClick={handleGetStarted}
                className="bg-gradient-to-r from-yellow-600 to-yellow-500 text-black px-6 py-2 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 hover:from-yellow-500 hover:to-yellow-400"
                type="button"
              >
                {user ? 'Dashboard' : 'Get Started'}
              </button>
            </div>
          </div>
        </nav>
      )}

      <main>{renderPageContent()}</main>

      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            borderRadius: '12px',
            background: '#1a1a1a',
            color: '#fbbf24',
            border: '1px solid #374151',
            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.3), 0 4px 6px -2px rgba(0, 0, 0, 0.1)',
          },
        }}
      />
    </div>
  );
}

export default App;