import React, { useState } from 'react';
import { flashcards } from '../data/flashcards';
import { curriculumTopics } from '../data/curriculum';
import { useProgress } from '../context/ProgressContext';

export const Flashcards: React.FC = () => {
  const { updateFlashcardReview, progress } = useProgress();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState<string>('');
  
  let cards = flashcards;
  if (selectedTopic) {
    cards = flashcards.filter(c => c.topicId === selectedTopic);
  }
  
  if (cards.length === 0) {
    return (
      <div>
        <h1 className="section-title mb-3"><i className="bi bi-card-text me-2"></i>Flashcards</h1>
        <div className="empty-state">
          <h4>No flashcards for this topic</h4>
          <p className="text-muted-soft">Try selecting a different topic</p>
          <button className="btn btn-cloudprep-primary" onClick={() => setSelectedTopic('')}>Show All</button>
        </div>
      </div>
    );
  }
  
  const card = cards[currentIndex];
  const topic = curriculumTopics.find(t => t.id === card.topicId);
  
  const handleRemember = (remembered: boolean) => {
    updateFlashcardReview(card.id, remembered);
    setFlipped(false);
    if (currentIndex < cards.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setCurrentIndex(0);
    }
  };
  
  const reviewCount = Object.keys(progress.flashcardReviews).length;
  
  return (
    <div>
      <div className="row mb-4">
        <div className="col-12">
          <div className="d-flex justify-content-between align-items-center flex-wrap gap-2">
            <div>
              <h1 className="section-title mb-1"><i className="bi bi-card-text me-2"></i>Flashcard Coach</h1>
              <p className="text-muted-soft mb-0">Active recall with spaced repetition</p>
            </div>
            <div>
              <select className="form-select" value={selectedTopic} onChange={(e) => { setSelectedTopic(e.target.value); setCurrentIndex(0); setFlipped(false); }}>
                <option value="">All Topics</option>
                {curriculumTopics.map(t => (
                  <option key={t.id} value={t.id}>{t.title}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>
      
      <div className="row mb-3">
        <div className="col-12 text-center">
          <span className="badge badge-cloud">Card {currentIndex + 1} of {cards.length} • {reviewCount} reviewed</span>
        </div>
      </div>
      
      <div className="row justify-content-center mb-4">
        <div className="col-lg-8">
          <div className="flashcard" onClick={() => !flipped && setFlipped(true)}>
            {!flipped ? (
              <div>
                <div className="mb-2"><span className="badge bg-light text-dark">{topic?.title}</span></div>
                <h3 className="mb-0">{card.front}</h3>
                <p className="text-muted-soft mt-3 mb-0"><small>Click to reveal answer</small></p>
              </div>
            ) : (
              <div>
                <div className="mb-3"><span className="badge bg-success bg-opacity-10 text-success">Answer</span></div>
                <h4 className="mb-3">{card.back}</h4>
                {card.mnemonic && (
                  <div className="alert alert-info mt-3">
                    <strong><i className="bi bi-lightbulb me-2"></i>Memory Aid:</strong> {card.mnemonic}
                  </div>
                )}
                {card.example && (
                  <div className="mt-2 text-muted-soft">
                    <strong>Example:</strong> {card.example}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
      
      {flipped && (
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="card card-cloudprep p-4">
              <h5 className="text-center mb-3">Did you remember this?</h5>
              <div className="d-flex gap-3 justify-content-center flex-wrap">
                <button className="btn btn-outline-danger" onClick={() => handleRemember(false)}>
                  <i className="bi bi-x-circle me-2"></i>No, need practice
                </button>
                <button className="btn btn-success" onClick={() => handleRemember(true)}>
                  <i className="bi bi-check-circle me-2"></i>Yes, I remembered
                </button>
              </div>
              <p className="text-center text-muted-soft mt-3 mb-0 small">Spaced repetition will adjust review intervals based on your response</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
