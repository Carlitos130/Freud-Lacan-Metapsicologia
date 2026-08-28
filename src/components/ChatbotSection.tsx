import React, { useState, useRef, useEffect } from 'react';
import { 
  Send, 
  RotateCcw, 
  Copy, 
  Check, 
  Loader2, 
  AlertCircle,
  Compass,
  ArrowUpRight,
  BookOpen
} from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { ChatMessage } from '../types';

const KEY_CONCEPTS_INDEX = [
  {
    num: '01',
    termOriginal: 'Le stade du miroir',
    source: 'Lacan, 1949',
    query: 'Explica la formalización de «Le stade du miroir» (el estadio del espejo) en Lacan y cómo funda la alienación primordial del Yo (moi).',
  },
  {
    num: '02',
    termOriginal: 'Das Unbewusste',
    source: 'Freud, 1915',
    query: '¿Cómo conceptualiza Freud «Das Unbewusste» (lo inconsciente) en su ensayo metapsicológico de 1915 frente a la conciencia y la represión?',
  },
  {
    num: '03',
    termOriginal: 'Objet petit a',
    source: 'Séminaire X',
    query: '¿Cómo formaliza Lacan el «objet petit a» en el Seminario X (La Angustia) como causa del deseo y resto irreductible de la operación significante?',
  },
  {
    num: '04',
    termOriginal: 'Trieb vs Instinkt',
    source: 'Freud, 1915',
    query: '¿Cuál es la diferencia metapsicológica fundamental entre Trieb (pulsión) e Instinkt (instinto) y por qué la traducción inglesa generó desviaciones teóricas?',
  },
  {
    num: '05',
    termOriginal: 'Verwerfung',
    source: 'Lacan, 1955-56',
    query: 'Explica la noción de Verwerfung (forclusión) como mecanismo específico de la psicosis en el Seminario 3 y los Escritos.',
  },
  {
    num: '06',
    termOriginal: 'Jouissance',
    source: 'Séminaire XX',
    query: 'Explica la teoría del goce (Jouissance) en Lacan: goce fálico, goce del Otro y el axioma «Il n\'y a pas de rapport sexuel».',
  },
];

interface ChatbotSectionProps {
  initialQuery?: string | null;
  onClearInitialQuery?: () => void;
}

export const ChatbotSection: React.FC<ChatbotSectionProps> = ({ initialQuery, onClearInitialQuery }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content: `Bienvenido al consultor teórico de **Psicoanálisis Freud & Lacan**.

Aquí examinamos la doctrina metapsicológica con **estricta fidelidad terminológica** a las fuentes originales en alemán (*Gesammelte Werke*) y francés (*Écrits et Séminaires*).

Puede formular cualquier consulta teórica, clínica o epistemológica, o seleccionar uno de los conceptos del índice lateral.`,
      timestamp: Date.now(),
    },
  ]);

  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [contextFocus, setContextFocus] = useState<'general' | 'freud' | 'lacan' | 'clinica' | 'topologia'>('general');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [errorBanner, setErrorBanner] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  useEffect(() => {
    if (initialQuery) {
      handleSendMessage(initialQuery);
      if (onClearInitialQuery) onClearInitialQuery();
    }
  }, [initialQuery]);

  const handleSendMessage = async (textToSend?: string) => {
    const text = textToSend || inputMessage.trim();
    if (!text || isLoading) return;

    setErrorBanner(null);
    const uniqueSuffix = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
    const userMsg: ChatMessage = {
      id: `user-${uniqueSuffix}`,
      role: 'user',
      content: text,
      timestamp: Date.now(),
    };

    const assistantMsgId = `assistant-${uniqueSuffix}`;
    const initialAssistantMsg: ChatMessage = {
      id: assistantMsgId,
      role: 'assistant',
      content: '',
      timestamp: Date.now(),
    };

    setMessages((prev) => [...prev, userMsg, initialAssistantMsg]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/psychoanalysis/chat-stream', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          history: messages,
          contextFocus,
        }),
      });

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData.details || errData.error || 'Error al comunicarse con el consultor analítico.');
      }

      if (!response.body) {
        throw new Error('No se recibió flujo de respuesta.');
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder('utf-8');
      let buffer = '';
      let accumulatedText = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        buffer = lines.pop() || '';

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const jsonStr = line.replace('data: ', '').trim();
            if (!jsonStr) continue;

            try {
              const data = JSON.parse(jsonStr);
              if (data.error) {
                throw new Error(data.error);
              }
              if (data.text) {
                accumulatedText += data.text;
                setMessages((prev) =>
                  prev.map((msg) =>
                    msg.id === assistantMsgId ? { ...msg, content: accumulatedText } : msg
                  )
                );
              }
            } catch (parseErr) {
              // Ignore malformed chunks
            }
          }
        }
      }
    } catch (err: any) {
      console.error(err);
      setErrorBanner(err.message || 'Ocurrió un inconveniente al consultar la base.');
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === assistantMsgId
            ? {
                ...msg,
                content:
                  msg.content ||
                  'No fue posible completar la consulta en este momento. Por favor verifica la conexión o intenta con otra interrogación.',
              }
            : msg
        )
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = (id: string, content: string) => {
    try {
      if (navigator && navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(content).catch(() => {});
      }
    } catch (_) {}
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleResetChat = () => {
    setMessages([
      {
        id: 'welcome',
        role: 'assistant',
        content: `La sesión de diálogo ha sido reiniciada. Puede formular una nueva consulta teórica o metodológica.`,
        timestamp: Date.now(),
      },
    ]);
    setErrorBanner(null);
  };

  return (
    <div className="flex-1 flex flex-col bg-[#FDFBF7] text-[#1C1C1C] min-h-[calc(100vh-8.5rem)]">
      {/* Top Filter Bar with Editorial Focus Selectors */}
      <div className="border-b border-black/10 px-4 sm:px-8 py-2.5 bg-[#F9F6F0]/80 flex items-center justify-between gap-4 flex-wrap text-xs">
        <div className="flex items-center gap-2 overflow-x-auto py-0.5">
          <span className="text-[10px] uppercase tracking-[0.2em] font-sans font-bold text-black/40 mr-1 flex items-center gap-1">
            <Compass className="w-3 h-3 text-black" />
            Focus:
          </span>
          {[
            { id: 'general', label: 'Canon Freudo-Lacaniano' },
            { id: 'freud', label: 'Metapsicología Freud (DE)' },
            { id: 'lacan', label: 'Séminaires Lacan (FR)' },
            { id: 'clinica', label: 'Structure Clinique' },
            { id: 'topologia', label: 'Topologie & Mathèmes' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setContextFocus(tab.id as any)}
              className={`px-2.5 py-1 text-[11px] uppercase tracking-wider font-sans transition-all whitespace-nowrap ${
                contextFocus === tab.id
                  ? 'bg-black text-white font-bold'
                  : 'bg-transparent text-black/60 hover:text-black hover:bg-black/5'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <button
          onClick={handleResetChat}
          className="text-black/50 hover:text-black text-[10px] font-sans uppercase tracking-widest flex items-center gap-1.5 transition-colors"
          title="Reiniciar diálogo"
        >
          <RotateCcw className="w-3 h-3" />
          <span>Reset Session</span>
        </button>
      </div>

      {/* Main 3-Column Editorial Grid */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 overflow-hidden">
        {/* Left Column: Key Concepts Index (Desktop) */}
        <aside className="hidden lg:flex lg:col-span-3 border-r border-black/10 p-6 xl:p-8 flex-col justify-between bg-[#F9F6F0]">
          <div>
            <h2 className="text-[10px] uppercase tracking-[0.2em] font-sans font-bold text-black/40 mb-6">
              Index des Concepts
            </h2>
            <ul className="space-y-5">
              {KEY_CONCEPTS_INDEX.map((item) => (
                <li key={item.num} className="group">
                  <button
                    onClick={() => handleSendMessage(item.query)}
                    className="text-left w-full block hover:opacity-100 transition-opacity"
                  >
                    <span className="block text-[10px] font-mono text-black/40 mb-0.5 group-hover:text-black">
                      {item.num}
                    </span>
                    <span className="text-base font-serif block leading-snug font-bold group-hover:underline underline-offset-4 text-black">
                      {item.termOriginal}
                    </span>
                    <span className="italic text-xs font-serif text-black/60">
                      {item.source}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="pt-6 border-t border-black/10">
            <p className="text-xs leading-relaxed font-sans text-black/50">
              Consultas sustentadas en traducciones canónicas de <em>Écrits</em>, <em>Séminaires</em> y <em>Gesammelte Werke</em>.
            </p>
          </div>
        </aside>

        {/* Center Column: Interactive Dialogue Stream */}
        <section className="col-span-1 lg:col-span-6 flex flex-col bg-white border-r border-black/10">
          {/* Error Banner */}
          {errorBanner && (
            <div className="m-4 p-3 bg-red-50 border border-red-200 text-red-800 text-xs font-sans flex items-center gap-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0 text-red-600" />
              <span>{errorBanner}</span>
            </div>
          )}

          {/* Messages Area */}
          <div className="flex-1 p-5 sm:p-8 lg:p-10 overflow-y-auto space-y-8 max-h-[calc(100vh-16rem)]">
            {messages.map((msg) => {
              const isUser = msg.role === 'user';
              return (
                <div key={msg.id} className={`flex gap-3 sm:gap-4 ${isUser ? 'flex-row-reverse text-right' : ''}`}>
                  {/* Avatar Badge */}
                  <div
                    className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-[10px] font-sans font-bold shrink-0 mt-1 ${
                      isUser
                        ? 'bg-[#E5E5E5] text-[#1C1C1C]'
                        : 'bg-black text-white'
                    }`}
                  >
                    {isUser ? 'USR' : 'AI'}
                  </div>

                  {/* Message Body */}
                  <div className="max-w-[86%] sm:max-w-[85%]">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="text-[10px] font-sans uppercase tracking-[0.15em] text-black/40">
                        {isUser ? 'Consultation // Sujet' : 'Theoretical Analysis // Exégèse'}
                      </p>
                      {!isUser && msg.content && (
                        <button
                          onClick={() => handleCopy(msg.id, msg.content)}
                          className="opacity-40 hover:opacity-100 transition-opacity text-black p-0.5 ml-auto"
                          title="Copiar texto"
                        >
                          {copiedId === msg.id ? (
                            <Check className="w-3 h-3 text-emerald-700" />
                          ) : (
                            <Copy className="w-3 h-3" />
                          )}
                        </button>
                      )}
                    </div>

                    <div
                      className={`text-base sm:text-lg leading-relaxed ${
                        isUser
                          ? 'font-serif italic text-black font-normal'
                          : 'font-serif text-[#1C1C1C] space-y-3'
                      }`}
                    >
                      {msg.content ? (
                        <div className="editorial-prose text-base sm:text-lg">
                          <ReactMarkdown>{msg.content}</ReactMarkdown>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2 text-black/50 py-2 font-mono text-xs">
                          <Loader2 className="w-4 h-4 animate-spin text-black" />
                          <span>Consultando corpus original alemán & francés...</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
            <div ref={messagesEndRef} />
          </div>

          {/* Editorial Input Area */}
          <div className="p-4 sm:p-6 border-t border-black/10 bg-[#FDFBF7]">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="relative"
            >
              <input
                ref={inputRef}
                id="chat-input-textarea"
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Ask about a specific text, term, or matheme (ej: Trieb, Objet a, Sinthome)..."
                className="w-full py-3.5 pl-0 pr-16 bg-transparent border-b-2 border-black focus:outline-none font-sans text-sm sm:text-base italic text-black placeholder:text-black/30 placeholder:italic"
              />

              <button
                type="submit"
                disabled={!inputMessage.trim() || isLoading}
                className={`absolute right-0 top-1/2 -translate-y-1/2 uppercase text-[10px] tracking-widest font-bold py-1.5 px-2 transition-all ${
                  inputMessage.trim() && !isLoading
                    ? 'text-black hover:opacity-70 cursor-pointer'
                    : 'text-black/30 cursor-not-allowed'
                }`}
              >
                {isLoading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  'Send →'
                )}
              </button>
            </form>
          </div>
        </section>

        {/* Right Column: Fidélité Terminologique & Rotated Quote Reference (Desktop) */}
        <aside className="hidden lg:flex lg:col-span-3 p-6 xl:p-8 flex-col justify-between bg-[#FDFBF7] overflow-y-auto">
          <div>
            <h2 className="text-[10px] uppercase tracking-[0.2em] font-sans font-bold text-black/40 mb-6">
              Fidélité Terminologique
            </h2>

            <div className="space-y-6">
              <div className="border-b border-black/5 pb-4">
                <div className="flex items-baseline justify-between mb-1">
                  <h3 className="text-xl font-serif italic text-black font-bold">Trieb</h3>
                  <span className="text-[9px] font-sans text-black/50 uppercase tracking-widest">
                    German / Freud
                  </span>
                </div>
                <p className="text-xs leading-relaxed font-sans text-black/70">
                  La pulsión. Aquello irreductible a la necesidad biológica (<em>Instinkt</em>). Su destino es la satisfacción parcial y el montaje significante.
                </p>
              </div>

              <div className="border-b border-black/5 pb-4">
                <div className="flex items-baseline justify-between mb-1">
                  <h3 className="text-xl font-serif italic text-black font-bold">Objet petit a</h3>
                  <span className="text-[9px] font-sans text-black/50 uppercase tracking-widest">
                    French / Lacan
                  </span>
                </div>
                <p className="text-xs leading-relaxed font-sans text-black/70">
                  Causa del deseo y plus-de-gozar (<em>plus-de-jouir</em>). Objeto caído de la división subjetiva ($).
                </p>
              </div>

              <div className="border-b border-black/5 pb-4">
                <div className="flex items-baseline justify-between mb-1">
                  <h3 className="text-xl font-serif italic text-black font-bold">Verwerfung</h3>
                  <span className="text-[9px] font-sans text-black/50 uppercase tracking-widest">
                    Forclusión
                  </span>
                </div>
                <p className="text-xs leading-relaxed font-sans text-black/70">
                  Rechazo radical del Significante del Nombre-del-Padre fuera del orden simbólico, retornando en lo Real como alucinación.
                </p>
              </div>
            </div>

            {/* Rotated Editorial Quote Card */}
            <div className="mt-8 bg-black text-white p-5 -rotate-1 shadow-sm border border-black transition-transform hover:rotate-0">
              <div className="flex items-center justify-between mb-2 opacity-60">
                <span className="text-[9px] uppercase tracking-widest font-sans font-semibold">
                  Ref: Écrits
                </span>
                <span className="text-[9px] font-mono">p. 493</span>
              </div>
              <p className="text-base leading-tight italic font-serif">
                «L'inconscient est structuré comme un langage.»
              </p>
              <p className="text-[9px] mt-4 font-sans uppercase tracking-widest text-right opacity-80">
                J. LACAN, 1957
              </p>
            </div>
          </div>

          <div className="pt-6 border-t border-black/10 mt-6">
            <span className="text-[9px] uppercase tracking-[0.2em] font-sans text-black/40 block">
              Édition Critique Bilingue
            </span>
          </div>
        </aside>
      </div>
    </div>
  );
};
