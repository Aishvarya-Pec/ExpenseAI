import React from 'react';
import { LogOut, Settings } from 'lucide-react';

interface HeaderProps {
  onProfileClick: () => void;
  onSignOut: () => void;
  showSettings?: boolean;
}

export const Header: React.FC<HeaderProps> = ({ onProfileClick, onSignOut, showSettings = true }): JSX.Element => {
  return (
    <header className="bg-gray-900 border-b border-gray-800 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h1 className="text-xl font-bold text-yellow-400">ExpenseAI</h1>
        </div>
        
        <div className="flex items-center space-x-2">
          {showSettings && (
            <button
              onClick={() => window.location.hash = '#settings'}
              className="p-2 text-gray-400 hover:text-yellow-400 transition-colors relative"
              title="Settings"
            >
              <Settings className="w-5 h-5" />
            </button>
          )}
          
          <button
            onClick={onSignOut}
            className="flex items-center gap-2 px-3 py-2 text-gray-400 hover:text-red-400 transition-colors"
            title="Sign Out"
          >
            <LogOut className="w-4 h-4" />
            <span className="text-sm">Sign Out</span>
          </button>
        </div>
      </div>
    </header>
  );
};