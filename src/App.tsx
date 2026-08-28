/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { ChatbotSection } from './components/ChatbotSection';
import { GlossarySection } from './components/GlossarySection';
import { TextCorpusSection } from './components/TextCorpusSection';
import { TopologySection } from './components/TopologySection';
import { ComparatorSection } from './components/ComparatorSection';
import { DeepDiveModal } from './components/DeepDiveModal';
import { ConceptItem } from './types';

export default function App() {
  const [activeTab, setActiveTab] = useState<'chat' | 'glossary' | 'texts' | 'topology' | 'compare'>('chat');
  const [selectedConcept, setSelectedConcept] = useState<ConceptItem | null>(null);
  const [pendingChatQuery, setPendingChatQuery] = useState<string | null>(null);

  const handleAskInChat = (query: string) => {
    setPendingChatQuery(query);
    setActiveTab('chat');
  };

  const handleClearPendingQuery = () => {
    setPendingChatQuery(null);
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#1C1C1C] flex flex-col font-sans selection:bg-black selection:text-white">
      {/* Top Editorial Masthead & Navigation */}
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col">
        {activeTab === 'chat' && (
          <ChatbotSection
            initialQuery={pendingChatQuery}
            onClearInitialQuery={handleClearPendingQuery}
          />
        )}

        {activeTab === 'glossary' && (
          <GlossarySection
            onSelectConcept={(concept) => setSelectedConcept(concept)}
            onAskInChat={handleAskInChat}
          />
        )}

        {activeTab === 'texts' && (
          <TextCorpusSection onAskInChat={handleAskInChat} />
        )}

        {activeTab === 'topology' && (
          <TopologySection onAskInChat={handleAskInChat} />
        )}

        {activeTab === 'compare' && (
          <ComparatorSection onAskInChat={handleAskInChat} />
        )}
      </main>

      {/* Deep Dive Exegesis Modal */}
      {selectedConcept && (
        <DeepDiveModal
          concept={selectedConcept}
          onClose={() => setSelectedConcept(null)}
          onAskInChat={handleAskInChat}
        />
      )}

      {/* Editorial High-Contrast Footer */}
      <footer className="bg-black text-white flex flex-col sm:flex-row items-center justify-between px-6 sm:px-10 py-3 text-[9px] sm:text-[10px] uppercase tracking-[0.25em] font-sans font-medium gap-2">
        <div className="flex items-center gap-3">
          <span>Gesammelte Werke</span>
          <span className="opacity-40">•</span>
          <span>Écrits & Séminaires</span>
          <span className="opacity-40">•</span>
          <span>Fidélité Textuelle</span>
        </div>
        <div className="text-white/60">
          Psicoanálisis Freud & Lacan
        </div>
      </footer>
    </div>
  );
}
