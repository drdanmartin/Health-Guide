import { useState, useEffect } from 'react';
import { MODES } from './data/modes';
import { TopNav } from './components/TopNav';
import { Home } from './components/Home';
import { ModePage } from './components/ModePage';
import { Footer } from './components/Footer';

export default function App() {
  const [view, setView] = useState(() => localStorage.getItem('radius-view') || 'home');
  const [modeId, setModeId] = useState(() => localStorage.getItem('radius-mode') || 'weightLoss');
  const [duration, setDuration] = useState(() => localStorage.getItem('radius-duration') || 'silver');

  useEffect(() => { localStorage.setItem('radius-view', view); }, [view]);
  useEffect(() => { localStorage.setItem('radius-mode', modeId); }, [modeId]);
  useEffect(() => { localStorage.setItem('radius-duration', duration); }, [duration]);

  const goToMode = (id) => {
    setModeId(id);
    setView('mode');
    window.scrollTo({ top: 0, behavior: 'instant' });
  };
  const goHome = () => {
    setView('home');
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  return (
    <div>
      <TopNav duration={duration} setDuration={setDuration} onHome={goHome} view={view} />
      <div className="view-fade" key={view + modeId}>
        {view === 'home'
          ? <Home onPick={goToMode} duration={duration} setDuration={setDuration} />
          : <ModePage modeId={modeId} duration={duration} onBack={goHome} modes={MODES} />}
      </div>
      <Footer />
    </div>
  );
}
