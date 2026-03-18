export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center dot-grid overflow-hidden"
    >
      {/* Soft vignette so the dot grid fades into the page background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 80% 70% at 50% 50%, transparent 40%, #F9F7F4 100%)',
        }}
        aria-hidden="true"
      />

      {/* Main content */}
      <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
        <p className="text-xs font-medium tracking-[0.2em] text-accent uppercase mb-8">
          CS Researcher &nbsp;·&nbsp; Developer &nbsp;·&nbsp; Innovator
        </p>

        <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl text-ink leading-[1.1] mb-6">
          Building at the intersection of humans, technology, and ideas.
        </h1>

        <p className="text-base sm:text-lg text-ink-muted mb-10 leading-relaxed">
          Muhammad Minhajuddin — CS Researcher &amp; Developer at Algoma University
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <a
            href="#research"
            className="px-7 py-3 bg-accent text-white rounded-full text-sm font-medium hover:bg-accent/90 transition-colors shadow-sm"
          >
            View Research
          </a>
          <a
            href="#contact"
            className="px-7 py-3 border border-accent text-accent rounded-full text-sm font-medium hover:bg-accent-soft transition-colors"
          >
            Get in Touch
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-ink-muted/60 animate-bounce"
        aria-hidden="true"
      >
        <span className="text-[10px] tracking-[0.2em] uppercase font-medium">Scroll</span>
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 5v14M5 12l7 7 7-7" />
        </svg>
      </div>
    </section>
  )
}
