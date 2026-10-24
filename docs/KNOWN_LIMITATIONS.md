# Known Limitations

## Implemented
- Dashboard, Learn, Practice (quiz engine with scoring/explanations), Flashcards (with simplified spaced repetition), Cloud Quest, AI Tutor (with provider abstraction + fallback), Study Planner (generation, persistence, session completion), Progress/Readiness tracker
- Design system, responsive layout, accessibility considerations (semantic HTML, focus states, reduced-motion support)
- Domain logic extracted to testable utils (quiz scoring, spaced repetition, planner)

## Partially Implemented / Limited
- Question bank is a curated starter set (8 questions) - not exhaustive for all AZ-900 topics
- Spaced repetition uses simplified SM-2-inspired logic and is explicitly not validated
- Readiness indicators are evidence-based from practice only; no statistical pass prediction
- Achievements are basic; some rewards prevent duplicates
- Charts not heavily used; progress shown via bars/tables

## Unavailable Integrations
- Live AI tutor requires `VITE_TUTOR_ENDPOINT` and `VITE_TUTOR_API_KEY` (falls back honestly when missing)
- No Supabase/auth configured by default (uses localStorage)
- No deployment verified in this environment

## Testing Limitations
- Automated tests not yet added (planned)
- Manual verification done via build/lint/typecheck
- Browser testing not performed in this environment

## Notes
- Unofficial product - no Microsoft affiliation
- Original content only
- Data stays in browser localStorage
