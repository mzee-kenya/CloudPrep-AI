import type { Question, QuizAttempt } from '../types';

export interface QuizScore {
  score: number;
  totalQuestions: number;
  percentage: number;
  correctIds: string[];
  incorrectIds: string[];
}

export const scoreQuiz = (
  questions: Question[],
  answers: Record<string, string>
): QuizScore => {
  const correctIds: string[] = [];
  const incorrectIds: string[] = [];

  questions.forEach((q) => {
    if (answers[q.id] === q.correctAnswerId) {
      correctIds.push(q.id);
    } else {
      incorrectIds.push(q.id);
    }
  });

  const score = correctIds.length;
  const totalQuestions = questions.length;
  const percentage = totalQuestions === 0 ? 0 : Math.round((score / totalQuestions) * 100);

  return { score, totalQuestions, percentage, correctIds, incorrectIds };
};

export const isAnswerCorrect = (question: Question, answerId: string): boolean =>
  question.correctAnswerId === answerId;

export interface TopicStat {
  topicId: string;
  correct: number;
  total: number;
  percentage: number;
}

export const calculateTopicStats = (attempts: QuizAttempt[]): Record<string, TopicStat> => {
  const stats: Record<string, TopicStat> = {};

  attempts.forEach((attempt) => {
    attempt.questions.forEach((q) => {
      const existing = stats[q.topicId] ?? { topicId: q.topicId, correct: 0, total: 0, percentage: 0 };
      existing.total += 1;
      if (attempt.answers[q.id] === q.correctAnswerId) {
        existing.correct += 1;
      }
      existing.percentage = existing.total === 0 ? 0 : Math.round((existing.correct / existing.total) * 100);
      stats[q.topicId] = existing;
    });
  });

  return stats;
};

export const calculateOverallAccuracy = (attempts: QuizAttempt[]): { correct: number; total: number; percentage: number } => {
  const correct = attempts.reduce((sum, a) => sum + a.score, 0);
  const total = attempts.reduce((sum, a) => sum + a.totalQuestions, 0);
  return { correct, total, percentage: total === 0 ? 0 : Math.round((correct / total) * 100) };
};

export type ReadinessLevel = 'not-assessed' | 'insufficient-evidence' | 'needs-improvement' | 'developing' | 'strong';

export interface ReadinessBand {
  level: ReadinessLevel;
  label: string;
  tone: 'secondary' | 'danger' | 'warning' | 'info' | 'success';
}

export const classifyReadiness = (correct: number, total: number): ReadinessBand => {
  if (total === 0) {
    return { level: 'not-assessed', label: 'Not assessed', tone: 'secondary' };
  }
  if (total < 3) {
    return { level: 'insufficient-evidence', label: 'Insufficient evidence', tone: 'secondary' };
  }
  const pct = (correct / total) * 100;
  if (pct >= 80) return { level: 'strong', label: 'Consistently performing well', tone: 'success' };
  if (pct >= 60) return { level: 'developing', label: 'Developing', tone: 'info' };
  return { level: 'needs-improvement', label: 'Needs improvement', tone: 'warning' };
};
