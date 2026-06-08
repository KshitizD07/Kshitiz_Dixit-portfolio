import { useState, lazy, Suspense } from 'react';
import './App.css';
import CosmicApp from './CosmicApp';
import './pandora/pandora-theme.css';

const PandoraScene = lazy(() =>
  import('./pandora/components/Scene').then(mod => ({ default: mod.Scene }))
);

// A simple styled dropdown component for switching worlds
function WorldSwitcher({ currentWorld, setWorld }) {
  const [isOpen, setIsOpen] = useState(false);

  // We place this outside both theme wrappers so it doesn't get affected by specific container positioning
  return (
    <div style={{ position: 'fixed', top: '1.5rem', left: '2rem', zIndex: 9999 }}>
      <div 
        onClick={() => setIsOpen(!isOpen)}
        style={{
          fontFamily: currentWorld === 'pandora' ? "'IM Fell English SC', serif" : "'Space Mono', monospace",
          fontSize: '1.2rem',
          color: currentWorld === 'pandora' ? '#d4a373' : '#a2d2ff',
          cursor: 'pointer',
          textShadow: currentWorld === 'pandora' ? '0 0 10px rgba(212, 163, 115, 0.5)' : '0 0 10px rgba(162, 210, 255, 0.5)',
          padding: '0.5rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          background: 'rgba(0,0,0,0.5)',
          borderRadius: '4px',
          backdropFilter: 'blur(5px)',
          border: `1px solid ${currentWorld === 'pandora' ? 'rgba(212, 163, 115, 0.2)' : 'rgba(162, 210, 255, 0.2)'}`
        }}
      >
        <span style={{ fontSize: '0.9rem', opacity: 0.8, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
          {currentWorld === 'pandora' ? 'Change Realm' : 'Switch World'}
        </span>
        <span style={{ fontSize: '0.7rem', opacity: 0.7 }}>▼</span>
      </div>

      {isOpen && (
        <div style={{
          position: 'absolute',
          top: '100%',
          left: 0,
          marginTop: '0.5rem',
          background: 'rgba(0,0,0,0.85)',
          border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: '4px',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          minWidth: '200px',
          backdropFilter: 'blur(10px)'
        }}>
          <button 
            onClick={() => { setWorld('cosmic'); setIsOpen(false); }}
            style={{
              padding: '1rem',
              background: currentWorld === 'cosmic' ? 'rgba(162, 210, 255, 0.2)' : 'transparent',
              color: '#a2d2ff',
              fontFamily: "'Space Mono', monospace",
              border: 'none',
              textAlign: 'left',
              cursor: 'pointer',
              borderBottom: '1px solid rgba(255,255,255,0.05)'
            }}
          >
            The Cosmic Expanse
          </button>
          <button 
            onClick={() => { setWorld('pandora'); setIsOpen(false); }}
            style={{
              padding: '1rem',
              background: currentWorld === 'pandora' ? 'rgba(212, 163, 115, 0.2)' : 'transparent',
              color: '#d4a373',
              fontFamily: "'IM Fell English SC', serif",
              border: 'none',
              textAlign: 'left',
              cursor: 'pointer'
            }}
          >
            The Pandora Artifact
          </button>
        </div>
      )}
    </div>
  );
}

function App() {
  // Default to the original cosmic portfolio
  const [currentWorld, setCurrentWorld] = useState('cosmic');

  return (
    <>
      <WorldSwitcher currentWorld={currentWorld} setWorld={setCurrentWorld} />
      
      {currentWorld === 'cosmic' ? (
        <CosmicApp />
      ) : (
        <Suspense fallback={
          <div style={{
            position: 'fixed', inset: 0,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: '#0a0a0a', zIndex: 100
          }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{
                width: '48px', height: '48px', margin: '0 auto 1.5rem',
                border: '3px solid rgba(196, 154, 91, 0.2)',
                borderTopColor: '#c49a5b',
                borderRadius: '50%',
                animation: 'spin 0.8s linear infinite'
              }} />
              <p style={{
                fontFamily: "'IM Fell English SC', serif",
                color: '#c49a5b', fontSize: '1.1rem',
                letterSpacing: '0.15em', opacity: 0.9
              }}>
                Opening the Artifact…
              </p>
              <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
            </div>
          </div>
        }>
          <PandoraScene />
        </Suspense>
      )}
    </>
  );
}

export default App;
