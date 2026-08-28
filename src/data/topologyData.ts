import { StructuralModelItem } from '../types';

export const TOPOLOGY_MODELS: StructuralModelItem[] = [
  {
    id: 'noeud-borromeen',
    name: 'Nudo Borromeo (R-S-I) y Sinthome',
    nameOriginal: 'Le Nœud Borroméen et le Sinthome',
    author: 'Jacques Lacan',
    theoreticalAxiom: 'El ser hablante (parlêtre) se sostiene por el anudamiento de tres registros heterogéneos e irreductibles: Real, Simbólico e Imaginario.',
    description: 'En su última enseñanza (Seminarios 20 a 23), Lacan recurre a la topología matemática de nudos. El nudo borromeo posee la propiedad fundamental de que tres anillos de cuerda están enlazados de tal manera que si se corta uno cualquiera, los otros dos quedan completamente desanudados.',
    formulaOrDiagram: 'R \\cdot S \\cdot I \\oplus \\Sigma \\text{ (Sinthome)}',
    components: [
      {
        name: 'Le Réel (R)',
        symbol: 'R',
        role: 'Lo que no cesa de no escribirse. Lo inasimilable, el trauma primitivo, la carne biológica no codificada por el significante.',
        clinicalNote: 'La angustia surge cuando lo Real irrumpe sin mediación imaginaria o simbólica.'
      },
      {
        name: 'Le Symbolique (S)',
        symbol: 'S',
        role: 'El orden del lenguaje, la ley, el Nombre-del-Padre, la cadena significante y la estructura del pacto.',
        clinicalNote: 'Introduce la castración y la pérdida de goce fundante del deseo.'
      },
      {
        name: 'L\'Imaginaire (I)',
        symbol: 'I',
        role: 'El cuerpo como imagen unitaria (estadio del espejo), el sentido, las ilusiones de totalidad y la fascinación especular.',
        clinicalNote: 'Sostiene la consistencia mental; su desanudamiento produce despersonalización o alucinación corporal.'
      },
      {
        name: 'Le Sinthome (Σ)',
        symbol: 'Σ',
        role: 'El cuarto anillo que funciona como artificio de reparación o suplemento cuando el anudamiento originario falla.',
        clinicalNote: 'Permite la estabilización en la psicosis ordinaria y marca el punto de cierre del análisis (saber hacer con el síntoma).'
      }
    ]
  },
  {
    id: 'quatre-discours',
    name: 'Estructura de los Cuatro Discursos',
    nameOriginal: 'La structure des quatre discours',
    author: 'Jacques Lacan',
    theoreticalAxiom: 'El discurso es un dispositivo que hace lazo social sin recurrir a la fuerza física bruta, articulando cuatro lugares y cuatro términos mediante una rotación de un cuarto de vuelta.',
    description: 'Presentado en el Seminario XVII (El reverso del psicoanálisis, 1969-1970). Define las modalidades esenciales del lazo social, la dominación, la pedagogía, la protesta y la cura analítica.',
    formulaOrDiagram: '\\frac{\\text{Semblante / Agente}}{\\text{Verdad}} \\longrightarrow \\frac{\\text{Otro / Trabajo}}{\\text{Producción / Pérdida}}',
    components: [
      {
        name: 'Discurso del Amo (Maître)',
        symbol: 'M: S₁/$ → S₂/a',
        role: 'El Amo (S₁) gobierna exigiendo al saber del esclavo (S₂) que trabaje, produciendo un plus-de-goce (a) a expensas de la división oculta del amo ($).',
        clinicalNote: 'Representa la orden imperativa y la ley política tradicional.'
      },
      {
        name: 'Discurso Universitario (Université)',
        symbol: 'U: S₂/S₁ → a/$',
        role: 'El saber burocrático objetivo (S₂) se sitúa en el lugar del mando, operando sobre el sujeto reducido a objeto estadístico (a) y produciendo sujetos divididos ($).',
        clinicalNote: 'La tiranía del saber tecnocrático contemporáneo y la evaluación continua.'
      },
      {
        name: 'Discurso de la Histérica (Hystérique)',
        symbol: 'H: $ / a → S₁/S₂',
        role: 'El sujeto dividido ($) interpela al Amo (S₁) para obligarlo a producir un saber (S₂), revelando que ningún saber puede colmar su falta en ser.',
        clinicalNote: 'Matriz histórica del nacimiento del psicoanálisis; motor de la investigación y del síntoma interrogador.'
      },
      {
        name: 'Discurso del Analista (Analyste)',
        symbol: 'A: a/S₂ → $ / S₁',
        role: 'El analista se ubica en posición de resto/causa de deseo (a), apoyado en su saber no expuesto (S₂), para convocar la división del analizante ($) y permitirle producir sus significantes singulares (S₁).',
        clinicalNote: 'El reverso exacto del discurso del amo; respeta la falta y no impone ideales normativos.'
      }
    ]
  },
  {
    id: 'graphe-du-desir',
    name: 'El Grafo del Deseo',
    nameOriginal: 'Le Graphe du Désir',
    author: 'Jacques Lacan',
    theoreticalAxiom: 'El deseo humano no es una necesidad instintiva sino el producto de la articulación significante que atraviesa al ser hablante en dos pisos: el enunciado y la enunciación.',
    description: 'Desarrollado entre el Seminario V (Las formaciones del inconsciente) y el escrito "Subversión del sujeto y dialéctica del deseo" (1960). Visualiza cómo la necesidad biológica es refractada por la demanda al Gran Otro, dejando como residuo el deseo inconsciente.',
    formulaOrDiagram: '\\text{Nivel 1: } s(A) \\leftrightarrow A \\quad | \\quad \\text{Nivel 2: } (\\$ \\diamond D) \\leftrightarrow S(\\not{A}) \\text{ y } (\\$ \\diamond a)',
    components: [
      {
        name: 'Piso Inferior: Nivel de la Demanda y el Sentido',
        symbol: 's(A) - A - m - i(a)',
        role: 'Articula la comunicación consciente, el eje imaginario del Yo (m) con la imagen del semejante i(a), y la sanción del código en el Otro A.',
        clinicalNote: 'Donde opera la ilusión del mensaje recibido en forma invertida.'
      },
      {
        name: 'Piso Superior: Nivel de la Enunciación y la Pulsión',
        symbol: '($ ◊ D) - S(Ⱥ) - ($ ◊ a) - d',
        role: 'Articula la pulsión ($ ◊ D), el fantasma fundamental ($ ◊ a), el deseo inconsciente (d) y la falta en el Otro S(Ⱥ).',
        clinicalNote: 'Muestra que el deseo del sujeto se responde a través del enigma: "¿Qué me quiere el Otro?" (Che vuoi?).'
      }
    ]
  },
  {
    id: 'topicas-freudianas',
    name: 'Tópicas del Aparato Psíquico Freudiano',
    nameOriginal: 'Die metapsychologischen Topiken (Freud 1900 / 1923)',
    author: 'Sigmund Freud',
    theoreticalAxiom: 'El aparato anímico posee una dimensión espacial o tópica compuesta por sistemas e instancias diferenciadas funcional y dinámicamente.',
    description: 'Freud formula dos modelos sucesivos: la Primera Tópica (1900) basada en los sistemas Consciente-Preconsciente-Inconsciente, y la Segunda Tópica (1923) de carácter estructural con Ello-Yo-Superyó.',
    formulaOrDiagram: '\\text{Primera Tópica: } [Ub \\mid Vb \\mid Bw] \\quad \\longleftrightarrow \\quad \\text{Segunda Tópica: } [Es \\mid Ich \\mid Über-Ich]',
    components: [
      {
        name: 'Das Unbewusste (Ub / Lo Inconsciente)',
        symbol: 'Ub / Ics',
        role: 'Regido por el proceso primario (atemporalidad, ausencia de contradicción, condensación y desplazamiento) y el principio de placer.',
        clinicalNote: 'Sus contenidos son representaciones-cosa (Sachvorstellungen) reprimidas.'
      },
      {
        name: 'Das Es (El Ello)',
        symbol: 'Es',
        role: 'El polo pulsional de la personalidad, totalmente inconsciente, caldero de excitaciones que exige satisfacción inmediata.',
        clinicalNote: 'Origen de las fuerzas pulsionales que pugnan por manifestarse.'
      },
      {
        name: 'Das Ich (El Yo)',
        symbol: 'Ich',
        role: 'Instancia mediadora defensiva que busca conciliar las exigencias del Ello, los imperativos del Superyó y la realidad exterior.',
        clinicalNote: 'Posee una porción consciente perceptiva y una vasta porción inconsciente defensiva.'
      },
      {
        name: 'Das Über-Ich (El Superyó)',
        symbol: 'Über-Ich',
        role: 'Instancia censora nacida de la introyección de la autoridad parental edípica; combina el Ideal del Yo con una severidad cruel alimentada por la pulsión de muerte.',
        clinicalNote: 'Produce la culpa inconsciente y el autoreproche neurótico.'
      }
    ]
  }
];
