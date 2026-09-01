import { SeededLibraryText } from '../types';

const MANIFEST_URL = '/corpus/manifest.json';

// Textos empaquetados en public/corpus/, servidos como estáticos junto con la app.
// A diferencia de dbStorage.ts (IndexedDB del navegador del usuario), estos archivos
// viajan en el propio repositorio/deploy: están disponibles para cualquiera sin subir nada.
export async function fetchCorpusManifest(): Promise<SeededLibraryText[]> {
  const res = await fetch(MANIFEST_URL, { cache: 'no-store' });
  if (!res.ok) return [];
  const data = await res.json();
  return Array.isArray(data) ? data : [];
}

export async function fetchCorpusText(entry: SeededLibraryText): Promise<string> {
  const res = await fetch(`/corpus/${entry.file}`, { cache: 'no-store' });
  if (!res.ok) {
    throw new Error(`No se pudo cargar "${entry.file}" desde la biblioteca del repositorio.`);
  }
  return res.text();
}
