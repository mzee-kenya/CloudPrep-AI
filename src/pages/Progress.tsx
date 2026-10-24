import React from 'react';
import { useProgress } from '../context/ProgressContext';
import { curriculumTopics } from '../data/curriculum';

export const Progress: React.FC = () => {
  const { progress } = useProgress();
  
  const topicPerformance: Record<string, { correct: number, total: number, attempts: number }> = {};
  progress.quizAttempts.forEach(attempt => {
    attempt.questions.forEach(q => {
      if (!topicPerformance[q.topicId]) {
        topicPerformance[q.topicId] = { correct: 0, total: 0, attempts: 0 };
      }
      topicPerformance[q.topicId].total++;
      if (attempt.answers[q.id] === q.correctAnswerId) {
        topicPerformance[q.topicId].correct++;
      }
    });
  });
  
  const overallCorrect = progress.quizAttempts.reduce((sum, a) => sum + a.score, 0);
  const overallTotal = progress.quizAttempts.reduce((sum, a) => sum + a.totalQuestions, 0);
  const overallPercentage = overallTotal > 0 ? Math.round((overallCorrect / overallTotal) * 100) : 0;
  
  const getStatus = (correct: number, total: number) => {
    if (total === 0) return { label: 'Not Assessed', color: 'secondary' };
    const pct = (correct / total) * 100;
    if (pct >= 80) return { label: 'Consistently performing well', color: 'success' };
    if (pct >= 70) return { label: 'Developing', color: 'info' };
    if (pct >= 50) return { label: 'Needs improvement', color: 'warning' };
    return { label: 'Needs improvement', color: 'danger' };
  };
  
  return (
    <div>
      <div className="row mb-4">
        <div className="col-12">
          <h1 className="section-title mb-2"><i className="bi bi-graph-up me-2"></i>Readiness Tracker</h1>
          <p className="text-muted-soft">Track your progress with transparent, evidence-based indicators</p>
        </div>
      </div>
      
      <div className="row g-3 mb-4">
        <div className="col-md-3 col-6">
          <div className="card card-cloudprep p-3 text-center">
            <div className="h3 mb-1 fw-bold" style={{color: overallPercentage >= 70 ? 'var(--cp-success)' : overallPercentage >= 50 ? 'var(--cp-warning)' : 'var(--cp-danger)'}}>{overallPercentage}%</div>
            <div className="text-muted-soft small">Overall Accuracy</div>
          </div>
        </div>
        <div className="col-md-3 col-6">
          <div className="card card-cloudprep p-3 text-center">
            <div className="h3 mb-1 fw-bold" style={{color: 'var(--cp-indigo)'}}>{overallTotal}</div>
            <div className="text-muted-soft small">Questions Answered</div>
          </div>
        </div>
        <div className="col-md-3 col-6">
          <div className="card card-cloudprep p-3 text-center">
            <div className="h3 mb-1 fw-bold" style={{color: 'var(--cp-teal)'}}>{progress.quizAttempts.length}</div>
            <div className="text-muted-soft small">Quizzes Completed</div>
          </div>
        </div>
        <div className="col-md-3 col-6">
          <div className="card card-cloudprep p-3 text-center">
            <div className="h3 mb-1 fw-bold" style={{color: 'var(--cp-violet)'}}>{Object.keys(progress.flashcardReviews).length}</div>
            <div className="text-muted-soft small">Flashcards Reviewed</div>
          </div>
        </div>
      </div>
      
      <div className="alert alert-warning mb-4">
        <i className="bi bi-exclamation-triangle me-2"></i>
        <strong>Note:</strong> This is not an official Microsoft pass probability. These indicators are based on your practice performance and should guide your study focus.
      </div>
      
      <div className="card card-cloudprep p-4 mb-4">
        <h3 className="section-title mb-3">Performance by Topic</h3>
        {Object.keys(topicPerformance).length === 0 ? (
          <p className="text-muted-soft mb-0">No quiz data yet. Complete some practice quizzes to see your topic-level performance.</p>
        ) : (
          <div className="table-responsive">
            <table className="table table-hover mb-0">
              <thead>
                <tr>
                  <th>Topic</th>
                  <th>Correct/Total</th>
                  <th>Accuracy</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {curriculumTopics.map(topic => {
                  const perf = topicPerformance[topic.id];
                  if (!perf || perf.total === 0) return null;
                  const pct = Math.round((perf.correct / perf.total) * 100);
                  const status = getStatus(perf.correct, perf.total);
                  return (
                    <tr key={topic.id}>
                      <td className="fw-semibold">{topic.title}</td>
                      <td>{perf.correct} / {perf.total}</td>
                      <td>
                        <div className="d-flex align-items-center gap-2">
                          <div className="progress flex-grow-1" style={{height: '6px'}}>
                            <div className="progress-bar progress-bar-cloud" style={{width: `${pct}%`}}></div>
                          </div>
                          <small>{pct}%</small>
                        </div>
                      </td>
                      <td><span className={`badge bg-${status.color}`}>{status.label}</span></td>
                      <td><a href={`/practice?topic=${topic.id}`} className="btn btn-sm btn-outline-primary">Practice</a></td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
      
      <div className="card card-cloudprep p-4">
        <h3 className="section-title mb-3">Recommendations</h3>
        {overallTotal === 0 ? (
          <p className="mb-0">Start by taking a diagnostic quiz to get personalized recommendations.</p>
        ) : overallPercentage < 70 ? (
          <div>
            <p className="mb-2"><strong>Your current practice performance suggests you should focus on weak areas.</strong></p>
            <ul className="mb-0">
              <li>Review topics where accuracy is below 70%</li>
              <li>Use Flashcards for active recall on difficult concepts</li>
              <li>Ask the AI Tutor to explain concepts you're struggling with</li>
              <li>Practice consistently with short, focused sessions</li>
            </ul>
          </div>
        ) : (
          <div>
            <p className="mb-2"><strong>You're doing well! Continue to build confidence.</strong></p>
            <ul className="mb-0">
              <li>Practice mixed-topic quizzes to test integration</li>
              <li>Focus on any remaining weak spots</li>
              <li>Use spaced repetition with flashcards</li>
              <li>Keep up your study streak!</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};
