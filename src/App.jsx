/* ============================================
   COSMIC PORTFOLIO - MAIN APP COMPONENT
   Phase 1: Basic structure without 3D effects
   ============================================ */

import React from 'react';
import Home from './pages/Home';
import './App.css';

/**
 * App Component
 * 
 * Main application container.
 * In later phases, this will manage:
 * - Intro animation state
 * - Skip intro functionality
 * - Loading states
 * 
 * For now, it simply renders the Home page.
 */
function App() {
  return (
    <div className="app">
      {/* Phase 1: Just render the home page */}
      <Home />
      
      {/* Future phases will add:
          - IntroAnimation component
          - Loading screen
          - Skip intro button
          - Animation state management
      */}
    </div>
  );
}

export default App;