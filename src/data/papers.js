/* Single source for every paper: used by the constellation and the publication list. */
const RAW = [
  /* ── Quantum ── */
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
  {
    id: 8,
    tag: 'Quantum Crypto',
    category: 'quantum',
    title: 'Noise-Aware Simulation and Statistical Eavesdropping Detection in BB84, Six-State, and E91 Quantum Key Distribution Protocols',
    year: '2027',
    authors: 'Vidhi, Minhajuddin, M. et al.',
    venue: 'IEEE CCNC 2027 · Work-in-Progress Paper · Accepted',
    abstract:
      'A unified Qiskit study of BB84, six-state, and E91 QKD protocols under matched ideal, synthetic-noise, and real-device conditions, deriving noise-calibrated eavesdropper-detection thresholds and characterizing the detection-versus-key-rate tradeoff against a tunable attacker.',
    status: { emoji: '📝', label: 'Under Publication', cls: 'bg-blue-50 text-blue-700 border border-blue-200' },
    topBar: 'from-blue-400/50 via-blue-500/50 to-blue-400/50',
  },
  {
    id: 11,
    tag: 'Quantum Crypto',
    category: 'quantum',
    title: 'Detection Blind Regions Under Collective Probe Attacks in BB84, Six-State, and E91 Quantum Key Distribution',
    year: '2027',
    authors: 'Vidhi, Minhajuddin, M., Islam, S. M. R., Sultana, A.',
    venue: 'IEEE CCECE 2027 · Full Paper · In Preparation',
    abstract:
      'Replaces the intercept-and-resend attacker with a collective probe attack, implemented in Qiskit as the Stinespring dilation of a Pauli channel, and computes the eavesdropper\'s Holevo information exactly. At equal information leakage, the blind region of per-session QBER and CHSH detectors grows by a factor of up to 4.6 under noise and, for BB84 and six-state, extends to the error rate at which the secret key rate reaches zero.',
    status: { emoji: '🛠️', label: 'In Preparation', cls: 'bg-violet-50 text-violet-700 border border-violet-200' },
    topBar: 'from-violet-400/50 via-violet-500/50 to-violet-400/50',
  },
  {
    id: 12,
    tag: 'Quantum Simulation',
    category: 'quantum',
    title: 'Reference-State Sensitivity of Perturbative Trotter Error Estimates for Fermi–Hubbard Lattices',
    year: '2027',
    authors: 'Minhajuddin, M., Vidhi, Asad, A.',
    venue: 'IEEE CCECE 2027 · Full Paper · In Preparation',
    abstract:
      'Evaluates the perturbative Trotter error estimate in PennyLane on 8–16 qubit Fermi–Hubbard lattices using classically cheap reference states (free-fermion, Néel, Gutzwiller, UHF). Using the hypervirial identity, the second-order error is written as a one-parameter family of forms; the symmetric member reduces reference-state error, and the hypervirial residual serves as a reliability check that is necessary but not sufficient.',
    status: { emoji: '🛠️', label: 'In Preparation', cls: 'bg-violet-50 text-violet-700 border border-violet-200' },
    topBar: 'from-violet-400/50 via-violet-500/50 to-violet-400/50',
  },
  {
    id: 13,
    tag: 'Quantum Crypto',
    category: 'quantum',
    title: 'Attributing Eavesdropping on Quantum Key Distribution Links: Calibrated and Sequential Detection for BB84, Six-State, and E91 Under Noise, Collective Attacks, and Hardware',
    year: '2027',
    authors: 'Vidhi, Minhajuddin, M., Islam, S. M. R., Sultana, A.',
    venue: 'IEEE Transactions on Network and Service Management · Journal Paper · In Preparation',
    abstract:
      'A journal extension of the CCNC and CCECE QKD studies that treats eavesdropping detection as an attribution problem separate from secrecy. It adds receiver operating characteristics, a sequential CUSUM detector over consecutive sessions, per-protocol asymptotic and composable finite-key rates, IBM hardware runs, and operating rules for QKD networks.',
    status: { emoji: '🛠️', label: 'In Preparation', cls: 'bg-violet-50 text-violet-700 border border-violet-200' },
    topBar: 'from-violet-400/50 via-violet-500/50 to-violet-400/50',
  },

  /* ── HCI & Systems ── */
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
    id: 1,
    tag: 'Edge Computing',
    category: 'hci',
    title: 'EDOA: Towards Adaptive and Energy-Aware Task Offloading in Edge-Cloud Environments',
    year: '2026',
    authors: 'Minhajuddin, M. et al.',
    venue: 'IEEE SysCon 2026 · Full Conference Paper · Published',
    abstract:
      'This paper proposes EDOA, an adaptive task offloading framework for edge-cloud environments, optimizing energy consumption and latency using a dynamic decision algorithm.',
    status: { emoji: '✅', label: 'Published', cls: 'bg-emerald-50 text-emerald-700 border border-emerald-200' },
    topBar: 'from-emerald-400/50 via-emerald-500/50 to-emerald-400/50',
  },
]

const STATUS_KEY = { 'Published': 'published', 'Under Publication': 'accepted', 'Under Review': 'review', 'In Preparation': 'wip' }

function kindOf(venue) {
  const v = venue.toLowerCase()
  if (v.includes('journal') || v.includes('tvcg')) return 'journal'
  if (v.includes('work-in-progress')) return 'wip'
  if (v.includes('survey')) return 'survey'
  if (v.includes('full')) return 'full'
  if (v.includes('demo')) return 'demo'
  return 'poster'
}

/* Short names used on the star map */
const SHORT = {
  1: 'EDOA', 2: 'HYPAR', 3: 'V.O.I.D.', 10: 'EFE Locomotion', 4: 'A.U.R.A.', 5: 'Echolocation Interfaces',
  6: 'PRISM', 7: 'Distributed QC Review', 8: 'Noise-Aware QKD Detection', 9: 'Quantum AI Comms Survey',
  11: 'QKD Collective Probe Attacks', 12: 'Trotter Error Estimates', 13: 'QKD Attribution Journal',
}

export const PAPERS = RAW.map(p => ({
  ...p,
  short: SHORT[p.id] || p.title.split(':')[0],
  statusKey: STATUS_KEY[p.status.label] || 'review',
  kind: kindOf(p.venue),
}))

/* Order here is the order of the filters and of the constellation tour */
export const CLUSTERS = [
  { id: 'quantum', label: 'Quantum',       blurb: 'QKD security, Trotter error estimation, distributed quantum computing and quantum AI' },
  { id: 'hci',     label: 'HCI & Systems', blurb: 'Locomotion, embodied AI, visual analytics, accessible VR and energy-aware edge-cloud offloading' },
]

/* Pairs of paper ids drawn as dashed links: a paper and its journal extension */
export const LINKS = [[3, 10], [8, 13], [11, 13]]

export const STATUS_META = {
  published: { label: 'Published',         cls: 'bg-emerald-50 text-emerald-700 border border-emerald-200 dark:bg-emerald-400/10 dark:text-emerald-300 dark:border-emerald-400/25' },
  accepted:  { label: 'Accepted',          cls: 'bg-sky-50 text-sky-700 border border-sky-200 dark:bg-sky-400/10 dark:text-sky-300 dark:border-sky-400/25' },
  review:    { label: 'Under Review',      cls: 'bg-amber-50 text-amber-700 border border-amber-200 dark:bg-amber-400/10 dark:text-amber-300 dark:border-amber-400/25' },
  wip:       { label: 'In Preparation',  cls: 'bg-violet-50 text-violet-700 border border-violet-200 dark:bg-violet-400/10 dark:text-violet-300 dark:border-violet-400/25' },
}

/* Papers that are accepted or published (used for the About counter) */
export const ACCEPTED_COUNT = PAPERS.filter(p => p.statusKey === 'published' || p.statusKey === 'accepted').length
