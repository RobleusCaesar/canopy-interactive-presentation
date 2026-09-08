# Verification
- TypeScript check passed.
- All 21 reveal states traversed at 1920×1080, 1366×768, and 390×844.
- No horizontal overflow or browser runtime errors in those checks.
- Slides 04–11 were redesigned to match the accepted opening and assembly scenes.
  All new node labels fit their boxes. Desktop and mobile screenshots of every
  redesigned scene and its principal interaction states were reviewed.
- All desktop slide content fits above the controls. Animated slide 02 and the
  brief builder, work tabs, permission gate, checkpoints, discovery and build
  demonstrations were exercised in the browser.
- System selection works by mouse and keyboard. Both reading and change-access
  states, all four work examples, all four checkpoints, the discovery evidence
  reveal, all four build/use stages, and the closing questions passed.
- Live SVG motion, exact pause/resume, offscreen suspension, and reduced-motion
  settings passed. The opening's exact hold/replay and all seven assembly states
  passed regression checks. Inactive slides are inert to keyboard focus.
- Position survives refresh and keyboard navigation passed. Overview, sources,
  notes, and prompt drawers remain available from the presentation controls.
- Fixed-header navigation keeps the slide title visible after every state change.
  Detailed spoken cues remain in the presenter notes instead of the main canvas.
- Main flow: 20-minute overview, 10 discovery, 40 combined app build/use, 20 Q&A.
- Local Windows production export rendered successfully but the Vinext process
  hit a native teardown assertion afterward. GitHub Actions performs the clean
  Linux production build before publishing.
- Presenter rehearsal remains a human preparation step; no claim of a timed
  live rehearsal is made. The external-app workflow is intentionally illustrative.
