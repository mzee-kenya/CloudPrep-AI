import React, { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { questions } from '../data/questions';
import { curriculumTopics } from '../data/curriculum';
import { useProgress } from '../context/ProgressContext';
import { scoreQuiz } from '../utils/quiz';
import type { QuizAttempt } from '../types';

export const Practice: React.FC = () => {
  const [searchParams] = useSearchParams();
  const topicFilter = searchParams.get('topic');
  const { saveQuizAttempt } = useProgress();
  
  const [selectedTopic, setSelectedTopic] = useState<string>(topicFilter || '');
  const [quizStarted, setQuizStarted] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showFeedback, setShowFeedback] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  
  let quizQuestions = questions;
  if (selectedTopic) {
    quizQuestions = questions.filter(q => q.topicId === selectedTopic);
  }
  if (quizQuestions.length === 0 && !selectedTopic) {
    quizQuestions = questions.slice(0, 5);
  }
  
  const currentQuestion = quizQuestions[currentQuestionIndex];
  
  const startQuiz = () => {
    setQuizStarted(true);
    setCurrentQuestionIndex(0);
    setAnswers({});
    setShowFeedback(false);
    setQuizCompleted(false);
    setSelectedAnswer('');
  };
  
  const submitAnswer = () => {
    if (!selectedAnswer) return;
    setAnswers(prev => ({ ...prev, [currentQuestion.id]: selectedAnswer }));
    setShowFeedback(true);
  };
  
  const nextQuestion = () => {
    if (currentQuestionIndex < quizQuestions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedAnswer('');
      setShowFeedback(false);
    } else {
      completeQuiz();
    }
  };
  
  const completeQuiz = () => {
    const result = scoreQuiz(quizQuestions, answers);

    const attempt: QuizAttempt = {
      id: `attempt-${Date.now()}`,
      date: new Date().toISOString(),
      category: selectedTopic ? quizQuestions[0]?.category : undefined,
      topicId: selectedTopic || undefined,
      questions: quizQuestions,
      answers,
      score: result.score,
      totalQuestions: result.totalQuestions
    };

    saveQuizAttempt(attempt);
    setQuizCompleted(true);
  };
  
  if (!quizStarted) {
    return (
      <div>
        <div className="row mb-4">
          <div className="col-12">
            <h1 className="section-title mb-2"><i className="bi bi-pencil-square me-2"></i>Practice Quiz</h1>
            <p className="text-muted-soft">Test your knowledge with original AZ-900 practice questions</p>
          </div>
        </div>
        
        <div className="card card-cloudprep p-4">
          <h3 className="mb-3">Configure Your Quiz</h3>
          <div className="mb-3">
            <label className="form-label fw-semibold">Select Topic (Optional)</label>
            <select className="form-select" value={selectedTopic} onChange={(e) => setSelectedTopic(e.target.value)}>
              <option value="">All Topics (Mixed)</option>
              {curriculumTopics.map(topic => (
                <option key={topic.id} value={topic.id}>{topic.title}</option>
              ))}
            </select>
          </div>
          <p className="text-muted-soft mb-3">
            {selectedTopic ? `${quizQuestions.length} questions available for this topic` : `${questions.length} questions available total`}
          </p>
          <button className="btn btn-cloudprep-primary" onClick={startQuiz} disabled={quizQuestions.length === 0}>
            Start Quiz
          </button>
        </div>
      </div>
    );
  }
  
  if (quizCompleted) {
    const result = scoreQuiz(quizQuestions, answers);
    const score = result.score;
    const percentage = result.percentage;
    const incorrect = quizQuestions.filter(q => answers[q.id] !== q.correctAnswerId);
    
    return (
      <div>
        <div className="row mb-4">
          <div className="col-12 text-center">
            <h1 className="section-title mb-2">Quiz Complete! 🎉</h1>
            <p className="text-muted-soft">Great effort on completing your practice session</p>
          </div>
        </div>
        
        <div className="card card-cloudprep p-5 text-center mb-4">
          <div className="display-1 fw-bold mb-3" style={{color: percentage >= 70 ? 'var(--cp-success)' : percentage >= 50 ? 'var(--cp-warning)' : 'var(--cp-danger)'}}>
            {percentage}%
          </div>
          <h3 className="mb-2">{score} out of {quizQuestions.length} correct</h3>
          <p className="text-muted-soft mb-4">
            {percentage >= 70 ? 'Excellent work! Keep it up.' : percentage >= 50 ? 'Good progress. Review the explanations to improve.' : 'Keep practicing - you will get better with repetition!'}
          </p>
          <div className="d-flex gap-3 justify-content-center flex-wrap">
            <button className="btn btn-cloudprep-primary" onClick={startQuiz}>Practice Again</button>
            <Link to="/" className="btn btn-outline-primary">Back to Dashboard</Link>
          </div>
        </div>
        
        <div className="card card-cloudprep p-4">
          <h3 className="mb-3">Review Incorrect Answers</h3>
          {incorrect.length === 0 ? (
            <p className="text-muted-soft mb-0"><i className="bi bi-check-circle text-success me-2"></i>You answered every question correctly. Try a mixed-topic or harder quiz next.</p>
          ) : (
            incorrect.map(q => {
              const userAnswer = answers[q.id];
              const correctOption = q.options.find(o => o.id === q.correctAnswerId);
              const userOption = q.options.find(o => o.id === userAnswer);
              return (
                <div key={q.id} className="border rounded p-3 mb-3" style={{borderColor: 'var(--cp-border)'}}>
                  <div className="fw-semibold mb-2">{q.questionText}</div>
                  <div className="mb-2">
                    <span className="text-danger"><i className="bi bi-x-circle me-1"></i>Your answer: {userOption?.text ?? 'No answer'}</span>
                  </div>
                  <div className="mb-2">
                    <span className="text-success"><i className="bi bi-check-circle me-1"></i>Correct answer: {correctOption?.text}</span>
                  </div>
                  <div className="alert alert-info mb-0">
                    <strong>Explanation:</strong> {q.explanation}
                    {userAnswer && q.distractorExplanations[userAnswer] && (
                      <div className="mt-2"><strong>Why your answer was wrong:</strong> {q.distractorExplanations[userAnswer]}</div>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    );
  }
  
  return (
    <div>
      <div className="row mb-4">
        <div className="col-12">
          <div className="d-flex justify-content-between align-items-center flex-wrap gap-2">
            <h2 className="section-title mb-0">Question {currentQuestionIndex + 1} of {quizQuestions.length}</h2>
            <span className="badge badge-cloud">{curriculumTopics.find(t => t.id === currentQuestion.topicId)?.title}</span>
          </div>
          <div className="progress mt-2" style={{height: '8px'}}>
            <div className="progress-bar progress-bar-cloud" style={{width: `${((currentQuestionIndex + 1) / quizQuestions.length) * 100}%`}}></div>
          </div>
        </div>
      </div>
      
      <div className="card card-cloudprep p-4 mb-4">
        <h4 className="mb-4">{currentQuestion.questionText}</h4>
        <div className="d-flex flex-column gap-2">
          {currentQuestion.options.map(option => (
            <button
              key={option.id}
              className={`quiz-option ${selectedAnswer === option.id ? 'selected' : ''} ${showFeedback && option.id === currentQuestion.correctAnswerId ? 'correct' : ''} ${showFeedback && selectedAnswer === option.id && option.id !== currentQuestion.correctAnswerId ? 'incorrect' : ''}`}
              onClick={() => !showFeedback && setSelectedAnswer(option.id)}
              disabled={showFeedback}
            >
              <strong>{option.id.toUpperCase()}.</strong> {option.text}
            </button>
          ))}
        </div>
      </div>
      
      {showFeedback && (
        <div className="card card-cloudprep p-4 mb-4">
          <h5 className="mb-2">
            {selectedAnswer === currentQuestion.correctAnswerId ? 
              <span className="text-success"><i className="bi bi-check-circle me-2"></i>Correct!</span> : 
              <span className="text-danger"><i className="bi bi-x-circle me-2"></i>Not quite</span>
            }
          </h5>
          <p className="mb-2"><strong>Explanation:</strong> {currentQuestion.explanation}</p>
          {selectedAnswer !== currentQuestion.correctAnswerId && currentQuestion.distractorExplanations[selectedAnswer] && (
            <p className="mb-0"><strong>Why your answer was wrong:</strong> {currentQuestion.distractorExplanations[selectedAnswer]}</p>
          )}
        </div>
      )}
      
      <div className="d-flex justify-content-between">
        {!showFeedback ? (
          <button className="btn btn-cloudprep-primary" onClick={submitAnswer} disabled={!selectedAnswer}>
            Submit Answer
          </button>
        ) : (
          <button className="btn btn-cloudprep-primary" onClick={nextQuestion}>
            {currentQuestionIndex < quizQuestions.length - 1 ? 'Next Question' : 'See Results'}
          </button>
        )}
      </div>
    </div>
  );
};
