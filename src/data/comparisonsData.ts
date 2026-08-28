import { ConceptComparison } from '../types';

export const COMPARISONS_DATA: ConceptComparison[] = [
  {
    id: 'trieb-vs-instinkt',
    title: 'Pulsión (Trieb) vs Instinto (Instinkt)',
    conceptA: {
      term: 'Trieb (Pulsión)',
      language: 'Alemán (Freud / Lacan)',
      author: 'Freud (1905, 1915) / Lacan (Seminario XI)',
      coreMeaning: 'Empuje constante (Drang), plástico y fronterizo, sin objeto prefijado en la naturaleza biológica. Se satisface en el recorrido de su propio circuito alrededor de zonas erógenas.'
    },
    conceptB: {
      term: 'Instinkt (Instinto)',
      language: 'Alemán / Biología clásica',
      author: 'Etología / Psicología evolutiva',
      coreMeaning: 'Patrón hereditario rígido de conducta biológica estereotipada con un objeto natural determinado orientado a la supervivencia o reproducción de la especie.'
    },
    keyDifference: 'La pulsión humana no tiene objeto natural ni armonía biológica; su objeto es contingente y su fin es la repetición del circuito de satisfacción parcial. El instinto se satisface en la consumación de una necesidad fisiológica.',
    commonConfusion: 'La traducción inglesa de James Strachey (Standard Edition) vertió sistemáticamente "Trieb" como "instinct", originando la desnaturalización biologicista del psicoanálisis en el mundo anglosajón.',
    clinicalConsequence: 'En el análisis no se trata de "corregir desajustes instintivos", sino de descifrar el montaje pulsional singular y las fijaciones infantiles inscritas en el cuerpo por el lenguaje.'
  },
  {
    id: 'verdrangung-vs-verwerfung-vs-verleugnung',
    title: 'Represión (Verdrängung) vs Forclusión (Verwerfung) vs Desmentida (Verleugnung)',
    conceptA: {
      term: 'Verdrängung (Represión - Neurosis)',
      language: 'Alemán (Freud)',
      author: 'Freud (1915) / Lacan (1957)',
      coreMeaning: 'El significante inconciliable es inscrito en el orden Simbólico pero censurado de la conciencia; retorna desde el interior de lo simbólico como síntoma, lapsus o sueño.'
    },
    conceptB: {
      term: 'Verwerfung / Forclusion (Psicosis)',
      language: 'Alemán / Francés',
      author: 'Freud (1918) / Lacan (Seminario III, 1955)',
      coreMeaning: 'Rechazo radical y falta de inscripción del significante primordial (Nombre-del-Padre) en lo Simbólico. Lo no simbolizado retorna en lo Real como alucinación y delirio.'
    },
    keyDifference: 'La represión inscribe y oculta (genera metáfora y neurosis); la forclusión no inscribe y agujerea lo simbólico (genera psicosis); la desmentida (Verleugnung) divide al yo admitiendo y renegando la castración simultáneamente (perversión).',
    commonConfusion: 'Confundir el delirio psicótico con un "síntoma neurótico reprimido" o una simple "fantasía inconsciente". Tratar a un psicótico con la técnica de desciframiento neurótico puede provocar descompensaciones clínicas graves.',
    clinicalConsequence: 'Diagnóstico diferencial nodal: en la neurosis se interpreta la falta; en la psicosis no se interpreta la falta fálica sino que se acompaña la estabilización y la suplencia metafórica (sinthome).'
  },
  {
    id: 'desir-vs-jouissance',
    title: 'Deseo (Wunsch / Désir) vs Goce (Jouissance)',
    conceptA: {
      term: 'Désir (Deseo / Wunsch)',
      language: 'Francés (Lacan) / Alemán (Freud)',
      author: 'Freud (1900) / Lacan (1958)',
      coreMeaning: 'Falta articulada en la cadena significante; busca una satisfacción que siempre se desplaza metonímicamente de objeto en objeto sin colmarse jamás.'
    },
    conceptB: {
      term: 'Jouissance (Goce)',
      language: 'Francés (Lacan)',
      author: 'Lacan (Seminarios VII, XVII, XX)',
      coreMeaning: 'Satisfacción pulsional inmediata y excesiva en el cuerpo que desborda el principio del placer, transformándose en sufrimiento sintomático y fijeza libidinal.'
    },
    keyDifference: 'El deseo está del lado de la falta, el movimiento metonímico y el lenguaje (Simbólico); el goce está del lado de la plenitud corporal mortífera, la fijeza inercial y lo Real que resiste al significante.',
    commonConfusion: 'Confundir gozar con "pasarla bien" o disfrutar conscientemente. El goce freudo-lacaniano es la ganancia secreta y dolorosa del síntoma que hace que el sujeto no quiera curarse.',
    clinicalConsequence: 'Un análisis no sólo esclarece el deseo inconsciente reprimido, sino que debe operar sobre el nudo de goce opaco que mantiene apresado al analizante en su repetición sintomática.'
  },
  {
    id: 'ich-moi-vs-sujet',
    title: 'Yo (Ich / Moi) vs Sujeto del Inconsciente (Sujet $)',
    conceptA: {
      term: 'Ich / Moi (El Yo)',
      language: 'Alemán / Francés',
      author: 'Freud (1914, 1923) / Lacan (1949)',
      coreMeaning: 'Instancia imaginaria fundada en el estadio del espejo mediante la identificación alienante a la imagen del semejante. Lugar del desconocimiento, la síntesis ilusoria y la defensa.'
    },
    conceptB: {
      term: 'Sujet barré ($ / Sujeto dividido)',
      language: 'Francés (Lacan)',
      author: 'Lacan (1957, 1960)',
      coreMeaning: 'Efecto de la articulación significante ($S_1 \\to S_2$). El sujeto no es una sustancia psíquica ni la conciencia, sino una falta en ser dividida por el lenguaje.'
    },
    keyDifference: 'El Yo cree que es el amo de su discurso ("Pienso, luego existo"); el Sujeto es aquel que se manifiesta en los tropiezos del Yo: en el chiste, el lapsus, el acto fallido y el síntoma ("Pienso donde no soy, soy donde no pienso").',
    commonConfusion: 'La corriente hegemónica de la "Ego Psychology" (Hartmann, Kris, Loewenstein) proponía fortalecer el Yo del paciente para adaptarlo a la realidad, lo que para Lacan constituía una traición total al descubrimiento freudiano.',
    clinicalConsequence: 'La meta del psicoanálisis lacaniano no es la adaptación o el refuerzo del yo, sino la destitución del narcisismo yoico y la asunción de la división subjetiva.'
  },
  {
    id: 'angst-angoisse',
    title: 'Angustia en Freud (1926) vs Angustia en Lacan (Seminario X)',
    conceptA: {
      term: 'Angst als Signal (Angustia Señal)',
      language: 'Alemán (Freud)',
      author: 'Freud (1926: Inhibición, síntoma y angustia)',
      coreMeaning: 'Reacción del Yo ante una situación de peligro inminente (pérdida del objeto, castración). La angustia señal moviliza el mecanismo de defensa de la represión.'
    },
    conceptB: {
      term: 'L\'Angoisse (La Angustia / No sin objeto)',
      language: 'Francés (Lacan)',
      author: 'Lacan (Seminario X: La angustia, 1962-1963)',
      coreMeaning: 'Afecto que no engaña. No surge por la falta del objeto, sino por la inminencia de la falta de la falta: cuando el objeto a aparece demasiado cerca en lo Real amenazando con asfixiar al sujeto.'
    },
    keyDifference: 'Para Freud, la angustia surge ante el peligro de la pérdida; para Lacan, la angustia más radical no es por la falta del objeto, sino cuando no hay falta (la intrusión invasiva del deseo del Otro que no deja espacio al sujeto).',
    commonConfusion: 'Decir que la angustia es un afecto "sin objeto" (como sostenía la psiquiatría y el existencialismo kierkegaardiano). Lacan afirma categóricamente: "La angustia no es sin objeto" (su objeto es el objeto a).',
    clinicalConsequence: 'La angustia es la brújula en la cura: indica la proximidad de lo Real y permite al analista maniobrar para reinstaurar la distancia protectora del fantasma.'
  }
];
