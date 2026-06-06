import React from 'react';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Projects } from './components/Projects';
import { Skills } from './components/Skills';
import { Ideas } from './components/Ideas';
import { Contact } from './components/Contact';

export type SectionConfig = {
  id: string;
  name: string;
  component: React.ComponentType<any>;
};

export const PORTFOLIO_SECTIONS: SectionConfig[] = [
  { id: 'home', name: 'Home', component: Hero },
  { id: 'about', name: 'About', component: About },
  { id: 'projects', name: 'Projects', component: Projects },
  { id: 'skills', name: 'Skills', component: Skills },
  { id: 'ideas', name: 'Ideas', component: Ideas },
  { id: 'connect', name: 'Connect', component: Contact },
];

export const TOTAL_PAGES = PORTFOLIO_SECTIONS.length;
