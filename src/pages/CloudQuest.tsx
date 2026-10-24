import React, { useState } from 'react';
import { useProgress } from '../context/ProgressContext';
import { quests } from '../data/quests';

export const CloudQuest: React.FC = () => {
  const { progress, completeQuest, addXP } = useProgress();
  const [activeQuestId, setActiveQuestId] = useState<string | null>(null);
  const [stepIndex, setStepIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showFeedback, setShowFeedback] = useState(false);
  const [finished, setFinished] = useState(false);

  const completed = progress.completedQuests ?? [];
  const quest = quests.find((q) => q.id === activeQuestId);

  const startQuest = (id: string) => {
    setActiveQuestId(id);
    setStepIndex(0);
    setAnswers({});
    setShowFeedback(false);
    setFinished(false);
  };

  const submit = () => {
    if (!quest) return;
    const step = quest.steps[stepIndex];
    if (!answers[step.id]) return;
    setShowFeedback(true);
  };

  const next = () => {
    if (!quest) return;
    if (stepIndex < quest.steps.length - 1) {
      setStepIndex((i) => i + 1);
      setShowFeedback(false);
    } else {
      setFinished(true);
      if (!completed.includes(quest.id)) {
        completeQuest(quest.id);
      } else {
        addXP(5, 'Replayed Cloud Quest scenario', 'study-session');
      }
    }
  };

  if (!quest) {
    return (
      <div>
        <div className="row mb-4">
          <div className="col-12">
            <h1 className="section-title mb-2"><i className="bi bi-controller me-2"></i>Cloud Quest</h1>
            <p className="text-muted-soft">
              Scenario-based challenges that connect practice to real African examples. Decisions are explained, not just scored.
            </p>
          </div>
        </div>
        <div className="row g-3">
          {quests.map((q) => (
            <div key={q.id} className="col-lg-6">
              <div className="card card-cloudprep p-4 h-100">
                <div className="d-flex justify-content-between align-items-start mb-2">
                  <h4 className="section-title mb-0">{q.title}</h4>
                  <span className="badge badge-cloud">+{q.xpReward} XP</span>
                </div>
                <p className="text-muted-soft">{q.summary}</p>
                <p className="small mb-3">Steps: {q.steps.length}</p>
                <button className="btn btn-cloudprep-primary mt-auto" onClick={() => startQuest(q.id)}>
                  {completed.includes(q.id) ? 'Replay Quest' : 'Start Quest'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (finished) {
    return (
      <div className="card card-cloudprep p-5 text-center">
        <h2 className="section-title mb-2">Quest Complete!</h2>
        <p className="mb-3">You worked through realistic tradeoffs and saw why each answer matters.</p>
        <div className="d-flex gap-2 justify-content-center">
          <button className="btn btn-cloudprep-primary" onClick={() => setActiveQuestId(null)}>Back to Quests</button>
          <button className="btn btn-outline-primary" onClick={() => startQuest(quest.id)}>Replay</button>
        </div>
      </div>
    );
  }

  const step = quest.steps[stepIndex];
  const selected = answers[step.id];
  const correct = selected === step.correctOptionId;
  const correctOption = step.options.find((o) => o.id === step.correctOptionId);

  return (
    <div>
      <div className="row mb-3">
        <div className="col-12 d-flex justify-content-between align-items-center">
          <h2 className="section-title mb-0">{quest.title}</h2>
          <span className="badge badge-cloud">Step {stepIndex + 1} / {quest.steps.length}</span>
        </div>
      </div>
      <div className="card card-cloudprep p-4 mb-3">
        <div className="alert alert-info">
          <strong>Scenario:</strong> {step.scenario}
        </div>
        <h4 className="mb-3">{step.question}</h4>
        <div className="d-flex flex-column gap-2">
          {step.options.map((opt) => (
            <button
              key={opt.id}
              className={`quiz-option ${selected === opt.id ? 'selected' : ''} ${showFeedback && opt.id === step.correctOptionId ? 'correct' : ''} ${showFeedback && selected === opt.id && opt.id !== step.correctOptionId ? 'incorrect' : ''}`}
              disabled={showFeedback}
              onClick={() => !showFeedback && setAnswers((a) => ({ ...a, [step.id]: opt.id }))}
            >
              <strong>{opt.id.toUpperCase()}.</strong> {opt.text}
            </button>
          ))}
        </div>
      </div>
      {showFeedback && (
        <div className="card card-cloudprep p-4 mb-3">
          <h5 className={correct ? 'text-success' : 'text-danger'}>
            {correct ? <><i className="bi bi-check-circle me-2"></i>Good decision</> : <><i className="bi bi-x-circle me-2"></i>Consider this</>}
          </h5>
          {!correct && <p className="mb-2"><strong>Stronger answer:</strong> {correctOption?.text}</p>}
          <p className="mb-0"><strong>Explanation:</strong> {step.explanation}</p>
        </div>
      )}
      <div className="d-flex gap-2">
        {!showFeedback ? (
          <button className="btn btn-cloudprep-primary" disabled={!selected} onClick={submit}>Check Decision</button>
        ) : (
          <button className="btn btn-cloudprep-primary" onClick={next}>{stepIndex < quest.steps.length - 1 ? 'Next Step' : 'Finish Quest'}</button>
        )}
        <button className="btn btn-outline-secondary" onClick={() => setActiveQuestId(null)}>Quit</button>
      </div>
    </div>
  );
};
