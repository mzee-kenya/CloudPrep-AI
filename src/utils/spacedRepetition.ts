import type { FlashcardReview } from '../types';

export interface ReviewResult {
  intervalDays: number;
  easeFactor: number;
  repetitions: number;
  nextReview: string;
  lastReviewed: string;
  remembered: boolean;
}

const DAY_MS = 24 * 60 * 60 * 1000;

export const MIN_EASE = 1.3;
export const DEFAULT_EASE = 2.5;

/**
 * Lightweight spaced-repetition scheduler inspired by SM-2.
 * It is intentionally simplified and is NOT a validated scientific algorithm.
 * - Remembered: interval grows (1 day, then 6 days, then previous interval * ease).
 * - Forgotten: repetitions reset, interval returns to 1 day, ease decreases.
 */
export const computeNextReview = (
  previous: Pick<FlashcardReview, 'intervalDays' | 'easeFactor' | 'repetitions'> | undefined,
  remembered: boolean,
  now: Date = new Date()
): ReviewResult => {
  let intervalDays = 1;
  let easeFactor = previous?.easeFactor ?? DEFAULT_EASE;
  let repetitions = previous?.repetitions ?? 0;

  if (remembered) {
    repetitions += 1;
    if (repetitions === 1) intervalDays = 1;
    else if (repetitions === 2) intervalDays = 6;
    else intervalDays = Math.round((previous?.intervalDays ?? 1) * easeFactor);
    easeFactor = Math.min(3.0, easeFactor + 0.1);
  } else {
    repetitions = 0;
    intervalDays = 1;
    easeFactor = Math.max(MIN_EASE, easeFactor - 0.2);
  }

  const nextReview = new Date(now.getTime() + intervalDays * DAY_MS);

  return {
    intervalDays,
    easeFactor,
    repetitions,
    nextReview: nextReview.toISOString(),
    lastReviewed: now.toISOString(),
    remembered,
  };
};

export const isDue = (review: FlashcardReview | undefined, now: Date = new Date()): boolean => {
  if (!review) return true;
  return new Date(review.nextReview).getTime() <= now.getTime();
};
