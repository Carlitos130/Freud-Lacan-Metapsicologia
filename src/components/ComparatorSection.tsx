import React, { useState } from 'react';
import { 
  GitCompare, 
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { COMPARISONS_DATA } from '../data/comparisonsData';
import { ConceptComparison } from '../types';

interface ComparatorSectionProps {
  onAskInChat: (query: string) => void;
}

export const ComparatorSection: React.FC<ComparatorSectionProps> = ({ onAskInChat }) => {
  const [selectedComparisonId, setSelectedComparisonId] = useState<string>(COMPARISONS_DATA[0].id);
  const [customConceptA, setCustomConceptA] = useState('');
  const [customConceptB, setCustomConceptB] = useState('');

  const activeComparison =
    COMPARISONS_DATA.find((c) => c.id === selectedComparisonId) || COMPARISONS_DATA[0];

  const handleRunCustomCompare = () => {
    if (!customConceptA.trim() || !customConceptB.trim()) return;
    onAskInChat(
      `Realiza una diferenciación metapsicológica y clínica rigurosa entre "${customConceptA.trim()}" y "${customConceptB.trim()}", indicando los términos exactos en alemán y francés, sus fuentes textuales primarias, confusiones habituales y consecuencias en la dirección de la cura.`
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-10 space-y-10">
      {/* Editorial Header */}
      <div className="border-b border-black/10 pb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="max-w-2xl space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-[10px] uppercase tracking-[0.2em] font-sans font-bold text-black/40">
              Différenciation • Matrice Critique
            </span>
            <span className="inline-block w-1 h-1 rounded-full bg-black/40"></span>
            <span className="text-[10px] uppercase tracking-[0.15em] font-mono text-black/40">
              Trieb vs Instinkt // Verdrängung vs Verwerfung
            </span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tighter text-[#1C1C1C] font-serif uppercase">
            DIFFÉRENCIATION ÉPISTÉMOLOGIQUE
          </h2>
          <p className="text-sm sm:text-base font-serif italic text-black/70 leading-relaxed">
            Disección comparada de los pares conceptuales que con mayor frecuencia sufren desviaciones y asimilaciones indebidas en las traducciones.
          </p>
        </div>
      </div>

      {/* Preset Comparisons List */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        {COMPARISONS_DATA.map((item) => {
          const isSelected = item.id === activeComparison.id;
          return (
            <button
              key={item.id}
              onClick={() => setSelectedComparisonId(item.id)}
              className={`px-4 py-2 text-xs font-sans uppercase tracking-widest whitespace-nowrap transition-all border ${
                isSelected
                  ? 'bg-black text-white border-black font-bold'
                  : 'bg-white text-black/70 border-black/10 hover:border-black'
              }`}
            >
              {item.title}
            </button>
          );
        })}
      </div>

      {/* Main Comparative Matrix Card */}
      <div className="bg-white border border-black/10 p-6 sm:p-10 space-y-8">
        <div className="border-b border-black/10 pb-4">
          <span className="text-[10px] uppercase tracking-[0.2em] font-sans font-bold text-black/40 block mb-1">
            Contraste Terminologique
          </span>
          <h3 className="font-serif text-2xl sm:text-4xl font-bold text-black">
            {activeComparison.title}
          </h3>
        </div>

        {/* Side by Side Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Concept A */}
          <div className="p-6 bg-[#FDFBF7] border border-black/10 space-y-3">
            <div className="flex items-center justify-between text-[10px] font-mono text-black/40">
              <span className="uppercase font-bold tracking-widest font-sans text-black/60">
                {activeComparison.conceptA.language.toUpperCase()}
              </span>
              <span>{activeComparison.conceptA.author}</span>
            </div>
            <h4 className="font-serif text-2xl font-bold text-black italic">
              {activeComparison.conceptA.term}
            </h4>
            <p className="text-xs sm:text-sm font-sans text-black/80 leading-relaxed">
              {activeComparison.conceptA.coreMeaning}
            </p>
          </div>

          {/* Concept B */}
          <div className="p-6 bg-[#F9F6F0] border border-black/10 space-y-3">
            <div className="flex items-center justify-between text-[10px] font-mono text-black/40">
              <span className="uppercase font-bold tracking-widest font-sans text-black/60">
                {activeComparison.conceptB.language.toUpperCase()}
              </span>
              <span>{activeComparison.conceptB.author}</span>
            </div>
            <h4 className="font-serif text-2xl font-bold text-black italic">
              {activeComparison.conceptB.term}
            </h4>
            <p className="text-xs sm:text-sm font-sans text-black/80 leading-relaxed">
              {activeComparison.conceptB.coreMeaning}
            </p>
          </div>
        </div>

        {/* Key Difference Breakdown */}
        <div className="p-6 bg-[#FDFBF7] border-l-2 border-black space-y-2">
          <span className="text-[10px] uppercase tracking-[0.2em] font-sans font-bold text-black/40 block">
            Divergence Structurelle Nodale
          </span>
          <p className="text-base sm:text-lg font-serif text-black leading-relaxed">
            {activeComparison.keyDifference}
          </p>
        </div>

        {/* Common Confusion Alert */}
        <div className="p-6 bg-white border border-black/20 space-y-2">
          <span className="text-[10px] uppercase tracking-[0.2em] font-sans font-bold text-black block">
            Écueil / Déviation Historique
          </span>
          <p className="text-xs sm:text-sm font-sans text-black/80 leading-relaxed">
            {activeComparison.commonConfusion}
          </p>
        </div>

        {/* Clinical Consequence */}
        <div className="p-6 bg-black text-white space-y-2">
          <span className="text-[10px] uppercase tracking-[0.2em] font-sans font-bold opacity-60 block">
            Conséquence Clinique Incontournable
          </span>
          <p className="text-sm sm:text-base font-serif italic text-white/90 leading-relaxed">
            {activeComparison.clinicalConsequence}
          </p>
        </div>

        {/* Interrogation Button */}
        <div className="pt-4 flex items-center justify-between">
          <span className="text-xs font-serif italic text-black/50 hidden sm:inline">
            Examen complet dans le dialogue
          </span>
          <button
            onClick={() =>
              onAskInChat(
                `Realiza una comparación teórica y clínica exhaustiva entre ${activeComparison.conceptA.term} y ${activeComparison.conceptB.term}, detallando la evolución terminológica en Freud y Lacan, citas de apoyo y consecuencias en la escucha analítica.`
              )
            }
            className="py-3 px-6 bg-black text-white text-xs uppercase tracking-widest font-sans font-bold hover:opacity-80 transition-opacity flex items-center gap-2"
          >
            <span>Consulter cette Différenciation</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Custom Pair Comparator */}
      <div className="bg-[#F9F6F0] border border-black/10 p-6 sm:p-10 space-y-6">
        <div>
          <span className="text-[10px] uppercase tracking-[0.2em] font-sans font-bold text-black/40 block mb-1">
            Analyseur Comparatif Personnalisé
          </span>
          <h3 className="font-serif text-2xl font-bold text-black">
            Comparer Deux Concepts Spécifiques
          </h3>
          <p className="text-xs font-sans text-black/60 mt-1">
            Introduce dos conceptos cualesquiera para que la IA elabore un dictamen de diferenciación epistemológica en sus idiomas originales.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="text-[10px] font-sans uppercase tracking-widest text-black/50 block mb-1">
              Concept A
            </label>
            <input
              type="text"
              placeholder="Ex: Ich-Ideal / Idéal du Moi"
              value={customConceptA}
              onChange={(e) => setCustomConceptA(e.target.value)}
              className="w-full py-2.5 px-0 bg-transparent border-b border-black/30 focus:border-black focus:outline-none font-serif text-base italic text-black placeholder:text-black/30"
            />
          </div>

          <div>
            <label className="text-[10px] font-sans uppercase tracking-widest text-black/50 block mb-1">
              Concept B
            </label>
            <input
              type="text"
              placeholder="Ex: Ideal-Ich / Moi Idéal"
              value={customConceptB}
              onChange={(e) => setCustomConceptB(e.target.value)}
              className="w-full py-2.5 px-0 bg-transparent border-b border-black/30 focus:border-black focus:outline-none font-serif text-base italic text-black placeholder:text-black/30"
            />
          </div>
        </div>

        <div className="flex justify-end pt-2">
          <button
            onClick={handleRunCustomCompare}
            disabled={!customConceptA.trim() || !customConceptB.trim()}
            className={`py-3 px-6 text-xs uppercase tracking-widest font-sans font-bold flex items-center gap-2 transition-all ${
              customConceptA.trim() && customConceptB.trim()
                ? 'bg-black text-white hover:opacity-80 cursor-pointer'
                : 'bg-black/10 text-black/30 cursor-not-allowed'
            }`}
          >
            <span>Générer la Différenciation</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
