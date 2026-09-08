# Canopy interactive presentation

10 presenter-led screens (31 progressive reveal states).

## Run and edit
Use Node 24+, then npm ci and npm run dev. Open the local URL shown.
Edit app/content.ts for titles, presenter notes, profiles, date, and source links.
Edit app/serena-content.ts for Serena's four agent examples, the five webinar
setup steps, their detailed notes, and the copyable setup brief.
Edit app/build-workshop.tsx for the creation and implementation steps and notes.
Edit app/globals.css for design tokens. Blank demo URLs intentionally hide the links.
Use Next/Back, arrow keys, Page Up/Page Down, Space, or ordinary scrolling.
Overview revisits an idea and resets to the start. Notes are off by default.
The opening scene loops until the first Next holds its exact position for discussion.
Slide 02 advances through chat, an agent introduction, agent examples, and software.
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
The closing diagram returns to one task, a useful result, and human review.
Pause/Resume beneath the orbital diagrams holds their motion for discussion.
The webinar and build animations play once and settle for discussion.
Animations stop on inactive slides and respect reduced-motion preferences.
Inactive slides also stay out of keyboard and assistive-technology navigation.
These demonstrations use illustrative data and do not contact external services.
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
All product interfaces are clearly labeled illustrative visual summaries, rather than
product screenshots; no private screenshot data is used.
The webinar walkthrough is an illustrative Microsoft setup, not an installed automation.
Its event triggers, scheduling and human approval references are in Sources.
The external Codex expert-profile app is
intentionally not built; its workflow is represented as a clearly labeled demo.

## Presentation preparation
Suggested notes now total about 22 minutes of concepts and the webinar walkthrough,
40 minutes for the combined build/use demonstration, and 20 minutes for Q&A.
A human presenter should rehearse the pacing before the session.
Use sample data during a live external-app demonstration. The presentation works
with the optional demo URL absent.
