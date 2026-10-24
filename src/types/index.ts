export type Difficulty = 'beginner' | 'intermediate' | 'advanced';

export interface CurriculumTopic {
  id: string;
  title: string;
  category: 'cloud-concepts' | 'azure-architecture' | 'azure-management';
  description: string;
  learningObjectives: string[];
  explanation: string;
  analogy?: string;
  analogyNote?: string;
  commonMisconception?: string;
  memoryAid?: string;
  relatedTopics: string[];
  order: number;
  difficulty?: Difficulty;
}

export interface QuestionOption {
  id: string;
  text: string;
}

export interface Question {
  id: string;
  topicId: string;
  category: 'cloud-concepts' | 'azure-architecture' | 'azure-management';
  difficulty: Difficulty;
  type: 'conceptual' | 'scenario' | 'service-selection' | 'comparison' | 'decision';
  questionText: string;
  options: QuestionOption[];
  correctAnswerId: string;
  explanation: string;
  distractorExplanations: Record<string, string>;
  learningObjective: string;
}

export interface QuizAttempt {
  id: string;
  date: string;
  category?: string;
  topicId?: string;
  questions: Question[];
  answers: Record<string, string>;
  score: number;
  totalQuestions: number;
  timeSpentSeconds?: number;
}

export interface Flashcard {
  id: string;
  topicId: string;
  front: string;
  back: string;
  mnemonic?: string;
  example?: string;
}

export interface FlashcardReview {
  flashcardId: string;
  lastReviewed: string;
  nextReview: string;
  intervalDays: number;
  easeFactor: number;
  repetitions: number;
  remembered: boolean;
}

export interface UserProfile {
  name: string;
  targetExamDate?: string;
  studyGoal: string;
  createdAt: string;
}

export interface LearningActivity {
  id: string;
  type: 'quiz' | 'flashcard' | 'study-session' | 'read' | 'tutor';
  date: string;
  description: string;
  xp: number;
  topicId?: string;
}

export interface StudyPlanSession {
  id: string;
  day: number;
  date?: string;
  type: 'learn' | 'practice' | 'flashcard' | 'review' | 'mixed';
  topicIds: string[];
  durationMinutes: number;
  completed: boolean;
  skipped?: boolean;
  description: string;
}

export interface StudyPlan {
  id: string;
  createdAt: string;
  targetExamDate?: string;
  minutesPerDay?: number;
  warnings?: string[];
  sessions: StudyPlanSession[];
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  unlocked: boolean;
  unlockedAt?: string;
  icon: string;
}

export interface QuestOption {
  id: string;
  text: string;
}

export interface QuestStep {
  id: string;
  scenario: string;
  question: string;
  options: QuestOption[];
  correctOptionId: string;
  explanation: string;
}

export interface Quest {
  id: string;
  title: string;
  summary: string;
  topicIds: string[];
  xpReward: number;
  steps: QuestStep[];
}

export interface UserProgress {
  profile: UserProfile;
  quizAttempts: QuizAttempt[];
  flashcardReviews: Record<string, FlashcardReview>;
  learningActivities: LearningActivity[];
  studyPlan?: StudyPlan;
  achievements: Achievement[];
  xp: number;
  streak: number;
  lastActiveDate: string;
  rewardedSessions?: string[];
  completedQuests?: string[];
}
