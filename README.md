# Muhammad Minhajuddin — Personal Portfolio

Personal portfolio site for Muhammad Minhajuddin, CS Honours student at Algoma University.

**Stack:** Plain HTML · CSS custom properties · Vanilla JS (no framework, no build step)

---

## Project Structure

```
portfolio/
├── index.html        # All sections / markup
├── css/
│   └── styles.css    # Dark theme, animations, responsive layout
├── js/
│   └── script.js     # Particle canvas, scroll-reveal, nav behaviour
├── vercel.json       # Vercel static deployment config
└── README.md
```

---

## Local Development

No build step required. Open the file directly in a browser, or use any static server:

```bash
# Option 1 — Python (built-in)
python -m http.server 3000

# Option 2 — Node (npx)
npx serve .

# Option 3 — VS Code
# Install the "Live Server" extension, then click "Go Live"
```

Then open `http://localhost:3000`.

---

## Deploy to Vercel

### CLI (fastest)

```bash
# Install Vercel CLI once
npm i -g vercel

# From the project directory
vercel

# Follow the prompts — accept defaults for a static site.
# Vercel will print a live URL on completion.
```

### GitHub integration (recommended for ongoing updates)

1. Push this folder to a GitHub repository.
2. Go to [vercel.com](https://vercel.com) → **Add New Project**.
3. Import your repository.
4. Framework Preset: **Other** (static).
5. Root Directory: leave as-is (or set to the folder if in a subdirectory).
6. Click **Deploy**. Done.

Every `git push` to `main` will trigger an automatic redeploy.

---

## Deploy to GitHub Pages

1. Push the project to a GitHub repository.
2. Go to **Settings → Pages**.
3. Source: **Deploy from a branch** → `main` → `/ (root)`.
4. Save. Your site will be live at `https://<username>.github.io/<repo>/`.

---

## Customisation Cheatsheet

| What to change | Where |
|---|---|
| Name / tagline / bio | `index.html` — hero & about sections |
| Social links | `index.html` — hero-links & contact-links |
| Research papers | `index.html` — `#research` section |
| Awards | `index.html` — `#awards` section |
| Projects | `index.html` — `#projects` section |
| Accent colour | `css/styles.css` → `--accent` custom property |
| Background colour | `css/styles.css` → `--bg-primary` |
| Fonts | `index.html` Google Fonts `<link>` + `css/styles.css` `--font-*` variables |
| Particle density / speed | `js/script.js` → `CFG` object at the top of `initParticles` |

---

## Performance Notes

- Particle animation is paused automatically when the hero is scrolled out of view (IntersectionObserver).
- All fonts are loaded via Google Fonts with `display=swap` to avoid FOUT.
- CSS and JS assets are served with long-lived cache headers via `vercel.json`.
