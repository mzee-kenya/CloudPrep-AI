import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ProgressProvider } from './context/ProgressContext';
import { AppLayout } from './components/AppLayout';
import { Dashboard } from './pages/Dashboard';
import { Learn } from './pages/Learn';
import { Practice } from './pages/Practice';
import { Flashcards } from './pages/Flashcards';
import { AITutor } from './pages/AITutor';
import { StudyPlanner } from './pages/StudyPlanner';
import { Progress } from './pages/Progress';
import { CloudQuest } from './pages/CloudQuest';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './styles/design.css';

function App() {
  return (
    <ProgressProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AppLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="learn" element={<Learn />} />
            <Route path="practice" element={<Practice />} />
            <Route path="flashcards" element={<Flashcards />} />
            <Route path="tutor" element={<AITutor />} />
            <Route path="planner" element={<StudyPlanner />} />
            <Route path="quest" element={<CloudQuest />} />
            <Route path="progress" element={<Progress />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ProgressProvider>
  );
}

export default App;
