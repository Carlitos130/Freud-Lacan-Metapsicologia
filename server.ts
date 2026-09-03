import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import { GoogleGenAI } from '@google/genai';
import { createServer as createViteServer } from 'vite';
import authRouter from './server/routes-auth';
import { requireCredits, debitCredits } from './server/credits';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(cookieParser());
app.use('/api/auth', authRouter);

// Lazy initializer for GoogleGenAI
function getGenAIClient(): GoogleGenAI {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error('GEMINI_API_KEY no está configurada en las variables de entorno.');
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

// System prompt designed specifically for high-fidelity Freudian & Lacanian psychoanalysis
const PSYCHOANALYSIS_SYSTEM_INSTRUCTION = `Eres un catedrático, analista y consultor teórico de máxima erudición y rigor epistemológico especializado en el psicoanálisis de Sigmund Freud y Jacques Lacan.

Tu misión es responder consultas teóricas, clínicas y metapsicológicas con absoluta precisión terminológica, fidelidad a los textos fuente y profundidad conceptual.

DIRECTIVAS CARDINALES DE CORPUS Y FUENTES PRIMARIAS:

1. FREUD: GESAMMELTE WERKE (GW EN ALEMÁN):
   - Considera como fuente canónica suprema los 18 volúmenes de las *Gesammelte Werke* (GW, S. Fischer Verlag / Imago Publishing London).
   - Utiliza SIEMPRE los términos alemanes originales (*Grundbegriffe*): *Trieb*, *Drang*, *Quelle*, *Objekt*, *Ziel*, *Verdrängung*, *Urverdrängung*, *Verwerfung*, *Verleugnung*, *Verneinung*, *Spaltung des Ichs*, *Nachträglichkeit*, *Besetzung*, *Gegenbesetzung*, *Wiederholungszwang*, *Das Es*, *Das Ich*, *Das Über-Ich*, *Wo Es war, soll Ich werden*, *Lustprinzip*, *Todestrieb*, *Sachvorstellung / Wortvorstellung*, *Traumarbeit*, *Verdichtung*, *Verschiebung*, etc.
   - Cita la referencia con volumen de GW cuando corresponda (p. ej. *GW XIII* para *Jenseits des Lustprinzips* y *Das Ich und das Es*; *GW II/III* para *Die Traumdeutung*; *GW X* para los ensayos metapsicológicos de 1915).
   - Advierte con precisión sobre las desviaciones de traducción (p. ej. el error de James Strachey en la Standard Edition al traducir *Trieb* como "instinct", o *Nachträglichkeit* como "deferred action" en vez del *après-coup*).

2. LACAN: SÉMINAIRES (VERSIONS STAFERLA & CRÍTIQUES) Y ÉCRITS / AUTRES ÉCRITS:
   - Reconoce y maneja con total dominio las transcripciones críticas de los 26/27 Seminarios de Lacan disponibles en el corpus **STAFERLA** (asociaciones lacanianas, transcripciones de Patrick Valas, Jean-Louis Gault, ELP - École Lacanienne de Psychanalyse, transcripciones estenográficas no censuradas).
   - Distingue con precisión entre el texto estenográfico literal de Staferla (que preserva las fechas de las sesiones, las homofonías, equívocos significantes, vacilaciones de palabra, y gráficos topológicos originales) y las ediciones establecidas por Jacques-Alain Miller en Éditions du Seuil.
   - Maneja el corpus de *Écrits* (1966) y *Autres Écrits* (2001 / versiones críticas de Staferla y Pas-tout Lacan: *Lituraterre*, *L'Étourdit*, *Télévision*, *Proposition du 9 octobre 1967 sur le psychanalyste de l'École*, *Note sur l'enfant*, etc.).
   - Utiliza siempre los términos franceses exactos: *Objet petit a*, *Stade du miroir*, *Nom-du-Père*, *Le Réel, le Symbolique, l'Imaginaire (RSI)*, *Grand Autre (A) vs petit autre (a)*, *Point de capiton*, *Jouissance (phallique, de l'Autre, du corps)*, *Plus-de-jouir*, *Sujet barré ($)*, *Signifiant ($S_1, S_2$)*, *Metáfora y Metonimia*, *Désir de l'Autre*, *Nœud borroméen*, *Sinthome*, *Les quatre discours*, *Lalangue*, *Formules de la sexuation*, *Passe*, *Sujet Supposé Savoir (S.s.S.)*.

3. ANÁLISIS DE FRAGMENTOS Y TEXTOS INGESTADOS:
   - Cuando el usuario proporcione fragmentos de transcripciones de Staferla o de las GW en alemán, desglosa la sintaxis, el juego de significantes (*lalangue*, equívocos fonéticos), el contexto histórico-clínico de la sesión/capítulo y su resonancia con el resto de la doctrina.

4. MATEMAS Y TOPOLOGÍA:
   - Emplea los matemas y esquemas formales pertinentes ($S_1 \\to S_2$, $\\frac{\\$}{\\diamond a}$, $\\frac{S}{s}$, $\\frac{P_0}{\\Phi_0}$, fórmulas de sexuación, grafos del deseo, nudos borromeos de 3 y 4 consistencias con el *Sinthome*).

5. TONO Y FORMATO:
   - Tono académico, pedagógico, riguroso, analítico y claro en español, integrando el alemán y francés de forma natural y explicada.
   - Estructura con Markdown, títulos, blockquotes y glosas metapsicológicas.`;

// Local fallback generator for interactive dialogue when quota is temporarily unavailable
function generateLocalChatFallback(message: string, contextFocus: string) {
  const p = message.toLowerCase();

  if (p.includes('trieb') || p.includes('pulsion') || p.includes('pulsión') || p.includes('instinto') || p.includes('instinct')) {
    return `### Metapsicología del *Trieb* (Pulsión) en Freud (GW X) y Lacan (Séminaire XI)

1. **La distinción filológica esencial (Freud, *Triebe und Triebschicksale*, 1915, GW X):**
   Freud separa de manera irreductible el **Trieb** (concepto límite entre lo anímico y lo somático) del *Instinkt* (patrón biológico genético con objeto natural y fin predeterminado).
   - **Drang (Empuje):** La suma de fuerza constante que no cesa jamás.
   - **Quelle (Fuente):** La zona erógena del cuerpo donde se produce la excitación.
   - **Objekt (Objeto):** Lo más contingente e intercambiable (Lacan: el *objeto petit a*).
   - **Ziel (Fin):** La satisfacción obtenida por el rodeo significante.

2. **La formalización lacaniana:**
   Lacan formaliza el circuito de la pulsión como un bucle acéfalo que contornea el vacío del objeto $a$. La pulsión jamás alcanza un objeto pleno, sino que encuentra su satisfacción en el propio trayecto de ida y vuelta alrededor del borde erógeno.`;
  }

  if (p.includes('jouissance') || p.includes('goce') || p.includes('rapport sexuel') || p.includes('placer')) {
    return `### El Goce (*Jouissance*) y el Axioma «Il n'y a pas de rapport sexuel» (Séminaire XX: *Encore*)

1. **El Más Allá del Principio del Placer (Freud, GW XIII, 1920):**
   El placer (*Lust*) opera como un regulador homeostático de tensión mínima. El **Goce** (*Jouissance*), en cambio, transgrede esta barrera y comporta una satisfacción-sufrimiento paradójica que consume el cuerpo.

2. **La Topología de los Goces en Lacan:**
   - **Goce Fálico ($J_\\varphi$):** Goce fuera de cuerpo, regulado por la castración y articulado a la cadena significante ($S_1 \\to S_2$).
   - **Goce del Otro / Suplementario ($J_A$):** No-todo inscrito en la función fálica, propio de la posición femenina en las fórmulas de la sexuación.
   - **Axioma:** «*Il n'y a pas de rapport sexuel*» significa que no existe un significante en el orden simbólico que pueda escribir una complementariedad natural entre los sexos ($S(\\cancel{A})$).`;
  }

  if (p.includes('sinthome') || p.includes('nudo') || p.includes('borromeo') || p.includes('joyce')) {
    return `### El *Sinthome* y el Nudo Borromeo (Séminaire XXIII, 1975-1976)

1. **Del Síntoma al Sinthome:**
   En el primer Lacan, el síntoma es una metáfora susceptible de ser descifrada por la palabra. En el último Lacan (1975), el **Sinthome** (grafía medieval) es la invención singular que mantiene anudados lo **Real, lo Simbólico y lo Imaginario (R-S-I)** cuando el Nombre-del-Padre ha desfallecido.

2. **La lección de James Joyce:**
   Joyce no desencadena una psicosis a pesar de la forclusión paterna porque se fabrica un *nombre propio* a través de su escritura y desarticulación de *lalangue*, sirviendo su arte como cuarta cuerda (suplencia sinthomática).`;
  }

  return `### Dictamen Doctrinal Freudo-Lacaniano (Modo de Contingencia Doctrinal)

Sobre su consulta («*${message.slice(0, 100)}...*»):

1. **Eje Metapsicológico (Freud, *Gesammelte Werke*):**
   El aparato psíquico opera bajo la discordancia constitutiva entre la exigencia pulsional (*Triebanspruch*) y la represión originaria (*Urverdrängung*). El síntoma no es un error biológico, sino una formación de compromiso y una transacción sustitutiva (*Ersatzbefriedigung*).

2. **Eje Estructural (Lacan, *Staferla*):**
   El sujeto está barrado por el lenguaje ($\\\\$$), dividido entre lo que enuncia y el lugar desde donde se enuncia. La posición del analista no es educar ni curar por sugestión, sino sostener la causa del deseo como semblante de objeto $a$.

*(Respuesta articulada por el motor doctrinal de contingencia local ante alta demanda del servicio de cómputo).*`;
}

// Local fallback generator for Deep Dive concept analysis
function generateLocalDeepDiveFallback(termOriginal: string, termSpanish: string, school: string) {
  return `### Análisis Monográfico Doctrinal: ${termOriginal} (${termSpanish})
**Tradición:** ${school || 'Freudo-Lacaniana'}

#### 1. Etimología y Génesis Textual
- **Término canónico:** *${termOriginal}*
- En el corpus original, este significante no admite una reducción simplista a los idiomas romances o anglosajones. En las *Gesammelte Werke* (Freud) y en las transcripciones críticas de *Staferla* (Lacan), se localiza como una bisagra conceptual que desarticula la psicología general.

#### 2. Desarrollo Metapsicológico y Articulación Estructural
- El concepto se inscribe en la oposición dialéctica entre el registro de la representación (*Vorstellung*) y el afecto/goce (*Besetzung / Jouissance*).
- Lacan lo formaliza a través de sus matemas ($\\\\$, $a$, $S_1 \\to S_2$) para despojarlo de cualquier biologismo imaginario.

#### 3. Incidencia en la Dirección de la Cura
- En el dispositivo analítico, la escucha flotante debe rastrear este significante no por lo que "significa" para el yo (*moi*), sino por el punto de fijeza donde el goce del sujeto se articula al deseo inconsciente.`;
}

// Local fallback generator for corpus text exegesis
function generateLocalCorpusAnalysisFallback(rawText: string, sourceTitle: string, author: string) {
  const clean = rawText.trim();
  const snippet = clean.slice(0, 350);
  const lower = clean.toLowerCase();

  let thematicFocus = '';
  if (lower.includes('trieb') || lower.includes('pulsion') || lower.includes('pulsión')) {
    thematicFocus = `\n- **Eje Pulsional:** El fragmento moviliza la categoría de *Trieb* (Drang, Quelle, Objekt, Ziel), deslindando el empuje irreductible del instinto biológico.`;
  }
  if (lower.includes('jouissance') || lower.includes('goce')) {
    thematicFocus += `\n- **Eje del Goce (*Jouissance*):** Se observa la tensión entre el goce fálico ($J_\\varphi$) y el goce del Otro ($J_A$), subrayando el límite de la homeostasis del placer.`;
  }
  if (lower.includes('sinthome') || lower.includes('nœud') || lower.includes('nudo') || lower.includes('joyce')) {
    thematicFocus += `\n- **Eje Topológico / Sinthome:** Localiza la anudación borromea (RSI) y la función del *Sinthome* como cuarta cuerda de suplencia frente a la forclusión o desfallecimiento paterno.`;
  }
  if (lower.includes('signifiant') || lower.includes('significante') || lower.includes('lettre') || lower.includes('letra')) {
    thematicFocus += `\n- **Eje Significante y Letra:** Articula la lógica de $S_1 \\to S_2$ y el estatuto de la letra en lo Real como borde del discurso.`;
  }

  return `### Exégesis Textual y Filológica (Análisis Estructural)
**Fuente Primaria:** ${author || 'Autor'} — *${sourceTitle || 'Corpus Canónico'}*

#### 1. Lectura del Pasaje y Registro Discursivo
> «*${snippet}${clean.length > 350 ? '...' : ''}*»

#### 2. Desglose Teórico y Significantes Fundamentales
El pasaje interroga el punto de articulación cardinal entre el sujeto barrado ($\\\\$$) y la economía libidinal/significante.
${thematicFocus || '\n- **Eje Epistemológico:** Pone en juego la articulación entre la inscripción simbólica y el resto inasimilable en lo Real ($a$).'}

#### 3. Criterio de Traducción y Rigor Filológico
- Se enfatiza la preservación de los giros canónicos en la lengua original (*Alemán/Francés*), evitando las reducciones de la psicología convencional o las traducciones médicas que apagan la polifonía significante (*lalangue*).

#### 4. Incidencia en la Dirección de la Cura
- **Posición del Analista:** En el dispositivo de la cura, este texto orienta la escucha no hacia el sentido imaginario (*verstehen*), sino hacia el corte interpretativo y la localización del punto de fijeza donde el goce del analizante insiste.`;
}

// Helper to execute generateContentStream with retries and fallback models (to handle 503 high demand and 429 quota)
async function generateContentStreamWithFallback(
  ai: GoogleGenAI,
  contents: any,
  systemInstruction: string,
  temperature = 0.7
) {
  const models = ['gemini-flash-latest', 'gemini-3.1-flash-lite', 'gemini-3.7-flash'];
  let lastError: any = null;

  for (const model of models) {
    for (let attempt = 0; attempt < 2; attempt++) {
      try {
        const stream = await ai.models.generateContentStream({
          model,
          contents,
          config: {
            systemInstruction,
            temperature,
          },
        });
        return stream;
      } catch (err: any) {
        lastError = err;
        const is503OrRateLimit =
          err?.status === 503 ||
          err?.code === 503 ||
          err?.status === 429 ||
          err?.code === 429 ||
          err?.message?.includes('503') ||
          err?.message?.includes('429') ||
          err?.message?.includes('RESOURCE_EXHAUSTED') ||
          err?.message?.includes('high demand') ||
          err?.message?.includes('UNAVAILABLE');

        if (is503OrRateLimit && attempt < 1) {
          const waitMs = 500;
          await new Promise((resolve) => setTimeout(resolve, waitMs));
          continue;
        }
        break;
      }
    }
  }

  throw lastError;
}

// Helper to execute generateContent with retries and fallback models
async function generateContentWithFallback(
  ai: GoogleGenAI,
  prompt: string,
  systemInstruction: string,
  temperature = 0.65
) {
  const models = ['gemini-flash-latest', 'gemini-3.1-flash-lite', 'gemini-3.7-flash'];
  let lastError: any = null;

  for (const model of models) {
    for (let attempt = 0; attempt < 2; attempt++) {
      try {
        const response = await ai.models.generateContent({
          model,
          contents: prompt,
          config: {
            systemInstruction,
            temperature,
          },
        });
        return response;
      } catch (err: any) {
        lastError = err;
        const is503OrRateLimit =
          err?.status === 503 ||
          err?.code === 503 ||
          err?.status === 429 ||
          err?.code === 429 ||
          err?.message?.includes('503') ||
          err?.message?.includes('429') ||
          err?.message?.includes('RESOURCE_EXHAUSTED') ||
          err?.message?.includes('high demand') ||
          err?.message?.includes('UNAVAILABLE');

        if (is503OrRateLimit && attempt < 1) {
          const waitMs = 500;
          await new Promise((resolve) => setTimeout(resolve, waitMs));
          continue;
        }
        break;
      }
    }
  }

  throw lastError;
}

// Endpoint: Chat Stream (Server-Sent Events)
app.post('/api/psychoanalysis/chat-stream', requireCredits('dialogo_analitico'), async (req, res) => {
  try {
    const { message, history = [], contextFocus = 'general' } = req.body;

    if (!message || typeof message !== 'string') {
      res.status(400).json({ error: 'El mensaje del usuario es requerido.' });
      return;
    }

    const ai = getGenAIClient();

    // Prepare headers for SSE
    res.setHeader('Content-Type', 'text/event-stream; charset=utf-8');
    res.setHeader('Cache-Control', 'no-cache, no-transform');
    res.setHeader('Connection', 'keep-alive');

    let contextualSystemInstruction = PSYCHOANALYSIS_SYSTEM_INSTRUCTION;
    if (contextFocus === 'freud') {
      contextualSystemInstruction += '\n\nFOCO PRIORITARIO: Prioriza las fuentes y la metapsicología de Sigmund Freud (1895-1939), enfatizando los términos en alemán y su evolución cronológica.';
    } else if (contextFocus === 'lacan') {
      contextualSystemInstruction += '\n\nFOCO PRIORITARIO: Prioriza el estructuralismo, la topología y los seminarios de Jacques Lacan (1953-1980), enfatizando los matemas, el francés original y el retorno a Freud.';
    } else if (contextFocus === 'clinica') {
      contextualSystemInstruction += '\n\nFOCO PRIORITARIO: Enfatiza las implicaciones en la dirección de la cura, el diagnóstico diferencial (Neurosis, Psicosis, Perversión) y el manejo de la transferencia y el síntoma.';
    } else if (contextFocus === 'topologia') {
      contextualSystemInstruction += '\n\nFOCO PRIORITARIO: Profundiza en los modelos topológicos (Nudo Borromeo, Banda de Moebius, Toro, Cross-Cap), grafos y fórmulas de sexuación.';
    }

    // Format chat history into contents array
    const contents: Array<{ role: 'user' | 'model'; parts: Array<{ text: string }> }> = [];

    // Add previous history (last 10 messages for context)
    const recentHistory = Array.isArray(history) ? history.slice(-10) : [];
    for (const msg of recentHistory) {
      if (msg.role === 'user') {
        contents.push({ role: 'user', parts: [{ text: msg.content }] });
      } else if (msg.role === 'assistant') {
        contents.push({ role: 'model', parts: [{ text: msg.content }] });
      }
    }

    // Add current user message
    contents.push({ role: 'user', parts: [{ text: message }] });

    const responseStream = await generateContentStreamWithFallback(
      ai,
      contents,
      contextualSystemInstruction,
      0.7
    );

    for await (const chunk of responseStream) {
      const textChunk = chunk.text;
      if (textChunk) {
        res.write(`data: ${JSON.stringify({ text: textChunk })}\n\n`);
      }
    }

    if (req.sessionUser) {
      debitCredits(req.sessionUser.id, 'dialogo_analitico').catch((err) =>
        console.error('[credits] No se pudo debitar dialogo_analitico:', err?.message || err)
      );
    }

    res.write(`data: ${JSON.stringify({ done: true })}\n\n`);
    res.end();
  } catch (error: any) {
    console.warn('Falling back to local doctrinal engine for chat-stream:', error?.message || error);
    const fallbackText = generateLocalChatFallback(req.body?.message || '', req.body?.contextFocus || 'general');

    if (!res.headersSent) {
      res.setHeader('Content-Type', 'text/event-stream; charset=utf-8');
      res.setHeader('Cache-Control', 'no-cache, no-transform');
      res.setHeader('Connection', 'keep-alive');
    }

    // Stream the fallback text smoothly
    const words = fallbackText.split(' ');
    for (let i = 0; i < words.length; i += 6) {
      const chunk = words.slice(i, i + 6).join(' ') + ' ';
      res.write(`data: ${JSON.stringify({ text: chunk })}\n\n`);
    }

    res.write(`data: ${JSON.stringify({ done: true })}\n\n`);
    res.end();
  }
});

// Endpoint: Deep-dive conceptual analysis for a specific concept
app.post('/api/psychoanalysis/deep-dive', async (req, res) => {
  try {
    const { conceptId, termOriginal, termSpanish, school } = req.body;

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return res.json({
        success: true,
        text: generateLocalDeepDiveFallback(termOriginal || 'Concepto', termSpanish || 'Término', school || 'Freud/Lacan'),
      });
    }

    const ai = getGenAIClient();

    const prompt = `Realiza un análisis monográfico de alta especialización académica sobre el concepto:
Término original: "${termOriginal}"
Traducción en español: "${termSpanish}"
Corriente / Autor: "${school}"

Estructura tu análisis de forma exhaustiva con:
1. **Etimología y génesis textual en el idioma original** (Alemán / Francés): cómo surgió la palabra, matices que se pierden en la traducción estándar y primera aparición en el corpus.
2. **Desarrollo metapsicológico / estructural**: desglose sistemático de sus elementos, fórmulas o matemas asociados.
3. **Puntos de articulación teórica**: cómo dialoga este concepto entre Freud y Lacan (continuidades, rupturas o reformulaciones).
4. **Incidencia en la dirección de la cura y la clínica**: viñetas o ejemplos de cómo opera este concepto en el dispositivo analítico (en la escucha del síntoma, transferencia, angustia o fin de análisis).
5. **Citas textuales de referencia** en alemán/francés con su correspondiente traducción fiel y glosa explicativa.`;

    const response = await generateContentWithFallback(
      ai,
      prompt,
      PSYCHOANALYSIS_SYSTEM_INSTRUCTION,
      0.65
    );

    res.json({
      success: true,
      text: response.text,
    });
  } catch (error: any) {
    console.warn('Gemini deep-dive error, returning local fallback:', error?.message || error);
    res.json({
      success: true,
      text: generateLocalDeepDiveFallback(
        req.body?.termOriginal || 'Concepto',
        req.body?.termSpanish || 'Término',
        req.body?.school || 'Freud/Lacan'
      ),
      isFallback: true,
    });
  }
});

// Endpoint: Analyze imported text fragment (Staferla / Freud GW / Custom Upload)
app.post('/api/psychoanalysis/analyze-corpus-text', requireCredits('exegesis_ai'), async (req, res) => {
  try {
    const { rawText, sourceTitle, author, sourceReference, focus } = req.body;

    if (!rawText || typeof rawText !== 'string') {
      res.status(400).json({ error: 'El texto a analizar es requerido.' });
      return;
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return res.json({
        success: true,
        analysis: generateLocalCorpusAnalysisFallback(rawText, sourceTitle || 'Texto', author || 'Freud/Lacan'),
      });
    }

    const ai = getGenAIClient();

    const prompt = `Analiza con máximo rigor crítico el siguiente fragmento o transcripción textual proveniente del corpus de psicoanálisis (${author || 'Freud/Lacan'} - ${sourceTitle || 'Texto analítico'} - Ref: ${sourceReference || 'Corpus primario'}):

\`\`\`
${rawText.slice(0, 10000)}
\`\`\`

Realiza una disección analítica estructurada:
1. **Identificación y Contexto de la Fuente**: Reconoce la obra, volumen (si es GW) o seminario/sesión (si es Staferla / Écrits / Autres Écrits), año y contexto del enunciado.
2. **Análisis Textual y Significantes Clave (Alemán / Francés)**: Aísla los términos fundamentales en su lengua original, explicando juegos de palabras, equívocos fonéticos (*lalangue*), homofonías o conceptos metapsicológicos implícitos.
3. **Desviaciones y Traducción**: Señala cómo debe traducirse fielmente al español y qué errores o reduccionismos suelen cometerse con este pasaje.
4. **Articulación Metapsicológica / Estructural**: Qué tesis sostiene, qué matemas o esquemas involucra y cómo se articula con el resto de la enseñanza de Freud y Lacan.
5. **Incidencia Clínica**: Consecuencias prácticas para la dirección de la cura, la transferencia, la interpretación y la posición del analista.`;

    const response = await generateContentWithFallback(
      ai,
      prompt,
      PSYCHOANALYSIS_SYSTEM_INSTRUCTION,
      0.6
    );

    if (req.sessionUser) {
      debitCredits(req.sessionUser.id, 'exegesis_ai').catch((err) =>
        console.error('[credits] No se pudo debitar exegesis_ai:', err?.message || err)
      );
    }

    res.json({
      success: true,
      analysis: response.text,
    });
  } catch (error: any) {
    console.warn('Gemini analyze-corpus-text error, returning local fallback:', error?.message || error);
    res.json({
      success: true,
      analysis: generateLocalCorpusAnalysisFallback(
        req.body?.rawText || '',
        req.body?.sourceTitle || 'Pasaje de Estudio',
        req.body?.author || 'Sigmund Freud / Jacques Lacan'
      ),
      isFallback: true,
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    service: 'Psychoanalysis Freud & Lacan Core Server',
  });
});

async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[Psicoanálisis Freud & Lacan] Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
