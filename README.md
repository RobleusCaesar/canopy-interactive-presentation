# Canopy interactive presentation

11 presenter-led screens (30 progressive reveal states).

## Run and edit
Use Node 24+, then npm ci and npm run dev. Open the local URL shown.
Edit app/content.ts for titles, presenter notes, profiles, date, and source links.
Edit app/serena-content.ts for Serena's four agent examples, the five webinar
setup steps, their detailed notes, and the copyable setup brief.
Edit app/build-workshop.tsx for the creation and implementation steps and notes.
Edit app/globals.css for design tokens. Blank demo URLs intentionally hide the links.
Use Next/Back, arrow keys, Page Up/Page Down, Space, or ordinary scrolling.
Overview revisits an idea and resets to the start. Notes are off by default.
The opening scene loops as people arrive. Next goes directly to the presentation.
The frozen opening copy and the final assembly recap have been removed.
All title headings, the logo and footer share a left edge. Every small heading
and the browser title inherit the opening title from steps[0].title.
Slide 02 advances through chat, an agent introduction, agent examples, and software.
All four pages share a tinted guide rail, a divided animation stage, and a toolbar.
The guide becomes a compact top band on narrow screens. Edit app/story-structure.css
for this shared layout; the example tabs and review notes have their own separators.
Both agent pages retain the 02 / 03 Agent stage label. The introduction animates
a human goal becoming completed work, then Next opens the four examples.
Its agent section has four
selectable, animated examples: inbox triage, website profiles, photoshoot scheduling,
and Talent Book checks. Each includes a trigger, day-one starting point, and review.
Replay restarts the selected example. Slide 03 assembles an agent one component at a time.
Slide 07 now has five progressive setup steps for a webinar communications agent:
brief, trigger, audience, agent, and handoff. Next advances the walkthrough;
Replay restarts a step. The final approval button demonstrates delivery without
sending anything. Notes change with each step, and Setup brief opens a copyable prompt.
The former feedback screen and discovery slide were removed. Slides 08–10 cover
human checkpoints, the build workshop, and discussion. The build workshop has
two pages: Requirements / Design / Build, followed by GitHub / Upload / Pages /
QA / Refine. Each step has its own animation; Refine introduces the live demo.
The penultimate slide embeds the live Canopy Bio Builder. It loads on first
visit, stays mounted when navigating away, and includes Expand and Open app.
The embedded app handles its own files, API-key setup and workflow. It requires
internet access. The external tool is maintained separately.
The closing slide showcases Rob’s actual completed Canopy bio, with a small
callback to the app, Questions, and his contact links. The supplied PDF is
rendered upright as a sharp PNG; its contents and source PDF are unchanged.
Clicking the bio opens the full-resolution image in a separate tab.
Pause/Resume beneath the orbital diagrams holds their motion for discussion.
The webinar and build animations play once and settle for discussion.
Animations stop on inactive slides and respect reduced-motion preferences.
Inactive slides also stay out of keyboard and assistive-technology navigation.
The illustrative scenes use sample data and do not contact external services.
The embedded Bio Builder is the real application and follows its own workflow.
Only the current reveal position is stored locally. Older saved positions migrate
to the revised slide sequence. No AI backend or analytics.

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
The illustrative product interfaces are visual summaries rather than product
screenshots; no private screenshot data is used. The Bio Builder is a live app.
The webinar walkthrough is an illustrative Microsoft setup, not an installed automation.
Its event triggers, scheduling and human approval references are in Sources.
The user-provided Canopy Bio Builder is embedded directly from its public URL.
The presentation does not copy the application or handle its credentials.

## Presentation preparation
Suggested notes now total about 22 minutes of concepts and the webinar walkthrough,
40 minutes for the combined build/use demonstration, and 20 minutes for Q&A.
A human presenter should rehearse the pacing before the session.
Use sample data during a live external-app demonstration. The illustrative slides also work offline; the live Bio Builder needs a connection.
