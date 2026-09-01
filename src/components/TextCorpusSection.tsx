import React, { useState, useEffect } from 'react';
import { 
  BookOpen, 
  Search, 
  Upload, 
  FileText, 
  Sparkles, 
  ArrowRight,
  Database,
  Layers,
  CheckCircle2,
  RefreshCw,
  HardDrive,
  Globe,
  Bookmark,
  BookmarkPlus,
  BookmarkCheck,
  Trash2,
  Copy,
  Check,
  Quote,
  Filter,
  PlusCircle,
  Tag,
  FolderOpen,
  FileCode,
  FileCheck,
  Eye,
  X,
  Loader2,
  AlertCircle
} from 'lucide-react';
import { TEXTS_DATA, STAFERLA_LACAN_CATALOG, FREUD_GW_CATALOG } from '../data/textsData';
import { PrimaryTextItem, CorpusRepositoryItem, CustomUploadedExcerpt, ReadingBookmark, LocalCorpusFile, SeededLibraryText } from '../types';
import { getAllLocalFiles, saveLocalFile, deleteLocalFile, clearAllLocalFiles, StoredLocalFile } from '../utils/dbStorage';
import { extractTextFromFile } from '../utils/fileExtractor';
import { fetchCorpusManifest, fetchCorpusText } from '../utils/corpusLibrary';

interface TextCorpusSectionProps {
  onAskInChat: (query: string) => void;
}

export const TextCorpusSection: React.FC<TextCorpusSectionProps> = ({ onAskInChat }) => {
  // Main Navigation Tab
  const [activeTab, setActiveTab] = useState<'library' | 'local_files' | 'repositories' | 'bookmarks' | 'canonical'>('library');

  // Repository Library State (static texts bundled with the app, shared across all users/devices)
  const [libraryTexts, setLibraryTexts] = useState<SeededLibraryText[]>([]);
  const [isLoadingLibrary, setIsLoadingLibrary] = useState(false);
  const [libraryError, setLibraryError] = useState<string | null>(null);
  const [loadingLibraryId, setLoadingLibraryId] = useState<string | null>(null);
  const [libraryAuthorFilter, setLibraryAuthorFilter] = useState<'all' | 'Sigmund Freud' | 'Jacques Lacan'>('all');
  const [librarySearch, setLibrarySearch] = useState('');

  const loadLibraryManifest = () => {
    setIsLoadingLibrary(true);
    setLibraryError(null);
    fetchCorpusManifest()
      .then((entries) => setLibraryTexts(entries))
      .catch(() => setLibraryError('No se pudo cargar el manifest de la biblioteca del repositorio.'))
      .finally(() => setIsLoadingLibrary(false));
  };

  useEffect(() => {
    loadLibraryManifest();
  }, []);
  
  // Local PC Files State (Stored in IndexedDB for unlimited capacity)
  const [localFiles, setLocalFiles] = useState<LocalCorpusFile[]>([]);
  const [activeLocalFileId, setActiveLocalFileId] = useState<string | null>(null);
  const [isExtracting, setIsExtracting] = useState(false);
  const [extractStatus, setExtractStatus] = useState<string | null>(null);

  // Load from IndexedDB on initial mount
  useEffect(() => {
    // Clear the problematic localStorage key if present
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        localStorage.removeItem('th_user_pc_files');
      }
    } catch (_) {}

    getAllLocalFiles()
      .then((stored) => {
        if (stored && stored.length > 0) {
          const mapped: LocalCorpusFile[] = stored.map((s) => ({
            id: s.id,
            name: s.name,
            size: s.size,
            author: s.authorTag === 'Freud' ? 'Sigmund Freud' : s.authorTag === 'Lacan' ? 'Jacques Lacan' : 'Otro / Mixto',
            sourceReference: `Archivo local: ${s.name}`,
            textSnippet: s.content.slice(0, 300),
            fullText: s.content,
            uploadedAt: s.uploadedAt,
          }));
          setLocalFiles(mapped);
        }
      })
      .catch((err) => console.warn('IndexedDB initial load error:', err));
  }, []);

  // Ingest / Editor State
  const [customTitle, setCustomTitle] = useState('');
  const [customAuthor, setCustomAuthor] = useState<'Jacques Lacan' | 'Sigmund Freud' | 'Otro / Mixto'>('Jacques Lacan');
  const [customSourceRef, setCustomSourceRef] = useState('');
  const [rawText, setRawText] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<string | null>(null);
  const [fileUploadError, setFileUploadError] = useState<string | null>(null);
  const [isDraggingOver, setIsDraggingOver] = useState(false);

  // Canonical Tab State
  const [selectedAuthor, setSelectedAuthor] = useState<'all' | 'Sigmund Freud' | 'Jacques Lacan'>('all');
  const [activeTextId, setActiveTextId] = useState<string>(TEXTS_DATA[0].id);

  // Repositories Tab State
  const [repoAuthor, setRepoAuthor] = useState<'all' | 'lacan_staferla' | 'freud_gw'>('all');
  const [repoSearch, setRepoSearch] = useState('');

  // Bookmarks State (Reading bookmarks)
  const [bookmarks, setBookmarks] = useState<ReadingBookmark[]>(() => {
    try {
      const saved = localStorage.getItem('th_reading_bookmarks');
      if (saved) return JSON.parse(saved);
    } catch {}
    return [
      {
        id: 'bm-sample-1',
        title: 'Le Sinthome et James Joyce',
        author: 'Jacques Lacan',
        sourceReference: 'Staferla: Séminaire XXIII (Séance du 18 nov 1975)',
        excerptText: "Joyce le Symptôme, c'est comme ça qu'il faut l'écrire, ou encore le Sinthome, avec l'orthographe ancienne... où l'écriture vient suppléer au défaut du Nom-du-Père.",
        spanishTranslation: "Joyce el Síntoma, así es como hay que escribirlo, o el Sinthome, con la ortografía antigua... donde la escritura viene a suplementar la falla del Nombre-del-Padre.",
        note: 'Punto de inflexión del último Lacan: el nudo borromeo y la suplencia del Nombre-del-Padre.',
        tags: ['Sinthome', 'Joyce', 'Borromeo'],
        createdAt: Date.now() - 1000 * 60 * 60 * 24 * 2
      },
      {
        id: 'bm-sample-2',
        title: 'Wiederholungszwang & Fort-Da',
        author: 'Sigmund Freud',
        sourceReference: 'Gesammelte Werke XIII, S. 11-18 (Jenseits des Lustprinzips)',
        excerptText: "Es gibt im Seelenleben wirklich einen Wiederholungszwang, der sich über das Lustprinzip hinaussetzt. Das Kind vollzieht das Fort-Da Spiel...",
        spanishTranslation: "Existe verdaderamente en la vida anímica una compulsión de repetición que se sobrepone al principio de placer...",
        note: 'Compulsión de repetición y pulsión de muerte (Todestrieb). Articulación con el más allá del principio del placer.',
        tags: ['Trieb', 'Wiederholung', 'Fort-Da'],
        createdAt: Date.now() - 1000 * 60 * 60 * 12
      }
    ];
  });
  const [bookmarkAuthorFilter, setBookmarkAuthorFilter] = useState<'all' | 'Sigmund Freud' | 'Jacques Lacan'>('all');
  const [bookmarkSearch, setBookmarkSearch] = useState('');
  const [copiedBookmarkId, setCopiedBookmarkId] = useState<string | null>(null);
  const [bookmarkFeedbackNotice, setBookmarkFeedbackNotice] = useState<string | null>(null);

  // Manual Bookmark Form
  const [isAddingCustomBookmark, setIsAddingCustomBookmark] = useState(false);
  const [newBmTitle, setNewBmTitle] = useState('');
  const [newBmAuthor, setNewBmAuthor] = useState<'Sigmund Freud' | 'Jacques Lacan'>('Jacques Lacan');
  const [newBmSource, setNewBmSource] = useState('');
  const [newBmExcerpt, setNewBmExcerpt] = useState('');
  const [newBmTranslation, setNewBmTranslation] = useState('');
  const [newBmNote, setNewBmNote] = useState('');
  const [newBmTags, setNewBmTags] = useState('');

  // Persist bookmarks to localStorage safely
  useEffect(() => {
    try {
      localStorage.setItem('th_reading_bookmarks', JSON.stringify(bookmarks));
    } catch (_) {}
  }, [bookmarks]);

  const showNotification = (msg: string) => {
    setBookmarkFeedbackNotice(msg);
    setTimeout(() => setBookmarkFeedbackNotice(null), 3500);
  };

  // Add a bookmark from any text or quote
  const handleAddBookmark = (item: {
    title: string;
    author: 'Sigmund Freud' | 'Jacques Lacan' | string;
    sourceReference: string;
    excerptText: string;
    spanishTranslation?: string;
    note?: string;
    tags?: string[];
  }) => {
    const newBm: ReadingBookmark = {
      id: 'bm-' + Date.now(),
      title: item.title,
      author: item.author,
      sourceReference: item.sourceReference,
      excerptText: item.excerptText,
      spanishTranslation: item.spanishTranslation,
      note: item.note || '',
      tags: item.tags || [],
      createdAt: Date.now()
    };

    setBookmarks((prev) => [newBm, ...prev]);
    showNotification(`Marcador guardado: «${item.title.slice(0, 35)}...»`);
  };

  const handleDeleteBookmark = (id: string) => {
    setBookmarks((prev) => prev.filter((b) => b.id !== id));
    showNotification('Marcador eliminado');
  };

  const handleCopyBookmark = (bm: ReadingBookmark) => {
    const text = `«${bm.excerptText}»\n${bm.spanishTranslation ? `«${bm.spanishTranslation}»\n` : ''}— ${bm.author}: ${bm.title} [${bm.sourceReference}]${bm.note ? `\nNota clínica: ${bm.note}` : ''}`;
    try {
      if (navigator && navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).catch(() => {});
      }
    } catch (_) {}
    setCopiedBookmarkId(bm.id);
    setTimeout(() => setCopiedBookmarkId(null), 2000);
  };

  const handleSaveManualBookmark = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBmExcerpt.trim()) return;

    const parsedTags = newBmTags
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    handleAddBookmark({
      title: newBmTitle.trim() || `Pasaje de ${newBmAuthor}`,
      author: newBmAuthor,
      sourceReference: newBmSource.trim() || (newBmAuthor === 'Sigmund Freud' ? 'Gesammelte Werke' : 'Staferla / Séminaires'),
      excerptText: newBmExcerpt.trim(),
      spanishTranslation: newBmTranslation.trim() || undefined,
      note: newBmNote.trim() || undefined,
      tags: parsedTags
    });

    setNewBmTitle('');
    setNewBmSource('');
    setNewBmExcerpt('');
    setNewBmTranslation('');
    setNewBmNote('');
    setNewBmTags('');
    setIsAddingCustomBookmark(false);
  };

  // Process and store uploaded file into IndexedDB (supports unlimited MBs, PDF, DOCX, TXT)
  const processAndSaveFile = async (file: File) => {
    const cleanName = file.name.replace(/\.[^/.]+$/, '');
    const lowerName = file.name.toLowerCase();
    let detectedAuthor: 'Sigmund Freud' | 'Jacques Lacan' | 'Otro / Mixto' = 'Jacques Lacan';

    if (lowerName.includes('freud') || lowerName.includes('gw') || lowerName.includes('gesammelte')) {
      detectedAuthor = 'Sigmund Freud';
    } else if (lowerName.includes('lacan') || lowerName.includes('staferla') || lowerName.includes('semin') || lowerName.includes('ecrits')) {
      detectedAuthor = 'Jacques Lacan';
    }

    try {
      setIsExtracting(true);
      setExtractStatus(`Extrayendo contenido de ${file.name}...`);

      const { text, wordCount } = await extractTextFromFile(file, (percent, status) => {
        setExtractStatus(`${status} (${percent}%)`);
      });

      const newId = 'file-' + Date.now() + '-' + Math.random().toString(36).substring(2, 7);

      const stored: StoredLocalFile = {
        id: newId,
        name: file.name,
        size: file.size,
        type: file.type || 'text/plain',
        uploadedAt: Date.now(),
        content: text,
        authorTag: detectedAuthor === 'Sigmund Freud' ? 'Freud' : detectedAuthor === 'Jacques Lacan' ? 'Lacan' : 'Otro',
        wordCount
      };

      await saveLocalFile(stored);

      const newLocalFile: LocalCorpusFile = {
        id: newId,
        name: file.name,
        size: file.size,
        author: detectedAuthor,
        sourceReference: `Archivo local: ${file.name}`,
        textSnippet: text.slice(0, 300),
        fullText: text,
        uploadedAt: Date.now()
      };

      setLocalFiles((prev) => [newLocalFile, ...prev.filter((f) => f.id !== newId)]);
      setActiveLocalFileId(newLocalFile.id);
      setCustomTitle(cleanName);
      setCustomAuthor(detectedAuthor);
      setCustomSourceRef(`Archivo local: ${file.name}`);
      setRawText(text);
      showNotification(`¡${file.name} cargado con éxito en la biblioteca!`);
    } catch (err: any) {
      console.error('Error procesando archivo:', err);
      setFileUploadError(err?.message || `No se pudo procesar el archivo ${file.name}.`);
    } finally {
      setIsExtracting(false);
      setExtractStatus(null);
    }
  };

  // Handle local file upload (drag and drop or file input)
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setFileUploadError(null);
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const fileList = Array.from(files);
    for (const file of fileList) {
      await processAndSaveFile(file);
    }

    if (e.target) {
      e.target.value = '';
    }
  };

  const handleDrop = async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDraggingOver(false);
    setFileUploadError(null);
    const files = e.dataTransfer.files;
    if (!files || files.length === 0) return;

    const fileList = Array.from(files);
    for (const file of fileList) {
      await processAndSaveFile(file);
    }
  };

  const handleSelectLoadedFile = (fileItem: LocalCorpusFile) => {
    setActiveLocalFileId(fileItem.id);
    setCustomTitle(fileItem.name.replace(/\.[^/.]+$/, ''));
    setCustomAuthor(fileItem.author);
    setCustomSourceRef(fileItem.sourceReference);
    setRawText(fileItem.fullText);
    setAnalysisResult(null);
  };

  const handleDeleteLoadedFile = async (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      await deleteLocalFile(id);
      setLocalFiles((prev) => prev.filter((f) => f.id !== id));
      if (activeLocalFileId === id) {
        setActiveLocalFileId(null);
        setRawText('');
        setCustomTitle('');
      }
      showNotification('Archivo eliminado de la biblioteca');
    } catch (err) {
      console.error('Error eliminando archivo:', err);
      // Ensure UI updates even if DB had an issue
      setLocalFiles((prev) => prev.filter((f) => f.id !== id));
    }
  };

  const handleClearAllFiles = async () => {
    try {
      await clearAllLocalFiles();
      setLocalFiles([]);
      setActiveLocalFileId(null);
      setRawText('');
      setCustomTitle('');
      showNotification('Se han eliminado todos los archivos de la biblioteca.');
    } catch (err) {
      console.error('Error al vaciar biblioteca:', err);
      setLocalFiles([]);
    }
  };

  const handleAnalyzeCustomText = async () => {
    if (!rawText.trim()) return;
    setIsAnalyzing(true);
    setAnalysisResult(null);

    // Limit payload text to 30,000 characters to keep processing fast and responsive
    const textToSend = rawText.length > 30000 ? rawText.slice(0, 30000) : rawText;

    try {
      const res = await fetch('/api/psychoanalysis/analyze-corpus-text', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          rawText: textToSend,
          sourceTitle: customTitle || 'Fragmento seleccionado',
          author: customAuthor,
          sourceReference: customSourceRef || 'Archivo cargado desde PC'
        })
      });

      const data = await res.json();
      if (data.success && data.analysis) {
        setAnalysisResult(data.analysis);
      } else {
        setAnalysisResult('Error al procesar el análisis textual: ' + (data.details || 'Intente nuevamente.'));
      }
    } catch (err: any) {
      setAnalysisResult('Error de conexión con el motor de exégesis: ' + err.message);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleLoadSample = (type: 'staferla' | 'freud_gw') => {
    if (type === 'staferla') {
      setCustomTitle('Séminaire XXIII: Le Sinthome (Séance du 18 novembre 1975)');
      setCustomAuthor('Jacques Lacan');
      setCustomSourceRef('Staferla Transcription critique / Patrick Valas');
      setRawText(`«Je commence donc ce Séminaire où je vous annonce d'ores et déjà que je vous parlerai de Joyce. Joyce le Symptôme, c'est comme ça qu'il faut l'écrire, ou encore le Sinthome, avec l'orthographe ancienne.
Pourquoi Joyce? Parce que Joyce témoigne d'un rapport tout à fait singulier à lalangue, où l'écriture vient suppléer au défaut du Nom-du-Père. Chez Joyce, le dénouage du nœud borroméen entre le Réel, le Symbolique et l'Imaginaire est compensé par un quatrième terme: le Sinthome comme savoir-y-faire avec l'incurable.»`);
    } else {
      setCustomTitle('Jenseits des Lustprinzips (Kapitel II & III)');
      setCustomAuthor('Sigmund Freud');
      setCustomSourceRef('Gesammelte Werke XIII, S. 11-18 (S. Fischer Verlag)');
      setRawText(`«Es gibt im Seelenleben wirklich einen Wiederholungszwang, der sich über das Lustprinzip hinaussetzt. Wir haben gesehen, wie das Kind das Fort-Da Spiel vollzieht, um den Übergang von der Passivität des Erlebens zur Aktivität des Beherrschens zu erzwingen.
Wenn wir annehmen, dass alles Lebende aus inneren Gründen stirbt, ins Anorganische zurückkehrt, so können wir nur sagen: Das Ziel alles Lebens ist der Tod, und zurückgreifend: Das Leblose war eher da als das Lebende.»`);
    }
  };

  // Attach a catalog item to local PC upload
  const handleAttachCatalogItemFromPC = (item: CorpusRepositoryItem) => {
    setActiveTab('local_files');
    setCustomTitle(`${item.volumeOrNumber}: ${item.title}`);
    setCustomAuthor(item.author);
    setCustomSourceRef(`${item.volumeOrNumber} (${item.originalTitle}, ${item.year})`);
    setRawText(`// Archivo asignado a: ${item.volumeOrNumber} (${item.originalTitle}, ${item.year})\n// Pega el texto o sube el archivo de tu PC para iniciar la exégesis doctrinal.`);
    showNotification(`Preparado para cargar archivo de: ${item.title}`);
  };

  // Load a text bundled in public/corpus/ into the workstation editor (fetched on demand)
  const handleOpenLibraryText = async (entry: SeededLibraryText) => {
    setLoadingLibraryId(entry.id);
    setLibraryError(null);
    try {
      const text = await fetchCorpusText(entry);
      setActiveTab('local_files');
      setActiveLocalFileId(null);
      setCustomTitle(entry.title);
      setCustomAuthor(entry.author);
      setCustomSourceRef(entry.sourceReference);
      setRawText(text);
      setAnalysisResult(null);
      showNotification(`«${entry.title}» cargado desde la biblioteca del repositorio.`);
    } catch (err: any) {
      setLibraryError(err?.message || `No se pudo abrir "${entry.title}".`);
    } finally {
      setLoadingLibraryId(null);
    }
  };

  const filteredLibraryTexts = libraryTexts.filter((entry) => {
    if (libraryAuthorFilter !== 'all' && entry.author !== libraryAuthorFilter) return false;
    if (librarySearch.trim()) {
      const q = librarySearch.toLowerCase();
      return (
        entry.title.toLowerCase().includes(q) ||
        entry.sourceReference.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const filteredCanonicalTexts = TEXTS_DATA.filter((item) =>
    selectedAuthor === 'all' ? true : item.author === selectedAuthor
  );
  const activeCanonicalText = TEXTS_DATA.find((t) => t.id === activeTextId) || TEXTS_DATA[0];

  const allRepoItems: CorpusRepositoryItem[] = [...STAFERLA_LACAN_CATALOG, ...FREUD_GW_CATALOG];
  const filteredRepoItems = allRepoItems.filter((item) => {
    if (repoAuthor === 'lacan_staferla' && item.author !== 'Jacques Lacan') return false;
    if (repoAuthor === 'freud_gw' && item.author !== 'Sigmund Freud') return false;
    if (repoSearch.trim()) {
      const q = repoSearch.toLowerCase();
      return (
        item.title.toLowerCase().includes(q) ||
        item.originalTitle.toLowerCase().includes(q) ||
        item.volumeOrNumber.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        item.keyThemes.some((t) => t.toLowerCase().includes(q))
      );
    }
    return true;
  });

  const filteredBookmarks = bookmarks.filter((bm) => {
    if (bookmarkAuthorFilter !== 'all' && bm.author !== bookmarkAuthorFilter) return false;
    if (bookmarkSearch.trim()) {
      const q = bookmarkSearch.toLowerCase();
      return (
        bm.title.toLowerCase().includes(q) ||
        bm.excerptText.toLowerCase().includes(q) ||
        bm.sourceReference.toLowerCase().includes(q) ||
        (bm.note && bm.note.toLowerCase().includes(q)) ||
        (bm.tags && bm.tags.some((t) => t.toLowerCase().includes(q)))
      );
    }
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-10 space-y-10">
      {/* Toast Feedback */}
      {bookmarkFeedbackNotice && (
        <div className="fixed bottom-6 right-6 z-50 bg-black text-white px-5 py-3 rounded text-xs font-mono shadow-2xl flex items-center gap-2 border border-white/20 animate-fadeIn">
          <BookmarkCheck className="w-4 h-4 text-emerald-400" />
          <span>{bookmarkFeedbackNotice}</span>
        </div>
      )}

      {/* Editorial Masthead */}
      <div className="border-b border-black/10 pb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="max-w-3xl space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-[10px] uppercase tracking-[0.2em] font-sans font-bold text-black/40">
              Corpus Primario • Carga Local Directa
            </span>
            <span className="inline-block w-1 h-1 rounded-full bg-black/40"></span>
            <span className="text-[10px] uppercase tracking-[0.15em] font-mono text-black/40">
              Freud GW (Alemán) & Lacan Staferla
            </span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tighter text-[#1C1C1C] font-serif uppercase">
            BIBLIOTHÈQUE & CORPUS
          </h2>
          <p className="text-sm sm:text-base font-serif italic text-black/70 leading-relaxed">
            Carga directamente tus archivos de las <strong>Gesammelte Werke (GW)</strong> y transcripciones de <strong>Staferla</strong> desde tu PC para exégesis textual, marcadores de lectura y análisis doctrinal comparativo.
          </p>
        </div>

        {/* Navigation Mode Tabs */}
        <div className="flex flex-wrap items-center gap-1.5 bg-neutral-100 p-1 border border-black/10 rounded-sm">
          <button
            onClick={() => setActiveTab('library')}
            className={`px-3 py-2 text-xs font-sans uppercase tracking-wider font-semibold transition-all flex items-center gap-1.5 ${
              activeTab === 'library'
                ? 'bg-black text-white shadow-sm'
                : 'text-black/60 hover:text-black'
            }`}
          >
            <Database className="w-3.5 h-3.5" />
            <span>Biblioteca del Repositorio ({libraryTexts.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('local_files')}
            className={`px-3 py-2 text-xs font-sans uppercase tracking-wider font-semibold transition-all flex items-center gap-1.5 ${
              activeTab === 'local_files'
                ? 'bg-black text-white shadow-sm'
                : 'text-black/60 hover:text-black'
            }`}
          >
            <HardDrive className="w-3.5 h-3.5" />
            <span>Cargar Archivos de PC ({localFiles.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('repositories')}
            className={`px-3 py-2 text-xs font-sans uppercase tracking-wider font-semibold transition-all flex items-center gap-1.5 ${
              activeTab === 'repositories'
                ? 'bg-black text-white shadow-sm'
                : 'text-black/60 hover:text-black'
            }`}
          >
            <Globe className="w-3.5 h-3.5" />
            <span>Catálogo Staferla & GW</span>
          </button>

          <button
            onClick={() => setActiveTab('bookmarks')}
            className={`px-3 py-2 text-xs font-sans uppercase tracking-wider font-semibold transition-all flex items-center gap-1.5 ${
              activeTab === 'bookmarks'
                ? 'bg-black text-white shadow-sm'
                : 'text-black/60 hover:text-black'
            }`}
          >
            <Bookmark className="w-3.5 h-3.5" />
            <span>Marcadores ({bookmarks.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('canonical')}
            className={`px-3 py-2 text-xs font-sans uppercase tracking-wider font-semibold transition-all flex items-center gap-1.5 ${
              activeTab === 'canonical'
                ? 'bg-black text-white shadow-sm'
                : 'text-black/60 hover:text-black'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Textos Canónicos</span>
          </button>
        </div>
      </div>

      {/* ================= TAB 0: REPOSITORY LIBRARY (STATIC CORPUS SHARED IN THE CLOUD) ================= */}
      {activeTab === 'library' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="bg-[#FAF8F5] border border-black/10 p-6 sm:p-8 space-y-4">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              <div className="space-y-1 max-w-3xl">
                <h3 className="font-serif text-2xl font-bold text-black">
                  Biblioteca del Repositorio (Corpus de Dominio Público)
                </h3>
                <p className="text-xs sm:text-sm font-sans text-black/75 leading-relaxed">
                  Textos empaquetados junto con la aplicación en <code className="font-mono bg-neutral-100 px-1">public/corpus/</code>: quedan disponibles para cualquier navegador o dispositivo sin volver a subirlos. A diferencia de tus archivos de PC (guardados solo en este navegador), esta biblioteca viaja con el propio código del proyecto y se sirve igual en cada deploy o remix.
                </p>
              </div>

              <button
                onClick={loadLibraryManifest}
                disabled={isLoadingLibrary}
                className="px-4 py-2.5 bg-black text-white text-xs font-sans font-bold uppercase tracking-wider hover:opacity-80 transition-all flex items-center gap-2 self-start lg:self-auto disabled:opacity-50"
              >
                {isLoadingLibrary ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <RefreshCw className="w-3.5 h-3.5" />}
                <span>Actualizar Biblioteca</span>
              </button>
            </div>

            {/* Author Filter & Search */}
            <div className="pt-4 border-t border-black/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-xs font-sans">
                <button
                  onClick={() => setLibraryAuthorFilter('all')}
                  className={`px-3 py-1.5 border transition-all ${
                    libraryAuthorFilter === 'all'
                      ? 'bg-black text-white border-black font-bold'
                      : 'bg-white text-black/70 border-black/15 hover:border-black'
                  }`}
                >
                  Todos ({libraryTexts.length})
                </button>
                <button
                  onClick={() => setLibraryAuthorFilter('Jacques Lacan')}
                  className={`px-3 py-1.5 border transition-all ${
                    libraryAuthorFilter === 'Jacques Lacan'
                      ? 'bg-black text-white border-black font-bold'
                      : 'bg-white text-black/70 border-black/15 hover:border-black'
                  }`}
                >
                  Lacan Staferla ({libraryTexts.filter((t) => t.author === 'Jacques Lacan').length})
                </button>
                <button
                  onClick={() => setLibraryAuthorFilter('Sigmund Freud')}
                  className={`px-3 py-1.5 border transition-all ${
                    libraryAuthorFilter === 'Sigmund Freud'
                      ? 'bg-black text-white border-black font-bold'
                      : 'bg-white text-black/70 border-black/15 hover:border-black'
                  }`}
                >
                  Freud GW ({libraryTexts.filter((t) => t.author === 'Sigmund Freud').length})
                </button>
              </div>

              <div className="relative sm:w-80">
                <Search className="w-4 h-4 text-black/40 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Filtrar biblioteca del repositorio..."
                  value={librarySearch}
                  onChange={(e) => setLibrarySearch(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 bg-white border border-black/15 text-xs font-sans text-black focus:outline-none focus:border-black"
                />
              </div>
            </div>
          </div>

          {libraryError && (
            <div className="p-4 bg-red-50 border border-red-200 text-xs text-red-700 font-sans flex items-center gap-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{libraryError}</span>
            </div>
          )}

          {filteredLibraryTexts.length === 0 ? (
            <div className="p-12 text-center bg-white border border-black/10 space-y-3">
              <Database className="w-8 h-8 text-black/30 mx-auto" />
              <h4 className="font-serif font-bold text-lg text-black">
                {libraryTexts.length === 0
                  ? 'Todavía no hay textos empaquetados en el repositorio'
                  : 'No hay resultados para ese filtro'}
              </h4>
              <p className="text-xs font-sans text-black/60 max-w-md mx-auto">
                {libraryTexts.length === 0 ? (
                  <>
                    Agregá archivos <code className="font-mono">.txt</code> en{' '}
                    <code className="font-mono">public/corpus/</code> y registralos en{' '}
                    <code className="font-mono">public/corpus/manifest.json</code> (ver el{' '}
                    <code className="font-mono">README.md</code> de esa carpeta) para que aparezcan
                    acá automáticamente en cada deploy.
                  </>
                ) : (
                  'Probá con otro autor o término de búsqueda.'
                )}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredLibraryTexts.map((entry) => (
                <div
                  key={entry.id}
                  className="bg-white border border-black/10 p-6 flex flex-col justify-between space-y-4 hover:border-black transition-all shadow-sm"
                >
                  <div className="space-y-2">
                    <span className="text-[10px] font-mono px-2 py-0.5 bg-neutral-100 text-black font-bold border border-black/10 inline-block">
                      {entry.author === 'Sigmund Freud' ? 'FREUD // GW' : entry.author === 'Jacques Lacan' ? 'LACAN // STAFERLA' : 'MIXTO'}
                    </span>
                    <h4 className="font-serif font-bold text-base text-black">{entry.title}</h4>
                    <p className="text-xs font-mono text-black/50">{entry.sourceReference}</p>
                  </div>

                  <button
                    onClick={() => handleOpenLibraryText(entry)}
                    disabled={loadingLibraryId === entry.id}
                    className="text-xs font-sans font-bold uppercase tracking-wider text-black hover:opacity-70 flex items-center gap-1.5 self-start disabled:opacity-40"
                  >
                    {loadingLibraryId === entry.id ? (
                      <>
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        <span>Cargando...</span>
                      </>
                    ) : (
                      <>
                        <Eye className="w-3.5 h-3.5" />
                        <span>Abrir en Área de Trabajo</span>
                      </>
                    )}
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ================= TAB 1: LOCAL PC FILES & EXEGESIS ================= */}
      {activeTab === 'local_files' && (
        <div className="space-y-8 animate-fadeIn">
          {/* Drag & Drop & Direct File Ingest Header */}
          <div
            onDragOver={(e) => {
              e.preventDefault();
              setIsDraggingOver(true);
            }}
            onDragLeave={() => setIsDraggingOver(false)}
            onDrop={handleDrop}
            className={`p-8 sm:p-10 border-2 border-dashed transition-all flex flex-col items-center justify-center text-center space-y-4 ${
              isDraggingOver
                ? 'border-black bg-[#FAF5EC] scale-[1.01]'
                : 'border-black/25 bg-[#FAF8F5] hover:border-black/50'
            }`}
          >
            <div className="p-3.5 bg-black text-white rounded-full">
              <Upload className="w-6 h-6" />
            </div>

            <div className="max-w-xl space-y-1">
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-black">
                Carga tus Archivos de Freud y Lacan desde tu PC
              </h3>
              <p className="text-xs sm:text-sm font-sans text-black/70 leading-relaxed">
                Arrastra y suelta aquí tus archivos (<strong>PDF, DOCX, TXT, Markdown, transcripciones Staferla o tomos GW</strong>) o selecciona desde tu equipo para guardarlos en tu navegador y diseccionarlos con almacenamiento ampliado.
              </p>
            </div>

            {/* Extraction Loader */}
            {isExtracting && (
              <div className="p-3 bg-neutral-100 border border-black/20 text-xs font-mono flex items-center gap-2 animate-pulse">
                <Loader2 className="w-4 h-4 animate-spin text-black" />
                <span>{extractStatus || 'Extrayendo texto del documento...'}</span>
              </div>
            )}

            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <label className={`cursor-pointer px-6 py-3 bg-black text-white text-xs font-sans font-bold uppercase tracking-wider hover:opacity-85 transition-all inline-flex items-center gap-2 shadow-md ${isExtracting ? 'opacity-50 pointer-events-none' : ''}`}>
                {isExtracting ? <Loader2 className="w-4 h-4 animate-spin" /> : <FolderOpen className="w-4 h-4" />}
                <span>{isExtracting ? 'Procesando...' : 'Seleccionar Archivos (PDF / DOCX / TXT)'}</span>
                <input
                  type="file"
                  multiple
                  disabled={isExtracting}
                  accept=".pdf,.docx,.txt,.md,.text,.rtf,.html,.doc,.json,.csv"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>

              <button
                type="button"
                onClick={() => handleLoadSample('staferla')}
                className="px-4 py-3 bg-white border border-black/20 text-xs font-sans font-semibold text-black hover:border-black transition-colors"
              >
                Cargar Muestra: Lacan (Staferla XXIII)
              </button>

              <button
                type="button"
                onClick={() => handleLoadSample('freud_gw')}
                className="px-4 py-3 bg-white border border-black/20 text-xs font-sans font-semibold text-black hover:border-black transition-colors"
              >
                Cargar Muestra: Freud (GW XIII)
              </button>
            </div>

            {fileUploadError && (
              <div className="p-3 bg-red-50 border border-red-200 text-xs text-red-700 font-sans mt-2">
                {fileUploadError}
              </div>
            )}
          </div>

          {/* Loaded Files List & Text Editor Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: List of Files Loaded from PC */}
            <div className="lg:col-span-4 bg-white border border-black/10 p-5 space-y-4 shadow-sm">
              <div className="flex items-center justify-between border-b border-black/10 pb-3">
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-black" />
                  <h4 className="font-serif font-bold text-sm text-black">
                    Mis Archivos Cargados ({localFiles.length})
                  </h4>
                </div>
                {localFiles.length > 0 && (
                  <button
                    type="button"
                    onClick={handleClearAllFiles}
                    className="text-[11px] font-mono font-semibold text-red-600 hover:text-red-800 bg-red-50 hover:bg-red-100 px-2.5 py-1 border border-red-200 transition-colors inline-flex items-center gap-1"
                    title="Vaciar todos los archivos cargados"
                  >
                    <Trash2 className="w-3 h-3" />
                    <span>Vaciar Todo ({localFiles.length})</span>
                  </button>
                )}
              </div>

              {localFiles.length === 0 ? (
                <div className="p-6 text-center bg-[#FAF8F5] border border-black/5 text-xs font-sans text-black/50 space-y-2">
                  <p>No tienes archivos cargados actualmente.</p>
                  <p className="text-[11px] italic">
                    Usa el botón superior para seleccionar archivos de tu computadora.
                  </p>
                </div>
              ) : (
                <div className="space-y-2 max-h-[500px] overflow-y-auto pr-1">
                  {localFiles.map((fileItem) => {
                    const isSelected = activeLocalFileId === fileItem.id;
                    return (
                      <div
                        key={fileItem.id}
                        onClick={() => handleSelectLoadedFile(fileItem)}
                        className={`p-3 border text-xs cursor-pointer transition-all flex flex-col justify-between gap-2 ${
                          isSelected
                            ? 'bg-black text-white border-black shadow-sm'
                            : 'bg-white text-black border-black/10 hover:border-black'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div className="space-y-0.5 overflow-hidden">
                            <span className={`text-[9px] font-mono block uppercase ${isSelected ? 'text-white/60' : 'text-black/40'}`}>
                              {fileItem.author} • {(fileItem.size / 1024).toFixed(1)} KB
                            </span>
                            <h5 className="font-serif font-bold text-sm truncate">
                              {fileItem.name}
                            </h5>
                          </div>

                          <button
                            type="button"
                            onClick={(e) => handleDeleteLoadedFile(fileItem.id, e)}
                            className={`p-1.5 rounded transition-colors ${
                              isSelected
                                ? 'text-red-300 hover:text-red-100 hover:bg-white/10'
                                : 'text-red-500 hover:text-red-700 hover:bg-red-50'
                            }`}
                            title="Eliminar archivo corrupto o innecesario"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>

                        <p className={`text-[11px] line-clamp-2 font-serif italic ${isSelected ? 'text-white/80' : 'text-black/60'}`}>
                          «{fileItem.textSnippet}...»
                        </p>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Right Column: Text Workstation & Exegesis Form */}
            <div className="lg:col-span-8 bg-white border border-black/10 p-6 sm:p-8 space-y-6 shadow-sm">
              <div className="border-b border-black/10 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <h4 className="font-serif text-xl sm:text-2xl font-bold text-black">
                    Área de Trabajo & Exégesis de Pasajes
                  </h4>
                  <p className="text-xs font-sans text-black/60">
                    Ajusta los metadatos del pasaje cargado o escribe directamente para iniciar el análisis textual.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setRawText('');
                      setCustomTitle('');
                      setActiveLocalFileId(null);
                      setAnalysisResult(null);
                    }}
                    className="px-3 py-1.5 border border-black/15 text-xs font-mono text-black/60 hover:text-black"
                  >
                    Limpiar Área
                  </button>
                </div>
              </div>

              {/* Metadata Inputs */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-[10px] uppercase font-mono font-bold text-black/60 mb-1">
                    Título / Seminario / Obra
                  </label>
                  <input
                    type="text"
                    placeholder="Ej: Séminaire XX, Séance du 16 janv 1973"
                    value={customTitle}
                    onChange={(e) => setCustomTitle(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-black/15 focus:outline-none focus:border-black font-sans"
                  />
                </div>

                <div>
                  <label className="block text-[10px] uppercase font-mono font-bold text-black/60 mb-1">
                    Autor
                  </label>
                  <select
                    value={customAuthor}
                    onChange={(e) => setCustomAuthor(e.target.value as any)}
                    className="w-full px-3 py-2 text-xs border border-black/15 focus:outline-none focus:border-black font-sans bg-white"
                  >
                    <option value="Jacques Lacan">Jacques Lacan (Staferla / Écrits)</option>
                    <option value="Sigmund Freud">Sigmund Freud (Gesammelte Werke)</option>
                    <option value="Otro / Mixto">Otro / Debate Mixto</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] uppercase font-mono font-bold text-black/60 mb-1">
                    Referencia / Localizador
                  </label>
                  <input
                    type="text"
                    placeholder="Ej: Staferla p. 45 o GW Band X, S. 120"
                    value={customSourceRef}
                    onChange={(e) => setCustomSourceRef(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-black/15 focus:outline-none focus:border-black font-sans"
                  />
                </div>
              </div>

              {/* Raw Text Box */}
              <div className="space-y-1">
                <label className="block text-[10px] uppercase font-mono font-bold text-black/60">
                  Texto del Pasaje (Francés / Alemán / Español)
                </label>
                <textarea
                  rows={8}
                  placeholder="El contenido del archivo seleccionado aparecerá aquí, o puedes pegar directamente el pasaje de Staferla o de las Gesammelte Werke..."
                  value={rawText}
                  onChange={(e) => setRawText(e.target.value)}
                  className="w-full p-4 border border-black/20 text-xs sm:text-sm font-mono focus:outline-none focus:border-black bg-[#FDFBF7]"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2 border-t border-black/10">
                <span className="text-[11px] font-sans text-black/50">
                  {rawText ? `${rawText.length} caracteres listos para análisis.` : 'Carga un archivo o escribe texto.'}
                </span>

                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      handleAddBookmark({
                        title: customTitle || `Fragmento de ${customAuthor}`,
                        author: customAuthor,
                        sourceReference: customSourceRef || 'Carga local de PC',
                        excerptText: rawText,
                        tags: ['Archivo PC', customAuthor === 'Sigmund Freud' ? 'Freud GW' : 'Lacan Staferla']
                      });
                    }}
                    disabled={!rawText.trim()}
                    className="py-3 px-4 border border-black/30 hover:border-black text-xs uppercase font-sans font-bold disabled:opacity-40 flex items-center gap-1.5"
                    title="Guardar este pasaje en tus marcadores"
                  >
                    <BookmarkPlus className="w-3.5 h-3.5" />
                    <span>Guardar en Marcadores</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleAnalyzeCustomText}
                    disabled={isAnalyzing || !rawText.trim()}
                    className="py-3 px-8 bg-black text-white text-xs uppercase tracking-widest font-sans font-bold hover:opacity-85 disabled:opacity-40 transition-all flex items-center justify-center gap-2 shadow-md"
                  >
                    {isAnalyzing ? (
                      <>
                        <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                        <span>Realizando Exégesis...</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Diseccionar con Rigor Doctrinal</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Analysis Output Section */}
          {analysisResult && (
            <div className="bg-[#FAF8F5] border-2 border-black p-6 sm:p-10 space-y-6 shadow-md animate-fadeIn">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-black/10 pb-4 gap-3">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-black" />
                  <span className="text-xs uppercase font-mono font-bold tracking-widest text-black">
                    Exégesis Doctrinal: {customTitle || 'Pasaje Seleccionado'}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => {
                      handleAddBookmark({
                        title: customTitle || 'Exégesis de fragmento',
                        author: customAuthor,
                        sourceReference: customSourceRef || 'Archivo local',
                        excerptText: rawText,
                        note: analysisResult.slice(0, 300) + '...',
                        tags: ['Exégesis', 'Análisis']
                      });
                    }}
                    className="text-xs font-sans text-black/70 hover:text-black flex items-center gap-1 font-semibold"
                  >
                    <BookmarkPlus className="w-3.5 h-3.5" />
                    <span>Guardar con análisis</span>
                  </button>
                  <span className="text-[10px] font-mono text-black/50">
                    {customAuthor} • Ref: {customSourceRef || 'Archivo PC'}
                  </span>
                </div>
              </div>

              <div className="prose prose-sm max-w-none text-black font-serif leading-relaxed whitespace-pre-line text-sm sm:text-base">
                {analysisResult}
              </div>

              <div className="pt-4 border-t border-black/10 flex justify-end">
                <button
                  onClick={() =>
                    onAskInChat(
                      `Profundiza en la exégesis del siguiente fragmento de ${customAuthor} (${customTitle}):\n\n"${rawText.slice(0, 500)}..."\n\n¿Cuáles son las implicaciones clínicas de esta formalización?`
                    )
                  }
                  className="py-2.5 px-6 bg-black text-white text-xs uppercase tracking-widest font-sans font-bold hover:opacity-80 transition-opacity flex items-center gap-2"
                >
                  <span>Continuar Debate en el Diálogo</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ================= TAB 2: REPOSITORIES (CATÁLOGO STAFERLA & FREUD GW) ================= */}
      {activeTab === 'repositories' && (
        <div className="space-y-6 animate-fadeIn">
          {/* Subheader */}
          <div className="bg-[#FAF8F5] border border-black/10 p-6 sm:p-8 space-y-4">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              <div className="space-y-1 max-w-3xl">
                <h3 className="font-serif text-2xl font-bold text-black">
                  Catálogo Canónico: 27 Seminarios de Lacan & 18 Tomos Freud GW
                </h3>
                <p className="text-xs sm:text-sm font-sans text-black/75 leading-relaxed">
                  Índice completo de las obras maestras y seminarios. Puedes vincular cualquier obra con los archivos que tengas en tu computadora haciendo clic en <strong>«Cargar archivo de esta obra»</strong>.
                </p>
              </div>

              <button
                onClick={() => setActiveTab('local_files')}
                className="px-4 py-2.5 bg-black text-white text-xs font-sans font-bold uppercase tracking-wider hover:opacity-80 transition-all flex items-center gap-2 self-start lg:self-auto"
              >
                <HardDrive className="w-3.5 h-3.5" />
                <span>Cargar Archivos de mi PC</span>
              </button>
            </div>

            {/* Author Filter & Search */}
            <div className="pt-4 border-t border-black/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-xs font-sans">
                <button
                  onClick={() => setRepoAuthor('all')}
                  className={`px-3 py-1.5 border transition-all ${
                    repoAuthor === 'all'
                      ? 'bg-black text-white border-black font-bold'
                      : 'bg-white text-black/70 border-black/15 hover:border-black'
                  }`}
                >
                  Todos ({allRepoItems.length})
                </button>
                <button
                  onClick={() => setRepoAuthor('lacan_staferla')}
                  className={`px-3 py-1.5 border transition-all ${
                    repoAuthor === 'lacan_staferla'
                      ? 'bg-black text-white border-black font-bold'
                      : 'bg-white text-black/70 border-black/15 hover:border-black'
                  }`}
                >
                  Staferla Lacan ({STAFERLA_LACAN_CATALOG.length})
                </button>
                <button
                  onClick={() => setRepoAuthor('freud_gw')}
                  className={`px-3 py-1.5 border transition-all ${
                    repoAuthor === 'freud_gw'
                      ? 'bg-black text-white border-black font-bold'
                      : 'bg-white text-black/70 border-black/15 hover:border-black'
                  }`}
                >
                  Freud GW ({FREUD_GW_CATALOG.length})
                </button>
              </div>

              <div className="relative sm:w-80">
                <Search className="w-4 h-4 text-black/40 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Filtrar por seminario, GW, concepto..."
                  value={repoSearch}
                  onChange={(e) => setRepoSearch(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 bg-white border border-black/15 text-xs font-sans text-black focus:outline-none focus:border-black"
                />
              </div>
            </div>
          </div>

          {/* Grid of Volumes / Seminars */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredRepoItems.map((item) => (
              <div
                key={item.id}
                className="bg-white border border-black/10 p-6 flex flex-col justify-between space-y-4 hover:border-black transition-all group shadow-sm"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-[10px] font-mono">
                    <span className="px-2 py-0.5 bg-neutral-100 text-black font-bold border border-black/10">
                      {item.volumeOrNumber}
                    </span>
                    <span className="text-black/50">{item.year}</span>
                  </div>

                  <h4 className="font-serif font-bold text-base text-black group-hover:text-black transition-colors">
                    {item.title}
                  </h4>
                  <p className="text-xs font-serif italic text-black/60">
                    {item.originalTitle}
                  </p>
                  <p className="text-xs font-sans text-black/75 leading-relaxed pt-1">
                    {item.description}
                  </p>
                </div>

                <div className="space-y-3 pt-3 border-t border-black/10">
                  <div className="flex flex-wrap gap-1">
                    {item.keyThemes.map((theme, idx) => (
                      <span
                        key={idx}
                        className="text-[9px] font-mono px-1.5 py-0.5 bg-[#FAF7F2] text-black/70 border border-black/5"
                      >
                        {theme}
                      </span>
                    ))}
                  </div>

                  <div className="flex flex-col gap-2 pt-2 border-t border-black/5">
                    {/* Attach from PC Action */}
                    <button
                      onClick={() => handleAttachCatalogItemFromPC(item)}
                      className="text-[11px] font-sans font-semibold text-neutral-800 hover:text-black flex items-center gap-1.5 underline underline-offset-2 self-start"
                      title="Cargar y analizar un archivo de tu PC para este tomo o seminario"
                    >
                      <HardDrive className="w-3.5 h-3.5" />
                      <span>Cargar archivo de esta obra desde mi PC</span>
                    </button>

                    {/* Consultation and Bookmark Buttons */}
                    <div className="flex items-center justify-between pt-1">
                      <button
                        onClick={() => {
                          handleAddBookmark({
                            title: item.title,
                            author: item.author,
                            sourceReference: `${item.volumeOrNumber} (${item.originalTitle}, ${item.year})`,
                            excerptText: item.description,
                            tags: item.keyThemes
                          });
                        }}
                        className="text-[10px] font-sans text-black/60 hover:text-black flex items-center gap-1"
                        title="Guardar en mis marcadores de lectura"
                      >
                        <BookmarkPlus className="w-3 h-3" />
                        <span>Guardar marcador</span>
                      </button>

                      <button
                        onClick={() =>
                          onAskInChat(
                            `Realiza una exégesis rigurosa del ${item.volumeOrNumber} (${item.originalTitle}) de ${item.author}, abordando sus puntos axiales y los términos clave: ${item.keyThemes.join(', ')}.`
                          )
                        }
                        className="text-[10px] font-sans font-bold uppercase tracking-wider text-black hover:opacity-70 flex items-center gap-1"
                      >
                        <span>Consultar</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ================= TAB 3: READING BOOKMARKS (MARCADORES DE LECTURA) ================= */}
      {activeTab === 'bookmarks' && (
        <div className="space-y-8 animate-fadeIn">
          {/* Header */}
          <div className="bg-[#FAF8F5] border border-black/10 p-6 sm:p-8 space-y-4">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              <div className="space-y-1 max-w-2xl">
                <div className="flex items-center gap-2">
                  <Bookmark className="w-4 h-4 text-black" />
                  <span className="text-[10px] uppercase tracking-widest font-mono font-bold text-black/60">
                    Panel de Almacenamiento Local • Lecturas & Citas Guardadas
                  </span>
                </div>
                <h3 className="font-serif text-2xl font-bold text-black">
                  Marcadores de Lectura (Freud GW & Lacan Staferla)
                </h3>
                <p className="text-xs font-sans text-black/75 leading-relaxed">
                  Guarda y organiza tus pasajes textuales favoritos, transcripciones estenográficas de los Seminarios y extractos en alemán de las <em>Gesammelte Werke</em>. Tus marcadores se conservan localmente en tu navegador.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => setIsAddingCustomBookmark(!isAddingCustomBookmark)}
                  className="px-4 py-2.5 bg-black text-white text-xs font-sans font-bold uppercase tracking-wider hover:opacity-85 transition-all flex items-center gap-2"
                >
                  <PlusCircle className="w-4 h-4" />
                  <span>{isAddingCustomBookmark ? 'Cerrar Formulario' : 'Añadir Nuevo Marcador'}</span>
                </button>
              </div>
            </div>

            {/* Filter & Search Bar */}
            <div className="pt-4 border-t border-black/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-xs font-sans">
                <button
                  onClick={() => setBookmarkAuthorFilter('all')}
                  className={`px-3 py-1.5 border transition-all ${
                    bookmarkAuthorFilter === 'all'
                      ? 'bg-black text-white border-black font-bold'
                      : 'bg-white text-black/70 border-black/15 hover:border-black'
                  }`}
                >
                  Todos ({bookmarks.length})
                </button>
                <button
                  onClick={() => setBookmarkAuthorFilter('Jacques Lacan')}
                  className={`px-3 py-1.5 border transition-all ${
                    bookmarkAuthorFilter === 'Jacques Lacan'
                      ? 'bg-black text-white border-black font-bold'
                      : 'bg-white text-black/70 border-black/15 hover:border-black'
                  }`}
                >
                  Lacan Staferla ({bookmarks.filter((b) => b.author === 'Jacques Lacan').length})
                </button>
                <button
                  onClick={() => setBookmarkAuthorFilter('Sigmund Freud')}
                  className={`px-3 py-1.5 border transition-all ${
                    bookmarkAuthorFilter === 'Sigmund Freud'
                      ? 'bg-black text-white border-black font-bold'
                      : 'bg-white text-black/70 border-black/15 hover:border-black'
                  }`}
                >
                  Freud GW ({bookmarks.filter((b) => b.author === 'Sigmund Freud').length})
                </button>
              </div>

              <div className="relative sm:w-80">
                <Search className="w-4 h-4 text-black/40 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Buscar en tus marcadores y notas..."
                  value={bookmarkSearch}
                  onChange={(e) => setBookmarkSearch(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 bg-white border border-black/15 text-xs font-sans text-black focus:outline-none focus:border-black"
                />
              </div>
            </div>
          </div>

          {/* Form to add custom bookmark manually */}
          {isAddingCustomBookmark && (
            <form
              onSubmit={handleSaveManualBookmark}
              className="bg-white border-2 border-black p-6 sm:p-8 space-y-4 shadow-lg animate-fadeIn"
            >
              <div className="flex items-center justify-between border-b border-black/10 pb-3">
                <h4 className="font-serif font-bold text-lg text-black flex items-center gap-2">
                  <BookmarkPlus className="w-4 h-4" />
                  <span>Nuevo Marcador de Lectura</span>
                </h4>
                <button
                  type="button"
                  onClick={() => setIsAddingCustomBookmark(false)}
                  className="text-xs font-mono text-black/50 hover:text-black"
                >
                  Cancelar
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-[10px] uppercase font-mono font-bold text-black/70 mb-1">
                    Título o Concepto *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ej: El Nudo Borromeo de 4 / Das Ding"
                    value={newBmTitle}
                    onChange={(e) => setNewBmTitle(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-black/20 focus:outline-none focus:border-black"
                  />
                </div>

                <div>
                  <label className="block text-[10px] uppercase font-mono font-bold text-black/70 mb-1">
                    Autor *
                  </label>
                  <select
                    value={newBmAuthor}
                    onChange={(e) => setNewBmAuthor(e.target.value as any)}
                    className="w-full px-3 py-2 text-xs border border-black/20 focus:outline-none focus:border-black bg-white"
                  >
                    <option value="Jacques Lacan">Jacques Lacan (Staferla / Écrits)</option>
                    <option value="Sigmund Freud">Sigmund Freud (Gesammelte Werke)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] uppercase font-mono font-bold text-black/70 mb-1">
                    Referencia / Localizador *
                  </label>
                  <input
                    type="text"
                    placeholder="Ej: Staferla Séminaire XX p. 45 o GW Band X S. 120"
                    value={newBmSource}
                    onChange={(e) => setNewBmSource(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-black/20 focus:outline-none focus:border-black"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="block text-[10px] uppercase font-mono font-bold text-black/70">
                  Pasaje en Idioma Original (Francés / Alemán) *
                </label>
                <textarea
                  required
                  rows={3}
                  placeholder="Pega el fragmento original de Staferla o de las Gesammelte Werke..."
                  value={newBmExcerpt}
                  onChange={(e) => setNewBmExcerpt(e.target.value)}
                  className="w-full p-3 border border-black/20 text-xs font-mono focus:outline-none focus:border-black bg-[#FDFBF7]"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] uppercase font-mono font-bold text-black/70 mb-1">
                    Traducción / Glosa en Español (Opcional)
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Traducción fiel o versión al español..."
                    value={newBmTranslation}
                    onChange={(e) => setNewBmTranslation(e.target.value)}
                    className="w-full p-2.5 border border-black/20 text-xs font-sans focus:outline-none focus:border-black"
                  />
                </div>

                <div>
                  <label className="block text-[10px] uppercase font-mono font-bold text-black/70 mb-1">
                    Nota Clínica o Metapsicológica Personal (Opcional)
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Tus observaciones, matemas, articulación con la cura..."
                    value={newBmNote}
                    onChange={(e) => setNewBmNote(e.target.value)}
                    className="w-full p-2.5 border border-black/20 text-xs font-sans focus:outline-none focus:border-black"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] uppercase font-mono font-bold text-black/70 mb-1">
                  Etiquetas (separadas por comas)
                </label>
                <input
                  type="text"
                  placeholder="Sinthome, Trieb, Borromeo, Repetición..."
                  value={newBmTags}
                  onChange={(e) => setNewBmTags(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-black/20 focus:outline-none focus:border-black"
                />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAddingCustomBookmark(false)}
                  className="px-4 py-2 border border-black/20 text-xs font-sans font-semibold hover:border-black"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-black text-white text-xs font-sans font-bold uppercase tracking-wider hover:opacity-85"
                >
                  Guardar en Marcadores
                </button>
              </div>
            </form>
          )}

          {/* Bookmarks List */}
          {filteredBookmarks.length === 0 ? (
            <div className="p-12 text-center bg-white border border-black/10 space-y-3">
              <Bookmark className="w-8 h-8 text-black/30 mx-auto" />
              <h4 className="font-serif font-bold text-lg text-black">
                No hay marcadores que coincidan con la búsqueda
              </h4>
              <p className="text-xs font-sans text-black/60 max-w-md mx-auto">
                Puedes guardar cualquier cita desde la pestaña <em>"Textos Canónicos"</em> o hacer clic en <strong>«Añadir Nuevo Marcador»</strong> para archivar tus pasajes.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredBookmarks.map((bm) => {
                const isCopied = copiedBookmarkId === bm.id;
                return (
                  <div
                    key={bm.id}
                    className="bg-white border border-black/15 p-6 space-y-4 shadow-sm hover:border-black transition-all flex flex-col justify-between"
                  >
                    <div className="space-y-3">
                      {/* Meta badge */}
                      <div className="flex items-center justify-between text-[10px] font-mono border-b border-black/10 pb-2">
                        <span className="px-2 py-0.5 bg-neutral-100 font-bold border border-black/10 text-black">
                          {bm.author === 'Sigmund Freud' ? 'FREUD // GW' : 'LACAN // STAFERLA'}
                        </span>
                        <span className="text-black/40">
                          {new Date(bm.createdAt).toLocaleDateString()}
                        </span>
                      </div>

                      {/* Title & source */}
                      <div>
                        <h4 className="font-serif font-bold text-lg text-black leading-snug">
                          {bm.title}
                        </h4>
                        <p className="text-xs font-mono text-black/50 mt-0.5">
                          {bm.sourceReference}
                        </p>
                      </div>

                      {/* Excerpt */}
                      <div className="p-4 bg-[#FDFBF7] border-l-2 border-black space-y-2">
                        <blockquote className="font-serif italic text-sm sm:text-base text-black leading-relaxed">
                          «{bm.excerptText}»
                        </blockquote>
                        {bm.spanishTranslation && (
                          <p className="text-xs font-sans text-black/70 pt-1">
                            «{bm.spanishTranslation}»
                          </p>
                        )}
                      </div>

                      {/* Note */}
                      {bm.note && (
                        <div className="p-3 bg-neutral-50 border border-black/5 text-xs font-sans text-black/80 space-y-1">
                          <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-black/50 block">
                            Nota Doctrinal / Clínica:
                          </span>
                          <p>{bm.note}</p>
                        </div>
                      )}

                      {/* Tags */}
                      {bm.tags && bm.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1 pt-1">
                          {bm.tags.map((tag, i) => (
                            <span
                              key={i}
                              className="text-[9px] font-mono px-1.5 py-0.5 bg-[#FAF7F2] text-black/70 border border-black/10 flex items-center gap-1"
                            >
                              <Tag className="w-2.5 h-2.5 text-black/40" />
                              <span>{tag}</span>
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="pt-3 border-t border-black/10 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleCopyBookmark(bm)}
                          className="px-2.5 py-1.5 border border-black/15 hover:border-black text-[11px] font-sans font-medium flex items-center gap-1 text-black/80 hover:text-black transition-colors"
                          title="Copiar cita completa al portapapeles"
                        >
                          {isCopied ? (
                            <>
                              <Check className="w-3 h-3 text-emerald-700" />
                              <span className="text-emerald-800 font-bold">¡Copiado!</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3 h-3" />
                              <span>Copiar Cita</span>
                            </>
                          )}
                        </button>

                        <button
                          onClick={() =>
                            onAskInChat(
                              `Analiza doctrinalmente el siguiente pasaje de ${bm.author} guardado en mis marcadores (${bm.sourceReference}):\n\n"${bm.excerptText}"\n\n${bm.note ? `Nota de investigación: ${bm.note}` : ''}`
                            )
                          }
                          className="px-2.5 py-1.5 bg-neutral-100 hover:bg-black hover:text-white border border-black/15 text-[11px] font-sans font-semibold transition-colors flex items-center gap-1"
                        >
                          <span>Interrogar en Diálogo</span>
                          <ArrowRight className="w-3 h-3" />
                        </button>
                      </div>

                      <button
                        onClick={() => handleDeleteBookmark(bm.id)}
                        className="p-1.5 text-black/40 hover:text-red-700 transition-colors"
                        title="Eliminar marcador"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* ================= TAB 4: CANONICAL TEXT READER ================= */}
      {activeTab === 'canonical' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 text-xs font-sans uppercase tracking-wider">
              <button
                onClick={() => setSelectedAuthor('all')}
                className={`pb-1 transition-all ${
                  selectedAuthor === 'all'
                    ? 'border-b-2 border-black text-black font-bold'
                    : 'text-black/40 hover:text-black'
                }`}
              >
                Tous ({TEXTS_DATA.length})
              </button>
              <button
                onClick={() => setSelectedAuthor('Sigmund Freud')}
                className={`pb-1 transition-all ${
                  selectedAuthor === 'Sigmund Freud'
                    ? 'border-b-2 border-black text-black font-bold'
                    : 'text-black/40 hover:text-black'
                }`}
              >
                Freud (Gesammelte Werke)
              </button>
              <button
                onClick={() => setSelectedAuthor('Jacques Lacan')}
                className={`pb-1 transition-all ${
                  selectedAuthor === 'Jacques Lacan'
                    ? 'border-b-2 border-black text-black font-bold'
                    : 'text-black/40 hover:text-black'
                }`}
              >
                Lacan (Séminaires & Staferla)
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Index */}
            <div className="lg:col-span-4 space-y-3 max-h-[700px] overflow-y-auto pr-2">
              {filteredCanonicalTexts.map((text, idx) => {
                const isSelected = text.id === activeCanonicalText.id;
                const numStr = (idx + 1).toString().padStart(2, '0');
                return (
                  <button
                    key={text.id}
                    onClick={() => setActiveTextId(text.id)}
                    className={`w-full text-left p-5 transition-all border ${
                      isSelected
                        ? 'bg-black text-white border-black shadow-md'
                        : 'bg-white text-black border-black/10 hover:border-black'
                    }`}
                  >
                    <div className="flex items-center justify-between text-[10px] font-mono mb-2">
                      <span className={isSelected ? 'text-white/60' : 'text-black/40'}>
                        {numStr} // {text.year}
                      </span>
                      <span className={`uppercase tracking-wider font-sans font-semibold ${isSelected ? 'text-white/80' : 'text-black/60'}`}>
                        {text.author === 'Sigmund Freud' ? 'FREUD (GW)' : 'LACAN (STAFERLA)'}
                      </span>
                    </div>

                    <h4 className="font-serif font-bold text-base sm:text-lg leading-snug">
                      {text.titleSpanish}
                    </h4>
                    <p className={`text-xs italic font-serif mt-1 ${isSelected ? 'text-white/70' : 'text-black/50'}`}>
                      {text.titleOriginal}
                    </p>
                  </button>
                );
              })}
            </div>

            {/* Right Sheet */}
            <div className="lg:col-span-8 bg-white border border-black/10 p-6 sm:p-10 space-y-8 shadow-sm">
              <div className="border-b border-black/10 pb-6 space-y-3">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="text-[10px] uppercase tracking-[0.2em] font-sans font-bold text-black/50">
                    {activeCanonicalText.collection} ({activeCanonicalText.year})
                  </span>
                  {activeCanonicalText.gwVolume && (
                    <span className="text-[10px] font-mono bg-neutral-100 text-neutral-800 px-2 py-0.5 border border-neutral-300">
                      {activeCanonicalText.gwVolume}
                    </span>
                  )}
                  {activeCanonicalText.staferlaReference && (
                    <span className="text-[10px] font-mono bg-neutral-100 text-neutral-800 px-2 py-0.5 border border-neutral-300">
                      {activeCanonicalText.staferlaReference}
                    </span>
                  )}
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <h3 className="font-serif text-3xl sm:text-4xl font-bold text-black tracking-tight">
                    {activeCanonicalText.titleSpanish}
                  </h3>
                  <button
                    onClick={() => {
                      handleAddBookmark({
                        title: activeCanonicalText.titleSpanish,
                        author: activeCanonicalText.author,
                        sourceReference: `${activeCanonicalText.collection} (${activeCanonicalText.year}) ${activeCanonicalText.gwVolume || activeCanonicalText.staferlaReference || ''}`,
                        excerptText: activeCanonicalText.summary,
                        tags: [activeCanonicalText.author === 'Sigmund Freud' ? 'Freud GW' : 'Lacan Staferla']
                      });
                    }}
                    className="px-3 py-1.5 bg-neutral-100 hover:bg-black hover:text-white border border-black/15 text-xs font-sans font-semibold transition-colors flex items-center gap-1.5 self-start sm:self-auto"
                    title="Guardar este texto canónico en mis marcadores"
                  >
                    <BookmarkPlus className="w-3.5 h-3.5" />
                    <span>Guardar Obra</span>
                  </button>
                </div>

                <p className="text-base font-serif italic text-black/60">
                  {activeCanonicalText.titleOriginal}
                </p>
              </div>

              {/* Summary */}
              <div className="space-y-2">
                <span className="text-[10px] uppercase tracking-[0.2em] font-sans font-bold text-black/40 block">
                  Síntesis & Articulación Doctrinal
                </span>
                <p className="text-base sm:text-lg font-serif text-[#1C1C1C] leading-relaxed">
                  {activeCanonicalText.summary}
                </p>
              </div>

              {/* Theses */}
              <div className="space-y-4">
                <span className="text-[10px] uppercase tracking-[0.2em] font-sans font-bold text-black/40 block">
                  Tesis Estructurales
                </span>
                <ul className="space-y-3">
                  {activeCanonicalText.centralTheses.map((thesis, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-4 p-4 bg-[#F9F6F0] border border-black/5"
                    >
                      <span className="text-xs font-mono font-bold text-black/40 mt-0.5">
                        {(idx + 1).toString().padStart(2, '0')}
                      </span>
                      <span className="text-sm font-sans text-black/80 leading-relaxed">
                        {thesis}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Quotes */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] uppercase tracking-[0.2em] font-sans font-bold text-black/40 block">
                    Citas en Idioma Original (Alemán / Francés)
                  </span>
                  <span className="text-[10px] font-mono text-black/50">
                    Haz clic en «Guardar Cita» para archivar el pasaje
                  </span>
                </div>

                <div className="space-y-4">
                  {activeCanonicalText.famousQuotes.map((q, idx) => (
                    <div key={idx} className="p-6 bg-[#FDFBF7] border-l-2 border-black space-y-3">
                      <blockquote className="font-serif italic text-lg sm:text-xl text-black leading-snug">
                        «{q.original}»
                      </blockquote>
                      <p className="text-xs font-sans text-black/60 pt-1">
                        «{q.spanish}»
                      </p>
                      
                      <div className="flex items-center justify-between pt-2 border-t border-black/5">
                        <span className="text-[10px] font-mono text-black/40">
                          {q.locator ? `— ${q.locator}` : ''}
                        </span>
                        
                        <button
                          onClick={() => {
                            handleAddBookmark({
                              title: `${activeCanonicalText.titleSpanish} (Cita)`,
                              author: activeCanonicalText.author,
                              sourceReference: `${activeCanonicalText.titleOriginal} [${q.locator || activeCanonicalText.year}]`,
                              excerptText: q.original,
                              spanishTranslation: q.spanish,
                              tags: [activeCanonicalText.author === 'Sigmund Freud' ? 'Freud GW' : 'Lacan Staferla']
                            });
                          }}
                          className="px-2.5 py-1 bg-white hover:bg-black hover:text-white border border-black/20 text-[11px] font-sans font-semibold transition-colors flex items-center gap-1"
                        >
                          <BookmarkPlus className="w-3 h-3" />
                          <span>Guardar en Marcadores</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Historical & Clinical */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-black/10">
                <div className="space-y-1">
                  <span className="text-[10px] uppercase tracking-[0.2em] font-sans font-bold text-black/40 block">
                    Contexto de Producción
                  </span>
                  <p className="text-xs font-sans text-black/70 leading-relaxed">
                    {activeCanonicalText.historicalContext}
                  </p>
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] uppercase tracking-[0.2em] font-sans font-bold text-black/40 block">
                    Incidencia en la Cura
                  </span>
                  <p className="text-xs font-sans text-black/70 leading-relaxed">
                    {activeCanonicalText.clinicalImpact}
                  </p>
                </div>
              </div>

              {/* Action */}
              <div className="pt-6 border-t border-black/10 flex justify-end">
                <button
                  onClick={() =>
                    onAskInChat(
                      `Realiza un análisis exhaustivo del texto "${activeCanonicalText.titleSpanish}" (${activeCanonicalText.titleOriginal}, ${activeCanonicalText.year}) de ${activeCanonicalText.author}, citando sus pasajes en idioma original y detallando su articulación metapsicológica.`
                    )
                  }
                  className="w-full sm:w-auto py-3 px-6 bg-black text-white text-xs uppercase tracking-widest font-sans font-bold hover:opacity-80 transition-opacity flex items-center justify-center gap-2"
                >
                  <span>Interrogar en el Diálogo</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
