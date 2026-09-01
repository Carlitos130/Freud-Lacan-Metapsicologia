export type PsychoanalysisSchool = 'freud' | 'lacan' | 'both';

export type ConceptCategory = 
  | 'metapsychology' 
  | 'drive_and_jouissance' 
  | 'language_and_unconscious' 
  | 'clinical_structures' 
  | 'topology_and_mathemes' 
  | 'ego_and_subject';

export interface ConceptItem {
  id: string;
  termOriginal: string; // e.g. "Trieb", "Objet petit a"
  language: 'german' | 'french' | 'both';
  termSpanish: string; // e.g. "Pulsión", "Objeto a"
  school: PsychoanalysisSchool;
  category: ConceptCategory;
  pronunciation?: string;
  literalMeaning: string;
  keySources: Array<{
    title: string;
    year: number;
    originalTitle: string;
    sectionOrVolume?: string;
  }>;
  shortDefinition: string;
  rigorousExplanation: string;
  etymologicalNuance: string;
  clinicalSignificance: string;
  mathemeOrFormula?: string;
  relatedConcepts: string[];
  originalQuoteSnippet?: {
    original: string;
    spanish: string;
    source: string;
  };
}

export interface PrimaryTextItem {
  id: string;
  author: 'Sigmund Freud' | 'Jacques Lacan';
  titleSpanish: string;
  titleOriginal: string;
  year: number | string;
  type: 'book' | 'seminar' | 'essay' | 'conference';
  collection: string; // e.g. "Gesammelte Werke", "Écrits", "Le Séminaire / Staferla"
  summary: string;
  centralTheses: string[];
  keyOriginalTerms: string[];
  famousQuotes: Array<{
    original: string;
    spanish: string;
    locator?: string;
  }>;
  historicalContext: string;
  clinicalImpact: string;
  externalLink?: string;
  staferlaReference?: string;
  gwVolume?: string;
}

export interface CorpusRepositoryItem {
  id: string;
  author: 'Jacques Lacan' | 'Sigmund Freud';
  title: string;
  originalTitle: string;
  year: string;
  category: 'seminar_staferla' | 'autres_ecrits' | 'ecrits' | 'freud_gw';
  volumeOrNumber: string;
  description: string;
  staferlaOrGwLink?: string;
  keyThemes: string[];
  canonicalDate?: string;
}

export interface CustomUploadedExcerpt {
  id: string;
  title: string;
  author: 'Jacques Lacan' | 'Sigmund Freud' | 'Otro / Mixto';
  sourceReference: string; // e.g. "Staferla Séminaire XX, Séance du 16 janvier 1973" or "Freud GW XIII, p. 12"
  originalLanguage: 'french' | 'german' | 'spanish' | 'mixed';
  rawText: string;
  uploadedAt: number;
}

export interface SeededLibraryText {
  id: string;
  title: string;
  author: 'Sigmund Freud' | 'Jacques Lacan' | 'Otro / Mixto';
  sourceReference: string;
  language: 'french' | 'german' | 'spanish' | 'mixed';
  file: string; // ruta relativa dentro de public/corpus/, ej. "lacan/seminaire-xxiii.txt"
}

export interface LocalCorpusFile {
  id: string;
  name: string;
  size: number;
  author: 'Sigmund Freud' | 'Jacques Lacan' | 'Otro / Mixto';
  sourceReference: string;
  textSnippet: string;
  fullText: string;
  uploadedAt: number;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: number;
  highlightedTerms?: string[];
  referencedTexts?: string[];
  suggestedFollowUps?: string[];
}

export interface StructuralModelItem {
  id: string;
  name: string;
  nameOriginal: string;
  author: 'Sigmund Freud' | 'Jacques Lacan';
  description: string;
  components: Array<{
    name: string;
    symbol?: string;
    role: string;
    clinicalNote: string;
  }>;
  theoreticalAxiom: string;
  formulaOrDiagram?: string;
}

export interface ReadingBookmark {
  id: string;
  title: string;
  author: 'Sigmund Freud' | 'Jacques Lacan' | string;
  sourceReference: string;
  excerptText: string;
  spanishTranslation?: string;
  note?: string;
  tags?: string[];
  createdAt: number;
}

export interface ConceptComparison {
  id: string;
  title: string;
  conceptA: {
    term: string;
    language: string;
    author: string;
    coreMeaning: string;
  };
  conceptB: {
    term: string;
    language: string;
    author: string;
    coreMeaning: string;
  };
  keyDifference: string;
  commonConfusion: string;
  clinicalConsequence: string;
}
