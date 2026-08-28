// Universal text extractor supporting PDF, TXT, Markdown, JSON, CSV and generic text files safely without external bundle conflicts

// Browser-native PDF text stream parser
async function extractTextFromPDFArrayBuffer(arrayBuffer: ArrayBuffer): Promise<string> {
  const bytes = new Uint8Array(arrayBuffer);
  let textContent = '';
  
  // Convert binary stream to decoded Latin1/UTF-8 string chunks
  const decoder = new TextDecoder('latin1');
  const rawString = decoder.decode(bytes);

  // Strategy 1: Match text blocks inside BT ... ET (PDF Standard Text Objects)
  const textObjectRegex = /BT[\s\S]*?ET/g;
  const matches = rawString.match(textObjectRegex);

  if (matches && matches.length > 0) {
    for (const block of matches) {
      // Match parenthesized text literals: (Some text)
      const literalMatches = block.match(/\((?:[^()\\]|\\.)*\)/g);
      if (literalMatches) {
        for (const lit of literalMatches) {
          const clean = lit
            .slice(1, -1)
            .replace(/\\([()\\])/g, '$1')
            .replace(/\\r/g, ' ')
            .replace(/\\n/g, ' ')
            .replace(/\\t/g, ' ');
          if (clean.length > 0) {
            textContent += clean + ' ';
          }
        }
      }

      // Match hex text literals: <48656c6c6f>
      const hexMatches = block.match(/<([0-9a-fA-F\s]{4,})>/g);
      if (hexMatches) {
        for (const hex of hexMatches) {
          const rawHex = hex.slice(1, -1).replace(/\s+/g, '');
          let decoded = '';
          for (let i = 0; i < rawHex.length; i += 2) {
            const byteVal = parseInt(rawHex.substr(i, 2), 16);
            if (byteVal >= 32 && byteVal <= 126) {
              decoded += String.fromCharCode(byteVal);
            }
          }
          if (decoded.length > 0) {
            textContent += decoded + ' ';
          }
        }
      }
    }
  }

  // Strategy 2: If BT/ET didn't extract enough words, scan for coherent semantic words in stream
  if (textContent.trim().split(/\s+/).length < 20) {
    const wordPattern = /[A-Za-z0-9\u00C0-\u017F.,;:()\-–—«»"'/]{3,}/g;
    const streamWords = rawString.match(wordPattern);
    if (streamWords && streamWords.length > 30) {
      // Filter out PDF internal dictionary keywords
      const filtered = streamWords.filter(
        (w) =>
          !['Font', 'Type', 'Subtype', 'Widths', 'Filter', 'FlateDecode', 'Length', 'Contents', 'MediaBox', 'Parent', 'Root', 'Pages'].includes(w)
      );
      textContent = filtered.join(' ');
    }
  }

  return textContent.trim();
}

export async function extractTextFromFile(
  file: File,
  onProgress?: (percent: number, status: string) => void
): Promise<{ text: string; wordCount: number }> {
  const fileName = file.name.toLowerCase();
  const fileExt = fileName.split('.').pop() || '';

  onProgress?.(15, `Leyendo archivo ${file.name}...`);

  // PDF Document Handling
  if (fileExt === 'pdf' || file.type === 'application/pdf') {
    onProgress?.(40, 'Decodificando flujo textual del documento PDF...');
    try {
      const buffer = await file.arrayBuffer();
      const extracted = await extractTextFromPDFArrayBuffer(buffer);
      const clean = extracted.trim() || `[Documento PDF: ${file.name} - Cargado en la biblioteca]`;
      const wordCount = clean.split(/\s+/).filter(Boolean).length;
      onProgress?.(100, 'Lectura de PDF completada.');
      return { text: clean, wordCount };
    } catch (err: any) {
      console.warn('Extracción de PDF falló, usando lectura directa:', err);
      const raw = await file.text();
      const clean = raw.slice(0, 50000);
      const wordCount = clean.split(/\s+/).filter(Boolean).length;
      return { text: clean, wordCount };
    }
  }

  // Plain Text / Markdown / CSV / JSON / RTF / General Text Formats
  onProgress?.(50, 'Leyendo contenido...');
  const text = await file.text();
  const clean = text.replace(/\r\n/g, '\n').trim();
  const wordCount = clean.split(/\s+/).filter(Boolean).length;
  onProgress?.(100, 'Archivo cargado con éxito.');
  return { text: clean, wordCount };
}
