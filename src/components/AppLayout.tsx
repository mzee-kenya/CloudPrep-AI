import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { useProgress } from '../context/ProgressContext';

export const AppLayout: React.FC = () => {
  const { progress } = useProgress();
  
  return (
    <div className="min-vh-100 d-flex flex-column">
      <nav className="navbar navbar-expand-lg navbar-cloudprep">
        <div className="container">
          <NavLink className="navbar-brand fw-bold" to="/">
            <i className="bi bi-cloud-check me-2"></i>CloudPrep AI
          </NavLink>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#nav">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="nav">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0 gap-lg-2">
              <li className="nav-item"><NavLink className="nav-link" to="/">Dashboard</NavLink></li>
              <li className="nav-item"><NavLink className="nav-link" to="/learn">Learn</NavLink></li>
              <li className="nav-item"><NavLink className="nav-link" to="/practice">Practice</NavLink></li>
              <li className="nav-item"><NavLink className="nav-link" to="/flashcards">Flashcards</NavLink></li>
              <li className="nav-item"><NavLink className="nav-link" to="/quest">Cloud Quest</NavLink></li>
              <li className="nav-item"><NavLink className="nav-link" to="/tutor">AI Tutor</NavLink></li>
              <li className="nav-item"><NavLink className="nav-link" to="/planner">Study Planner</NavLink></li>
              <li className="nav-item"><NavLink className="nav-link" to="/progress">Progress</NavLink></li>
            </ul>
            <div className="ms-lg-3 text-white d-flex align-items-center gap-3">
              <span className="badge bg-light text-dark"><i className="bi bi-star-fill text-warning me-1"></i>{progress.xp} XP</span>
              <span className="badge bg-light text-dark"><i className="bi bi-fire text-danger me-1"></i>{progress.streak} day streak</span>
            </div>
          </div>
        </div>
      </nav>
      <main className="flex-grow-1 py-4">
        <div className="container">
          <Outlet />
        </div>
      </main>
      <footer className="py-4 border-top">
        <div className="container text-center">
          <p className="mb-1 fw-semibold">CloudPrep AI — Unofficial, independent learning tool for AZ-900 exam prep</p>
          <p className="disclaimer mb-0">Not affiliated with, endorsed by, or sponsored by Microsoft. Original practice content only.</p>
        </div>
      </footer>
    </div>
  );
};
