import React, { useState, useMemo, useRef, useEffect } from 'react';
import { 
  Search, 
  BookOpen, 
  Sparkles, 
  ArrowUpRight,
  Languages,
  X,
  CornerDownLeft,
  ChevronRight,
  Filter,
  Layers,
  FileText,
  RotateCcw
} from 'lucide-react';
import { CONCEPTS_DATA } from '../data/conceptsData';
import { ConceptItem, ConceptCategory, PsychoanalysisSchool } from '../types';

interface GlossarySectionProps {
  onSelectConcept: (concept: ConceptItem) => void;
  onAskInChat: (query: string) => void;
}

// Key quick search pills for frequent psychoanalytic technical terms
const FREQUENT_TERMS = [
  'Trieb',
  'Jouissance',
  'Verdrängung',
  'Objet petit a',
  'Sinthome',
  'Das Ding',
  'Spaltung',
  'Forclusion',
  'Nœud borroméen',
  'Unbewusst'
];

export const GlossarySection: React.FC<GlossarySectionProps> = ({ onSelectConcept, onAskInChat }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSchool, setSelectedSchool] = useState<PsychoanalysisSchool | 'all'>('all');
  const [selectedCategory, setSelectedCategory] = useState<ConceptCategory | 'all'>('all');
  
  // Autocomplete UI state
  const [isAutocompleteOpen, setIsAutocompleteOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState<number>(-1);
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const categories: Array<{ id: ConceptCategory | 'all'; label: string }> = [
    { id: 'all', label: 'Toutes Catégories' },
    { id: 'metapsychology', label: 'Métapsychologie' },
    { id: 'drive_and_jouissance', label: 'Pulsion & Jouissance' },
    { id: 'language_and_unconscious', label: 'Langage & Inconscient' },
    { id: 'clinical_structures', label: 'Structures Cliniques' },
    { id: 'topology_and_mathemes', label: 'Topologie & Mathèmes' },
    { id: 'ego_and_subject', label: 'Moi vs Sujet ($)' },
  ];

  // Live filtered concepts for main grid
  const filteredConcepts = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return CONCEPTS_DATA.filter((concept) => {
      const matchesSearch =
        !q ||
        concept.termOriginal.toLowerCase().includes(q) ||
        concept.termSpanish.toLowerCase().includes(q) ||
        concept.shortDefinition.toLowerCase().includes(q) ||
        concept.literalMeaning.toLowerCase().includes(q) ||
        concept.etymologicalNuance.toLowerCase().includes(q) ||
        (concept.mathemeOrFormula && concept.mathemeOrFormula.toLowerCase().includes(q)) ||
        (concept.relatedConcepts && concept.relatedConcepts.some((r) => r.toLowerCase().includes(q)));

      const matchesSchool =
        selectedSchool === 'all' ||
        concept.school === selectedSchool ||
        concept.school === 'both';

      const matchesCategory =
        selectedCategory === 'all' || concept.category === selectedCategory;

      return matchesSearch && matchesSchool && matchesCategory;
    });
  }, [searchQuery, selectedSchool, selectedCategory]);

  // Autocomplete suggestions list (matches query across all concepts regardless of active filters for maximal discovery)
  const autocompleteSuggestions = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return [];
    
    return CONCEPTS_DATA.filter((concept) => {
      return (
        concept.termOriginal.toLowerCase().includes(q) ||
        concept.termSpanish.toLowerCase().includes(q) ||
        concept.literalMeaning.toLowerCase().includes(q) ||
        (concept.mathemeOrFormula && concept.mathemeOrFormula.toLowerCase().includes(q)) ||
        (concept.relatedConcepts && concept.relatedConcepts.some((r) => r.toLowerCase().includes(q)))
      );
    }).slice(0, 8); // Top 8 most relevant suggestions
  }, [searchQuery]);

  // Close autocomplete on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
        setIsAutocompleteOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Keyboard navigation for autocomplete list
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!isAutocompleteOpen || autocompleteSuggestions.length === 0) {
      if (e.key === 'ArrowDown' && autocompleteSuggestions.length > 0) {
        setIsAutocompleteOpen(true);
        setHighlightedIndex(0);
      }
      return;
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setHighlightedIndex((prev) => (prev < autocompleteSuggestions.length - 1 ? prev + 1 : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : autocompleteSuggestions.length - 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (highlightedIndex >= 0 && highlightedIndex < autocompleteSuggestions.length) {
        const item = autocompleteSuggestions[highlightedIndex];
        handleSelectSuggestion(item);
      } else if (autocompleteSuggestions.length > 0) {
        handleSelectSuggestion(autocompleteSuggestions[0]);
      }
    } else if (e.key === 'Escape') {
      setIsAutocompleteOpen(false);
    }
  };

  const handleSelectSuggestion = (concept: ConceptItem) => {
    setSearchQuery(concept.termOriginal);
    setIsAutocompleteOpen(false);
    setHighlightedIndex(-1);
  };

  const handleOpenConceptDirectly = (concept: ConceptItem, e: React.MouseEvent) => {
    e.stopPropagation();
    setIsAutocompleteOpen(false);
    onSelectConcept(concept);
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    setIsAutocompleteOpen(false);
    setHighlightedIndex(-1);
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  };

  // Helper to highlight matching text in suggestions
  const highlightMatch = (text: string, query: string) => {
    if (!query.trim()) return text;
    const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
    const parts = text.split(regex);
    return parts.map((part, i) =>
      regex.test(part) ? (
        <span key={i} className="bg-[#EFE4D0] text-black font-semibold underline underline-offset-2">
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-10 space-y-10">
      {/* Editorial Header Masthead */}
      <div className="border-b border-black/10 pb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="max-w-2xl space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-[10px] uppercase tracking-[0.2em] font-sans font-bold text-black/40">
              Lexicon • Vocabulaire Fondamental
            </span>
            <span className="inline-block w-1 h-1 rounded-full bg-black/40"></span>
            <span className="text-[10px] uppercase tracking-[0.15em] font-mono text-black/40">
              DE // FR (Freud GW & Lacan Staferla)
            </span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tighter text-[#1C1C1C] font-serif uppercase">
            DICTIONNAIRE DES CONCEPTS
          </h2>
          <p className="text-sm sm:text-base font-serif italic text-black/70 leading-relaxed">
            Exégesis terminológica de los <em>Grundbegriffe</em> freudianos y las formalizaciones de los <em>Écrits y Séminaires</em> lacanianos con búsqueda en tiempo real y autocompletado conceptual.
          </p>
        </div>

        <div className="text-right hidden md:block">
          <span className="text-2xl font-serif italic font-bold text-black block">
            {filteredConcepts.length} / {CONCEPTS_DATA.length}
          </span>
          <span className="text-[10px] font-sans uppercase tracking-[0.2em] text-black/40">
            Termes Filtrés
          </span>
        </div>
      </div>

      {/* Editorial Search & Filter Strip with Autocomplete */}
      <div className="space-y-4 pb-2">
        <div className="flex flex-col lg:flex-row gap-4 items-stretch lg:items-center justify-between">
          
          {/* Autocomplete Search Bar Container */}
          <div ref={searchContainerRef} className="relative flex-1 max-w-2xl">
            <div className="relative flex items-center bg-white border border-black/25 focus-within:border-black focus-within:ring-1 focus-within:ring-black/10 transition-all px-3 py-1.5 shadow-sm">
              <Search className="w-4 h-4 text-black/50 shrink-0 mr-2.5" />
              
              <input
                ref={searchInputRef}
                type="text"
                id="glossary-search-input"
                value={searchQuery}
                onFocus={() => {
                  if (searchQuery.trim()) setIsAutocompleteOpen(true);
                }}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setIsAutocompleteOpen(true);
                  setHighlightedIndex(-1);
                }}
                onKeyDown={handleKeyDown}
                placeholder="Escribe un concepto en alemán, francés o español (ej: Trieb, Forclusion, Jouissance, a)..."
                className="w-full bg-transparent focus:outline-none font-sans text-xs sm:text-sm text-black placeholder:text-black/35 py-1"
                autoComplete="off"
              />

              {searchQuery && (
                <button
                  type="button"
                  onClick={handleClearSearch}
                  className="p-1 text-black/40 hover:text-black transition-colors rounded-full hover:bg-neutral-100 mr-1"
                  title="Limpiar búsqueda"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}

              <span className="text-[10px] font-mono text-black/40 px-1.5 py-0.5 bg-neutral-100 border border-black/10 rounded hidden sm:inline">
                Filtrado en vivo
              </span>
            </div>

            {/* Autocomplete Dropdown Panel */}
            {isAutocompleteOpen && searchQuery.trim().length > 0 && (
              <div className="absolute left-0 right-0 top-full mt-1 bg-white border-2 border-black shadow-2xl z-50 overflow-hidden animate-fadeIn">
                <div className="p-2.5 bg-[#FAF8F5] border-b border-black/10 flex items-center justify-between text-[11px] font-mono text-black/60">
                  <span>
                    {autocompleteSuggestions.length > 0
                      ? `${autocompleteSuggestions.length} sugerencias coincidentes:`
                      : 'Sin sugerencias exactas'}
                  </span>
                  <span className="text-[10px] text-black/40 hidden sm:inline">
                    ↑↓ navegar • Enter seleccionar • Esc cerrar
                  </span>
                </div>

                {autocompleteSuggestions.length > 0 ? (
                  <div className="max-h-80 overflow-y-auto divide-y divide-black/5">
                    {autocompleteSuggestions.map((concept, index) => {
                      const isHighlighted = index === highlightedIndex;
                      return (
                        <div
                          key={concept.id}
                          onClick={() => handleSelectSuggestion(concept)}
                          onMouseEnter={() => setHighlightedIndex(index)}
                          className={`p-3 cursor-pointer transition-colors flex items-center justify-between gap-3 ${
                            isHighlighted ? 'bg-[#F6F2EB]' : 'hover:bg-neutral-50'
                          }`}
                        >
                          <div className="space-y-0.5 min-w-0">
                            <div className="flex items-center gap-2">
                              <span className="font-serif text-sm font-bold text-black">
                                {highlightMatch(concept.termOriginal, searchQuery)}
                              </span>
                              <span className="text-xs font-serif italic text-black/60 truncate">
                                — {highlightMatch(concept.termSpanish, searchQuery)}
                              </span>
                              {concept.mathemeOrFormula && (
                                <span className="text-[10px] font-mono bg-neutral-100 px-1.5 py-0.2 border border-black/10 text-black/80">
                                  {concept.mathemeOrFormula}
                                </span>
                              )}
                            </div>

                            <p className="text-[11px] font-sans text-black/60 line-clamp-1">
                              {concept.literalMeaning || concept.shortDefinition}
                            </p>
                          </div>

                          <div className="flex items-center gap-2 shrink-0">
                            <span className="text-[9px] font-mono uppercase px-1.5 py-0.5 bg-white border border-black/15 text-black/70">
                              {concept.school === 'freud'
                                ? 'Freud (DE)'
                                : concept.school === 'lacan'
                                ? 'Lacan (FR)'
                                : 'Freud & Lacan'}
                            </span>

                            <button
                              type="button"
                              onClick={(e) => handleOpenConceptDirectly(concept, e)}
                              className="px-2 py-1 bg-black text-white text-[10px] font-sans font-bold uppercase tracking-wider hover:opacity-80 flex items-center gap-1"
                              title="Abrir exégesis completa"
                            >
                              <span>Exégesis</span>
                              <ArrowUpRight className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="p-5 text-center space-y-2">
                    <p className="text-xs font-sans text-black/60">
                      No se encontraron conceptos que coincidan exactamente con «<strong>{searchQuery}</strong>».
                    </p>
                    <p className="text-[11px] font-serif italic text-black/40">
                      Prueba con términos como <em>Trieb, Verdrängung, Jouissance, Sinthome o Spaltung</em>.
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* School Selector Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 lg:pb-0">
            {[
              { id: 'all', label: 'Tous' },
              { id: 'freud', label: 'Freud GW (DE)' },
              { id: 'lacan', label: 'Lacan Staferla (FR)' },
              { id: 'both', label: 'Freud & Lacan' },
            ].map((s) => (
              <button
                key={s.id}
                onClick={() => setSelectedSchool(s.id as any)}
                className={`px-3 py-1.5 text-[11px] uppercase tracking-wider font-sans transition-all whitespace-nowrap ${
                  selectedSchool === s.id
                    ? 'bg-black text-white font-bold shadow-sm'
                    : 'bg-white border border-black/15 text-black/70 hover:text-black hover:border-black'
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>

        {/* Quick Concept Term Chips */}
        <div className="flex items-center gap-1.5 flex-wrap pt-1 text-xs">
          <span className="text-[10px] font-mono uppercase font-bold text-black/40 mr-1 flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-black/50" />
            Acceso Rápido:
          </span>
          {FREQUENT_TERMS.map((term) => {
            const isSelected = searchQuery.toLowerCase() === term.toLowerCase();
            return (
              <button
                key={term}
                onClick={() => {
                  if (isSelected) {
                    setSearchQuery('');
                  } else {
                    setSearchQuery(term);
                  }
                }}
                className={`px-2.5 py-0.5 text-[11px] font-serif border transition-all rounded-sm ${
                  isSelected
                    ? 'bg-black text-white border-black font-semibold'
                    : 'bg-[#FAF8F5] border-black/10 text-black/75 hover:border-black hover:bg-white'
                }`}
              >
                {term}
              </button>
            );
          })}
        </div>

        {/* Category Underlined Links */}
        <div className="flex items-center gap-4 sm:gap-6 flex-wrap pt-3 border-t border-black/10 text-xs font-sans uppercase tracking-wider">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`pb-1 transition-all ${
                selectedCategory === cat.id
                  ? 'border-b-2 border-black text-black font-bold'
                  : 'text-black/40 hover:text-black'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Editorial Concept Cards */}
      {filteredConcepts.length === 0 ? (
        <div className="bg-[#FAF8F5] border border-black/15 p-12 text-center space-y-4 max-w-xl mx-auto">
          <div className="p-3 bg-neutral-200/60 rounded-full inline-block">
            <Search className="w-6 h-6 text-black/60" />
          </div>
          <h4 className="font-serif text-xl font-bold text-black">
            Ningún concepto coincide con los filtros aplicados
          </h4>
          <p className="text-xs sm:text-sm font-sans text-black/70 leading-relaxed">
            No se hallaron resultados para «<strong>{searchQuery}</strong>» en la categoría o autor seleccionados.
          </p>
          <div className="flex items-center justify-center gap-3 pt-2">
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedSchool('all');
                setSelectedCategory('all');
              }}
              className="px-4 py-2 bg-black text-white text-xs font-sans font-bold uppercase tracking-wider hover:opacity-85 flex items-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Restablecer Filtros</span>
            </button>
            <button
              onClick={() =>
                onAskInChat(
                  `¿Cómo define el psicoanálisis freudo-lacaniano el término "${searchQuery}" y cuáles son sus referencias canónicas en las GW o Staferla?`
                )
              }
              className="px-4 py-2 bg-white border border-black/20 text-xs font-sans font-semibold text-black hover:border-black flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Consultar en el Diálogo</span>
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredConcepts.map((concept, index) => {
            const numStr = (index + 1).toString().padStart(2, '0');
            return (
              <div
                key={concept.id}
                className="bg-white border border-black/10 p-6 flex flex-col justify-between space-y-4 hover:border-black transition-colors group relative shadow-sm"
              >
                <div className="space-y-3">
                  {/* Index Number & Language Tag */}
                  <div className="flex items-center justify-between text-[10px] font-mono text-black/40">
                    <span>{numStr}</span>
                    <span className="uppercase tracking-widest font-sans font-semibold text-black/60">
                      {concept.language === 'german'
                        ? 'DE // FREUD GW'
                        : concept.language === 'french'
                        ? 'FR // LACAN STAFERLA'
                        : 'DE & FR'}
                    </span>
                  </div>

                  {/* Term Headings */}
                  <div>
                    <h3 className="font-serif text-2xl font-bold text-black group-hover:underline underline-offset-4 decoration-1">
                      {concept.termOriginal}
                    </h3>
                    <p className="text-xs font-serif italic text-black/60 mt-0.5">
                      {concept.termSpanish} {concept.pronunciation && `[${concept.pronunciation}]`}
                    </p>
                  </div>

                  {/* Definition */}
                  <p className="text-xs font-sans text-black/70 leading-relaxed line-clamp-3">
                    {concept.shortDefinition}
                  </p>

                  {/* Matheme Formula Preview if any */}
                  {concept.mathemeOrFormula && (
                    <div className="p-2 bg-[#F9F6F0] border border-black/5 font-mono text-xs text-black">
                      <span className="text-[9px] uppercase tracking-widest text-black/40 block mb-0.5">
                        Mathème:
                      </span>
                      {concept.mathemeOrFormula}
                    </div>
                  )}
                </div>

                {/* Action Links */}
                <div className="pt-4 border-t border-black/10 flex items-center justify-between text-xs font-sans uppercase tracking-widest">
                  <button
                    onClick={() => onSelectConcept(concept)}
                    className="text-black font-bold hover:opacity-60 transition-opacity flex items-center gap-1"
                  >
                    <span>Exégèse</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() =>
                      onAskInChat(
                        `Explícame detalladamente cómo se articula el concepto de ${concept.termOriginal} (${concept.termSpanish}) en la clínica freudo-lacaniana y qué errores de traducción suelen presentarse.`
                      )
                    }
                    className="text-black/50 hover:text-black transition-colors flex items-center gap-1"
                  >
                    <span>Dialogue →</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
