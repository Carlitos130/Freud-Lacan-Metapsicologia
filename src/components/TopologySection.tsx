import React, { useState } from 'react';
import { 
  Layers, 
  ArrowRight,
  ArrowUpRight
} from 'lucide-react';
import { TOPOLOGY_MODELS } from '../data/topologyData';
import { StructuralModelItem } from '../types';

interface TopologySectionProps {
  onAskInChat: (query: string) => void;
}

export const TopologySection: React.FC<TopologySectionProps> = ({ onAskInChat }) => {
  const [selectedModelId, setSelectedModelId] = useState<string>(TOPOLOGY_MODELS[0].id);

  const activeModel =
    TOPOLOGY_MODELS.find((m) => m.id === selectedModelId) || TOPOLOGY_MODELS[0];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-10 space-y-10">
      {/* Editorial Header */}
      <div className="border-b border-black/10 pb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="max-w-2xl space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-[10px] uppercase tracking-[0.2em] font-sans font-bold text-black/40">
              Topologie • Mathèmes & Schémas
            </span>
            <span className="inline-block w-1 h-1 rounded-full bg-black/40"></span>
            <span className="text-[10px] uppercase tracking-[0.15em] font-mono text-black/40">
              RSI // Nœuds // Graphes
            </span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tighter text-[#1C1C1C] font-serif uppercase">
            FORMALISATION STRUCTURALE
          </h2>
          <p className="text-sm sm:text-base font-serif italic text-black/70 leading-relaxed">
            Formalizaciones lógicas del psicoanálisis: el Nudo Borromeo ($R-S-I$), la rotación de los Cuatro Discursos, el Grafo del Deseo y las Tópicas Freudianas.
          </p>
        </div>
      </div>

      {/* Model Selection Tabs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {TOPOLOGY_MODELS.map((model, idx) => {
          const isSelected = model.id === activeModel.id;
          const numStr = (idx + 1).toString().padStart(2, '0');
          return (
            <button
              key={model.id}
              onClick={() => setSelectedModelId(model.id)}
              className={`p-5 text-left transition-all border ${
                isSelected
                  ? 'bg-black text-white border-black'
                  : 'bg-white text-black border-black/10 hover:border-black'
              }`}
            >
              <div className="flex items-center justify-between text-[10px] font-mono mb-2">
                <span className={isSelected ? 'text-white/60' : 'text-black/40'}>
                  {numStr}
                </span>
                <span className={`uppercase font-sans font-bold tracking-widest ${isSelected ? 'text-white/80' : 'text-black/60'}`}>
                  {model.author.toUpperCase()}
                </span>
              </div>
              <h4 className="font-serif font-bold text-base sm:text-lg leading-snug">
                {model.name}
              </h4>
              <p className={`text-xs italic font-serif mt-1 ${isSelected ? 'text-white/70' : 'text-black/50'}`}>
                {model.nameOriginal}
              </p>
            </button>
          );
        })}
      </div>

      {/* Main Structural Detail Blueprint */}
      <div className="bg-white border border-black/10 p-6 sm:p-10 space-y-8">
        {/* Model Header */}
        <div className="border-b border-black/10 pb-6 flex flex-col md:flex-row md:items-start justify-between gap-4">
          <div>
            <span className="text-[10px] uppercase tracking-[0.2em] font-sans font-bold text-black/40 block mb-1">
              Dispositif Formalisé
            </span>
            <h3 className="font-serif text-3xl sm:text-4xl font-bold text-black tracking-tight">
              {activeModel.name}
            </h3>
            <p className="text-sm font-serif italic text-black/60 mt-1">
              {activeModel.nameOriginal} — {activeModel.author}
            </p>
          </div>

          {activeModel.formulaOrDiagram && (
            <div className="p-4 bg-[#F9F6F0] border border-black/10 font-mono text-sm sm:text-base text-black">
              <span className="text-[9px] uppercase tracking-widest text-black/40 block mb-1">
                Notation Mathématique / Matema:
              </span>
              {activeModel.formulaOrDiagram}
            </div>
          )}
        </div>

        {/* Theoretical Axiom */}
        <div className="p-6 bg-[#FDFBF7] border-l-2 border-black space-y-1">
          <span className="text-[10px] uppercase tracking-[0.2em] font-sans font-bold text-black/40 block">
            Axiome Fondamental
          </span>
          <p className="text-lg font-serif italic text-[#1C1C1C] leading-snug">
            «{activeModel.theoreticalAxiom}»
          </p>
        </div>

        {/* Description */}
        <div className="space-y-2">
          <span className="text-[10px] uppercase tracking-[0.2em] font-sans font-bold text-black/40 block">
            Génèse Formelle & Logique
          </span>
          <p className="text-sm sm:text-base font-sans text-black/80 leading-relaxed">
            {activeModel.description}
          </p>
        </div>

        {/* Structural Components */}
        <div className="space-y-4">
          <span className="text-[10px] uppercase tracking-[0.2em] font-sans font-bold text-black/40 block">
            Instances & Articulations du Dispositif
          </span>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {activeModel.components.map((comp, idx) => (
              <div
                key={idx}
                className="p-5 bg-[#F9F6F0] border border-black/5 space-y-2"
              >
                <div className="flex items-center justify-between">
                  <span className="font-serif font-bold text-black text-base">
                    {comp.name}
                  </span>
                  {comp.symbol && (
                    <span className="text-xs font-mono font-bold bg-white px-2 py-0.5 border border-black/10 text-black">
                      {comp.symbol}
                    </span>
                  )}
                </div>
                <p className="text-xs font-sans text-black/70 leading-relaxed">
                  {comp.role}
                </p>
                <div className="pt-2 border-t border-black/5 text-[11px] font-sans text-black/60">
                  <span className="font-bold text-black">Incidence clinique: </span>
                  {comp.clinicalNote}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Interrogation Button */}
        <div className="pt-6 border-t border-black/10 flex items-center justify-between">
          <span className="text-xs font-serif italic text-black/50 hidden sm:inline">
            Démonstration logique et clinique
          </span>
          <button
            onClick={() =>
              onAskInChat(
                `Desarrolla en profundidad el modelo topológico/estructural de "${activeModel.name}" (${activeModel.nameOriginal}) de ${activeModel.author}, explicando cada uno de sus términos, cómo se articula con la clínica y qué problemas teóricos resuelve.`
              )
            }
            className="py-3 px-6 bg-black text-white text-xs uppercase tracking-widest font-sans font-bold hover:opacity-80 transition-opacity flex items-center gap-2"
          >
            <span>Consulter ce Schéma</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
