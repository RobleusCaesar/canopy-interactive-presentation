# Verification

- TypeScript and lint checks on the new modules passed.
- The presentation now has 11 numbered slides and 30 progressive reveal states.
- All 30 states were traversed at 1920×1080, 1366×768, and 390×844, with no browser
  runtime errors, failed asset requests, horizontal overflow, or content under
  the fixed presentation controls. Titles remain below the fixed header.
- The opening is titled Working With AI Agents. Every small page heading and
  the browser title derive from the opening title. All page titles align with
  the header logo and the footer position; alignment was checked on every state.
- The frozen opening copy and final All together assembly recap were removed.
  Next goes straight from the opening to Chat, and from the animated Review
  assembly state to System profiles. Both retained animations visibly advance.
- The final slide showcases the actual supplied Rob Carpenter Canopy Bio PDF
  as a 2376×1836 PNG, rendered with an upright viewing rotation. The original
  PDF and its bio content remain unchanged. The full page is visible without
  stretching or cropping at 1920×1080, 1366×768 and 390×844.
- The bio is paired with Thank you, the callback “Yes, it made my bio, too,”
  Questions, Rob Carpenter, Canopy Consulting, rob@frostrivercapital.com, and
  (303) 358-6128. The full-size image link, mailto and tel links were checked.
  The closing layout aligns with the logo, fits above the footer, and has no
  horizontal overflow or runtime errors. Desktop/phone screenshots were reviewed.
- Immediately before Thank you, the live Canopy Bio Builder loads in an iframe.
  Its embedded mode hides its header. The frame fills the remaining slide area,
  with Open app and Expand/Restore controls. Desktop, fullscreen and phone
  screenshots were reviewed. The app loads only after visiting its slide.
- A sample text document was attached through the embedded file picker. It
  remained attached after Next to Thank you and Back, with no iframe reload.
  Keyboard input in the app did not change slides. Open app and desktop full
  screen passed. Existing positions migrate across the inserted slide.
- Slide 02 now opens its Agent stage with a concise definition and animated
  human-goal / agent-action / completed-work sequence before the four examples.
  Next, Back, Replay, saved-position migration, reduced motion, and desktop/phone
  layouts passed targeted checks. Both Agent pages keep the 02 / 03 stage label.
- Slide 02's four agent examples were exercised: inbox triage, website profiles,
  photoshoot scheduling, and Talent Book checks. Each animation visibly changes;
  Replay preserves the selected example. Triggers and starting points are shown.
- Slide 07's five webinar setup scenes were exercised, including their distinct
  animations, step-specific presenter notes, copyable setup brief, and simulated
  approval/replay interaction. No orbit-dot animation remains in this walkthrough.
- The old feedback screen and discovery slide are absent from the sequence.
- The build workshop was checked across its two pages and eight animated steps:
  Requirements, Design, Build, GitHub, Upload, Pages, QA, and Refine. The local
  sample can be tried/reset, and the final step explicitly introduces the live demo.
- Desktop and mobile screenshots of the new examples and walkthroughs were
  reviewed. Animations change visibly, settle for discussion, and can be replayed.
- The shared Slide 02 guide/stage layout was checked across all four pages at
  1920, 1366, 900, and 390 pixels wide. Guide widths stay consistent between pages;
  content stays inside the stage with no horizontal overflow. All four agent
  tabs, animation replay, the software example, and reduced motion passed.
  Desktop example artwork clears the toolbar and review divider.
- Reduced-motion behavior passed. Inactive slides are inert to keyboard focus.
- Position survives refresh, and saved positions from the previous published
  sequence migrate correctly. Overview contains 11 entries. Notes, Sources,
  and the setup brief remain available through the existing controls.
- The opening and six retained assembly states preserve their existing animated
  design. Opening reduced motion and offscreen suspension remain supported.
- Saved positions from versions v2, v3, and v4 migrate to the revised sequence;
  positions on removed frames map to their animated predecessors.
- Suggested pacing is 22 minutes of concepts/webinar setup, 40 minutes for the
  build demonstration, and 20 minutes for discussion. Presenter rehearsal remains
  a human preparation step; no timed live rehearsal is claimed.
- Local Windows production export rendered successfully but the Vinext process
  hit a native teardown assertion afterward. GitHub Actions performs the clean
  Linux production build before publishing.
- The instructional workflows and approvals are illustrative. The Bio Builder
  is the user's real external application; it handles its own files, credentials,
  generation and printing. No API key was supplied and no AI-generation request
  was made during embed testing. End-to-end generation and PDF printing were not
  tested. Microsoft and GitHub implementation references remain in Sources.
