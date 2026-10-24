import type { UserProgress } from '../types';

const STORAGE_KEY = 'cloudprep_ai_progress';

export const getDefaultProgress = (): UserProgress => ({
  profile: {
    name: 'Learner',
    studyGoal: 'Pass AZ-900',
    createdAt: new Date().toISOString()
  },
  quizAttempts: [],
  flashcardReviews: {},
  learningActivities: [],
  achievements: [
    { id: 'first-quiz', name: 'First Steps', description: 'Complete your first quiz', unlocked: false, icon: 'bi-trophy' },
    { id: 'cloud-explorer', name: 'Cloud Concepts Explorer', description: 'Practice cloud concepts topics', unlocked: false, icon: 'bi-cloud' },
    { id: 'memory-master', name: 'Memory Master', description: 'Review 10 flashcards', unlocked: false, icon: 'bi-brain' },
    { id: 'streak-3', name: 'Consistent Learner', description: '3-day learning streak', unlocked: false, icon: 'bi-calendar-check' }
  ],
  xp: 0,
  streak: 0,
  lastActiveDate: new Date().toISOString()
});

export const loadProgress = (): UserProgress => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (data) {
      return JSON.parse(data);
    }
  } catch (e) {
    console.error('Failed to load progress', e);
  }
  return getDefaultProgress();
};

export const saveProgress = (progress: UserProgress): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch (e) {
    console.error('Failed to save progress', e);
  }
};

export const updateStreak = (progress: UserProgress): UserProgress => {
  const today = new Date().toDateString();
  const lastActive = new Date(progress.lastActiveDate).toDateString();
  
  if (today === lastActive) {
    return progress;
  }
  
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayStr = yesterday.toDateString();
  
  if (lastActive === yesterdayStr) {
    return {
      ...progress,
      streak: progress.streak + 1,
      lastActiveDate: new Date().toISOString()
    };
  } else {
    return {
      ...progress,
      streak: 1,
      lastActiveDate: new Date().toISOString()
    };
  }
};
