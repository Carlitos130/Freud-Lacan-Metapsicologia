import { ConceptItem } from '../types';

export const CONCEPTS_DATA: ConceptItem[] = [
  {
    id: 'trieb',
    termOriginal: 'Trieb',
    language: 'german',
    termSpanish: 'Pulsión',
    school: 'freud',
    category: 'drive_and_jouissance',
    pronunciation: '[tʁiːp]',
    literalMeaning: 'Impulso, empuje constante, germinación (del verbo treiben: empujar, arrear, brotar).',
    keySources: [
      {
        title: 'Pulsiones y destinos de pulsión',
        year: 1915,
        originalTitle: 'Triebe und Triebschicksale',
        sectionOrVolume: 'GW X / Obras Completas Amorrortu Vol. XIV'
      },
      {
        title: 'Tres ensayos de teoría sexual',
        year: 1905,
        originalTitle: 'Drei Abhandlungen zur Sexualtheorie',
        sectionOrVolume: 'GW VI'
      }
    ],
    shortDefinition: 'Concepto límite entre lo anímico y lo somático; proceso dinámico que consiste en un empuje constante (Drang) de naturaleza bio-psíquica.',
    rigorousExplanation: `Freud define el **Trieb** como un *Grenzbegriff* (concepto fronterizo) entre lo somático (*das Körperliche*) y lo psíquico (*das Seelische*). Se articula en cuatro componentes metapsicológicos invariantes:
1. **Drang** (Empuje): El factor motor, la suma de fuerza o la exigencia de trabajo que representa la pulsión.
2. **Quelle** (Fuente): El proceso somático en un órgano o parte del cuerpo (zona erógena).
3. **Objekt** (Objeto): Aquello mediante lo cual la pulsión puede alcanzar su fin; es el elemento más variable y contingente (*nicht ursprünglich verbunden*).
4. **Ziel** (Fin): Siempre es la satisfacción (*Befriedigung*), es decir, la cancelación del estado de estimulación en la fuente.

Freud diferencia los cuatro destinos pulsionales (*Triebschicksale*): el trastorno hacia lo contrario (*Verkehrung ins Gegenteil*), la vuelta hacia la propia persona (*Wendung gegen die eigene Person*), la represión (*Verdrängung*) y la sublimación (*Sublimierung*).`,
    etymologicalNuance: 'La traducción de James Strachey como "instinct" en la Standard Edition en inglés fue una grave desviación epistemológica. Un *Instinkt* en alemán es una pauta de conducta biológica fija, predeterminada y adaptativa, mientras que *Trieb* es un empuje plástico, sin objeto natural predeterminado y mediado por el lenguaje y la historia del sujeto.',
    clinicalSignificance: 'En la clínica, la pulsión no se satisface en un objeto real acabado sino en el rodeo (*Drang*) y en el montaje alrededor de zonas erógenas (bordes del cuerpo). Lacan subrayará que la pulsión es un circuito gramatical acéfalo.',
    mathemeOrFormula: '($ \\diamond D) \\text{ en el Grafo del Deseo}$',
    relatedConcepts: ['Drang', 'Objet petit a', 'Jouissance', 'Instinkt', 'Besetzung'],
    originalQuoteSnippet: {
      original: 'Der »Trieb« erscheint uns als ein Grenzbegriff zwischen Seelischem und Somatischem, als der psychische Repräsentant der aus dem Körperinnern stammenden und in die Seele gelangenden Reize.',
      spanish: 'La "pulsión" se nos presenta como un concepto fronterizo entre lo anímico y lo somático, como el representante psíquico de los estímulos que provienen del interior del cuerpo y alcanzan el alma.',
      source: 'Freud, Triebe und Triebschicksale (1915)'
    }
  },
  {
    id: 'objet-petit-a',
    termOriginal: 'Objet petit a',
    language: 'french',
    termSpanish: 'Objeto a (Objeto causa del deseo / Plus-de-goce)',
    school: 'lacan',
    category: 'drive_and_jouissance',
    pronunciation: '[ɔb.ʒɛ pə.ti a]',
    literalMeaning: 'Objeto pequeño "a" (donde "a" refiere al otro semejante: "autre", para distinguirlo del Gran Otro "Autre" A).',
    keySources: [
      {
        title: 'El Seminario, Libro 10: La angustia',
        year: 1962,
        originalTitle: 'Le Séminaire, Livre X: L\'angoisse',
        sectionOrVolume: 'Éditions du Seuil'
      },
      {
        title: 'El Seminario, Libro 11: Los cuatro conceptos fundamentales del psicoanálisis',
        year: 1964,
        originalTitle: 'Le Séminaire, Livre XI: Les quatre concepts fondamentaux de la psychanalyse',
        sectionOrVolume: 'Capítulos VI-XX'
      },
      {
        title: 'El Seminario, Libro 17: El reverso del psicoanálisis',
        year: 1969,
        originalTitle: 'Le Séminaire, Livre XVII: L\'envers de la psychanalyse',
        sectionOrVolume: 'Plus-de-jouir'
      }
    ],
    shortDefinition: 'El objeto que falta e incita la búsqueda del deseo; resto inasimilable de la operación de división subjetiva y condensador de goce.',
    rigorousExplanation: `Lacan consideró al **objet petit a** como su única invención teórica original. No es un objeto empírico que se desee, sino el *objeto causa del deseo* (*cause du désir*) y el soporte del fantasma:
- **Como objeto de la pulsión**: No es el seno, las heces, la mirada o la voz como entidades biológicas, sino la falta estructurante en el borde corporal (los cuatro objetos pulsionales lacanianos: seno, heces, mirada y voz).
- **Como resto de la constitución del sujeto**: Cuando el sujeto entra en el orden del significante ($S_1 \\to S_2$), experimenta una división ($\\\\$) y una pérdida irreductible de ser. El residuo de esta operación simbólica es el objeto $a$.
- **Como plus-de-goce (*plus-de-jouir*)**: En el Seminario XVII, por homología a la plusvalía (*Mehrwert*) de Karl Marx, el objeto $a$ designa la recuperación parcial de goce que compensa la renuncia impuesta por el significante.`,
    etymologicalNuance: 'Lacan insistió en no traducir jamás "objet petit a" a ningún idioma (manteniendo la "a" minúscula en cursiva) para evitar que se confunda con el objeto empírico de la psicología o de las relaciones de objeto kleiniana.',
    clinicalSignificance: 'En la dirección de la cura, el analista opera ocupando el lugar de semblante de objeto $a$ ($a$ en el discurso del analista), permitiendo al analizante dialectizar su deseo y no quedar fijado a la demanda del Otro.',
    mathemeOrFormula: 'a \\quad | \\quad (\\$ \\diamond a) \\quad | \\quad \\frac{a}{\\$} \\text{ (Discurso Analítico)}',
    relatedConcepts: ['Désir', 'Jouissance', 'Plus-de-jouir', 'Fantasme', 'Grand Autre'],
    originalQuoteSnippet: {
      original: 'L\'objet a est ce qui reste de l\'instauration du sujet dans le signifiant... Il n\'est pas l\'objet du désir, mais la cause du désir.',
      spanish: 'El objeto a es lo que queda de la instauración del sujeto en el significante... No es el objeto del deseo, sino la causa del deseo.',
      source: 'Lacan, Séminaire XI (1964)'
    }
  },
  {
    id: 'verdrangung',
    termOriginal: 'Verdrängung',
    language: 'german',
    termSpanish: 'Represión',
    school: 'freud',
    category: 'metapsychology',
    pronunciation: '[fɛɐ̯ˈdʁɛŋʊŋ]',
    literalMeaning: 'Empujar hacia un lado, desplazar por presión fuera del campo visible.',
    keySources: [
      {
        title: 'La represión',
        year: 1915,
        originalTitle: 'Die Verdrängung',
        sectionOrVolume: 'GW X / Trabajos de metapsicología'
      },
      {
        title: 'Lo inconsciente',
        year: 1915,
        originalTitle: 'Das Unbewusste',
        sectionOrVolume: 'GW X'
      }
    ],
    shortDefinition: 'Mecanismo de defensa fundante de la neurosis que separa la representación (Vorstellung) del monto de afecto (Affektbetrag).',
    rigorousExplanation: `Freud sitúa la represión como la piedra angular (*Grundpfeiler*) sobre la que descansa el edificio del psicoanálisis. La represión no destruye la moción pulsional, sino que impide que la representación inconciliable devenga consciente.

Freud distingue tres fases:
1. **Urverdrängung** (Represión primordial): Fijación inicial en la que a la pulsión se le deniega el acceso a la conciencia, creando el primer núcleo del inconsciente reprimido (*Verdrängtes*).
2. **Eigentliche Verdrängung / Nachdrängen** (Represión secundaria o esfuerzo de dar caza): El Yo consciente repele representaciones vinculadas al núcleo primordial, combinando la repulsión de la conciencia con la atracción ejercida por lo reprimido originario.
3. **Wiederkehr des Verdrängten** (Retorno de lo reprimido): Lo reprimido busca salidas desfiguradas en las formaciones del inconsciente (síntomas, sueños, lapsus, chistes).`,
    etymologicalNuance: 'Difiere radicalmente de *Unterdrückung* (supresión consciente) y de *Verwerfung* (forclusión/rechazo radical) y *Verleugnung* (desmentida). En *Verdrängung*, la representación sí está inscrita en el inconsciente simbólico pero censurada.',
    clinicalSignificance: 'Estructura clínica de la neurosis (histeria y neurosis obsesiva). El síntoma neurótico es una transacción (*Kompromissbildung*) entre la defensa y el deseo reprimido.',
    mathemeOrFormula: '\\text{Metáfora y sustitución significante: } \\frac{S}{S\'} \\cdot \\frac{S\'}{x} \\to S \\left(\\frac{1}{s}\\right)',
    relatedConcepts: ['Urverdrängung', 'Vorstellung', 'Affekt', 'Verwerfung', 'Verleugnung'],
    originalQuoteSnippet: {
      original: 'Das Wesen der Verdrängung liegt ja nur darin, daß sie eine Vorstellung abweist und in der Ferne vom Bewußtsein hält.',
      spanish: 'La esencia de la represión no consiste sino en rechazar algo de la conciencia y mantenerlo alejado de ella.',
      source: 'Freud, Die Verdrängung (1915)'
    }
  },
  {
    id: 'jouissance',
    termOriginal: 'Jouissance',
    language: 'french',
    termSpanish: 'Goce',
    school: 'lacan',
    category: 'drive_and_jouissance',
    pronunciation: '[ʒwi.sɑ̃s]',
    literalMeaning: 'Disfrute pleno, usufructo (en derecho), placer extremo que bordea el dolor y el sufrimiento orgánico.',
    keySources: [
      {
        title: 'El Seminario, Libro 7: La ética del psicoanálisis',
        year: 1959,
        originalTitle: 'Le Séminaire, Livre VII: L\'éthique de la psychanalyse',
        sectionOrVolume: 'Capítulos XV-XXIV'
      },
      {
        title: 'El Seminario, Libro 20: Aún',
        year: 1972,
        originalTitle: 'Le Séminaire, Livre XX: Encore',
        sectionOrVolume: 'Capítulos I-VII'
      }
    ],
    shortDefinition: 'Satisfacción paradójica de la pulsión que trasciende el principio del placer freudiano, articulada como un exceso que produce sufrimiento al sujeto.',
    rigorousExplanation: `El **goce** (*jouissance*) en Lacan es la relectura metapsicológica del "Más allá del principio de placer" (*Jenseits des Lustprinzips*) de Freud. Mientras que el placer busca el equilibrio homeostático y la menor tensión posible, el goce empuja a la transgresión de ese límite, traduciéndose en sufrimiento sintomático.

Lacan formaliza múltiples dimensiones del goce:
- **Goce fálico ($J_\\varphi$)**: Goce regulado por el significante y la castración; es limitado, discursivo y fuera-del-cuerpo.
- **Goce del Otro ($J_A$) o Goce suplementario**: Goce no-todo mediatizado por el falo, que Lacan explora en las fórmulas de la sexuación y en la experiencia mística (Santa Teresa de Ávila).
- **Goce del cuerpo**: La resonancia del significante en lo vivo (el cuerpo como sustancia gozante).
- **Plus-de-goce (*plus-de-jouir*)**: La fracción de goce recuperada a través del objeto $a$.`,
    etymologicalNuance: 'En francés, *jouir* tiene connotaciones sexuales directas (el orgasmo) y jurídicas (el usufructo de una propiedad). En español, "placer" no captura la dimensión de dolor/sufrimiento placentero insoportable que implica *jouissance*.',
    clinicalSignificance: 'El síntoma no sólo es portador de un mensaje descifrable (metáfora del deseo), sino ante todo un modo de gozar. En el análisis, desarticular el goce mortífero es la tarea más resistente de la cura.',
    mathemeOrFormula: 'J_\\varphi \\quad \\text{(Goce fálico)} \\quad | \\quad J_A \\quad \\text{(Goce del Otro)}',
    relatedConcepts: ['Lustprinzip', 'Todestrieb', 'Plus-de-jouir', 'Das Ding', 'Sinthome'],
    originalQuoteSnippet: {
      original: 'La jouissance, c\'est ce qui ne sert à rien... Le sujet ne peut jouir que par l\'intermédiaire du corps, et le signifiant est la cause de la jouissance.',
      spanish: 'El goce es lo que no sirve para nada... El sujeto sólo puede gozar a través del cuerpo, y el significante es la causa del goce.',
      source: 'Lacan, Séminaire XX (1972-1973)'
    }
  },
  {
    id: 'verwerfung',
    termOriginal: 'Verwerfung (Forclusion)',
    language: 'both',
    termSpanish: 'Forclusión / Rechazo radical',
    school: 'both',
    category: 'clinical_structures',
    pronunciation: '[fɛɐ̯ˈvɛʁfʊŋ] / [fɔʁ.kly.zjɔ̃]',
    literalMeaning: 'Alemán: rechazar, descartar, desestimar. Francés (término jurídico): caducidad o preclusión procesal de un derecho no ejercido.',
    keySources: [
      {
        title: 'De una cuestión preliminar a todo tratamiento posible de la psicosis',
        year: 1958,
        originalTitle: 'D\'une question préliminaire à tout traitement possible de la psychose',
        sectionOrVolume: 'Écrits, pp. 531-583'
      },
      {
        title: 'El hombre de los lobos (Historia de una neurosis infantil)',
        year: 1918,
        originalTitle: 'Aus der Geschichte einer infantilen Neurose',
        sectionOrVolume: 'Freud, GW XII'
      },
      {
        title: 'El Seminario, Libro 3: Las psicosis',
        year: 1955,
        originalTitle: 'Le Séminaire, Livre III: Les psychoses',
        sectionOrVolume: 'Lacan'
      }
    ],
    shortDefinition: 'Mecanismo causal específico de la psicosis que consiste en el rechazo radical de un significante primordial (el Nombre-del-Padre) fuera del orden simbólico.',
    rigorousExplanation: `Freud utilizó el término *Verwerfung* en el caso del "Hombre de los Lobos" para describir una posición en la que el sujeto "no quiso saber nada de la castración en el sentido del juicio represivo". 

Lacan retoma este concepto freudiano y lo traduce al francés como **Forclusion** (forclusión, tomando el vocablo jurídico del código civil francés introducido por Édouard Pichon):
- Consiste en la no-inscripción del significante fundamental del **Nombre-del-Padre** (*Nom-du-Père*, $P_0$) en el registro de lo Simbólico.
- A diferencia de la represión (*Verdrängung*), donde el contenido reprimido retorna desde el interior de lo simbólico como síntoma o lapsus, en la forclusión:
  **"Lo que no ha advenido a la luz de lo simbólico, reaparece en lo real"** (*Ce qui n'a pas vu le jour dans le symbolique réapparaît dans le réel*), bajo la forma de alucinación y delirio.`,
    etymologicalNuance: 'La genialidad de Lacan fue encontrar el término jurídico *forclusion* (pérdida irrecuperable del plazo legal) para traducir *Verwerfung*, subrayando que no se trata de un olvido o censura, sino de una omisión estructural que deja un agujero en lo simbólico.',
    clinicalSignificance: 'Diagnóstico diferencial de la estructura psicótica (paranoia, esquizofrenia, melancolía). En la clínica de la psicosis, la forclusión prohíbe la interpretación neurótica basada en la metáfora edípica y orienta hacia la estabilización mediante suplencias (*sinthome*).',
    mathemeOrFormula: '\\frac{P_0}{\\Phi_0} \\quad \\text{(Forclusión del Nombre-del-Padre)}',
    relatedConcepts: ['Nom-du-Père', 'Verdrängung', 'Verleugnung', 'Réel', 'Sinthome'],
    originalQuoteSnippet: {
      original: 'Ce qui est refusé dans l\'ordre symbolique resurgit dans le réel.',
      spanish: 'Lo que es rehusado en el orden simbólico resurge en lo real.',
      source: 'Lacan, Séminaire III: Les psychoses (1955-1956)'
    }
  },
  {
    id: 'verleugnung',
    termOriginal: 'Verleugnung',
    language: 'german',
    termSpanish: 'Desmentida / Renegación',
    school: 'freud',
    category: 'clinical_structures',
    pronunciation: '[fɛɐ̯ˈlɔɪ̯knʊŋ]',
    literalMeaning: 'Negar, desconocer, desmentir obstinadamente una realidad comprobable.',
    keySources: [
      {
        title: 'Fetichismo',
        year: 1927,
        originalTitle: 'Fetischismus',
        sectionOrVolume: 'Freud, GW XIV'
      },
      {
        title: 'La escisión del yo en el proceso defensivo',
        year: 1938,
        originalTitle: 'Die Spaltung des Ichs im Abwehrvorgang',
        sectionOrVolume: 'Freud, GW XVII'
      }
    ],
    shortDefinition: 'Mecanismo defensivo prototípico de la perversión (fetichismo) y de la escisión del yo (Ich-Spaltung), donde el sujeto reconoce y niega simultáneamente la castración.',
    rigorousExplanation: `Freud descubre la **Verleugnung** al estudiar el fetichismo: el niño percibe la falta de pene en la mujer (amenaza de castración), pero al mismo tiempo reniega de esa percepción para no admitir la vulnerabilidad del falo materno.

Esto da lugar a una coexistencia de dos actitudes psíquicas paralelas sin influencia recíproca:
1. Una corriente reconoce la realidad de la castración.
2. Otra corriente desmiente la castración y erige un sustituto (el fetiche).

Esto genera la **Spaltung des Ichs** (escisión del Yo), concepto en el que Freud trabajaba en sus últimos días (1938). Lacan lo asociará a la fórmula de Octave Mannoni: *"Je sais bien, mais quand même..."* ("Sé muy bien, pero aun así...").`,
    etymologicalNuance: 'A menudo confundido con *Verneinung* (la negación gramatical en el discurso como modo de confesar lo reprimido). *Verleugnung* implica un desafío activo a la realidad perceptiva del Otro.',
    clinicalSignificance: 'Mecanismo cardinal de la estructura perversa. En la clínica contemporánea se articula también con el cinismo subjetivo y las toxicomanías.',
    mathemeOrFormula: 'V_a \\iff \\neg(V_a) \\quad \\text{y el Fetiche como significante de la falta materna}',
    relatedConcepts: ['Spaltung', 'Verneinung', 'Verdrängung', 'Fétichisme', 'Phallus'],
    originalQuoteSnippet: {
      original: 'Das Kind weigerte sich, die Tatsache seiner Wahrnehmung zur Kenntnis zu nehmen... Es verleugnete sie.',
      spanish: 'El niño se rehusó a tomar conocimiento del hecho de su percepción... Lo desmintió.',
      source: 'Freud, Fetischismus (1927)'
    }
  },
  {
    id: 'nachtraglichkeit',
    termOriginal: 'Nachträglichkeit',
    language: 'german',
    termSpanish: 'Aposteriori / Retroacción / Efecto diferido',
    school: 'freud',
    category: 'metapsychology',
    pronunciation: '[ˈnaːxˌtʁɛːklɪçkaɪ̯t]',
    literalMeaning: 'Posterioridad, carácter de lo que se agrega con efecto retroactivo o suplementario.',
    keySources: [
      {
        title: 'Proyecto de psicología',
        year: 1895,
        originalTitle: 'Entwurf einer Psychologie',
        sectionOrVolume: 'Manuscrito K y cartas a Fliess'
      },
      {
        title: 'El hombre de los lobos',
        year: 1918,
        originalTitle: 'Aus der Geschichte einer infantilen Neurose',
        sectionOrVolume: 'Freud, GW XII'
      }
    ],
    shortDefinition: 'Modo de temporalidad psíquica donde experiencias y huellas mnémicas son resignificadas retrospectivamente en un tiempo posterior a partir de un nuevo acontecimiento.',
    rigorousExplanation: `La **Nachträglichkeit** desmonta la concepción lineal y positivista del tiempo cronológico. Un acontecimiento inicial (por ejemplo, una escena de seducción infantil o la escena primaria) no adquiere eficacia patógena ni sentido traumático en el momento en que ocurre, porque el sujeto carece del marco simbólico y madurativo para procesarlo.

Es sólo en un *segundo tiempo* (*nachträglich*), típicamente en la pubertad o ante un nuevo encuentro contingente, cuando esa huella mnémica temprana se activa y produce una reedición del trauma, liberando el afecto y precipitando el síntoma.

Lacan traduce este concepto como **après-coup** (tras el golpe / retroacción) y lo eleva a la lógica fundamental del significante: el sentido de una frase sólo se fija retroactivamente con la puntuación final (*point de capiton*).`,
    etymologicalNuance: 'James Strachey lo tradujo como "deferred action" (acción diferida), perdiendo la dimensión retroactiva fundamental que sólo Lacan recuperó con el concepto de *après-coup* y la temporalidad del futuro anterior (*futur antérieur*).',
    clinicalSignificance: 'El análisis no es una arqueología pasiva de hechos objetivos del pasado, sino una resignificación activa y retroactiva de la historia del sujeto a través de la palabra.',
    mathemeOrFormula: 't_2 \\xrightarrow{\\text{retroacción}} t_1 \\quad | \\quad \\text{Futuro Anterior: «Habré sido lo que soy en tanto que me hago»}',
    relatedConcepts: ['Après-coup', 'Erinnerungsspur', 'Trauma', 'Point de capiton', 'Signifiant'],
    originalQuoteSnippet: {
      original: 'Wir erfahren nun, daß die Erinnerungen der Verdrängung unterliegen, welche erst nachträglich zu Trieben geworden sind.',
      spanish: 'Llegamos a saber que sucumben a la represión los recuerdos que sólo a posteriori han devenido traumáticos o pulsionales.',
      source: 'Freud, Briefe an Wilhelm Fliess (1896)'
    }
  },
  {
    id: 'stade-du-miroir',
    termOriginal: 'Le Stade du miroir',
    language: 'french',
    termSpanish: 'El Estadio del espejo',
    school: 'lacan',
    category: 'ego_and_subject',
    pronunciation: '[lə stad dy mi.ʁwaʁ]',
    literalMeaning: 'La fase o etapa del espejo como formadora de la función del Yo (Je).',
    keySources: [
      {
        title: 'El estadio del espejo como formador de la función del yo [je] tal como se nos revela en la experiencia psicoanalítica',
        year: 1949,
        originalTitle: 'Le stade du miroir comme formateur de la fonction du Je',
        sectionOrVolume: 'Écrits, pp. 93-100'
      }
    ],
    shortDefinition: 'Momento ontogenético y estructural (6-18 meses) en que el infante anticipa la unidad de su cuerpo mediante la identificación con su imagen especular.',
    rigorousExplanation: `El infante humano nace en un estado de prematuración biológica (*prématuration biologique*), experimentando su cuerpo como fragmentado (*corps morcelé*). 

Entre los 6 y 18 meses, al percibir su imagen reflejada en el espejo (o en el semejante):
1. Experimenta un júbilo triunfal al captar una totalidad unificada (*Gestalt*).
2. Se produce una **identificación primaria imaginaria**: el Yo (*Moi*) se funda a partir de una alienación constitutiva en una imagen exterior (*orthopédique* y ortopédica).
3. La mirada del adulto que sostiene al infante (el Gran Otro, $A$) ratifica la imagen con su confirmación simbólica ("¡Ese eres tú!").

De esto se deduce la tesis radical de Lacan: el Yo (*Moi*) no es una instancia de adaptación ni el centro de la salud psíquica (contra la Ego Psychology anglosajona), sino una estructura de desconocimiento (*méconnaissance*), alienación paranoica y fascinación narcisista.`,
    etymologicalNuance: 'Lacan distingue tajantemente el **Je** (sujeto del inconsciente, sujeto de la enunciación) del **Moi** (el yo imaginario del estadio del espejo, objeto de las identificaciones narcisistas).',
    clinicalSignificance: 'Base de la teoría del registro Imaginario ($I$). Explica la rivalidad especular, la transitivismo infantil, los celos y la agresividad intrínseca al vínculo dual ($a - a\'$).',
    mathemeOrFormula: 'i(a) \\quad \\text{(Imagen especular del otro)} \\quad \\leftrightarrow \\quad m \\quad \\text{(Moi / Yo)}',
    relatedConcepts: ['Moi', 'Corps morcelé', 'Imaginaire', 'Grand Autre', 'Méconnaissance'],
    originalQuoteSnippet: {
      original: 'Il y a là une matrice symbolique où le je se précipite en une forme primordiale, avant qu\'il ne s\'objective dans la dialectique de l\'identification à l\'autre.',
      spanish: 'Hay allí una matriz simbólica en la que el yo [je] se precipita en una forma primordial, antes de objetivarse en la dialéctica de la identificación con el otro.',
      source: 'Lacan, Écrits (1949)'
    }
  },
  {
    id: 'nom-du-pere',
    termOriginal: 'Le Nom-du-Père',
    language: 'french',
    termSpanish: 'El Nombre-del-Padre',
    school: 'lacan',
    category: 'language_and_unconscious',
    pronunciation: '[lə nɔ̃ dy pɛʁ]',
    literalMeaning: 'El Nombre del Padre (con homofonía deliberada en francés: "Nom" = nombre y "Non" = no/prohibición; "Les non-dupes errent").',
    keySources: [
      {
        title: 'De una cuestión preliminar a todo tratamiento posible de la psicosis',
        year: 1958,
        originalTitle: 'D\'une question préliminaire...',
        sectionOrVolume: 'Écrits'
      },
      {
        title: 'El Seminario, Libro 5: Las formaciones del inconsciente',
        year: 1957,
        originalTitle: 'Le Séminaire, Livre V: Les formations de l\'inconscient',
        sectionOrVolume: 'La metáfora paterna'
      }
    ],
    shortDefinition: 'Significante fundamental que articula la Ley simbólica, opera la castración y sustituye el deseo de la madre por la Ley del significante (Metáfora Paterna).',
    rigorousExplanation: `El **Nombre-del-Padre** no es el padre biológico real ni el progenitor empírico, sino una función puramente simbólica: el significante que en el Otro ($A$) representa la Ley y la interdicción del incesto.

Opera mediante la **Metáfora Paterna**:
$$\\frac{\\text{Nombre-del-Padre}}{\\text{Deseo de la Madre}} \\cdot \\frac{\\text{Deseo de la Madre}}{\\text{Significado al sujeto}} \\to \\text{Nombre-del-Padre} \\left(\\frac{1}{\\text{Falo Simbólico } (\\Phi)}\\right)$$

Esta sustitución metafórica:
1. Introduce un límite al deseo devorador materno (*maternal caprice*).
2. Ancla la cadena significante (*point de capiton*).
3. Permite al sujeto acceder a la dimensión del deseo y a la sexuación.`,
    etymologicalNuance: 'Lacan juega con la homofonía en francés entre *Le Nom-du-Père* (El Nombre del Padre), *Le Non-du-Père* (El No prohibitivo del Padre) y más tarde en el Seminario XXI *Les non-dupes errent* (Los no incautos yerran).',
    clinicalSignificance: 'Su inscripción decide la neurosis; su forclusión (*Verwerfung*) desencadena la psicosis ante el encuentro con "Un-padre" en lo real. Hacia el final de su enseñanza, Lacan pluralizará el concepto en *Les Noms-du-Père* y lo formulará como función de anudamiento (*Sinthome*).',
    mathemeOrFormula: 'NP \\to \\Phi \\quad | \\quad \\frac{S_1}{\\text{Simbólico}}',
    relatedConcepts: ['Verwerfung', 'Métaphore paternelle', 'Phallus', 'Grand Autre', 'Sinthome'],
    originalQuoteSnippet: {
      original: 'C\'est dans le nom du père qu\'il nous faut reconnaître le support de la fonction symbolique qui, depuis l\'orée des temps historiques, identifie sa personne à la figure de la loi.',
      spanish: 'Es en el nombre del padre donde debemos reconocer el soporte de la función simbólica que, desde el albor de los tiempos históricos, identifica su persona a la figura de la ley.',
      source: 'Lacan, Fonction et champ de la parole (1953)'
    }
  },
  {
    id: 'grand-autre',
    termOriginal: 'Grand Autre (A) vs petit autre (a)',
    language: 'french',
    termSpanish: 'El Gran Otro (A) vs el pequeño otro (a)',
    school: 'lacan',
    category: 'language_and_unconscious',
    pronunciation: '[ɡʁɑ̃t‿otʁ]',
    literalMeaning: 'El Gran Otro con mayúscula (el tesoro de los significantes, el orden simbólico) frente al pequeño otro con minúscula (el semejante especular).',
    keySources: [
      {
        title: 'El Seminario, Libro 2: El yo en la teoría de Freud y en la técnica del psicoanálisis',
        year: 1954,
        originalTitle: 'Le Séminaire, Livre II',
        sectionOrVolume: 'Esquema L'
      },
      {
        title: 'Subversión del sujeto y dialéctica del deseo en el inconsciente freudiano',
        year: 1960,
        originalTitle: 'Subversion du sujet et dialectique du désir...',
        sectionOrVolume: 'Écrits'
      }
    ],
    shortDefinition: 'El Gran Otro ($A$) es el lugar del lenguaje, el orden simbólico y la alteridad radical; el pequeño otro ($a$) es el semejante imaginario.',
    rigorousExplanation: `Lacan establece una división decisiva:
1. **El pequeño otro ($a$, autre)**: Pertenece al orden **Imaginario**. Es el semejante, el reflejo en el espejo, el partenaire de las identificaciones narcisistas y de la agresividad dual.
2. **El Gran Otro ($A$, Grand Autre)**: Pertenece al orden **Simbólico**. Es el tesoro de los significantes (*trésor des signifiants*), el lugar de la palabra, la cultura y la Ley. No es una persona, sino el lugar tercero que garantiza que el lenguaje exista antes del nacimiento del sujeto.

En el **Esquema L**:
- El eje imaginario ($a - a'$, *Moi* y semejante) interrumpe y aliena la comunicación inconsciente del eje simbólico ($S - A$, sujeto y Gran Otro).`,
    etymologicalNuance: 'La "A" mayúscula (*Grand Autre*) marca la alteridad irreductible que no puede ser asimilada por la empatía del yo. Lacan luego enunciará: *"Il n\'y a pas d\'Autre de l\'Autre"* (No hay Otro del Otro, $S(\\not{A})$), indicando que el Gran Otro está castrado e incompleto.',
    clinicalSignificance: 'El analizante dirige su demanda al analista creyéndolo el "Sujeto Supuesto Saber" (*Sujet Supposé Savoir*, $S.s.S.$), es decir, encarnación del Gran Otro. El fin del análisis implica la caída de esta ilusión y el descubrimiento de la falta en el Otro ($S(\\not{A})$).',
    mathemeOrFormula: 'A \\quad \\text{vs} \\quad a \\quad | \\quad S(\\not{A}) \\quad \\text{(Falta en el Otro)}',
    relatedConcepts: ['Signifiant', 'Stade du miroir', 'Sujet supposé savoir', 'Désir de l\'Autre', 'Schéma L'],
    originalQuoteSnippet: {
      original: 'L\'inconscient est le discours de l\'Autre.',
      spanish: 'El inconsciente es el discurso del Otro.',
      source: 'Lacan, Écrits (1953)'
    }
  },
  {
    id: 'point-de-capiton',
    termOriginal: 'Point de capiton',
    language: 'french',
    termSpanish: 'Punto de almohadillado / Punto de capitón',
    school: 'lacan',
    category: 'language_and_unconscious',
    pronunciation: '[pwɛ̃ də ka.pi.tɔ̃]',
    literalMeaning: 'Botón o puntada con que el tapicero fija el relleno del acolchado o almohadón para que la tela no se desplace.',
    keySources: [
      {
        title: 'El Seminario, Libro 3: Las psicosis',
        year: 1955,
        originalTitle: 'Le Séminaire, Livre III: Les psychoses',
        sectionOrVolume: 'Capítulo XXI'
      },
      {
        title: 'Subversión del sujeto y dialéctica del deseo',
        year: 1960,
        originalTitle: 'Subversion du sujet...',
        sectionOrVolume: 'Grafo del Deseo'
      }
    ],
    shortDefinition: 'Momento de anclaje retroactivo donde el significante detiene el deslizamiento infinito del significado y fija un sentido para el sujeto.',
    rigorousExplanation: `En el lenguaje humano, los significantes forman una cadena móvil en constante deslizamiento (*glissement du signifié sous le signifiant*). Un significante aislado no significa nada en sí mismo, sólo remite a otro significante ($S_1 \\to S_2$).

El **point de capiton** es el punto nodal donde:
1. La cadena significante se abotona o cruza el vector del significado.
2. Funciona mediante la **retroacción** (*après-coup*): el sentido de una proposición no se revela palabra por palabra linealmente, sino cuando el significante final cierra la frase y resignifica todo lo anterior.
3. El Nombre-del-Padre es el *point de capiton* primordial que estabiliza el mundo del sujeto en la neurosis.`,
    etymologicalNuance: 'Metáfora tomada del oficio de la tapicería francesa (*capitonnage*), donde los botones fijan la espuma y dan forma al sillón impidiendo que el material flote libremente.',
    clinicalSignificance: 'En la psicosis desencadenada, la falta del significante primordial produce la rotura de los puntos de almohadillado, provocando la dispersión del sentido, neologismos y la perplejidad delirante.',
    mathemeOrFormula: '\\text{Vector significante } (S) \\cap \\text{ Vector intencional } (\\$) \\to \\text{Point de capiton}',
    relatedConcepts: ['Signifiant', 'Nachträglichkeit', 'Graphe du désir', 'Verwerfung', 'Sinthome'],
    originalQuoteSnippet: {
      original: 'Le point de capiton est le point par lequel le signifiant s\'arrête sur le signifié, ou plutôt où se produit l\'illusion que le signifiant produit le signifié.',
      spanish: 'El punto de capitón es el punto por el cual el significante se detiene sobre el significado, o más bien donde se produce la ilusión de que el significante produce el significado.',
      source: 'Lacan, Séminaire III (1955-1956)'
    }
  },
  {
    id: 'das-es-das-ich-das-uber-ich',
    termOriginal: 'Das Es, das Ich, das Über-Ich',
    language: 'german',
    termSpanish: 'El Ello, el Yo, el Superyó (Segunda Tópica Freudiana)',
    school: 'freud',
    category: 'metapsychology',
    pronunciation: '[das ɛs, das ɪç, das ˈyːbɐˌʔɪç]',
    literalMeaning: 'Lo "Ello" (pronombre impersonal neutro "es"), el "Yo" (pronombre de primera persona "ich"), el "Sobre-Yo" (instancia crítica por encima del yo).',
    keySources: [
      {
        title: 'El yo y el ello',
        year: 1923,
        originalTitle: 'Das Ich und das Es',
        sectionOrVolume: 'GW XIII / Obras Completas Vol. XIX'
      },
      {
        title: 'El malestar en la cultura',
        year: 1930,
        originalTitle: 'Das Unbehagen in der Kultur',
        sectionOrVolume: 'GW XIV'
      }
    ],
    shortDefinition: 'Estructura tripartita del aparato psíquico formulada por Freud a partir de 1923 que sustituye el modelo topográfico consciente/inconsciente por el modelo estructural.',
    rigorousExplanation: `La Segunda Tópica freudiana redefine las instancias psíquicas:
1. **Das Es (El Ello)**: Reservorio primordial e impersonal de las pulsiones (*Triebe*), totalmente inconsciente, regido por el proceso primario y atemporal.
2. **Das Ich (El Yo)**: Porción del Ello modificada por la proximidad y la influencia del mundo exterior. Es vasallo de tres amos severos: el mundo exterior (*Außenwelt*), el Ello (*Es*) y el Superyó (*Über-Ich*). Freud subraya que una gran parte del Yo es también inconsciente (mecanismos de defensa).
3. **Das Über-Ich (El Superyó)**: Heredero del complejo de Edipo (*Erbe des Ödipuskomplexes*). Surge por introyeción de la autoridad parental. Tiene dos facetas: ideal del yo (*Ich-Ideal*) y conciencia moral punitiva que se alimenta paradójicamente de la pulsión de muerte vuelta contra el propio Yo.`,
    etymologicalNuance: 'En la traducción inglesa de Strachey se usaron latinismos abstractos (*Id*, *Ego*, *Super-Ego*), distanciando la vivencia cotidiana que Freud buscaba transmitir con pronombres simples del alemán popular (*Es* = "eso/ello", *Ich* = "yo").',
    clinicalSignificance: 'El célebre aforismo freudiano *"Wo Es war, soll Ich werden"* (Donde Ello era, Yo debe advenir) define el propósito de la cura: no la dominación cartesiana, sino la apropiación subjetiva de lo pulsional.',
    mathemeOrFormula: '\\text{Aparato Estructural: } Es \\longleftrightarrow Ich \\longleftrightarrow Über-Ich',
    relatedConcepts: ['Wo Es war, soll Ich werden', 'Todestrieb', 'Ich-Spaltung', 'Moi', 'Id'],
    originalQuoteSnippet: {
      original: 'Wo Es war, soll Ich werden. Es ist eine Kulturarbeit etwa wie die Trockenlegung der Zuydersee.',
      spanish: 'Donde Ello era, Yo debe advenir. Es una labor de cultura como la desecación del Zuiderzee.',
      source: 'Freud, Neue Folge der Vorlesungen (1933)'
    }
  },
  {
    id: 'noeud-borromeen',
    termOriginal: 'Le Nœud Borroméen (R-S-I)',
    language: 'french',
    termSpanish: 'El Nudo Borromeo (Real, Simbólico, Imaginario)',
    school: 'lacan',
    category: 'topology_and_mathemes',
    pronunciation: '[nø bɔ.ʁɔ.me.ɛ̃]',
    literalMeaning: 'Nudo o enlace de tres anillos (proveniente del blasón de la familia Borromeo de Milán) con la propiedad de que si se corta uno cualquiera, los otros dos quedan libres.',
    keySources: [
      {
        title: 'El Seminario, Libro 22: R.S.I.',
        year: 1974,
        originalTitle: 'Le Séminaire, Livre XXII: R.S.I.',
        sectionOrVolume: '1974-1975'
      },
      {
        title: 'El Seminario, Libro 23: El Sinthome',
        year: 1975,
        originalTitle: 'Le Séminaire, Livre XXIII: Le Sinthome',
        sectionOrVolume: 'Joyce le Symptôme'
      }
    ],
    shortDefinition: 'Modelo topológico de la última enseñanza de Lacan que representa la estructura del sujeto mediante el entrelazamiento de tres registros: lo Real, lo Simbólico y lo Imaginario.',
    rigorousExplanation: `En su última enseñanza, Lacan abandona la primacía absoluta de lo Simbólico y recurre a la topología de nudos:
- **Los tres registros equivalentes**:
  1. **Réel (R)**: Lo que no cesa de no escribirse (*ce qui ne cesse pas de ne pas s'écrire*); lo inasimilable, el cuerpo viviente, el trauma.
  2. **Symbolique (S)**: Lo que no cesa de escribirse; el orden del lenguaje, la ley, los significantes.
  3. **Imaginaire (I)**: El sentido, la imagen corporal, la consistencia narcisista.

- **La propiedad borromea**: Ningún anillo está entrelazado directamente con otro; están unidos por la manera en que el tercero los traba. Si se corta uno solo, la estructura entera se desanuda.
- **El cuarto término (Sinthome)**: En casos de lapsus o falla del nudo (como en James Joyce), el sujeto puede fabricar un cuarto anillo suplente (*sinthome*) que repare la juntura sin pasar por la neurosis edípica.`,
    etymologicalNuance: 'La topología no es una metáfora para Lacan, sino la estructura misma del ser hablante (*parlêtre*).',
    clinicalSignificance: 'Permite pensar las estructuras clínicas no como categorías rígidas, sino como modos de anudamiento y desanudamiento de goces y consistencias corporales.',
    mathemeOrFormula: 'R \\cdot S \\cdot I \\oplus \\Sigma \\text{ (Sinthome)}',
    relatedConcepts: ['Sinthome', 'Réel', 'Symbolique', 'Imaginaire', 'Objet petit a'],
    originalQuoteSnippet: {
      original: 'Le nœud borroméen démontre que le réel, le symbolique et l\'imaginaire ne tiennent ensemble que par un artifice.',
      spanish: 'El nudo borromeo demuestra que lo real, lo simbólico y lo imaginario sólo se sostienen juntos por un artificio.',
      source: 'Lacan, Séminaire XXII: R.S.I. (1974-1975)'
    }
  },
  {
    id: 'sinthome',
    termOriginal: 'Le Sinthome',
    language: 'french',
    termSpanish: 'El Sinthome (Santo / Síntoma singular)',
    school: 'lacan',
    category: 'topology_and_mathemes',
    pronunciation: '[sɛ̃.tom]',
    literalMeaning: 'Grafía arcaica en francés antiguo (siglo XV) de la palabra "symptôme", condensando: "saint-homme" (hombre santo), síntoma y Tomás de Aquino (Saint Thomas).',
    keySources: [
      {
        title: 'El Seminario, Libro 23: El Sinthome',
        year: 1975,
        originalTitle: 'Le Séminaire, Livre XXIII: Le Sinthome',
        sectionOrVolume: 'Leçon du 18 novembre 1975 au 11 mai 1976'
      }
    ],
    shortDefinition: 'Cuarto anillo del nudo que repara la falla en el anudamiento de lo Real, lo Simbólico y lo Imaginario; modo singular e irreducible con que un sujeto se inventa un saber-hacer con su goce.',
    rigorousExplanation: `A diferencia del síntoma freudiano clásico (que es una formación del inconsciente descifrable como una metáfora), el **Sinthome**:
1. No se cura ni se disuelve mediante la interpretación analítica.
2. Es el núcleo irreductible de goce opaco del sujeto.
3. Opera como un **artificio de suplencia**: En su análisis de James Joyce, Lacan muestra cómo la escritura joyceana (*Finnegans Wake*) funcionó como un *sinthome* que sostuvo su Yo y evitó el desencadenamiento de la psicosis tras el desanudamiento de lo imaginario.
4. El fin del análisis en la última enseñanza no es eliminar el síntoma, sino identificarse al sinthome (*s'identifier à son sinthome*): saber hacer con aquello que en el sujeto es absolutamente único e incurrable.`,
    etymologicalNuance: 'Lacan recupera la ortografía medieval *sinthome* para aislarlo de la noción médica de síntoma como déficit patológico.',
    clinicalSignificance: 'Abre la clínica de las suplencias, de las psicosis ordinarias y de la invención singular más allá del Nombre-del-Padre.',
    mathemeOrFormula: '\\Sigma \\quad \\text{o cuarto nudo de reparación topológica}',
    relatedConcepts: ['Noeud Borroméen', 'Jouissance', 'Nom-du-Père', 'Réel', 'Verwerfung'],
    originalQuoteSnippet: {
      original: 'Savoir y faire avec son sinthome, voilà la fin de l\'analyse.',
      spanish: 'Saber hacer allí con su sinthome, he ahí el fin del análisis.',
      source: 'Lacan, Séminaire XXIII (1975-1976)'
    }
  },
  {
    id: 'todestrieb',
    termOriginal: 'Todestrieb',
    language: 'german',
    termSpanish: 'Pulsión de muerte',
    school: 'freud',
    category: 'drive_and_jouissance',
    pronunciation: '[ˈtoːdəsˌtʁiːp]',
    literalMeaning: 'Empuje o pulsión hacia la muerte, retorno a lo inorgánico.',
    keySources: [
      {
        title: 'Más allá del principio de placer',
        year: 1920,
        originalTitle: 'Jenseits des Lustprinzips',
        sectionOrVolume: 'GW XIII / Obras Completas Vol. XVIII'
      },
      {
        title: 'El problema económico del masoquismo',
        year: 1924,
        originalTitle: 'Das ökonomische Problem des Masochismus',
        sectionOrVolume: 'GW XIII'
      }
    ],
    shortDefinition: 'Tendencia fundamental de todo ser vivo a restaurar un estado inanimado anterior; principio que opera en la compulsión a la repetición (Wiederholungszwang).',
    rigorousExplanation: `Freud introduce el concepto en 1920 ante fenómenos clínicos que desafiaban el principio de placer (*Lustprinzip*):
- Los sueños traumáticos de los soldados de la Primera Guerra Mundial.
- El juego infantil del carretel (*Fort-Da*).
- La reacción terapéutica negativa (*negative therapeutische Reaktion*) y el masoquismo primordial.

Freud postula un dualismo pulsional definitivo:
1. **Eros (Lebenstrieb)**: Pulsiones de vida que buscan conservar, ligar y sintetizar unidades cada vez mayores.
2. **Todestrieb (Pulsión de muerte / Tánatos)**: Tendencia a la disolución de conexiones, reducción de tensiones a cero (Principio de Nirvana) y retorno al reposo inorgánico.

Lacan reinterpreta la pulsión de muerte como el efecto mortificante del significante sobre el cuerpo vivo y la raíz del goce (*jouissance*).`,
    etymologicalNuance: 'Freud nunca usó el término griego "Tánatos" en sus obras publicadas (fue acuñado por Wilhelm Stekel y popularizado por Ernest Jones); siempre utilizó el término alemán riguroso *Todestrieb*.',
    clinicalSignificance: 'Explica las resistencias más tenaces del tratamiento psicoanalítico, el sentimiento inconsciente de culpa y la compulsión a repetir lo doloroso.',
    mathemeOrFormula: '\\text{Eros vs Todestrieb } \\longleftrightarrow \\text{ Ligadura (Bindung) vs Desenlace}',
    relatedConcepts: ['Wiederholungszwang', 'Lustprinzip', 'Jouissance', 'Fort-Da', 'Eros'],
    originalQuoteSnippet: {
      original: 'Das Ziel alles Lebens ist der Tod... das Leblose war früher da als das Lebende.',
      spanish: 'La meta de toda vida es la muerte... lo inanimado estuvo antes que lo vivo.',
      source: 'Freud, Jenseits des Lustprinzips (1920)'
    }
  },
  {
    id: 'wiederholungszwang',
    termOriginal: 'Wiederholungszwang',
    language: 'german',
    termSpanish: 'Compulsión de repetición',
    school: 'freud',
    category: 'metapsychology',
    pronunciation: '[ˈviːdɐˌhoːlʊŋsˌtsvaŋ]',
    literalMeaning: 'Coacción u obligación forzada e involuntaria a repetir.',
    keySources: [
      {
        title: 'Recordar, repetir y reelaborar',
        year: 1914,
        originalTitle: 'Erinnern, Wiederholen und Durcharbeiten',
        sectionOrVolume: 'GW X'
      },
      {
        title: 'Más allá del principio de placer',
        year: 1920,
        originalTitle: 'Jenseits des Lustprinzips',
        sectionOrVolume: 'GW XIII'
      }
    ],
    shortDefinition: 'Proceso de origen inconsciente por el cual el sujeto se sitúa activamente en situaciones penosas, repitiendo experiencias antiguas sin recordar el prototipo original.',
    rigorousExplanation: `En el texto técnico de 1914, Freud describe que el paciente neurótico "no recuerda nada de lo olvidado o reprimido, sino que lo actúa (*agieren*)". La repetición en transferencia sustituye al recuerdo.

En 1920, Freud eleva el *Wiederholungszwang* a una categoría metapsicológica fundamental que opera más allá del principio del placer: no se repite sólo lo placentero, sino situaciones de angustia y fracaso originario.

Lacan en el Seminario XI divide la repetición en dos nociones aristotélicas:
- **Autómaton**: El retorno regular de los signos y la insistencia de la cadena significante.
- **Tuché**: El encuentro siempre fallido con lo Real (*la rencontre du réel*), el trauma que no puede ser asimilado por el significante y que por eso mismo exige recomenzar.`,
    etymologicalNuance: '*Zwang* implica coacción inexorable (la misma raíz de *Zwangsneurose*, neurosis obsesiva).',
    clinicalSignificance: 'Eje de la transferencia analítica: el analizante repite con el analista los vínculos primordiales reprimidos en lugar de narrarlos.',
    mathemeOrFormula: '\\text{Tuché (Encuentro fallido con lo Real) } \\longleftrightarrow \\text{ Automaton}',
    relatedConcepts: ['Todestrieb', 'Agieren', 'Übertragung', 'Réel', 'Durcharbeiten'],
    originalQuoteSnippet: {
      original: 'Der Analysierte erinnert überhaupt nichts von dem Vergessenen und Verdrängten, sondern er agiert es.',
      spanish: 'El analizado no recuerda en absoluto nada de lo olvidado y reprimido, sino que lo actúa.',
      source: 'Freud, Erinnern, Wiederholen und Durcharbeiten (1914)'
    }
  },
  {
    id: 'spaltung',
    termOriginal: 'Spaltung (Ich-Spaltung)',
    language: 'german',
    termSpanish: 'Escisión / División del Yo / Barra en el Sujeto ($)',
    school: 'both',
    category: 'ego_and_subject',
    pronunciation: '[ˈʃpaltʊŋ]',
    literalMeaning: 'Hendedura, fisura, partición, clivaje.',
    keySources: [
      {
        title: 'La escisión del yo en el proceso defensivo',
        year: 1938,
        originalTitle: 'Die Spaltung des Ichs im Abwehrvorgang',
        sectionOrVolume: 'Freud, GW XVII'
      },
      {
        title: 'Posición del inconsciente',
        year: 1960,
        originalTitle: 'Position de l\'inconscient',
        sectionOrVolume: 'Lacan, Écrits'
      }
    ],
    shortDefinition: 'La división irreductible del sujeto psíquico; para Freud, coexistencia de dos actitudes contradictorias en el Yo; para Lacan, la división del sujeto producida por su sumisión al significante ($).',
    rigorousExplanation: `Freud descubrió que el Yo no es una unidad armónica indivisible: ante una exigencia pulsional y un peligro de la realidad, el Yo puede escindirse (*Spaltung*), adoptando dos respuestas simultáneas sin reconciliarlas.

Lacan formaliza esta escisión como la condición universal del ser hablante:
- El **Sujeto tachado o barrado ($\\$)**: Al entrar en el lenguaje, el sujeto queda representado por un significante ($S_1$) ante otro significante ($S_2$), pero en esa representación pierde su ser natural (*fading* o afanisis).
- El sujeto nunca coincide con su Yo (*Moi*): el sujeto es el que habla desde el inconsciente, mientras que el Yo es una ilusión de síntesis imaginaria.`,
    etymologicalNuance: 'En la psiquiatría clásica (Bleuler) *Spaltung* definía la esquizofrenia; Freud y Lacan la transforman en la verdad estructural de todo sujeto humano.',
    clinicalSignificance: 'El análisis no apunta a "reparar" o "sintetizar" al sujeto en un Yo fuerte, sino a permitirle sostener su división sin alienarse en la demanda del Otro.',
    mathemeOrFormula: '\\$ \\quad \\text{(Sujeto barrado / Sujet divisé)}',
    relatedConcepts: ['Verleugnung', 'Sujet', 'Signifiant', 'Moi', 'Fantasme'],
    originalQuoteSnippet: {
      original: 'Es entsteht eine Spaltung im Ich, die nie wieder verheilt, sondern sich mit der Zeit vergrößert.',
      spanish: 'Se produce una escisión en el yo que nunca más cicatriza, sino que se acrecienta con el tiempo.',
      source: 'Freud, Die Spaltung des Ichs im Abwehrvorgang (1938)'
    }
  },
  {
    id: 'quatre-discours',
    termOriginal: 'Les quatre discours',
    language: 'french',
    termSpanish: 'Los cuatro discursos',
    school: 'lacan',
    category: 'topology_and_mathemes',
    pronunciation: '[le katʁ dis.kuʁ]',
    literalMeaning: 'Las cuatro estructuras de lazo social fundadas en el lenguaje.',
    keySources: [
      {
        title: 'El Seminario, Libro 17: El reverso del psicoanálisis',
        year: 1969,
        originalTitle: 'Le Séminaire, Livre XVII: L\'envers de la psychanalyse',
        sectionOrVolume: 'Capítulos I-VI'
      }
    ],
    shortDefinition: 'Los cuatro modos fundamentales de articulación del lazo social a través del lenguaje: Discurso del Amo, de la Universidad, de la Histérica y del Analista.',
    rigorousExplanation: `Lacan define el discurso como un lazo social fundado en el lenguaje. Utiliza una matriz fija de 4 lugares sobre la cual rotan en sentido antihorario 4 términos:

**Matriz de lugares:**
$$\\frac{\\text{Agente / Semblante}}{\\text{Verdad}} \\longrightarrow \\frac{\\text{Otro / Trabajo}}{\\text{Producción / Pérdida}}$$

**Los 4 términos:**
- $S_1$: Significante Amo.
- $S_2$: El saber (*Savoir*).
- $\\$$: El sujeto dividido.
- $a$: El plus-de-goce / objeto $a$.

**Los 4 discursos:**
1. **Discurso del Amo ($M$)**: $\\frac{S_1}{\\$} \\to \\frac{S_2}{a}$ (El amo comanda al saber del esclavo para extraer plus-de-goce).
2. **Discurso Universitario ($U$)**: $\\frac{S_2}{S_1} \\to \\frac{a}{\\$}$ (El saber como amo anónimo que objetiva al sujeto).
3. **Discurso de la Histérica ($H$)**: $\\frac{\\$}{a} \\to \\frac{S_1}{S_2}$ (El sujeto dividido interpela al amo para que produzca un saber sobre su falta).
4. **Discurso del Analista ($A$)**: $\\frac{a}{S_2} \\to \\frac{\\$}{S_1}$ (El analista opera como semblante de objeto $a$, posibilitando que el sujeto produzca sus propios significantes amo).`,
    etymologicalNuance: 'Posteriormente en Milán (1972), Lacan propondrá un quinto discurso mutado: el **Discurso Capitalista**, donde se invierten el agente y la verdad y se cortan las flechas de la imposibilidad, generando un circuito de consumo compulsivo sin límite.',
    clinicalSignificance: 'El Discurso Analítico es el reverso del Discurso del Amo: en lugar de mandar, aloja la división subjetiva y hace trabajar al analizante.',
    mathemeOrFormula: '\\text{Discurso Analítico: } \\frac{a}{S_2} \\longrightarrow \\frac{\\$}{S_1}',
    relatedConcepts: ['Signifiant', 'Objet petit a', 'Plus-de-jouir', 'Savoir', 'Graphe du désir'],
    originalQuoteSnippet: {
      original: 'Le discours est ce qui, dans l\'ordonnance du langage, fait lien social.',
      spanish: 'El discurso es lo que, en la ordenación del lenguaje, hace lazo social.',
      source: 'Lacan, Séminaire XVII (1969-1970)'
    }
  },
  {
    id: 'ubertragung',
    termOriginal: 'Übertragung',
    language: 'german',
    termSpanish: 'Transferencia',
    school: 'both',
    category: 'clinical_structures',
    pronunciation: '[ˈyːbɐˌtʁaːɡʊŋ]',
    literalMeaning: 'Traslado, transmisión, cesión, metáfora o transporte de un lugar a otro.',
    keySources: [
      {
        title: 'Dinámica de la transferencia',
        year: 1912,
        originalTitle: 'Zur Dynamik der Übertragung',
        sectionOrVolume: 'Freud, GW VIII'
      },
      {
        title: 'Puntualizaciones sobre el amor de transferencia',
        year: 1915,
        originalTitle: 'Bemerkungen über die Übertragungsliebe',
        sectionOrVolume: 'Freud, GW X'
      },
      {
        title: 'El Seminario, Libro 8: La transferencia',
        year: 1960,
        originalTitle: 'Le Séminaire, Livre VIII: Le transfert',
        sectionOrVolume: 'Lacan, Éditions du Seuil'
      }
    ],
    shortDefinition: 'Proceso por el cual los deseos inconscientes se actualizan sobre la persona del analista; motor de la cura y simultáneamente su máxima resistencia.',
    rigorousExplanation: `Para Freud, la transferencia es la repetición (*Wiederholung*) en el presente de prototipos infantiles de elección de objeto (*Objektwahl*), investiduras de amor u hostilidad dirigidas originalmente a las figuras parentales.

Lacan redefine la transferencia alejándola de la mera afectividad intersubjetiva:
1. **El Sujeto Supuesto Saber ($S.s.S.$)**: La transferencia se funda en un hecho epistémico: el analizante supone que el analista sabe la verdad sobre su síntoma.
2. **El pivote del amor**: El amor de transferencia es el intento del sujeto de cerrar el inconsciente ante la emergencia de lo Real.
3. **Manejo clínico**: El analista no responde desde su yo personal ni gratifica la demanda amorosa, sino que preserva el enigma de su deseo (*Désir de l'Analyste*) para relanzar la interrogación del sujeto.`,
    etymologicalNuance: 'En alemán, *Übertragung* es también la palabra para "traducción" o "metáfora", lo que resalta su carácter de sustitución significante de un objeto por otro.',
    clinicalSignificance: 'Sin transferencia no hay análisis posible, pero si el analista se identifica con el lugar del saber omnipotente, el análisis degenera en sugestión.',
    mathemeOrFormula: 'S.s.S. \\quad \\text{(Sujet Supposé Savoir)} \\quad | \\quad \\frac{S}{S_q} \\to s(S_1, S_2, ...)',
    relatedConcepts: ['Sujet supposé savoir', 'Wiederholungszwang', 'Désir de l\'Analyste', 'Agieren', 'Resistenz'],
    originalQuoteSnippet: {
      original: 'Die Übertragung, die als das stärkste Hindnis der Psychoanalyse erscheint, wird zu ihrem mächtigsten Hilfsmittel.',
      spanish: 'La transferencia, que parece ser el más poderoso obstáculo del psicoanálisis, se convierte en su más poderoso auxiliar.',
      source: 'Freud, Bruchstück einer Hysterie-Analyse (1905)'
    }
  },
  {
    id: 'signifiant-signifie',
    termOriginal: 'Signifiant / Signifié (S/s)',
    language: 'french',
    termSpanish: 'Significante sobre Significado (El algoritmo saussureano subvertido)',
    school: 'lacan',
    category: 'language_and_unconscious',
    pronunciation: '[si.ɲi.fjɑ̃ / si.ɲi.fje]',
    literalMeaning: 'El significante (la imagen acústica / material del lenguaje) y el significado (el concepto o sentido mental).',
    keySources: [
      {
        title: 'La instancia de la letra en el inconsciente o la razón desde Freud',
        year: 1957,
        originalTitle: 'L\'instance de la lettre dans l\'inconscient ou la raison depuis Freud',
        sectionOrVolume: 'Écrits, pp. 493-528'
      }
    ],
    shortDefinition: 'La fórmula lacaniana $S/s$ que consagra la primacía absoluta del significante sobre el significado, separados por una barra resistente a la significación.',
    rigorousExplanation: `Lacan subvierte la lingüística de Ferdinand de Saussure:
1. Mientras que Saussure representaba el signo como $\\frac{\\text{Significado}}{\\text{Significante}}$, Lacan invierte la fracción: $\\frac{S}{s}$ (**Significante sobre Significado**).
2. **La barra**: La línea divisoria entre ambos simboliza la barrera infranqueable de la represión originaria (*Urverdrängung*). El significante no designa una cosa en el mundo, sino que produce retroactivamente el significado.
3. **Definición cardinal**: "Un significante es lo que representa a un sujeto para otro significante" (*Un signifiant représente le sujet pour un autre signifiant*).
4. **Las dos operaciones del inconsciente**:
   - **Metáfora (Condensación / Verdichtung)**: Sustitución de un significante por otro $\\to$ produce el surgimiento de nueva significación.
   - **Metonimia (Desplazamiento / Verschiebung)**: Conexión significante a significante $\\to$ mantiene abierta la falta del deseo.`,
    etymologicalNuance: 'La palabra "letra" (*la lettre*) enfatiza la materialidad localizada del significante en el cuerpo y en el texto del síntoma.',
    clinicalSignificance: 'El inconsciente está estructurado como un lenguaje (*L\'inconscient est structuré comme un langage*). El analista escucha la literalidad de la cadena verbal y no el "contenido psicológico imaginario".',
    mathemeOrFormula: '\\frac{S}{s} \\quad | \\quad S_1 \\longrightarrow S_2 \\quad (\\$)',
    relatedConcepts: ['Point de capiton', 'Grand Autre', 'Metáfora y Metonimia', 'Verdichtung', 'Verschiebung'],
    originalQuoteSnippet: {
      original: 'L\'inconscient est structuré comme un langage... Un signifiant est ce qui représente le sujet pour un autre signifiant.',
      spanish: 'El inconsciente está estructurado como un lenguaje... Un significante es lo que representa el sujeto para otro significante.',
      source: 'Lacan, Écrits (1957)'
    }
  }
];
