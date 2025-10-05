import React from "react";
import type { Tab } from "~/components/Demo";

interface FooterProps {
  activeTab: Tab;
  setActiveTab: (tab: Tab) => void;
  showWallet?: boolean;
}

export const Footer: React.FC<FooterProps> = ({ activeTab, setActiveTab, showWallet = false }) => (
  <div className="fixed bottom-0 left-0 right-0 mx-4 mb-4 bg-white/10 dark:bg-black/20 backdrop-blur-xl border border-blue-500/30 px-2 py-2 rounded-2xl z-50 shadow-lg shadow-blue-500/10">
    <div className="flex justify-around items-center h-14">
      <button
        onClick={() => setActiveTab('home')}
        className={`flex flex-col items-center justify-center w-full h-full rounded-xl transition-all duration-300 ${
          activeTab === 'home' 
            ? 'text-blue-500 bg-blue-500/10 scale-105' 
            : 'text-gray-500 dark:text-gray-400 hover:text-blue-400 hover:bg-blue-500/5'
        }`}
      >
        <span className="text-xl">🏠</span>
        <span className="text-xs mt-1 font-medium">Home</span>
      </button>
      <button
        onClick={() => setActiveTab('actions')}
        className={`flex flex-col items-center justify-center w-full h-full rounded-xl transition-all duration-300 ${
          activeTab === 'actions' 
            ? 'text-blue-500 bg-blue-500/10 scale-105' 
            : 'text-gray-500 dark:text-gray-400 hover:text-blue-400 hover:bg-blue-500/5'
        }`}
      >
        <span className="text-xl">⚡</span>
        <span className="text-xs mt-1 font-medium">Actions</span>
      </button>
      <button
        onClick={() => setActiveTab('context')}
        className={`flex flex-col items-center justify-center w-full h-full rounded-xl transition-all duration-300 ${
          activeTab === 'context' 
            ? 'text-blue-500 bg-blue-500/10 scale-105' 
            : 'text-gray-500 dark:text-gray-400 hover:text-blue-400 hover:bg-blue-500/5'
        }`}
      >
        <span className="text-xl">📋</span>
        <span className="text-xs mt-1 font-medium">Context</span>
      </button>
      {showWallet && (
        <button
          onClick={() => setActiveTab('wallet')}
          className={`flex flex-col items-center justify-center w-full h-full rounded-xl transition-all duration-300 ${
            activeTab === 'wallet' 
              ? 'text-blue-500 bg-blue-500/10 scale-105' 
              : 'text-gray-500 dark:text-gray-400 hover:text-blue-400 hover:bg-blue-500/5'
          }`}
        >
          <span className="text-xl">👛</span>
          <span className="text-xs mt-1 font-medium">Wallet</span>
        </button>
      )}
    </div>
  </div>
);
