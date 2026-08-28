import React, { useState, useEffect } from 'react';
import { X, Copy, Check, Loader2, ArrowRight, BookOpen, Quote, Share2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { ConceptItem } from '../types';

interface DeepDiveModalProps {
  concept: ConceptItem | null;
  onClose: () => void;
  onAskInChat: (question: string) => void;
}

export const DeepDiveModal: React.FC<DeepDiveModalProps> = ({ concept, onClose, onAskInChat }) => {
  const [aiAnalysis, setAiAnalysis] = useState<string | null>(null);
  const [loadingAi, setLoadingAi] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const [citationCopied, setCitationCopied] = useState<boolean>(false);
  const [citationFormat, setCitationFormat] = useState<'gw_staferla' | 'apa' | 'chicago' | 'full'>('gw_staferla');
  const [showCitationBox, setShowCitationBox] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setAiAnalysis(null);
    setError(null);
    setLoadingAi(false);
    setShowCitationBox(false);
    setCitationCopied(false);
  }, [concept]);

  if (!concept) return null;

  const handleFetchAiDeepDive = async () => {
    setLoadingAi(true);
    setError(null);
    try {
      const response = await fetch('/api/psychoanalysis/deep-dive', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          conceptId: concept.id,
          termOriginal: concept.termOriginal,
          termSpanish: concept.termSpanish,
          school: concept.school,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.details || data.error || 'Error al obtener análisis monográfico');
      }
      setAiAnalysis(data.text);
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Error al conectar con el servidor.');
    } finally {
      setLoadingAi(false);
    }
  };

  const generateCitation = (format: 'gw_staferla' | 'apa' | 'chicago' | 'full' = citationFormat): string => {
    const author = concept.school === 'freud' ? 'Freud, Sigmund' : concept.school === 'lacan' ? 'Lacan, Jacques' : 'Freud, Sigmund & Lacan, Jacques';
    const primarySource = concept.keySources[0];
    const year = primarySource ? primarySource.year : (concept.school === 'freud' ? '1915' : '1975');
    const sourceTitle = primarySource ? primarySource.originalTitle : concept.termOriginal;
    const sourceSpanishTitle = primarySource ? primarySource.title : concept.termSpanish;
    const sectionOrVol = primarySource?.sectionOrVolume ? ` (${primarySource.sectionOrVolume})` : '';

    if (format === 'gw_staferla') {
      if (concept.school === 'freud') {
        return `${author} (${year}). «${sourceTitle}» [${sourceSpanishTitle}]. In Gesammelte Werke (GW)${sectionOrVol}. Frankfurt am Main: S. Fischer Verlag. Ref: Concepto «${concept.termOriginal}» (${concept.termSpanish}).`;
      } else if (concept.school === 'lacan') {
        return `${author} (${year}). «${sourceTitle}» [${sourceSpanishTitle}]. In Le Séminaire / Autres Écrits${sectionOrVol}. Transcripción crítica Staferla / Paris: Éditions du Seuil. Ref: Concepto «${concept.termOriginal}» (${concept.termSpanish}).`;
      } else {
        return `${author} (${year}). Articulación comparativa «${concept.termOriginal}» [${concept.termSpanish}]. Corpus Freud GW / Lacan Staferla.`;
      }
    }

    if (format === 'apa') {
      if (concept.school === 'freud') {
        return `${author} (${year}). ${sourceTitle}${sectionOrVol}. In Gesammelte Werke. S. Fischer. [Entrada conceptual: ${concept.termOriginal} / ${concept.termSpanish}].`;
      } else {
        return `${author} (${year}). ${sourceTitle}${sectionOrVol}. Le Séminaire / Staferla. Éditions du Seuil. [Entrada conceptual: ${concept.termOriginal} / ${concept.termSpanish}].`;
      }
    }

    if (format === 'chicago') {
      if (concept.school === 'freud') {
        return `${author}. "${sourceTitle}." In Gesammelte Werke${sectionOrVol}. Frankfurt am Main: S. Fischer Verlag, ${year}. Def: "${concept.literalMeaning}".`;
      } else {
        return `${author}. "${sourceTitle}." Le Séminaire / Staferla${sectionOrVol}. Paris: Éditions du Seuil, ${year}. Def: "${concept.literalMeaning}".`;
      }
    }

    // 'full' academic research format
    const sourcesFormatted = concept.keySources
      .map((s, i) => `  [${i + 1}] ${s.originalTitle} (${s.year}) - «${s.title}»${s.sectionOrVolume ? ` [${s.sectionOrVolume}]` : ''}`)
      .join('\n');

    const quoteFormatted = concept.originalQuoteSnippet
      ? `\nCita textual:\n  «${concept.originalQuoteSnippet.original}»\n  (Traducción: «${concept.originalQuoteSnippet.spanish}»)\n  Fuente: ${concept.originalQuoteSnippet.source}`
      : '';

    const mathemeFormatted = concept.mathemeOrFormula
      ? `\nMatema / Formalización: ${concept.mathemeOrFormula}`
      : '';

    return `=== CITACIÓN ACADÉMICA // CORPUS PSICOANALÍTICO ===
Concepto: ${concept.termOriginal} (${concept.termSpanish})
Escuela: ${concept.school === 'freud' ? 'Freud (Gesammelte Werke)' : concept.school === 'lacan' ? 'Lacan (Staferla / Écrits)' : 'Freud & Lacan'}
Significado literal y etimología: ${concept.literalMeaning} (${concept.etymologicalNuance})
${mathemeFormatted}
Definición rigurosa: ${concept.rigorousExplanation}
${quoteFormatted}

Fuentes bibliográficas primarias:
${sourcesFormatted}

Referencia académica estándar:
${author} (${year}). «${sourceTitle}» [${sourceSpanishTitle}]${sectionOrVol}. ${concept.school === 'freud' ? 'Gesammelte Werke (GW), S. Fischer Verlag.' : 'Le Séminaire / Staferla, Éditions du Seuil.'}`;
  };

  const handleCopyCitation = (format?: 'gw_staferla' | 'apa' | 'chicago' | 'full') => {
    const text = generateCitation(format || citationFormat);
    try {
      if (navigator && navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).catch(() => {});
      }
    } catch (_) {}
    setCitationCopied(true);
    setTimeout(() => setCitationCopied(false), 2200);
  };

  const handleCopy = () => {
    const textToCopy = aiAnalysis || `${concept.termOriginal} (${concept.termSpanish})\n\n${concept.rigorousExplanation}`;
    try {
      if (navigator && navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(textToCopy).catch(() => {});
      }
    } catch (_) {}
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6">
      <div className="bg-[#FDFBF7] max-w-3xl w-full max-h-[92vh] flex flex-col border border-black shadow-2xl overflow-hidden text-[#1C1C1C]">
        {/* Modal Masthead */}
        <div className="p-6 sm:p-8 border-b border-black/10 bg-[#F9F6F0] flex items-start justify-between">
          <div className="space-y-1 max-w-xl">
            <div className="flex items-center gap-2">
              <span className="text-[10px] uppercase tracking-[0.2em] font-sans font-bold text-black/50">
                {concept.language === 'german' ? 'DE // FREUD (GW)' : concept.language === 'french' ? 'FR // LACAN (STAFERLA)' : 'DE & FR'}
              </span>
              {concept.pronunciation && (
                <span className="text-[10px] font-mono text-black/40">
                  [{concept.pronunciation}]
                </span>
              )}
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-black text-black">
              {concept.termOriginal}
            </h2>
            <p className="text-sm font-serif italic text-black/70">
              {concept.termSpanish}
            </p>
          </div>

          <div className="flex items-center gap-2">
            {/* Direct Copy Citation Quick Button */}
            <button
              onClick={() => handleCopyCitation()}
              className={`px-3 py-1.5 border text-xs font-sans font-semibold flex items-center gap-1.5 transition-all ${
                citationCopied
                  ? 'bg-emerald-800 text-white border-emerald-800'
                  : 'bg-white text-black border-black/20 hover:border-black'
              }`}
              title="Copiar citación académica en formato Freud GW / Lacan Staferla"
            >
              {citationCopied ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>¡Citación Copiada!</span>
                </>
              ) : (
                <>
                  <Quote className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Copiar Citación</span>
                </>
              )}
            </button>

            <button
              onClick={handleCopy}
              className="p-2 text-black/60 hover:text-black transition-colors"
              title="Copiar texto de la entrada"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-700" /> : <Copy className="w-4 h-4" />}
            </button>

            <button
              onClick={onClose}
              className="p-2 text-black/60 hover:text-black transition-colors"
              title="Cerrar"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Reader */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 flex-1 bg-white">
          {/* Academic Citation Box Toggle & Card */}
          <div className="bg-[#FAF7F2] border border-black/15 p-4 sm:p-5 space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-black/10 pb-3">
              <div className="flex items-center gap-2">
                <Quote className="w-4 h-4 text-black" />
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-black">
                  Citación Académica • {concept.school === 'freud' ? 'Freud Gesammelte Werke (GW)' : 'Lacan Staferla / Séminaires'}
                </span>
              </div>

              {/* Format selection pills */}
              <div className="flex items-center gap-1 text-[11px] font-mono">
                <button
                  onClick={() => setCitationFormat('gw_staferla')}
                  className={`px-2 py-0.5 border transition-all ${
                    citationFormat === 'gw_staferla'
                      ? 'bg-black text-white border-black font-bold'
                      : 'bg-white text-black/60 border-black/10 hover:border-black'
                  }`}
                >
                  GW / Staferla
                </button>
                <button
                  onClick={() => setCitationFormat('apa')}
                  className={`px-2 py-0.5 border transition-all ${
                    citationFormat === 'apa'
                      ? 'bg-black text-white border-black font-bold'
                      : 'bg-white text-black/60 border-black/10 hover:border-black'
                  }`}
                >
                  APA 7th
                </button>
                <button
                  onClick={() => setCitationFormat('chicago')}
                  className={`px-2 py-0.5 border transition-all ${
                    citationFormat === 'chicago'
                      ? 'bg-black text-white border-black font-bold'
                      : 'bg-white text-black/60 border-black/10 hover:border-black'
                  }`}
                >
                  Chicago
                </button>
                <button
                  onClick={() => setCitationFormat('full')}
                  className={`px-2 py-0.5 border transition-all ${
                    citationFormat === 'full'
                      ? 'bg-black text-white border-black font-bold'
                      : 'bg-white text-black/60 border-black/10 hover:border-black'
                  }`}
                >
                  Ficha Completa
                </button>
              </div>
            </div>

            {/* Citation Text Preview Box */}
            <div className="p-3 bg-white border border-black/10 text-xs font-mono text-black/85 leading-relaxed overflow-x-auto whitespace-pre-line select-all">
              {generateCitation(citationFormat)}
            </div>

            <div className="flex items-center justify-between pt-1 text-[11px]">
              <span className="text-black/50 font-sans">
                Formato listo para copiar en bibliografías, tesis o notas de investigación.
              </span>
              <button
                onClick={() => handleCopyCitation(citationFormat)}
                className="px-3 py-1.5 bg-black text-white font-sans text-xs font-semibold uppercase tracking-wider hover:opacity-80 transition-all flex items-center gap-1.5"
              >
                {citationCopied ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>¡Copiado!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copiar Citación ({citationFormat.toUpperCase()})</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Literal Meaning & Etymology */}
          <div className="p-6 bg-[#FDFBF7] border-l-2 border-black space-y-2">
            <span className="text-[10px] uppercase tracking-[0.2em] font-sans font-bold text-black/50 block">
              Sens Littéral & Étymologie
            </span>
            <p className="text-base font-serif text-black leading-relaxed font-semibold">
              {concept.literalMeaning}
            </p>
            <p className="text-xs font-sans text-black/60 italic leading-relaxed pt-1">
              {concept.etymologicalNuance}
            </p>
          </div>

          {/* Rigorous Metapsychological Explanation */}
          <div className="space-y-2">
            <span className="text-[10px] uppercase tracking-[0.2em] font-sans font-bold text-black/40 block">
              Articulation Métapsychologique
            </span>
            <div className="editorial-prose text-base leading-relaxed whitespace-pre-line">
              {concept.rigorousExplanation}
            </div>
          </div>

          {/* Matheme or Formula if available */}
          {concept.mathemeOrFormula && (
            <div className="p-4 bg-[#F9F6F0] border border-black/10 font-mono text-sm text-black">
              <span className="text-[9px] uppercase tracking-widest text-black/40 block mb-1">
                Formule Formelle / Mathème:
              </span>
              {concept.mathemeOrFormula}
            </div>
          )}

          {/* Original Source Quote Snippet */}
          {concept.originalQuoteSnippet && (
            <div className="p-6 bg-[#FDFBF7] border-l-2 border-black space-y-2">
              <span className="text-[10px] uppercase tracking-[0.2em] font-sans font-bold text-black/40 block">
                Citation en Langue Originale
              </span>
              <blockquote className="font-serif italic text-lg text-black">
                «{concept.originalQuoteSnippet.original}»
              </blockquote>
              <p className="text-xs font-sans text-black/60">
                «{concept.originalQuoteSnippet.spanish}»
              </p>
              <div className="text-[10px] font-mono text-black/40 text-right pt-1">
                — {concept.originalQuoteSnippet.source}
              </div>
            </div>
          )}

          {/* Primary Bibliographical Sources */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase tracking-[0.2em] font-sans font-bold text-black/40 block">
                Sources Bibliographiques Canoniques
              </span>
              <button
                onClick={() => handleCopyCitation('gw_staferla')}
                className="text-[11px] font-mono text-black/60 hover:text-black flex items-center gap-1 underline underline-offset-2"
              >
                <Quote className="w-3 h-3" />
                <span>Copiar formato de fuente</span>
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {concept.keySources.map((source, idx) => (
                <div key={idx} className="p-4 bg-[#F9F6F0] border border-black/5 text-xs font-sans flex flex-col justify-between">
                  <div>
                    <div className="font-bold text-black">{source.title} ({source.year})</div>
                    <div className="italic text-black/60 font-serif">{source.originalTitle}</div>
                    {source.sectionOrVolume && (
                      <div className="text-[10px] font-mono text-black/40 mt-1">{source.sectionOrVolume}</div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* AI Monograph Generation Section */}
          <div className="pt-4 border-t border-black/10">
            {!aiAnalysis && !loadingAi && (
              <button
                onClick={handleFetchAiDeepDive}
                className="w-full py-4 bg-black text-white text-xs uppercase tracking-widest font-sans font-bold hover:opacity-80 transition-opacity flex items-center justify-center gap-2"
              >
                <span>Générer Monographie Complète avec IA</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}

            {loadingAi && (
              <div className="p-6 bg-[#F9F6F0] flex flex-col items-center justify-center gap-2 text-black/70 font-sans text-xs">
                <Loader2 className="w-5 h-5 animate-spin text-black" />
                <span>Génération de l'exégèse universitaire en cours...</span>
              </div>
            )}

            {error && (
              <div className="p-4 bg-red-50 border border-red-200 text-xs font-sans text-red-800">
                {error}
              </div>
            )}

            {aiAnalysis && (
              <div className="space-y-3 p-6 bg-[#FDFBF7] border border-black/10">
                <div className="flex items-center justify-between border-b border-black/10 pb-2">
                  <span className="text-[10px] uppercase tracking-[0.2em] font-sans font-bold text-black/50 block">
                    Exégèse Monographique Complète
                  </span>
                  <button
                    onClick={handleCopy}
                    className="text-xs font-sans text-black/60 hover:text-black flex items-center gap-1"
                  >
                    <Copy className="w-3 h-3" />
                    <span>Copiar Monografía</span>
                  </button>
                </div>
                <div className="editorial-prose text-base">
                  <ReactMarkdown>{aiAnalysis}</ReactMarkdown>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 sm:p-6 border-t border-black/10 bg-[#F9F6F0] flex items-center justify-between">
          <button
            onClick={() => {
              onClose();
              onAskInChat(`Explícame en detalle el concepto de ${concept.termOriginal} (${concept.termSpanish}) en su contexto clínico y cómo se formula en los textos originales.`);
            }}
            className="text-xs font-sans uppercase tracking-widest font-bold text-black hover:opacity-60 flex items-center gap-1.5 transition-opacity"
          >
            <span>Ouvrir dans Dialogue</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={onClose}
            className="px-4 py-2 border border-black text-black text-xs font-sans uppercase tracking-widest font-semibold hover:bg-black hover:text-white transition-colors"
          >
            Fermer
          </button>
        </div>
      </div>
    </div>
  );
};

