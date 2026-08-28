// IndexedDB client-side database for unlimited local corpus storage (books, seminars, papers)
const DB_NAME = 'PsychoanalysisCorpusDB';
const DB_VERSION = 1;
const STORE_FILES = 'corpus_files';
const LEGACY_STORAGE_KEYS = ['th_user_pc_files', 'th_local_files', 'local_corpus_files'];

export interface StoredLocalFile {
  id: string;
  name: string;
  size: number;
  type: string;
  uploadedAt: number;
  content: string;
  authorTag: 'Freud' | 'Lacan' | 'Otro';
  categoryTag?: string;
  wordCount?: number;
}

function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined' || !window.indexedDB) {
      reject(new Error('IndexedDB no está disponible en este navegador.'));
      return;
    }

    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains(STORE_FILES)) {
        db.createObjectStore(STORE_FILES, { keyPath: 'id' });
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

export async function getAllLocalFiles(): Promise<StoredLocalFile[]> {
  // 1. Gather any legacy items from localStorage
  const legacyMap = new Map<string, StoredLocalFile>();
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      for (const key of LEGACY_STORAGE_KEYS) {
        const item = localStorage.getItem(key);
        if (item) {
          try {
            const parsed = JSON.parse(item);
            if (Array.isArray(parsed)) {
              parsed.forEach((f: any) => {
                if (f && (f.id || f.name)) {
                  const id = f.id || `legacy-${Date.now()}-${Math.random()}`;
                  legacyMap.set(id, {
                    id,
                    name: f.name || 'Archivo sin nombre',
                    size: f.size || 0,
                    type: f.type || 'text/plain',
                    uploadedAt: f.uploadedAt || Date.now(),
                    content: f.fullText || f.content || f.textSnippet || '',
                    authorTag: f.author === 'Sigmund Freud' ? 'Freud' : f.author === 'Jacques Lacan' ? 'Lacan' : (f.authorTag || 'Otro'),
                    wordCount: f.wordCount || 0
                  });
                }
              });
            }
          } catch (_) {}
        }
      }
    }
  } catch (e) {
    console.warn('Error reading legacy storage:', e);
  }

  // 2. Read from IndexedDB
  try {
    const db = await openDB();
    return new Promise((resolve) => {
      const tx = db.transaction(STORE_FILES, 'readonly');
      const store = tx.objectStore(STORE_FILES);
      const request = store.getAll();

      request.onsuccess = () => {
        const idbFiles: StoredLocalFile[] = request.result || [];
        // Merge IndexedDB files with any legacy files
        const combinedMap = new Map<string, StoredLocalFile>();
        idbFiles.forEach((f) => combinedMap.set(f.id, f));
        legacyMap.forEach((f, k) => {
          if (!combinedMap.has(k)) {
            combinedMap.set(k, f);
          }
        });
        resolve(Array.from(combinedMap.values()));
      };
      request.onerror = () => {
        resolve(Array.from(legacyMap.values()));
      };
    });
  } catch (err) {
    console.warn('Error accediendo a IndexedDB:', err);
    return Array.from(legacyMap.values());
  }
}

export async function saveLocalFile(file: StoredLocalFile): Promise<void> {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_FILES, 'readwrite');
    const store = tx.objectStore(STORE_FILES);
    const request = store.put(file);

    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
}

export async function deleteLocalFile(id: string): Promise<void> {
  // 1. Delete from any legacy localStorage keys
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      for (const key of LEGACY_STORAGE_KEYS) {
        const item = localStorage.getItem(key);
        if (item) {
          try {
            const list = JSON.parse(item);
            if (Array.isArray(list)) {
              const filtered = list.filter((f: any) => f.id !== id && f.name !== id);
              localStorage.setItem(key, JSON.stringify(filtered));
            }
          } catch (_) {}
        }
      }
    }
  } catch (_) {}

  // 2. Delete from IndexedDB
  try {
    const db = await openDB();
    return new Promise((resolve) => {
      const tx = db.transaction(STORE_FILES, 'readwrite');
      const store = tx.objectStore(STORE_FILES);
      const request = store.delete(id);

      request.onsuccess = () => resolve();
      request.onerror = () => resolve();
    });
  } catch (err) {
    console.warn('Error borrando en IndexedDB:', err);
  }
}

export async function clearAllLocalFiles(): Promise<void> {
  // 1. Clear legacy localStorage keys
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      for (const key of LEGACY_STORAGE_KEYS) {
        localStorage.removeItem(key);
      }
    }
  } catch (_) {}

  // 2. Clear IndexedDB
  try {
    const db = await openDB();
    return new Promise((resolve) => {
      const tx = db.transaction(STORE_FILES, 'readwrite');
      const store = tx.objectStore(STORE_FILES);
      const request = store.clear();

      request.onsuccess = () => resolve();
      request.onerror = () => resolve();
    });
  } catch (err) {
    console.warn('Error limpiando IndexedDB:', err);
  }
}
