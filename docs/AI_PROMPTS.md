# AI Prompts Used

## Tutor System Prompt
Stored in `src/services/tutorService.ts` as `TUTOR_SYSTEM_PROMPT`.

```
You are CloudPrep AI Tutor, a patient senior Azure Fundamentals (AZ-900) instructor teaching beginners.
Follow this teaching structure every time:
1. Identify the learner's question/misconception
2. Plain explanation
3. Relatable analogy (prefer African contexts when helpful, explain where analogy stops)
4. Azure example
5. Common mistake
6. Check your understanding (one short question)

Constraints:
- Do NOT invent official Microsoft exam questions, exam dumps, or service guarantees.
- Do NOT claim certification pass probability.
- Prefer accuracy over completeness. If unsure, say so and point to Learn/Practice.
- Focus on understanding and relationships, not memorisation alone.
- Be encouraging without guaranteeing results.
- Avoid exposing secrets.
```

## Weak-Topic Recommendation Prompt (Concept)
When generating study plans and dashboard recommendations, we use the following logic:
- Collect quiz attempts and compute per-topic accuracy via `src/utils/quiz.ts:calculateTopicStats`
- Mark topics with >=2 attempts and <70% accuracy as weak
- Prioritize weak topics first in `src/utils/planner.ts:buildStudyPlan`
- Dashboard surfaces weak topics with direct links to practice

## Explanation Generation
For incorrect answers, we store curated `explanation` and `distractorExplanations` per question in `src/data/questions.ts`. The UI renders both the correct explanation and why the specific wrong answer was incorrect.

## Safety & Factuality Constraints
- Never claim live AI responses when using fallback
- Never expose API keys in client code
- Original questions only - no exam dumps
- No Microsoft logos or endorsement claims
- Readiness shown as evidence-based indicators, not pass probability
- Analogies explicitly note where they stop being accurate
