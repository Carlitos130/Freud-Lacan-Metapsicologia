import React from 'react';
import {
  MessageSquareQuote,
  BookOpen,
  Library,
  Layers,
  GitCompare
} from 'lucide-react';
import { AuthWidget } from './AuthWidget';

interface NavbarProps {
  activeTab: 'chat' | 'glossary' | 'texts' | 'topology' | 'compare';
  setActiveTab: (tab: 'chat' | 'glossary' | 'texts' | 'topology' | 'compare') => void;
  onOpenQuickQuery?: (query: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab }) => {
  return (
    <header className="bg-[#FDFBF7] border-b border-black/10 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 pt-6 pb-4">
        <div className="flex justify-end mb-2">
          <AuthWidget />
        </div>
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          {/* Brand & Masthead Title */}
          <div className="flex flex-col">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] uppercase tracking-[0.2em] font-sans font-bold text-black/40">
                Psychoanalytic Framework • Rigueur Textuelle
              </span>
              <span className="inline-block w-1 h-1 rounded-full bg-black/40"></span>
              <span className="text-[10px] uppercase tracking-[0.15em] font-mono text-black/40">
                DE // FR // ES
              </span>
            </div>
            <div className="flex items-baseline gap-3">
              <h1 className="text-3xl sm:text-5xl font-black tracking-tighter text-[#1C1C1C] font-serif uppercase">
                THÉORIE
              </h1>
              <span className="text-sm sm:text-base font-serif italic text-black/60 font-medium">
                Psicoanálisis Freud & Lacan
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="flex items-center gap-4 sm:gap-8 text-xs sm:text-sm font-sans uppercase tracking-widest overflow-x-auto pb-1">
            <button
              id="nav-tab-chat"
              onClick={() => setActiveTab('chat')}
              className={`transition-colors whitespace-nowrap pb-1 ${
                activeTab === 'chat'
                  ? 'border-b-2 border-black font-bold text-black'
                  : 'text-black/40 hover:text-black font-medium'
              }`}
            >
              Dialogue
            </button>

            <button
              id="nav-tab-glossary"
              onClick={() => setActiveTab('glossary')}
              className={`transition-colors whitespace-nowrap pb-1 ${
                activeTab === 'glossary'
                  ? 'border-b-2 border-black font-bold text-black'
                  : 'text-black/40 hover:text-black font-medium'
              }`}
            >
              Lexicon
            </button>

            <button
              id="nav-tab-texts"
              onClick={() => setActiveTab('texts')}
              className={`transition-colors whitespace-nowrap pb-1 flex items-center gap-1.5 ${
                activeTab === 'texts'
                  ? 'border-b-2 border-black font-bold text-black'
                  : 'text-black/40 hover:text-black font-medium'
              }`}
            >
              <span>Bibliothèque & Corpus</span>
              <span className="text-[9px] font-mono px-1 py-0.2 bg-black/5 rounded text-black/60">
                Staferla • GW
              </span>
            </button>

            <button
              id="nav-tab-topology"
              onClick={() => setActiveTab('topology')}
              className={`transition-colors whitespace-nowrap pb-1 ${
                activeTab === 'topology'
                  ? 'border-b-2 border-black font-bold text-black'
                  : 'text-black/40 hover:text-black font-medium'
              }`}
            >
              Topologie
            </button>

            <button
              id="nav-tab-compare"
              onClick={() => setActiveTab('compare')}
              className={`transition-colors whitespace-nowrap pb-1 ${
                activeTab === 'compare'
                  ? 'border-b-2 border-black font-bold text-black'
                  : 'text-black/40 hover:text-black font-medium'
              }`}
            >
              Différenciation
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
};
