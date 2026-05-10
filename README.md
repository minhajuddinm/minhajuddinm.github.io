# Muhammad Minhajuddin — Portfolio

Personal portfolio site for Muhammad Minhajuddin, CS Researcher & Developer at Algoma University.

**Live:** [minhajuddinm.github.io](https://minhajuddinm.github.io)

---

## Stack

- **React 18** — UI components
- **Framer Motion** — animations
- **Tailwind CSS** — styling
- **Parcel 2** — bundler (zero-config)

## Local development

```bash
npm install
npm run dev        # dev server at localhost:3000
```

## Deploy

Every time you change source files, rebuild and push:

```bash
npm run build      # compiles src/ → root index.html + assets
git add -A
git commit -m "update"
git push
```

GitHub Pages serves the compiled `index.html` from the repo root automatically — no build step on GitHub's side, no Actions, no configuration needed.

## Project structure

```
src/
  components/     # React components (Hero, About, Research, etc.)
  index.html      # source HTML template (Parcel entry)
  main.jsx        # React root
  index.css       # Tailwind + custom animations
scripts/
  clean.js        # removes old hashed build files before each build
index.html        # compiled output — what GitHub Pages serves
*.js / *.css      # compiled bundle — served alongside index.html
```
