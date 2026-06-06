import React from 'react';
import { PORTFOLIO_SECTIONS } from '../config';

interface OverlayProps {
  hasScrolled: boolean;
  activeSection: number;
  onProjectHover: (isHovering: boolean) => void;
}

export function Overlay({ hasScrolled, activeSection, onProjectHover }: OverlayProps) {
  return (
    <div className="ui-overlay">
      {PORTFOLIO_SECTIONS.map((section, index) => {
        const Component = section.component;
        const isActive = activeSection === index;
        
        // Pass specific props based on section type if needed, or pass them generally
        return (
          <Component 
            key={section.id} 
            isActive={isActive} 
            hasScrolled={hasScrolled} 
            onProjectHover={onProjectHover} 
          />
        );
      })}
    </div>
  );
}
