import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import type { UserProgress, QuizAttempt, FlashcardReview, StudyPlan } from '../types';
import { loadProgress, saveProgress, updateStreak } from '../utils/storage';
import { computeNextReview } from '../utils/spacedRepetition';

interface ProgressContextType {
  progress: UserProgress;
  saveQuizAttempt: (attempt: QuizAttempt) => void;
  updateFlashcardReview: (flashcardId: string, remembered: boolean) => void;
  addXP: (amount: number, description: string, type?: UserProgress['learningActivities'][number]['type']) => void;
  saveStudyPlan: (plan: StudyPlan) => void;
  toggleStudySession: (sessionId: string, status: 'complete' | 'incomplete' | 'skip') => void;
  completeQuest: (questId: string) => void;
  resetProgress: () => void;
}

const ProgressContext = createContext<ProgressContextType | undefined>(undefined);

const createActivity = (
  type: UserProgress['learningActivities'][number]['type'],
  description: string,
  xp: number,
  topicId?: string
) => ({
  id: `act-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
  type,
  date: new Date().toISOString(),
  description,
  xp,
  topicId,
});

export const ProgressProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [progress, setProgress] = useState<UserProgress>(() => updateStreak(loadProgress()));

  useEffect(() => {
    saveProgress(progress);
  }, [progress]);

  const saveQuizAttempt = useCallback((attempt: QuizAttempt) => {
    setProgress((prev) => {
      const xpEarned = attempt.score * 10;
      const next: UserProgress = {
        ...prev,
        quizAttempts: [...prev.quizAttempts, attempt],
        xp: prev.xp + xpEarned,
        learningActivities: [
          ...prev.learningActivities,
          createActivity('quiz', `Completed quiz - ${attempt.score}/${attempt.totalQuestions} correct`, xpEarned, attempt.topicId),
        ],
        achievements: prev.achievements.map((a) => ({ ...a })),
      };

      if (next.quizAttempts.length === 1) {
        const ach = next.achievements.find((a) => a.id === 'first-quiz');
        if (ach && !ach.unlocked) {
          ach.unlocked = true;
          ach.unlockedAt = new Date().toISOString();
        }
      }
      if (attempt.category === 'cloud-concepts') {
        const ach = next.achievements.find((a) => a.id === 'cloud-explorer');
        if (ach && !ach.unlocked) {
          ach.unlocked = true;
          ach.unlockedAt = new Date().toISOString();
        }
      }
      return next;
    });
  }, []);

  const updateFlashcardReview = useCallback((flashcardId: string, remembered: boolean) => {
    setProgress((prev) => {
      const previous = prev.flashcardReviews[flashcardId];
      const result = computeNextReview(previous, remembered);
      const review: FlashcardReview = { flashcardId, ...result };
      const xpEarned = remembered ? 5 : 2;

      const next: UserProgress = {
        ...prev,
        flashcardReviews: { ...prev.flashcardReviews, [flashcardId]: review },
        xp: prev.xp + xpEarned,
        learningActivities: [
          ...prev.learningActivities,
          createActivity(
            'flashcard',
            remembered ? 'Reviewed flashcard - remembered' : 'Reviewed flashcard - needs practice',
            xpEarned
          ),
        ],
        achievements: prev.achievements.map((a) => ({ ...a })),
      };

      if (Object.keys(next.flashcardReviews).length >= 10) {
        const ach = next.achievements.find((a) => a.id === 'memory-master');
        if (ach && !ach.unlocked) {
          ach.unlocked = true;
          ach.unlockedAt = new Date().toISOString();
        }
      }
      if (next.streak >= 3) {
        const ach = next.achievements.find((a) => a.id === 'streak-3');
        if (ach && !ach.unlocked) {
          ach.unlocked = true;
          ach.unlockedAt = new Date().toISOString();
        }
      }
      return next;
    });
  }, []);

  const addXP = useCallback(
    (
      amount: number,
      description: string,
      type: UserProgress['learningActivities'][number]['type'] = 'read'
    ) => {
      setProgress((prev) => ({
        ...prev,
        xp: prev.xp + amount,
        learningActivities: [...prev.learningActivities, createActivity(type, description, amount)],
      }));
    },
    []
  );

  const saveStudyPlan = useCallback((plan: StudyPlan) => {
    setProgress((prev) => ({ ...prev, studyPlan: plan }));
  }, []);

  const toggleStudySession = useCallback((sessionId: string, status: 'complete' | 'incomplete' | 'skip') => {
    setProgress((prev) => {
      if (!prev.studyPlan) return prev;
      const session = prev.studyPlan.sessions.find((s) => s.id === sessionId);
      if (!session) return prev;

      const rewarded = prev.rewardedSessions ?? [];
      const alreadyRewarded = rewarded.includes(sessionId);
      const completed = status === 'complete';
      const shouldAward = completed && !alreadyRewarded;

      const next: UserProgress = {
        ...prev,
        studyPlan: {
          ...prev.studyPlan,
          sessions: prev.studyPlan.sessions.map((s) =>
            s.id === sessionId ? { ...s, completed, skipped: status === 'skip' } : s
          ),
        },
        rewardedSessions: shouldAward ? [...rewarded, sessionId] : rewarded,
        xp: shouldAward ? prev.xp + 10 : prev.xp,
        learningActivities: shouldAward
          ? [
              ...prev.learningActivities,
              createActivity('study-session', `Completed study session: ${session.description}`, 10),
            ]
          : prev.learningActivities,
      };
      return next;
    });
  }, []);

  const completeQuest = useCallback((questId: string) => {
    setProgress((prev) => {
      if ((prev.completedQuests ?? []).includes(questId)) return prev;
      return {
        ...prev,
        completedQuests: [...(prev.completedQuests ?? []), questId],
        xp: prev.xp + 30,
        learningActivities: [
          ...prev.learningActivities,
          createActivity('study-session', 'Completed a Cloud Quest scenario', 30),
        ],
      };
    });
  }, []);

  const resetProgress = useCallback(() => {
    setProgress(updateStreak(loadProgress()));
  }, []);

  return (
    <ProgressContext.Provider
      value={{ progress, saveQuizAttempt, updateFlashcardReview, addXP, saveStudyPlan, toggleStudySession, completeQuest, resetProgress }}
    >
      {children}
    </ProgressContext.Provider>
  );
};

export const useProgress = () => {
  const context = useContext(ProgressContext);
  if (!context) throw new Error('useProgress must be used within ProgressProvider');
  return context;
};
