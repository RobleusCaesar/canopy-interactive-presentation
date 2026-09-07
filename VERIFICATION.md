# Verification
- TypeScript check passed.
- All 22 reveal states traversed at 1920×1080, 1366×768, and 390×844.
- No horizontal overflow or browser runtime errors in those checks.
- Position survives refresh; keyboard navigation, overview reset, Escape and
  source-drawer focus restoration passed. Reduced-motion scroll path checked.
- Desktop and mobile screenshots inspected; corrected duplicate scroll offset.
- Main flow: 20-minute overview, 10 discovery, 40 combined app build/use, 20 Q&A.
- Local Windows production export rendered successfully but the Vinext process
  hit a native teardown assertion afterward. GitHub Actions performs the clean
  Linux production build before publishing.
- Presenter rehearsal remains a human preparation step; no claim of a timed
  live rehearsal is made. Sample-app workflow and URL remain intentionally unset.
