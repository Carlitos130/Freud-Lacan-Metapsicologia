import { PrimaryTextItem, CorpusRepositoryItem } from '../types';

export const TEXTS_DATA: PrimaryTextItem[] = [
  {
    id: 'traumdeutung',
    author: 'Sigmund Freud',
    titleSpanish: 'La interpretación de los sueños',
    titleOriginal: 'Die Traumdeutung',
    year: 1900,
    type: 'book',
    collection: 'Gesammelte Werke II/III / Amorrortu Vol. IV-V',
    gwVolume: 'GW II/III',
    summary: 'Obra fundacional del psicoanálisis donde Freud demuestra que el sueño no es un fenómeno somático caótico sino la "vía regia" hacia el inconsciente y una realización (disfrazada) de deseos reprimidos.',
    centralTheses: [
      'El sueño es una formación del inconsciente que cumple el deseo de forma alucinatoria (Wunscherfüllung).',
      'El trabajo del sueño (Traumarbeit) transforma el contenido latente en manifiesto a través de la condensación (Verdichtung) y el desplazamiento (Verschiebung).',
      'El ombligo del sueño (Traumnabel) marca el límite donde la interpretación choca con lo no reconocido (lo no analizable que anticipa lo Real).'
    ],
    keyOriginalTerms: ['Traumarbeit', 'Wunscherfüllung', 'Verdichtung', 'Verschiebung', 'Traumnabel', 'Latenter Trauminhalt'],
    famousQuotes: [
      {
        original: 'Die Traumdeutung ist die Via regia zur Kenntnis des Unbewußten im Seelenleben.',
        spanish: 'La interpretación de los sueños es la vía regia hacia el conocimiento de lo inconsciente en la vida anímica.',
        locator: 'GW II/III, p. 613'
      },
      {
        original: 'Jeder Traum hat mindestens eine Stelle, an welcher er unergründlich ist, gleichsam einen Nabel, durch den er mit dem Unerkannten zusammenhängt.',
        spanish: 'Todo sueño tiene al menos un lugar insondable, por así decir un ombligo por el cual se conecta con lo no conocido.',
        locator: 'GW II/III, p. 530'
      }
    ],
    historicalContext: 'Publicado formalmente en noviembre de 1899 pero fechado simbólicamente por el editor Franz Deuticke en 1900 para inaugurar el nuevo siglo.',
    clinicalImpact: 'Estableció el método de asociación libre y el paradigma del desciframiento de las formaciones del inconsciente.',
    externalLink: 'https://archive.org/details/gesammeltewerke02freu'
  },
  {
    id: 'jenseits-lustprinzips',
    author: 'Sigmund Freud',
    titleSpanish: 'Más allá del principio de placer',
    titleOriginal: 'Jenseits des Lustprinzips',
    year: 1920,
    type: 'book',
    collection: 'Gesammelte Werke XIII / Amorrortu Vol. XVIII',
    gwVolume: 'GW XIII, pp. 1-69',
    summary: 'Giro metapsicológico de 1920. Freud introduce la pulsión de muerte (Todestrieb) y la compulsión a la repetición para explicar fenómenos clínicos que el principio de placer no lograba resolver.',
    centralTheses: [
      'Existe una compulsión de repetición (Wiederholungszwang) más originaria que el principio de placer.',
      'El juego infantil del carretel (Fort-Da) muestra cómo el niño elabora simbólicamente la angustia de la separación materna.',
      'Dualismo pulsional fundamental: Eros (pulsiones de vida) frente a Todestrieb (pulsión de muerte).'
    ],
    keyOriginalTerms: ['Todestrieb', 'Eros', 'Wiederholungszwang', 'Fort-Da', 'Lustprinzip', 'Nirwanaprinzip'],
    famousQuotes: [
      {
        original: 'Das Ziel alles Lebens ist der Tod.',
        spanish: 'La meta de toda vida es la muerte.',
        locator: 'GW XIII, p. 40'
      },
      {
        original: 'Es gibt im Seelenleben wirklich einen Wiederholungszwang, der sich über das Lustprinzip hinaussetzt.',
        spanish: 'Existe verdaderamente en la vida anímica una compulsión de repetición que se sobrepone al principio de placer.',
        locator: 'GW XIII, p. 20'
      }
    ],
    historicalContext: 'Escrito en el contexto de los traumas de guerra de 1914-1918 y la trágica muerte por gripe española de su hija Sophie.',
    clinicalImpact: 'Permitió comprender las resistencias terapéuticas más recalcitrantes, el masoquismo erógeno y la reacción terapéutica negativa.',
    externalLink: 'https://archive.org/details/gesammeltewerke13freu'
  },
  {
    id: 'das-ich-und-das-es',
    author: 'Sigmund Freud',
    titleSpanish: 'El yo y el ello',
    titleOriginal: 'Das Ich und das Es',
    year: 1923,
    type: 'essay',
    collection: 'Gesammelte Werke XIII / Amorrortu Vol. XIX',
    gwVolume: 'GW XIII, pp. 235-289',
    summary: 'Presentación formal de la Segunda Tópica freudiana: el aparato anímico organizado en las tres instancias estructurales: Ello (Es), Yo (Ich) y Superyó (Über-Ich).',
    centralTheses: [
      'El Yo no es sinónimo de conciencia; una parte sustancial del Yo es inconsciente y ejecuta represiones.',
      'El Superyó se erige como heredero del complejo de Edipo por la introyección de la autoridad paterna.',
      'El Yo se encuentra en servidumbre ante tres tiranos: la realidad exterior, el Ello y el Superyó.'
    ],
    keyOriginalTerms: ['Das Es', 'Das Ich', 'Das Über-Ich', 'Ich-Ideal', 'Schuldgefühl'],
    famousQuotes: [
      {
        original: 'Das Ich ist vor allem ein körperliches, es ist nicht nur ein Oberflächenwesen, sondern selbst die Projektion einer Oberfläche.',
        spanish: 'El Yo es ante todo un ser corpóreo; no es sólo un ser superficial, sino él mismo la proyección de una superficie.',
        locator: 'GW XIII, p. 253'
      }
    ],
    historicalContext: 'Culminación de la reestructuración teórica iniciada en 1920 tras el descubrimiento de la pulsión de muerte.',
    clinicalImpact: 'Sentó las bases para el análisis de las instancias críticas, la culpa inconsciente y el desgarro subjetivo.',
    externalLink: 'https://archive.org/details/gesammeltewerke13freu'
  },
  {
    id: 'seminaire-xi',
    author: 'Jacques Lacan',
    titleSpanish: 'El Seminario, Libro 11: Los cuatro conceptos fundamentales del psicoanálisis',
    titleOriginal: 'Le Séminaire, Livre XI: Les quatre concepts fondamentaux de la psychanalyse',
    year: 1964,
    type: 'seminar',
    collection: 'Le Séminaire / Staferla Transcription & Seuil',
    staferlaReference: 'Staferla Séminaire XI (1964) / Éd. de l\'Association',
    summary: 'Seminario bisagra dictado en la École Normale Supérieure tras la "excomunión" de Lacan de la IPA. Refundamenta los cuatro conceptos pilares del psicoanálisis: Inconsciente, Repetición, Transferencia y Pulsión.',
    centralTheses: [
      'El inconsciente freudiano opera en una hiancia temporal (Béance) de apertura y cierre.',
      'La repetición se desdobla en el encuentro fallido con lo Real (Tuché) y el retorno de los signos (Automaton).',
      'La transferencia no es pura afectividad sino la operación del Sujeto Supuesto Saber (Sujet Supposé Savoir).',
      'La pulsión es un montaje en bucle alrededor del objeto a; no persigue un fin genital sino el recorrido mismo del borde.'
    ],
    keyOriginalTerms: ['Inconscient', 'Répétition (Tuché/Automaton)', 'Transfert (S.s.S.)', 'Pulsion', 'Objet petit a', 'Regard', 'Voix'],
    famousQuotes: [
      {
        original: 'L\'inconscient se manifeste toujours comme ce qui vacille dans une coupure du sujet.',
        spanish: 'El inconsciente se manifiesta siempre como lo que vacila en un corte del sujeto.',
        locator: 'Séminaire XI / Staferla, Séance du 22 janvier 1964'
      },
      {
        original: 'Le désir de l\'analyste n\'est pas un désir pur. C\'est un désir d\'obtenir la différence absolue.',
        spanish: 'El deseo del analista no es un deseo puro. Es un deseo de obtener la diferencia absoluta.',
        locator: 'Séminaire XI / Staferla, Séance du 24 juin 1964'
      }
    ],
    historicalContext: 'Pronunciado ante un público multidisciplinario con la presencia de Louis Althusser, Jacques-Alain Miller y François Wahl.',
    clinicalImpact: 'Aisla los objetos pulsionales de la mirada y la voz y redefine radicalmente el fin del análisis más allá de la identificación al analista.',
    externalLink: 'http://staferla.free.fr'
  },
  {
    id: 'ecrits-instance-lettre',
    author: 'Jacques Lacan',
    titleSpanish: 'La instancia de la letra en el inconsciente o la razón desde Freud',
    titleOriginal: 'L\'instance de la lettre dans l\'inconscient ou la raison depuis Freud',
    year: 1957,
    type: 'essay',
    collection: 'Écrits, pp. 493-528 / Pas-tout Lacan',
    staferlaReference: 'Écrits (1966) / Pas-tout Lacan',
    summary: 'Manifiesto epistemológico del estructuralismo lacaniano donde formaliza el algoritmo S/s y demuestra la homología entre los mecanismos del inconsciente (condensación/desplazamiento) y las figuras retóricas (metáfora/metonimia).',
    centralTheses: [
      'El inconsciente está estructurado como un lenguaje.',
      'La condensación freudiana (Verdichtung) opera según la estructura de la Metáfora.',
      'El desplazamiento freudiano (Verschiebung) opera según la estructura de la Metonimia.',
      'El sujeto no es el autor de su pensamiento (Cogito cartesiano) sino el efecto de la cadena significante.'
    ],
    keyOriginalTerms: ['Lettre', 'Signifiant/Signifié', 'Métaphore', 'Métonymie', 'Point de capiton', 'Algorithme saussurien'],
    famousQuotes: [
      {
        original: 'Je pense où je ne suis pas, donc je suis où je ne pense pas.',
        spanish: 'Pienso donde no soy, luego soy donde no pienso.',
        locator: 'Écrits, p. 517'
      }
    ],
    historicalContext: 'Conferencia pronunciada en la Universidad de la Sorbona para el grupo de filosofía de la Federación de Estudiantes de Letras.',
    clinicalImpact: 'Permitió una clínica orientada a la escucha de la letra y el equívoco significante (homofonías, sintaxis del síntoma).',
    externalLink: 'http://staferla.free.fr'
  },
  {
    id: 'seminaire-xx-encore',
    author: 'Jacques Lacan',
    titleSpanish: 'El Seminario, Libro 20: Aún',
    titleOriginal: 'Le Séminaire, Livre XX: Encore',
    year: '1972-1973',
    type: 'seminar',
    collection: 'Le Séminaire / Staferla Transcription & Seuil',
    staferlaReference: 'Staferla Séminaire XX (1972-1973) / Version critique',
    summary: 'La cumbre de la enseñanza lacaniana sobre el amor, el goce femenino y la imposibilidad de la relación sexual. Presentación de las Fórmulas de la Sexuación y el concepto de Lalangue.',
    centralTheses: [
      '«No hay relación sexual» (Il n\'y a pas de rapport sexuel): la relación entre los sexos no puede escribirse en una complementariedad simétrica.',
      'Diferenciación entre el Goce Fálico (limitado, del lado masculino) y el Goce del Otro o No-Todo (del lado femenino).',
      'La mujer es "No-Toda" (Pas-toute) respecto a la función fálica; la mujer como universal no existe.',
      'Lalangue (lalengua): la dimensión material y gozante de la lengua previa a la estructura gramatical.'
    ],
    keyOriginalTerms: ['Il n\'y a pas de rapport sexuel', 'Jouissance de l\'Autre', 'Pas-toute', 'Lalangue', 'Formules de la sexuation'],
    famousQuotes: [
      {
        original: 'Il n\'y a pas de rapport sexuel... Le sexe ne fait pas un deux.',
        spanish: 'No hay relación sexual... El sexo no hace un dos.',
        locator: 'Séminaire XX / Staferla, Séance du 21 novembre 1972'
      },
      {
        original: 'La femme n\'existe pas, pour autant que dans son essence elle est pas-toute.',
        spanish: 'La mujer no existe, en tanto que en su esencia ella es no-toda.',
        locator: 'Séminaire XX / Staferla, Séance du 13 mars 1973'
      }
    ],
    historicalContext: 'Dictado en la Facultad de Derecho del Panteón de París ante audiencias masivas, en pleno debate con el feminismo y la lingüística.',
    clinicalImpact: 'Desmitificó el ideal de la armonía conyugal/genital y abrió la clínica moderna del no-todo y los goces no fálicos.',
    externalLink: 'http://staferla.free.fr'
  }
];

// Complete Directory of Lacan Seminars (Staferla / Pas-tout Lacan / Autres Écrits)
export const STAFERLA_LACAN_CATALOG: CorpusRepositoryItem[] = [
  {
    id: 'staf-sem-1',
    author: 'Jacques Lacan',
    title: 'Seminario 1: Los escritos técnicos de Freud',
    originalTitle: 'Livre I: Les écrits techniques de Freud',
    year: '1953-1954',
    category: 'seminar_staferla',
    volumeOrNumber: 'Séminaire I',
    description: 'Inauguración del retorno a Freud. Esquema óptico, el estadio del espejo, resistencia y transferencia.',
    staferlaOrGwLink: 'http://staferla.free.fr/S1/S1.htm',
    keyThemes: ['Schéma optique', 'Moi idéal vs Idéal du moi', 'Résistance', 'Parole pleine vs vide'],
    canonicalDate: '1953-1954 (Sainte-Anne)'
  },
  {
    id: 'staf-sem-2',
    author: 'Jacques Lacan',
    title: 'Seminario 2: El yo en la teoría de Freud y en la técnica psicoanalítica',
    originalTitle: 'Livre II: Le moi dans la théorie de Freud et dans la technique de la psychanalyse',
    year: '1954-1955',
    category: 'seminar_staferla',
    volumeOrNumber: 'Séminaire II',
    description: 'La máquina cibernética, el Esquema L, el sueño de la inyección de Irma y el orden simbólico.',
    staferlaOrGwLink: 'http://staferla.free.fr/S2/S2.htm',
    keyThemes: ['Schéma L', 'Injection d\'Irma', 'Cybernetique', 'Au-delà du principe de plaisir'],
    canonicalDate: '1954-1955 (Sainte-Anne)'
  },
  {
    id: 'staf-sem-3',
    author: 'Jacques Lacan',
    title: 'Seminario 3: Las psicosis',
    originalTitle: 'Livre III: Les psychoses',
    year: '1955-1956',
    category: 'seminar_staferla',
    volumeOrNumber: 'Séminaire III',
    description: 'Caso Schreber, formalización de la Verwerfung (forclusión) y la metáfora paterna.',
    staferlaOrGwLink: 'http://staferla.free.fr/S3/S3.htm',
    keyThemes: ['Verwerfung (Forclusion)', 'Nom-du-Père', 'Schreber', 'Psychose'],
    canonicalDate: '1955-1956 (Sainte-Anne)'
  },
  {
    id: 'staf-sem-4',
    author: 'Jacques Lacan',
    title: 'Seminario 4: La relación de objeto',
    originalTitle: 'Livre IV: La relation d\'objet',
    year: '1956-1957',
    category: 'seminar_staferla',
    volumeOrNumber: 'Séminaire IV',
    description: 'Tabla de las tres faltas de objeto: Castración, Frustración y Privación. El caso Juanito (Hans).',
    staferlaOrGwLink: 'http://staferla.free.fr/S4/S4.htm',
    keyThemes: ['Castration / Frustration / Privation', 'Petit Hans', 'Phallus imaginaire / symbolique'],
    canonicalDate: '1956-1957 (Sainte-Anne)'
  },
  {
    id: 'staf-sem-5',
    author: 'Jacques Lacan',
    title: 'Seminario 5: Las formaciones del inconsciente',
    originalTitle: 'Livre V: Les formations de l\'inconscient',
    year: '1957-1958',
    category: 'seminar_staferla',
    volumeOrNumber: 'Séminaire V',
    description: 'Desarrollo completo del Grafo del Deseo (Graphe du Désir), el chiste (Witz) y los 3 tiempos del Edipo.',
    staferlaOrGwLink: 'http://staferla.free.fr/S5/S5.htm',
    keyThemes: ['Graphe du Désir', 'Witz', 'Métaphore paternelle', 'Trois temps de l\'Œdipe'],
    canonicalDate: '1957-1958 (Sainte-Anne)'
  },
  {
    id: 'staf-sem-6',
    author: 'Jacques Lacan',
    title: 'Seminario 6: El deseo y su interpretación',
    originalTitle: 'Livre VI: Le désir et son interprétation',
    year: '1958-1959',
    category: 'seminar_staferla',
    volumeOrNumber: 'Séminaire VI',
    description: 'Lectura de Hamlet, el fantasma ($ ◊ a), el corte significante y la fórmula del deseo.',
    staferlaOrGwLink: 'http://staferla.free.fr/S6/S6.htm',
    keyThemes: ['Hamlet', 'Fantasme ($ ◊ a)', 'Coupure', 'Désir de l\'Autre'],
    canonicalDate: '1958-1959 (Sainte-Anne)'
  },
  {
    id: 'staf-sem-7',
    author: 'Jacques Lacan',
    title: 'Seminario 7: La ética del psicoanálisis',
    originalTitle: 'Livre VII: L\'éthique de la psychanalyse',
    year: '1959-1960',
    category: 'seminar_staferla',
    volumeOrNumber: 'Séminaire VII',
    description: 'Das Ding (La Cosa), Antígona, el goce (Jouissance), Sade con Kant y el no ceder en el deseo.',
    staferlaOrGwLink: 'http://staferla.free.fr/S7/S7.htm',
    keyThemes: ['Das Ding', 'Antigone', 'Jouissance', 'Ne pas céder sur son désir', 'Sublimation'],
    canonicalDate: '1959-1960 (Sainte-Anne)'
  },
  {
    id: 'staf-sem-8',
    author: 'Jacques Lacan',
    title: 'Seminario 8: La transferencia',
    originalTitle: 'Livre VIII: Le transfert',
    year: '1960-1961',
    category: 'seminar_staferla',
    volumeOrNumber: 'Séminaire VIII',
    description: 'El Banquete de Platón, Sócrates y Alcibíades, el Ágalma y la función del amante (erastès) y el amado (erômenos).',
    staferlaOrGwLink: 'http://staferla.free.fr/S8/S8.htm',
    keyThemes: ['Le Banquet de Platon', 'Agalma', 'Érastès / Érôménos', 'Désir de l\'analyste'],
    canonicalDate: '1960-1961 (Sainte-Anne)'
  },
  {
    id: 'staf-sem-9',
    author: 'Jacques Lacan',
    title: 'Seminario 9: La identificación',
    originalTitle: 'Livre IX: L\'identification',
    year: '1961-1962',
    category: 'seminar_staferla',
    volumeOrNumber: 'Séminaire IX',
    description: 'Introducción de la topología: Banda de Moebius, Toro, el rasgo unario (Einziger Zug) y el significante de la falta.',
    staferlaOrGwLink: 'http://staferla.free.fr/S9/S9.htm',
    keyThemes: ['Bande de Moebius', 'Tore', 'Trait unaire (Einziger Zug)', 'Topologie'],
    canonicalDate: '1961-1962 (Sainte-Anne)'
  },
  {
    id: 'staf-sem-10',
    author: 'Jacques Lacan',
    title: 'Seminario 10: La angustia',
    originalTitle: 'Livre X: L\'angoisse',
    year: '1962-1963',
    category: 'seminar_staferla',
    volumeOrNumber: 'Séminaire X',
    description: 'Deducción del Objeto petit a (resto real, causa del deseo). La angustia no es sin objeto (sensación de falta de la falta).',
    staferlaOrGwLink: 'http://staferla.free.fr/S10/S10.htm',
    keyThemes: ['Objet petit a', 'Angoisse', 'Acting-out vs Passage à l\'acte', 'Césure'],
    canonicalDate: '1962-1963 (Sainte-Anne)'
  },
  {
    id: 'staf-sem-11',
    author: 'Jacques Lacan',
    title: 'Seminario 11: Los cuatro conceptos fundamentales',
    originalTitle: 'Livre XI: Les quatre concepts fondamentaux de la psychanalyse',
    year: '1964',
    category: 'seminar_staferla',
    volumeOrNumber: 'Séminaire XI',
    description: 'Inconsciente, Repetición (Tuché/Automaton), Transferencia (S.s.S.) y Pulsión. Mirada y voz como objetos.',
    staferlaOrGwLink: 'http://staferla.free.fr/S11/S11.htm',
    keyThemes: ['Tuché / Automaton', 'Sujet Supposé Savoir', 'Regard / Voix', 'Aliénation / Séparation'],
    canonicalDate: '1964 (ENS)'
  },
  {
    id: 'staf-sem-17',
    author: 'Jacques Lacan',
    title: 'Seminario 17: El reverso del psicoanálisis',
    originalTitle: 'Livre XVII: L\'envers de la psychanalyse',
    year: '1969-1970',
    category: 'seminar_staferla',
    volumeOrNumber: 'Séminaire XVII',
    description: 'Estructura cuadrípode de los Cuatro Discursos: Amo, Universitario, Histérica y Analista. El Plus-de-gozar.',
    staferlaOrGwLink: 'http://staferla.free.fr/S17/S17.htm',
    keyThemes: ['Quatre discours', 'Plus-de-jouir', 'Savoir vs Vérité', 'Maître contemporain'],
    canonicalDate: '1969-1970 (Panthéon)'
  },
  {
    id: 'staf-sem-20',
    author: 'Jacques Lacan',
    title: 'Seminario 20: Aún',
    originalTitle: 'Livre XX: Encore',
    year: '1972-1973',
    category: 'seminar_staferla',
    volumeOrNumber: 'Séminaire XX',
    description: 'Fórmulas de la sexuación, el No-todo (Pas-toute), Lalangue, y el axioma «No hay relación sexual».',
    staferlaOrGwLink: 'http://staferla.free.fr/S20/S20.htm',
    keyThemes: ['Formules de la sexuation', 'Pas-toute', 'Lalangue', 'Jouissance de l\'Autre'],
    canonicalDate: '1972-1973 (Panthéon)'
  },
  {
    id: 'staf-sem-22',
    author: 'Jacques Lacan',
    title: 'Seminario 22: R.S.I.',
    originalTitle: 'Livre XXII: R.S.I. (Réel, Symbolique, Imaginaire)',
    year: '1974-1975',
    category: 'seminar_staferla',
    volumeOrNumber: 'Séminaire XXII',
    description: 'Nudo borromeo estricto de tres consistencias y la articulación del síntoma e inhibición.',
    staferlaOrGwLink: 'http://staferla.free.fr/S22/S22.htm',
    keyThemes: ['Nœud borroméen', 'RSI', 'Consistances', 'Ex-sistence'],
    canonicalDate: '1974-1975 (Panthéon)'
  },
  {
    id: 'staf-sem-23',
    author: 'Jacques Lacan',
    title: 'Seminario 23: El sinthome',
    originalTitle: 'Livre XXIII: Le sinthome',
    year: '1975-1976',
    category: 'seminar_staferla',
    volumeOrNumber: 'Séminaire XXIII',
    description: 'James Joyce, el 4to nudo (Sinthome) como suplencia del Nombre-del-Padre y reparación de la falla del nudo.',
    staferlaOrGwLink: 'http://staferla.free.fr/S23/S23.htm',
    keyThemes: ['Sinthome', 'James Joyce', 'Suppléance', '4e consistance'],
    canonicalDate: '1975-1976 (Panthéon)'
  },
  {
    id: 'staf-autres-ecrits',
    author: 'Jacques Lacan',
    title: 'Otros Escritos (Autres Écrits) / Pas-tout Lacan',
    originalTitle: 'Autres Écrits (2001) / Textes critiques Staferla',
    year: '1967-1979',
    category: 'autres_ecrits',
    volumeOrNumber: 'Autres Écrits',
    description: 'Compendio de textos capitales: Proposición de 1967 (el Pase), Lituraterre, L\'Étourdit, Télévision y Disolución.',
    staferlaOrGwLink: 'http://staferla.free.fr',
    keyThemes: ['L\'Étourdit', 'Proposition de la Passe', 'Lituraterre', 'Télévision'],
    canonicalDate: 'Éd. Seuil / Staferla Critical'
  }
];

// Complete Directory of Sigmund Freud Gesammelte Werke (GW I to XVIII en alemán)
export const FREUD_GW_CATALOG: CorpusRepositoryItem[] = [
  {
    id: 'gw-vol-1',
    author: 'Sigmund Freud',
    title: 'Gesammelte Werke Band I: Studien über Hysterie / Frühe Schriften',
    originalTitle: 'GW I: Werke aus den Jahren 1892-1899',
    year: '1892-1899',
    category: 'freud_gw',
    volumeOrNumber: 'GW I',
    description: 'Estudios sobre la histeria (con Breuer), Mecanismo psíquico de los fenómenos histéricos, Primeras neuropsicosis de defensa.',
    staferlaOrGwLink: 'https://archive.org/details/gesammeltewerke01freu',
    keyThemes: ['Studien über Hysterie', 'Abwehr-Neuropsychosen', 'Konversion'],
    canonicalDate: 'S. Fischer Verlag / Imago'
  },
  {
    id: 'gw-vol-2-3',
    author: 'Sigmund Freud',
    title: 'Gesammelte Werke Band II/III: Die Traumdeutung / Über den Traum',
    originalTitle: 'GW II/III: Die Traumdeutung (1900)',
    year: '1900-1901',
    category: 'freud_gw',
    volumeOrNumber: 'GW II/III',
    description: 'La interpretación de los sueños (edición completa con adiciones sucesivas) y Sobre el sueño.',
    staferlaOrGwLink: 'https://archive.org/details/gesammeltewerke02freu',
    keyThemes: ['Traumarbeit', 'Wunscherfüllung', 'Traumnabel', 'Verdichtung/Verschiebung'],
    canonicalDate: 'S. Fischer Verlag'
  },
  {
    id: 'gw-vol-4',
    author: 'Sigmund Freud',
    title: 'Gesammelte Werke Band IV: Zur Psychopathologie des Alltagslebens',
    originalTitle: 'GW IV: Zur Psychopathologie des Alltagslebens (1901)',
    year: '1901',
    category: 'freud_gw',
    volumeOrNumber: 'GW IV',
    description: 'Psicopatología de la vida cotidiana: olvido de nombres propios (Signorelli), lapsus linguae, actos fallidos (Fehlleistungen).',
    staferlaOrGwLink: 'https://archive.org/details/gesammeltewerke04freu',
    keyThemes: ['Fehlleistung', 'Vergessen von Eigennamen', 'Versprechen'],
    canonicalDate: 'S. Fischer Verlag'
  },
  {
    id: 'gw-vol-5',
    author: 'Sigmund Freud',
    title: 'Gesammelte Werke Band V: Drei Abhandlungen / Der Witz',
    originalTitle: 'GW V: Werke aus den Jahren 1904-1905',
    year: '1905',
    category: 'freud_gw',
    volumeOrNumber: 'GW V',
    description: 'Tres ensayos sobre teoría sexual (pulsión parcial, zonas erógenas) y El chiste y su relación con lo inconsciente.',
    staferlaOrGwLink: 'https://archive.org/details/gesammeltewerke05freu',
    keyThemes: ['Drei Abhandlungen zur Sexualtheorie', 'Der Witz', 'Triebquellen', 'Polymorph-pervers'],
    canonicalDate: 'S. Fischer Verlag'
  },
  {
    id: 'gw-vol-7',
    author: 'Sigmund Freud',
    title: 'Gesammelte Werke Band VII: Der Fall Dora / Der kleine Hans',
    originalTitle: 'GW VII: Werke aus den Jahren 1906-1909',
    year: '1906-1909',
    category: 'freud_gw',
    volumeOrNumber: 'GW VII',
    description: 'Análisis de un caso de histeria (Dora) y Análisis de la fobia de un niño de 5 años (El pequeño Hans).',
    staferlaOrGwLink: 'https://archive.org/details/gesammeltewerke07freu',
    keyThemes: ['Bruchstück einer Hysterie-Analyse (Dora)', 'Kleiner Hans', 'Phobie'],
    canonicalDate: 'S. Fischer Verlag'
  },
  {
    id: 'gw-vol-8',
    author: 'Sigmund Freud',
    title: 'Gesammelte Werke Band VIII: Der Rattenmann / Schreber',
    originalTitle: 'GW VIII: Werke aus den Jahren 1909-1913',
    year: '1909-1913',
    category: 'freud_gw',
    volumeOrNumber: 'GW VIII',
    description: 'El Hombre de las Ratas (neurosis obsesiva) y Observaciones sobre un caso de paranoia (Senatspräsident Schreber).',
    staferlaOrGwLink: 'https://archive.org/details/gesammeltewerke08freu',
    keyThemes: ['Der Rattenmann (Zwangsneurose)', 'Fall Schreber (Paranoia)', 'Projektion'],
    canonicalDate: 'S. Fischer Verlag'
  },
  {
    id: 'gw-vol-10',
    author: 'Sigmund Freud',
    title: 'Gesammelte Werke Band X: Die Metapsychologie von 1915',
    originalTitle: 'GW X: Werke aus den Jahren 1913-1917',
    year: '1915',
    category: 'freud_gw',
    volumeOrNumber: 'GW X',
    description: 'Los ensayos metapsicológicos capitales: Triebe und Triebschicksale, Die Verdrängung, Das Unbewußte, Trauer und Melancholie.',
    staferlaOrGwLink: 'https://archive.org/details/gesammeltewerke10freu',
    keyThemes: ['Triebe und Triebschicksale', 'Die Verdrängung', 'Das Unbewußte', 'Trauer und Melancholie'],
    canonicalDate: 'S. Fischer Verlag'
  },
  {
    id: 'gw-vol-13',
    author: 'Sigmund Freud',
    title: 'Gesammelte Werke Band XIII: Jenseits des Lustprinzips / Das Ich und das Es',
    originalTitle: 'GW XIII: Werke aus den Jahren 1920-1924',
    year: '1920-1924',
    category: 'freud_gw',
    volumeOrNumber: 'GW XIII',
    description: 'Giro de 1920: Más allá del principio de placer (pulsión de muerte) y El Yo y el Ello (segunda tópica).',
    staferlaOrGwLink: 'https://archive.org/details/gesammeltewerke13freu',
    keyThemes: ['Jenseits des Lustprinzips', 'Das Ich und das Es', 'Todestrieb', 'Wiederholungszwang'],
    canonicalDate: 'S. Fischer Verlag'
  },
  {
    id: 'gw-vol-14',
    author: 'Sigmund Freud',
    title: 'Gesammelte Werke Band XIV: Hemmung, Symptom und Angst / Die Verneinung',
    originalTitle: 'GW XIV: Werke aus den Jahren 1925-1931',
    year: '1925-1926',
    category: 'freud_gw',
    volumeOrNumber: 'GW XIV',
    description: 'Inhibición, síntoma y angustia (teoría de la señal de angustia) y La negación (Die Verneinung).',
    staferlaOrGwLink: 'https://archive.org/details/gesammeltewerke14freu',
    keyThemes: ['Hemmung, Symptom und Angst', 'Die Verneinung', 'Signalangst', 'Kastrationsangst'],
    canonicalDate: 'S. Fischer Verlag'
  },
  {
    id: 'gw-vol-16',
    author: 'Sigmund Freud',
    title: 'Gesammelte Werke Band XVI: Die endliche und die unendliche Analyse',
    originalTitle: 'GW XVI: Werke aus den Jahren 1932-1939',
    year: '1937',
    category: 'freud_gw',
    volumeOrNumber: 'GW XVI',
    description: 'Análisis terminable e interminable (Die endliche und die unendliche Analyse) y Construcciones en el análisis.',
    staferlaOrGwLink: 'https://archive.org/details/gesammeltewerke16freu',
    keyThemes: ['Die endliche und die unendliche Analyse', 'Konstruktionen in der Analyse', 'Gewachsenes Fels'],
    canonicalDate: 'S. Fischer Verlag'
  },
  {
    id: 'gw-vol-17',
    author: 'Sigmund Freud',
    title: 'Gesammelte Werke Band XVII: Schriften aus dem Nachlaß / Abriß der Psychoanalyse',
    originalTitle: 'GW XVII: Schriften aus dem Nachlaß (1892-1938)',
    year: '1938-1940',
    category: 'freud_gw',
    volumeOrNumber: 'GW XVII',
    description: 'Compendio del psicoanálisis (Abriß der Psychoanalyse) y La escisión del Yo en el proceso defensivo (Ichspaltung).',
    staferlaOrGwLink: 'https://archive.org/details/gesammeltewerke17freu',
    keyThemes: ['Abriß der Psychoanalyse', 'Die Ichspaltung im Abwehrvorgang', 'Verleugnung'],
    canonicalDate: 'S. Fischer Verlag'
  }
];

