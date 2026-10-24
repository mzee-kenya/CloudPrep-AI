import React from 'react';
import { Link } from 'react-router-dom';
import { useProgress } from '../context/ProgressContext';
import { curriculumTopics } from '../data/curriculum';

export const Dashboard: React.FC = () => {
  const { progress } = useProgress();
  
  const completedQuizzes = progress.quizAttempts.length;
  const totalXp = progress.xp;
  const unlockedAchievements = progress.achievements.filter(a => a.unlocked).length;
  
  const topicPerformance: Record<string, { correct: number, total: number }> = {};
  progress.quizAttempts.forEach(attempt => {
    attempt.questions.forEach(q => {
      if (!topicPerformance[q.topicId]) {
        topicPerformance[q.topicId] = { correct: 0, total: 0 };
      }
      topicPerformance[q.topicId].total++;
      if (attempt.answers[q.id] === q.correctAnswerId) {
        topicPerformance[q.topicId].correct++;
      }
    });
  });
  
  const weakTopics = Object.entries(topicPerformance)
    .filter(([_, perf]) => perf.total >= 2 && (perf.correct / perf.total) < 0.7)
    .map(([topicId]) => curriculumTopics.find(t => t.id === topicId))
    .filter(Boolean);
  
  return (
    <div>
      <div className="row mb-4">
        <div className="col-12">
          <div className="card card-cloudprep p-4">
            <div className="row align-items-center">
              <div className="col-lg-8">
                <h1 className="section-title mb-2">Welcome back, {progress.profile.name}! ☁️</h1>
                <p className="text-muted-soft mb-3">Goal: {progress.profile.studyGoal}</p>
                <p className="mb-0">Understand the Cloud. Master the Concepts. Build Your Confidence.</p>
              </div>
              <div className="col-lg-4 text-lg-end mt-3 mt-lg-0">
                <Link to="/practice" className="btn btn-cloudprep-primary btn-lg">
                  <i className="bi bi-lightning-charge me-2"></i>Start a Diagnostic Quiz
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="row g-3 mb-4">
        <div className="col-md-3 col-6">
          <div className="card card-cloudprep p-3 text-center">
            <div className="h3 mb-1 fw-bold" style={{color: 'var(--cp-indigo)'}}>{completedQuizzes}</div>
            <div className="text-muted-soft small">Quizzes Completed</div>
          </div>
        </div>
        <div className="col-md-3 col-6">
          <div className="card card-cloudprep p-3 text-center">
            <div className="h3 mb-1 fw-bold" style={{color: 'var(--cp-teal)'}}>{totalXp}</div>
            <div className="text-muted-soft small">Total XP</div>
          </div>
        </div>
        <div className="col-md-3 col-6">
          <div className="card card-cloudprep p-3 text-center">
            <div className="h3 mb-1 fw-bold" style={{color: 'var(--cp-violet)'}}>{progress.streak}</div>
            <div className="text-muted-soft small">Day Streak</div>
          </div>
        </div>
        <div className="col-md-3 col-6">
          <div className="card card-cloudprep p-3 text-center">
            <div className="h3 mb-1 fw-bold" style={{color: 'var(--cp-warning)'}}>{unlockedAchievements}</div>
            <div className="text-muted-soft small">Achievements</div>
          </div>
        </div>
      </div>
      
      <div className="row g-4">
        <div className="col-lg-8">
          <div className="card card-cloudprep p-4 mb-4">
            <h3 className="section-title mb-3"><i className="bi bi-compass me-2"></i>What Should I Learn Next?</h3>
            {completedQuizzes === 0 ? (
              <div>
                <p className="mb-3">You are just getting started! We recommend taking a diagnostic quiz to identify your strengths and areas for improvement.</p>
                <Link to="/practice" className="btn btn-cloudprep-primary">Take Diagnostic Quiz</Link>
              </div>
            ) : weakTopics.length > 0 ? (
              <div>
                <p className="mb-3">Based on your performance, focus on these areas that need improvement:</p>
                {weakTopics.slice(0, 3).map((topic: any) => (
                  <div key={topic.id} className="d-flex justify-content-between align-items-center p-3 mb-2 border rounded" style={{borderColor: 'var(--cp-border)'}}>
                    <div>
                      <div className="fw-semibold">{topic.title}</div>
                      <small className="text-muted-soft">{topic.description}</small>
                    </div>
                    <Link to={`/practice?topic=${topic.id}`} className="btn btn-sm btn-outline-primary">Practice</Link>
                  </div>
                ))}
              </div>
            ) : (
              <div>
                <p className="mb-3">Great job! Your performance is looking solid. Continue practicing across all topics to build confidence.</p>
                <Link to="/practice" className="btn btn-cloudprep-primary">Practice More</Link>
              </div>
            )}
          </div>
          
          <div className="card card-cloudprep p-4">
            <h3 className="section-title mb-3"><i className="bi bi-clock-history me-2"></i>Recent Activity</h3>
            {progress.learningActivities.length === 0 ? (
              <p className="text-muted-soft mb-0">No activity yet. Start learning to track your progress!</p>
            ) : (
              <div className="list-group list-group-flush">
                {progress.learningActivities.slice(-5).reverse().map(activity => (
                  <div key={activity.id} className="list-group-item px-0 d-flex justify-content-between align-items-center">
                    <div>
                      <div className="fw-semibold">{activity.description}</div>
                      <small className="text-muted-soft">{new Date(activity.date).toLocaleDateString()}</small>
                    </div>
                    <span className="badge badge-cloud">+{activity.xp} XP</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        
        <div className="col-lg-4">
          <div className="card card-cloudprep p-4 mb-4">
            <h4 className="section-title mb-3"><i className="bi bi-trophy me-2"></i>Achievements</h4>
            {progress.achievements.map(ach => (
              <div key={ach.id} className={`d-flex align-items-center gap-3 mb-2 p-2 rounded ${ach.unlocked ? '' : 'opacity-50'}`} style={{background: ach.unlocked ? 'rgba(34, 197, 94, 0.08)' : 'transparent'}}>
                <i className={`bi ${ach.icon} fs-4`} style={{color: ach.unlocked ? 'var(--cp-success)' : 'var(--cp-text-muted)'}}></i>
                <div className="flex-grow-1">
                  <div className="fw-semibold small">{ach.name}</div>
                  <small className="text-muted-soft">{ach.description}</small>
                </div>
                {ach.unlocked && <i className="bi bi-check-circle-fill text-success"></i>}
              </div>
            ))}
          </div>
          
          <div className="card card-cloudprep p-4">
            <h4 className="section-title mb-3"><i className="bi bi-bullseye me-2"></i>Daily Mission</h4>
            <p className="mb-3">Complete 5 flashcard reviews to strengthen your memory!</p>
            <Link to="/flashcards" className="btn btn-outline-primary w-100">Go to Flashcards</Link>
          </div>
        </div>
      </div>
    </div>
  );
};
