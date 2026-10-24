import React, { useState } from 'react';
import { tutorService } from '../services/tutorService';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export const AITutor: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: "Hi! I'm your AI Study Buddy for AZ-900. I teach like a patient instructor - I'll explain concepts simply, give analogies, connect to Azure, and check your understanding. What would you like to learn today?"
    }
  ]);
  const [input, setInput] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const status = tutorService.getStatus();
  
  const quickPrompts = [
    { label: 'Explain simply', prompt: 'Explain cloud computing in simple terms' },
    { label: 'Give me an analogy', prompt: 'Give me an analogy for IaaS vs PaaS vs SaaS' },
    { label: 'Compare two concepts', prompt: 'Compare regions and availability zones' },
    { label: 'Practical example', prompt: 'Give me a practical example of shared responsibility model' },
    { label: 'Test my understanding', prompt: 'Test me on cloud service models' }
  ];
  
  const handleSend = async () => {
    if (!input.trim()) return;
    
    const userMessage: Message = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    const question = input;
    setInput('');
    setIsThinking(true);
    
    try {
      const res = await tutorService.ask(question);
      setMessages(prev => [...prev, { role: 'assistant', content: res.content }]);
    } finally {
      setIsThinking(false);
    }
  };
  
  const handleQuickPrompt = (prompt: string) => {
    setInput(prompt);
  };
  
  return (
    <div>
      <div className="row mb-4">
        <div className="col-12">
          <h1 className="section-title mb-2"><i className="bi bi-robot me-2"></i>AI Study Buddy</h1>
          <p className="text-muted-soft">Patient Azure instructor - explains, analogizes, and checks your understanding</p>
        </div>
      </div>
      
      <div className="row">
        <div className="col-lg-8">
          <div className="card card-cloudprep mb-3" style={{height: '500px', display: 'flex', flexDirection: 'column'}}>
            <div className="card-header bg-transparent border-bottom" style={{borderColor: 'var(--cp-border)'}}>
              <div className="d-flex align-items-center gap-2">
                <div className="rounded-circle d-flex align-items-center justify-content-center" style={{width: '40px', height: '40px', background: 'linear-gradient(90deg, var(--cp-indigo), var(--cp-violet))'}}>
                  <i className="bi bi-robot text-white"></i>
                </div>
                <div>
                  <div className="fw-semibold">CloudPrep AI Tutor</div>
                  <small className="text-muted-soft">Teaching mode • {status.source === 'live' ? 'Live AI' : 'Fallback (curated content)'}</small>
                </div>
              </div>
            </div>
            <div className="card-body flex-grow-1 overflow-auto" style={{maxHeight: '380px'}}>
              {messages.map((msg, idx) => (
                <div key={idx} className={`mb-3 d-flex ${msg.role === 'user' ? 'justify-content-end' : 'justify-content-start'}`}>
                  <div className={`p-3 rounded ${msg.role === 'user' ? 'text-white' : ''}`} style={{
                    maxWidth: '80%',
                    background: msg.role === 'user' ? 'linear-gradient(90deg, var(--cp-indigo), var(--cp-violet))' : 'rgba(79, 70, 229, 0.08)',
                    whiteSpace: 'pre-wrap'
                  }}>
                    {msg.content}
                  </div>
                </div>
              ))}
              {isThinking && (
                <div className="d-flex justify-content-start mb-3">
                  <div className="p-3 rounded" style={{background: 'rgba(79, 70, 229, 0.08)'}}>
                    <span className="spinner-border spinner-border-sm me-2"></span>Thinking...
                  </div>
                </div>
              )}
            </div>
            <div className="card-footer bg-transparent border-top" style={{borderColor: 'var(--cp-border)'}}>
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Ask me anything about AZ-900..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                />
                <button className="btn btn-cloudprep-primary" onClick={handleSend} disabled={!input.trim() || isThinking}>
                  <i className="bi bi-send"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="col-lg-4">
          <div className="card card-cloudprep p-4 mb-3">
            <h5 className="section-title mb-3"><i className="bi bi-lightning me-2"></i>Quick Actions</h5>
            <div className="d-flex flex-column gap-2">
              {quickPrompts.map((qp, idx) => (
                <button key={idx} className="btn btn-outline-primary text-start" onClick={() => handleQuickPrompt(qp.prompt)}>
                  {qp.label}
                </button>
              ))}
            </div>
          </div>
          
          <div className="card card-cloudprep p-4">
            <h5 className="section-title mb-2"><i className="bi bi-info-circle me-2"></i>Teaching Method</h5>
            <ul className="small mb-0 ps-3">
              <li>Plain explanation</li>
              <li>Relatable analogy</li>
              <li>Azure example</li>
              <li>Where analogy stops</li>
              <li>Common mistake</li>
              <li>Check understanding</li>
            </ul>
            <p className="small text-muted-soft mt-2 mb-0">Uses African contexts where relevant • Fallback when no API is configured</p>
          </div>
        </div>
      </div>
    </div>
  );
};

