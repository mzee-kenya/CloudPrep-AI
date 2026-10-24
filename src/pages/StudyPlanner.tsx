import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useProgress } from '../context/ProgressContext';
import { curriculumTopics } from '../data/curriculum';
import { buildStudyPlan } from '../utils/planner';
import { calculateTopicStats } from '../utils/quiz';

export const StudyPlanner: React.FC = () => {
  const { progress, saveStudyPlan, toggleStudySession } = useProgress();
  const [targetDate, setTargetDate] = useState(progress.profile.targetExamDate ?? '');
  const [minutesPerDay, setMinutesPerDay] = useState('60');
  const [studied, setStudied] = useState<string[]>([]);
  const [weak, setWeak] = useState<string[]>([]);
  const [error, setError] = useState('');

  const topicStats = useMemo(() => calculateTopicStats(progress.quizAttempts), [progress.quizAttempts]);
  const detectedWeak = useMemo(
    () => Object.values(topicStats).filter((s) => s.total >= 2 && s.percentage < 70).map((s) => s.topicId),
    [topicStats]
  );

  const generate = () => {
    setError('');
    if (!targetDate) {
      setError('Please choose your target exam date so the plan can be scheduled.');
      return;
    }
    const target = new Date(targetDate);
    const today = new Date();
    if (Number.isNaN(target.getTime())) {
      setError('That exam date could not be read. Please pick a valid date.');
      return;
    }
    if (target < new Date(today.toDateString())) {
      setError('The exam date is in the past. Choose today or a future date.');
      return;
    }

    const plan = buildStudyPlan({
      targetExamDate: targetDate,
      minutesPerDay: Number(minutesPerDay),
      weakTopicIds: Array.from(new Set([...weak, ...detectedWeak])),
      studiedTopicIds: studied,
      today,
    });

    saveStudyPlan({
      id: `plan-${Date.now()}`,
      createdAt: new Date().toISOString(),
      targetExamDate: targetDate,
      minutesPerDay: Number(minutesPerDay),
      warnings: plan.warnings,
      sessions: plan.sessions,
    });
  };

  const toggleListItem = (list: string[], setList: (v: string[]) => void, id: string) => {
    setList(list.includes(id) ? list.filter((x) => x !== id) : [...list, id]);
  };

  const plan = progress.studyPlan;
  const completedCount = plan?.sessions.filter((s) => s.completed).length ?? 0;
  const skippedCount = plan?.sessions.filter((s) => s.skipped).length ?? 0;
  const progressPct = plan && plan.sessions.length > 0 ? Math.round((completedCount / plan.sessions.length) * 100) : 0;

  return (
    <div>
      <div className="row mb-4">
        <div className="col-12">
          <h1 className="section-title mb-2"><i className="bi bi-calendar-check me-2"></i>Personal Study Planner</h1>
          <p className="text-muted-soft">Create a realistic revision schedule based on your exam date and available time.</p>
        </div>
      </div>

      <div className="card card-cloudprep p-4 mb-4">
        <h3 className="mb-3">{plan ? 'Update Your Plan' : 'Plan Your Study Schedule'}</h3>
        {error && <div className="alert alert-danger" role="alert">{error}</div>}
        <div className="row g-3">
          <div className="col-md-6">
            <label htmlFor="examDate" className="form-label fw-semibold">Target Exam Date</label>
            <input
              id="examDate"
              type="date"
              className="form-control"
              value={targetDate}
              min={new Date().toISOString().slice(0, 10)}
              onChange={(e) => setTargetDate(e.target.value)}
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="minutesPerDay" className="form-label fw-semibold">Minutes Available Per Day</label>
            <select id="minutesPerDay" className="form-select" value={minutesPerDay} onChange={(e) => setMinutesPerDay(e.target.value)}>
              <option value="30">30 minutes</option>
              <option value="60">1 hour</option>
              <option value="90">1.5 hours</option>
              <option value="120">2 hours</option>
              <option value="180">3 hours</option>
            </select>
          </div>
        </div>

        <div className="row g-3 mt-1">
          <div className="col-md-6">
            <fieldset>
              <legend className="form-label fw-semibold fs-6">Topics I have already studied</legend>
              <div className="d-flex flex-wrap gap-2">
                {curriculumTopics.map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    className={`btn btn-sm ${studied.includes(t.id) ? 'btn-cloudprep-primary' : 'btn-outline-secondary'}`}
                    aria-pressed={studied.includes(t.id)}
                    onClick={() => toggleListItem(studied, setStudied, t.id)}
                  >
                    {t.title}
                  </button>
                ))}
              </div>
            </fieldset>
          </div>
          <div className="col-md-6">
            <fieldset>
              <legend className="form-label fw-semibold fs-6">Topics I find difficult</legend>
              <div className="d-flex flex-wrap gap-2">
                {curriculumTopics.map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    className={`btn btn-sm ${weak.includes(t.id) ? 'btn-cloudprep-primary' : 'btn-outline-secondary'}`}
                    aria-pressed={weak.includes(t.id)}
                    onClick={() => toggleListItem(weak, setWeak, t.id)}
                  >
                    {t.title}
                  </button>
                ))}
              </div>
            </fieldset>
          </div>
        </div>

        {detectedWeak.length > 0 && (
          <p className="text-muted-soft mt-3 mb-0 small">
            <i className="bi bi-graph-down-arrow me-1"></i>
            From your quiz history we will also prioritise {detectedWeak.length} topic(s) scoring under 70%.
          </p>
        )}

        <button className="btn btn-cloudprep-primary mt-3" onClick={generate}>
          {plan ? 'Regenerate Plan' : 'Generate Study Plan'}
        </button>
      </div>

      {plan && (
        <>
          <div className="card card-cloudprep p-4 mb-4">
            <div className="d-flex justify-content-between align-items-center flex-wrap gap-2 mb-2">
              <h4 className="section-title mb-0">Your Plan</h4>
              <span className="badge badge-cloud">
                {completedCount}/{plan.sessions.length} sessions complete • {skippedCount} skipped
              </span>
            </div>
            <div className="progress mb-3" style={{ height: '10px' }}>
              <div className="progress-bar progress-bar-cloud" style={{ width: `${progressPct}%` }}>{progressPct}%</div>
            </div>
            <p className="text-muted-soft small mb-0">
              {plan.minutesPerDay} minutes/day • Generated {new Date(plan.createdAt).toLocaleDateString()}
              {plan.targetExamDate ? ` • Target exam ${new Date(plan.targetExamDate).toLocaleDateString()}` : ''}
            </p>
            {plan.warnings?.map((w, i) => (
              <div key={i} className="alert alert-warning mt-3 mb-0 small">
                <i className="bi bi-exclamation-triangle me-2"></i>{w}
              </div>
            ))}
          </div>

          <div className="card card-cloudprep p-4">
            <h4 className="section-title mb-3">Sessions</h4>
            <div className="table-responsive">
              <table className="table align-middle mb-0">
                <thead>
                  <tr>
                    <th scope="col">Day</th>
                    <th scope="col">Activity</th>
                    <th scope="col">Type</th>
                    <th scope="col">Time</th>
                    <th scope="col">Status</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {plan.sessions.map((s) => (
                    <tr key={s.id} className={s.completed ? 'table-success' : s.skipped ? 'table-secondary' : ''}>
                      <td>Day {s.day + 1}</td>
                      <td>{s.description}</td>
                      <td><span className="badge bg-light text-dark text-capitalize">{s.type}</span></td>
                      <td>{s.durationMinutes} min</td>
                      <td>
                        {s.completed ? 'Completed' : s.skipped ? 'Skipped' : 'Upcoming'}
                      </td>
                      <td>
                        <div className="d-flex gap-1 flex-wrap">
                          {s.topicIds.length > 0 && (
                            <Link to={`/practice?topic=${s.topicIds[0]}`} className="btn btn-sm btn-outline-primary">Practice</Link>
                          )}
                          {!s.completed && (
                            <button className="btn btn-sm btn-success" onClick={() => toggleStudySession(s.id, 'complete')}>
                              Complete
                            </button>
                          )}
                          {!s.completed && !s.skipped && (
                            <button className="btn btn-sm btn-outline-secondary" onClick={() => toggleStudySession(s.id, 'skip')}>
                              Skip
                            </button>
                          )}
                          {(s.completed || s.skipped) && (
                            <button className="btn btn-sm btn-outline-secondary" onClick={() => toggleStudySession(s.id, 'incomplete')}>
                              Reset
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="small text-muted-soft mt-3 mb-0">
              Marking a session complete awards 10 XP once per session. Skipping does not award XP.
            </p>
          </div>
        </>
      )}
    </div>
  );
};
