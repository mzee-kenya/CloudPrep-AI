import React, { useState } from 'react';
import { curriculumTopics } from '../data/curriculum';
import { Link } from 'react-router-dom';

export const Learn: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  
  const categories = [
    { id: 'all', name: 'All Topics', icon: 'bi-grid' },
    { id: 'cloud-concepts', name: 'Cloud Concepts', icon: 'bi-cloud' },
    { id: 'azure-architecture', name: 'Azure Architecture & Services', icon: 'bi-diagram-3' },
    { id: 'azure-management', name: 'Azure Management & Governance', icon: 'bi-gear' }
  ];
  
  const filteredTopics = selectedCategory === 'all' 
    ? curriculumTopics 
    : curriculumTopics.filter(t => t.category === selectedCategory);
  
  return (
    <div>
      <div className="row mb-4">
        <div className="col-12">
          <h1 className="section-title mb-2"><i className="bi bi-book me-2"></i>Learn</h1>
          <p className="text-muted-soft">Explore AZ-900 curriculum topics with clear explanations and analogies</p>
        </div>
      </div>
      
      <div className="row mb-4">
        <div className="col-12">
          <div className="d-flex gap-2 flex-wrap">
            {categories.map(cat => (
              <button
                key={cat.id}
                className={`btn ${selectedCategory === cat.id ? 'btn-cloudprep-primary' : 'btn-outline-primary'}`}
                onClick={() => setSelectedCategory(cat.id)}
              >
                <i className={`bi ${cat.icon} me-2`}></i>{cat.name}
              </button>
            ))}
          </div>
        </div>
      </div>
      
      <div className="row g-3">
        {filteredTopics.map(topic => (
          <div key={topic.id} className="col-lg-6">
            <div className="card card-cloudprep p-4 h-100">
              <div className="d-flex justify-content-between align-items-start mb-2">
                <h4 className="section-title mb-0">{topic.title}</h4>
                <span className="badge badge-cloud">{topic.difficulty || 'beginner'}</span>
              </div>
              <p className="text-muted-soft mb-3">{topic.description}</p>
              
              <div className="mb-3">
                <h6 className="fw-semibold">Explanation</h6>
                <p className="mb-0">{topic.explanation}</p>
              </div>
              
              {topic.analogy && (
                <div className="alert alert-info mb-3">
                  <h6 className="fw-semibold"><i className="bi bi-lightbulb me-2"></i>Analogy</h6>
                  <p className="mb-1">{topic.analogy}</p>
                  {topic.analogyNote && <small className="text-muted-soft"><em>Note: {topic.analogyNote}</em></small>}
                </div>
              )}
              
              {topic.commonMisconception && (
                <div className="alert alert-warning mb-3">
                  <h6 className="fw-semibold"><i className="bi bi-exclamation-triangle me-2"></i>Common Misconception</h6>
                  <p className="mb-0">{topic.commonMisconception}</p>
                </div>
              )}
              
              {topic.memoryAid && (
                <div className="mb-3">
                  <h6 className="fw-semibold"><i className="bi bi-brain me-2"></i>Memory Aid</h6>
                  <p className="mb-0">{topic.memoryAid}</p>
                </div>
              )}
              
              <div className="mt-auto">
                <Link to={`/practice?topic=${topic.id}`} className="btn btn-outline-primary">
                  Practice this topic <i className="bi bi-arrow-right ms-2"></i>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
