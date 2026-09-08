# Canopy interactive presentation

11 presenter-led screens (21 progressive reveal states), with a 20/10/40/20-minute session plan.

## Run and edit
Use Node 24+, then npm ci and npm run dev. Open the local URL shown.
Edit app/content.ts for the visible cues, presenter notes, system-profile summaries,
date, source links, and optional demo URLs.
Edit app/globals.css for design tokens. Blank demo URLs intentionally hide the links.
Use Next/Back, arrow keys, Page Up/Page Down, Space, or ordinary scrolling.
Overview revisits an idea and resets to the start. Notes are off by default.
The opening scene loops quietly until the first Next holds the completed team for discussion.
Only the current reveal position is stored locally. No AI backend or analytics.

## Publish
The GitHub Actions workflow builds and deploys GitHub Pages on pushes to main.
For a root-domain/static deployment, run npm run build without PAGES_BASE_PATH.
Static output is dist/client. Serve that folder with any static HTTP server
(e.g. python -m http.server 4173 --directory dist/client) for an offline fallback.
The static output must be served over HTTP, rather than opened as a file.

## Brand and source notes
Official logo and icon: canopyadvisory.com, downloaded September 5–6, 2026.
Canopy CSS supplied #113B52 blue, #081F2B deep blue and #CD8130 amber.
#885014 is the accessible darker amber used for small text.
The official site uses Carbona; Arial/Helvetica is the local fallback here,
so proprietary font files are not redistributed. No external font dependency.
Product references and verification date are in the Sources drawer and content.ts.
All product interfaces are clearly labeled illustrative visual summaries, rather than
product screenshots; no private screenshot data is used.
The discovery fallback is illustrative. The external Codex expert-profile app is
intentionally not built; its workflow is represented as a clearly labeled demo.

## Presentation preparation
The overview notes total 20 minutes, then 10 discovery, 40 combined build/use,
and 20 Q&A. A human presenter should rehearse the pacing before the session.
Use sample data during a live external-app demonstration. The presentation works
with both demo URLs absent.
