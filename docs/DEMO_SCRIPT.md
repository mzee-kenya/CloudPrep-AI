# Demo Script (Hackathon)

Time: 2-3 minutes

## Setup
1. `npm install && npm run dev` (or use production build)
2. Open the app in browser

## Demo Flow

### 1. Dashboard (15-20s)
- Show welcome state, XP/streak/achievements
- Point out "What Should I Learn Next?" recommendations based on progress

### 2. Learn (15s)
- Browse a topic (e.g., Cloud Service Models)
- Show explanation, analogy with African context, common misconception, memory aid

### 3. Practice Quiz (30-40s)
- Start a quiz (optionally filtered by topic)
- Answer a question, submit, see immediate feedback with explanation and distractor explanation
- Complete quiz, show results and incorrect-answer review

### 4. Flashcards (15s)
- Flip card, reveal answer with mnemonic/example
- Mark remembered/not remembered (show spaced repetition concept)

### 5. Cloud Quest (20s)
- Start the University Student Portal quest
- Work through a scenario, make decision, see explanation of tradeoffs

### 6. AI Tutor (15s)
- Ask "Give me an analogy for IaaS vs PaaS vs SaaS"
- Show structured response (plain explanation, analogy, Azure example, common mistake, check understanding)
- Point out fallback indicator if no API configured

### 7. Study Planner + Progress (20s)
- Generate a plan with exam date and time
- Show sessions, mark one complete (XP awarded)
- Show Progress/Readiness with evidence-based indicators and recommendations

## Backup Steps
- If AI API not configured: explicitly show fallback mode (transparent)
- If no quiz history: show new-learner dashboard state
- All core features work offline with localStorage

## Key Talking Points
- Connected learning loop across all modules
- Original content, no exam dumps
- African-context examples
- Honest about limitations and readiness
- Testable domain logic separated from UI
