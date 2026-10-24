import type { StudyPlanSession } from '../types';
import { curriculumTopics } from '../data/curriculum';

export interface PlannerInput {
  targetExamDate?: string;
  minutesPerDay: number;
  weakTopicIds?: string[];
  studiedTopicIds?: string[];
  today?: Date;
}

export interface GeneratedPlan {
  sessions: StudyPlanSession[];
  warnings: string[];
  daysUntilExam: number;
}

const SESSION_UNIT_MINUTES = 25;
const MAX_SESSIONS_PER_DAY = 4;

const daysBetween = (from: Date, to: Date): number =>
  Math.ceil((to.getTime() - from.getTime()) / (24 * 60 * 60 * 1000));

/**
 * Builds a practical, interval-based study plan from curriculum data.
 * This is a heuristic schedule, not a guarantee of exam readiness.
 */
export const buildStudyPlan = (input: PlannerInput): GeneratedPlan => {
  const today = input.today ?? new Date();
  const warnings: string[] = [];
  const weak = new Set(input.weakTopicIds ?? []);
  const studied = new Set(input.studiedTopicIds ?? []);

  const minutesPerDay = Math.max(SESSION_UNIT_MINUTES, Math.min(480, Math.round(input.minutesPerDay)));
  const sessionsPerDay = Math.max(1, Math.min(MAX_SESSIONS_PER_DAY, Math.floor(minutesPerDay / SESSION_UNIT_MINUTES)));
  const sessionMinutes = Math.min(60, Math.round(minutesPerDay / sessionsPerDay));

  let daysUntilExam = 7;
  if (input.targetExamDate) {
    const target = new Date(input.targetExamDate);
    if (Number.isNaN(target.getTime())) {
      warnings.push('The exam date could not be read, so a default one-week plan was created.');
    } else {
      daysUntilExam = Math.max(0, daysBetween(today, target));
      if (daysUntilExam === 0) {
        warnings.push('Your exam date is today or in the past. This plan is a short revision sprint, not a new study cycle.');
        daysUntilExam = 1;
      }
    }
  }

  const orderedTopics = [...curriculumTopics].sort((a, b) => {
    const aWeak = weak.has(a.id) ? 0 : studied.has(a.id) ? 2 : 1;
    const bWeak = weak.has(b.id) ? 0 : studied.has(b.id) ? 2 : 1;
    if (aWeak !== bWeak) return aWeak - bWeak;
    return a.order - b.order;
  });

  const remaining = [...orderedTopics];
  const sessions: StudyPlanSession[] = [];
  let sessionCounter = 0;

  const pushSession = (day: number, type: StudyPlanSession['type'], topicIds: string[], description: string) => {
    sessionCounter += 1;
    sessions.push({
      id: `session-${day}-${sessionCounter}`,
      day,
      date: new Date(today.getTime() + day * 24 * 60 * 60 * 1000).toISOString().slice(0, 10),
      type,
      topicIds,
      durationMinutes: sessionMinutes,
      completed: false,
      description,
    });
  };

  const totalAvailableSessions = daysUntilExam * sessionsPerDay;
  const topicsNeeded = Math.min(orderedTopics.length, Math.max(1, Math.ceil(totalAvailableSessions / 2)));
  const essential = remaining.splice(0, topicsNeeded);

  if (daysUntilExam < 3) {
    warnings.push('Less than three days remain. The plan prioritises weak topics and a final review rather than full coverage.');
  }

  for (let day = 0; day < daysUntilExam; day += 1) {
    const isFinalDay = day === daysUntilExam - 1;
    const topic = essential[day % Math.max(1, essential.length)];

    if (isFinalDay) {
      pushSession(day, 'mixed', essential.slice(0, 3).map((t) => t.id), 'Final mixed review across priority topics');
      if (sessionsPerDay > 1) {
        pushSession(day, 'flashcard', weak.size ? [...weak] : essential.slice(0, 2).map((t) => t.id), 'Final flashcard recall session');
      }
      continue;
    }

    if (topic) {
      const weakNote = weak.has(topic.id) ? ' (priority: weak area)' : studied.has(topic.id) ? ' (revision)' : '';
      pushSession(day, 'learn', [topic.id], `Study: ${topic.title}${weakNote}`);
    }

    if (sessionsPerDay > 1) {
      pushSession(day, 'practice', topic ? [topic.id] : [], `Practice questions: ${topic?.title ?? 'mixed topics'}`);
    }

    if (sessionsPerDay > 2) {
      pushSession(day, 'flashcard', topic ? [topic.id] : [], 'Flashcard active recall');
    }

    if (sessionsPerDay > 3) {
      pushSession(day, 'review', weak.size ? [...weak].slice(0, 3) : [topic?.id].filter(Boolean) as string[], 'Targeted weak-topic review');
    }
  }

  if (totalAvailableSessions < essential.length * 2) {
    warnings.push('The time available before your exam is limited. Expect to cover priority topics in more depth than the rest of the curriculum.');
  }

  return { sessions, warnings, daysUntilExam };
};
