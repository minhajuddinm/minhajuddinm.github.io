/* Single source for every paper: used by the constellation and the publication list. */
const RAW = [
  {
    id: 1,
    tag: 'Edge Computing',
    category: 'computing',
    title: 'EDOA: Towards Adaptive and Energy-Aware Task Offloading in Edge-Cloud Environments',
    year: '2026',
    authors: 'Minhajuddin, M. et al.',
    venue: 'IEEE SysCon 2026 · Full Conference Paper · Published',
    abstract:
      'This paper proposes EDOA, an adaptive task offloading framework for edge-cloud environments, optimizing energy consumption and latency using a dynamic decision algorithm.',
    status: { emoji: '✅', label: 'Published', cls: 'bg-emerald-50 text-emerald-700 border border-emerald-200' },
    topBar: 'from-emerald-400/50 via-emerald-500/50 to-emerald-400/50',
  },
  {
    id: 2,
    tag: 'GenAI / AR',
    category: 'hci',
    title: 'HYPAR: Designing Hyper-Personalized Retail Product Packaging through Generative AI and Augmented Reality',
    year: '2026',
    authors: 'Minhajuddin, M. et al.',
    venue: 'IEEE ISEMV 2026 · Full Conference Paper · Under Publication',
    abstract:
      'HYPAR explores how generative AI and augmented reality can deliver hyper-personalized retail product packaging, enabling real-time visual customization of packaging through mobile AR interfaces.',
    status: { emoji: '📝', label: 'Under Publication', cls: 'bg-blue-50 text-blue-700 border border-blue-200' },
    topBar: 'from-blue-400/50 via-blue-500/50 to-blue-400/50',
  },
  {
    id: 3,
    tag: 'VR / HCI',
    category: 'hci',
    title: 'V.O.I.D.: Single-Arm Locomotion for Multitasking in Virtual Reality',
    year: '2026',
    authors: 'Minhajuddin, M. et al.',
    venue: 'ACM SUI 2026 · Poster · Under Publication',
    abstract:
      'V.O.I.D. introduces a single-arm locomotion technique that frees the second hand for concurrent tasks in virtual reality, evaluating comfort, presence, and task performance while multitasking.',
    status: { emoji: '📝', label: 'Under Publication', cls: 'bg-blue-50 text-blue-700 border border-blue-200' },
    topBar: 'from-blue-400/50 via-blue-500/50 to-blue-400/50',
  },
  {
    id: 10,
    tag: 'VR / HCI',
    category: 'hci',
    title: 'Towards Designing the Elbow Flexion and Extension as a Usable, Hands-Free Locomotion Method for Multitasking in Virtual Reality',
    year: '2026',
    authors: 'Varghese, J., Minhajuddin, M., Ranabhat, R. et al.',
    venue: 'IEEE TVCG · Journal Paper · Under Review',
    abstract:
      'A journal extension of V.O.I.D. that presents Elbow Flexion and Extension (EFE), a locomotion method mapping one arm\'s vertical hand velocity to forward movement so the other hand stays free for concurrent tasks. A within-subjects study with 40 participants compares EFE against controller and micro-gesture locomotion on usability, presence, and task performance.',
    status: { emoji: '🔄', label: 'Under Review', cls: 'bg-amber-50 text-amber-700 border border-amber-200' },
    topBar: 'from-amber-400/50 via-amber-500/50 to-amber-400/50',
  },
  {
    id: 4,
    tag: 'MR / AI',
    category: 'hci',
    title: 'A.U.R.A.: An Embodied Conversational AI Mentor in Mixed Reality for Proactive University Student Support',
    year: '2026',
    authors: 'Minhajuddin, M. et al.',
    venue: 'HCII 2026 · Poster · Under Publication',
    abstract:
      'A.U.R.A. is an embodied conversational AI mentor situated in mixed reality that proactively supports university students, combining spatial presence and adaptive dialogue to guide academic and wellbeing needs.',
    status: { emoji: '📝', label: 'Under Publication', cls: 'bg-blue-50 text-blue-700 border border-blue-200' },
    topBar: 'from-blue-400/50 via-blue-500/50 to-blue-400/50',
  },
  {
    id: 5,
    tag: 'VR / Accessibility',
    category: 'hci',
    title: 'Towards Designing Echolocation Interfaces for Inclusive Virtual Environments',
    year: '2026',
    authors: 'Minhajuddin, M. et al.',
    venue: 'Graphics Interface (GI) 2026 · Demo · Published',
    abstract:
      'This demo explores echolocation-based interaction techniques that use spatial audio cues to make virtual environments more inclusive and navigable for users with visual impairments.',
    status: { emoji: '✅', label: 'Published', cls: 'bg-emerald-50 text-emerald-700 border border-emerald-200' },
    topBar: 'from-emerald-400/50 via-emerald-500/50 to-emerald-400/50',
  },
  {
    id: 6,
    tag: 'MR / HCI',
    category: 'hci',
    title: 'PRISM: Mixed Reality Visual Analytics',
    year: '2026',
    authors: 'Minhajuddin, M. et al.',
    venue: 'IEEE ISMAR 2026 · Poster · Under Publication',
    abstract:
      'PRISM is a Unity-based mixed reality system that enables immersive, multi-modal visual analytics by embedding interactive data visualizations directly into physical environments.',
    status: { emoji: '📝', label: 'Under Publication', cls: 'bg-blue-50 text-blue-700 border border-blue-200' },
    topBar: 'from-blue-400/50 via-blue-500/50 to-blue-400/50',
  },
  {
    id: 7,
    tag: 'Quantum Computing',
    category: 'quantum',
    title: 'A Structured Review of Distributed Quantum Computing: Infrastructure, Protocols, Applications, Compilation, and Security',
    year: '2026',
    authors: 'Irfan, M., Tran, K., Minhajuddin, M. et al.',
    venue: 'IEEE Access · Survey Paper · Under Review',
    abstract:
      'A structured review of 124 studies (2020–2026) on distributed quantum computing, organized around five pillars — infrastructure, protocols, applications, compilation, and security — consolidating how these layers constrain one another and outlining open research directions.',
    status: { emoji: '🔄', label: 'Under Review', cls: 'bg-amber-50 text-amber-700 border border-amber-200' },
    topBar: 'from-amber-400/50 via-amber-500/50 to-amber-400/50',
  },
  {
    id: 8,
    tag: 'Quantum Crypto',
    category: 'quantum',
    title: 'Noise-Aware Simulation and Statistical Eavesdropping Detection in BB84, Six-State, and E91 Quantum Key Distribution Protocols',
    year: '2027',
    authors: 'Vidhi, Minhajuddin, M. et al.',
    venue: 'IEEE CCNC 2027 · Full Paper · Under Review',
    abstract:
      'A unified Qiskit study of BB84, six-state, and E91 QKD protocols under matched ideal, synthetic-noise, and real-device conditions, deriving noise-calibrated eavesdropper-detection thresholds and characterizing the detection-versus-key-rate tradeoff against a tunable attacker.',
    status: { emoji: '🔄', label: 'Under Review', cls: 'bg-amber-50 text-amber-700 border border-amber-200' },
    topBar: 'from-amber-400/50 via-amber-500/50 to-amber-400/50',
  },
  {
    id: 9,
    tag: 'Quantum AI',
    category: 'quantum',
    title: 'A Survey on Quantum AI Communications: Protocols, Optimization, and Applications',
    year: '2026',
    authors: 'Sharma, S., Minhajuddin, M., Mukhija, R. et al.',
    venue: 'IEEE Access · Survey Paper · Under Review',
    abstract:
      'A survey organizing quantum AI and communications research into a bidirectional taxonomy — quantum-enhanced learning for classical network problems, and classical AI for quantum communication infrastructure — spanning 6G, edge and semantic communications, QKD parameter optimization and attack detection, and a comparative analysis of post-quantum cryptography, QKD, and hybrid PQC-QKD architectures.',
    status: { emoji: '🔄', label: 'Under Review', cls: 'bg-amber-50 text-amber-700 border border-amber-200' },
    topBar: 'from-amber-400/50 via-amber-500/50 to-amber-400/50',
  },
]

const STATUS_KEY = { 'Published': 'published', 'Under Publication': 'accepted', 'Under Review': 'review' }

function kindOf(venue) {
  const v = venue.toLowerCase()
  if (v.includes('journal') || v.includes('tvcg')) return 'journal'
  if (v.includes('survey')) return 'survey'
  if (v.includes('full')) return 'full'
  if (v.includes('demo')) return 'demo'
  return 'poster'
}

/* Short names used on the star map */
const SHORT = {
  1: 'EDOA', 2: 'HYPAR', 3: 'V.O.I.D.', 10: 'EFE Locomotion', 4: 'A.U.R.A.', 5: 'Echolocation Interfaces',
  6: 'PRISM', 7: 'Distributed QC Review', 8: 'QKD Eavesdropping Detection', 9: 'Quantum AI Comms Survey',
}

export const PAPERS = RAW.map(p => ({
  ...p,
  short: SHORT[p.id] || p.title.split(':')[0],
  statusKey: STATUS_KEY[p.status.label] || 'review',
  kind: kindOf(p.venue),
}))

export const CLUSTERS = [
  { id: 'hci',       label: 'HCI / XR',        blurb: 'Locomotion, embodied AI, visual analytics and accessible VR' },
  { id: 'quantum',   label: 'Quantum',          blurb: 'QKD protocols, distributed quantum computing and quantum AI' },
  { id: 'computing', label: 'Edge Computing',   blurb: 'Energy-aware task offloading across edge and cloud' },
]

export const STATUS_META = {
  published: { label: 'Published',         cls: 'bg-emerald-50 text-emerald-700 border border-emerald-200 dark:bg-emerald-400/10 dark:text-emerald-300 dark:border-emerald-400/25' },
  accepted:  { label: 'Accepted',          cls: 'bg-sky-50 text-sky-700 border border-sky-200 dark:bg-sky-400/10 dark:text-sky-300 dark:border-sky-400/25' },
  review:    { label: 'Under Review',      cls: 'bg-amber-50 text-amber-700 border border-amber-200 dark:bg-amber-400/10 dark:text-amber-300 dark:border-amber-400/25' },
}

/* Papers that are accepted or published (used for the About counter) */
export const ACCEPTED_COUNT = PAPERS.filter(p => p.statusKey !== 'review').length
