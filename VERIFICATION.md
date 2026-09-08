# Verification
- TypeScript check passed.
- All 20 reveal states traversed at 1920×1080, 1366×768, and 390×844.
- No horizontal overflow or browser runtime errors in those checks.
- Position survives refresh and keyboard navigation passed. Overview, sources,
  notes, and prompt drawers remain available from the presentation controls.
- Desktop and mobile screenshots inspected; fixed-header navigation keeps the
  title and spoken cue visible after every state change.
- Main flow: 20-minute overview, 10 discovery, 40 combined app build/use, 20 Q&A.
- Local Windows production export rendered successfully but the Vinext process
  hit a native teardown assertion afterward. GitHub Actions performs the clean
  Linux production build before publishing.
- Presenter rehearsal remains a human preparation step; no claim of a timed
  live rehearsal is made. The external-app workflow is intentionally illustrative.
