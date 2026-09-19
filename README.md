# Michail Spyridakis — Portfolio (EL / EN)

Local preview of a bilingual, data-driven CV / portfolio website.

## Quick preview

The site is designed so the main page also works by double-clicking `index.html`.
For the most reliable preview, run a small local server from this folder:

```bash
python -m http.server 8000
```

Then open `http://localhost:8000`.

## Content Manager

Open `admin.html` (or click the gear icon on the site).
You can edit the profile and sections, add/delete entries, and save the changes locally in your browser.
Changes are reflected immediately on `index.html` when both pages are opened from the same origin.

You can also export/import the full content as JSON.

## Important privacy choice

The public website contains **email only**. The phone number from the source CV is intentionally not displayed or included in the website data.

## Main files

- `index.html` — portfolio
- `styles.css` — design / responsive layout
- `data.js` — default content data (Greek & English)
- `app.js` — rendering + language switcher
- `admin.html` / `admin.js` / `admin.css` — local content manager
- `assets/favicon.svg` — site icon

## GitHub Pages later

This ZIP is only the preview package. Nothing is uploaded publicly.
When the design/content is approved, the folder can be pushed to a GitHub repository and published with GitHub Pages. A later version can connect the editor to a proper publishing workflow rather than browser-only storage.
