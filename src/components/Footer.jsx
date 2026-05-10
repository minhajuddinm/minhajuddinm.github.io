import { Github, Linkedin } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="border-t border-border-soft bg-warm-bg">
      {/* Gradient accent line at top */}
      <div className="h-[1px] bg-gradient-to-r from-transparent via-accent/30 to-transparent" />

      <div className="py-8 px-6">
        <div className="max-w-5xl mx-auto flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="font-display text-base text-ink mb-0.5">Muhammad Minhajuddin</p>
            <p className="font-mono text-xs text-ink-muted/55">
              {new Date().getFullYear()} &nbsp;·&nbsp; Built with React &amp; TailwindCSS
            </p>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="https://github.com/minhajuddinm"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 flex items-center justify-center rounded-full bg-white border border-border-soft text-ink-muted hover:text-accent hover:border-accent/25 hover:shadow-md transition-all duration-200"
              aria-label="GitHub"
            >
              <Github size={16} aria-hidden="true" />
            </a>
            <a
              href="https://linkedin.com/in/muhammad-minhajuddin76"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 flex items-center justify-center rounded-full bg-white border border-border-soft text-ink-muted hover:text-accent hover:border-accent/25 hover:shadow-md transition-all duration-200"
              aria-label="LinkedIn"
            >
              <Linkedin size={16} aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
